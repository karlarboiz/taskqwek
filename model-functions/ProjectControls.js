const Project= require("../model/Project");
const BaseModelControls = require("./BaseModelControls");

class ProjectControls extends BaseModelControls {
    constructor(userId, role, projectId, leaderId) {
        super(userId, role);
        this._projectId = projectId;
        this._leaderId = leaderId;
    }

    // Getter & Setter for projectId
    get projectId() {
        return this._projectId;
    }

    set projectId(value) {
        this._projectId = value;
    }

    // Getter & Setter for leaderId
    get leaderId() {
        return this._leaderId;
    }

    set leaderId(value) {
        this._leaderId = value;
    }

    async getProjectDetails() {
        const project = await Project.findOne({
            _id: this._projectId
        });

        return project;
    }

    async getLeaderProjects() {
        const leaderProjects = await Project.aggregate([
            { $match: { createAuthorId: this._leaderId } }
        ]);
        return leaderProjects;
    }
}


module.exports = ProjectControls;