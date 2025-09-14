const Project= require("../model/Project");
const BaseModelControls = require("./BaseModelControls");

class ProjectControls extends BaseModelControls{
    constructor(projectId,leaderId,role){
        super(role);
        this.projectId = projectId
        this.leaderId= leaderId
        
    }

    async getProjectDetails(){
        const project = await Project.findOne({
            _id: this.projectId
        })
        
        return project;
    }

    async getLeaderProjects(){
        const leaderProjects = await Project.aggregate([
                    {
                        $match: {createAuthorId: this.leaderId}
                    }
                ]);
        return leaderProjects;
    }


}

module.exports = ProjectControls;