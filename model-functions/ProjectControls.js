const Project= require("../model/Project");

class ProjectControls{
    constructor(projectId){
        this.projectId = projectId
    }

    async getProjectDetails(){
        const project = await Project.findOne({
            _id: this.projectId
        })

        return project;
    }
}

module.exports = ProjectControls;