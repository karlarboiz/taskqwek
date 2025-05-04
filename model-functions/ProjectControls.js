const Project= require("../model/Project");

class ProjectControls{
    constructor(projectId,leaderId){
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