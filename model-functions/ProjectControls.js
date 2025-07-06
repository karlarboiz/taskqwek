const Project= require("../model/Project");

class ProjectControls{
    constructor(projectId,leaderId,role){
        this.projectId = projectId
        this.leaderId= leaderId
        this.role = role
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