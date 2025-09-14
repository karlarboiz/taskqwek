const Project= require("../model/Project");
const BaseModelControls = require("./BaseModelControls");

class ProjectControls extends BaseModelControls {
    constructor(userId, role, projectId) {
        super(userId, role);
        this._projectId = projectId;

    }

    // Getter & Setter for projectId
    get projectId() {
        return this._projectId;
    }

    set projectId(value) {
        this._projectId = value;
    }

    async getProjectDetails() {
        const project = await Project.findOne({
            _id: this._projectId
        });

        return project;
    }

    async getLeaderProjects() {
        const leaderProjects = await Project.aggregate([
            { $match: { createAuthorId: this.userId } }
        ]);
        return leaderProjects;
    }
}


module.exports = ProjectControls;