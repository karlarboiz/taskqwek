class ProjectDto {
    constructor(projectName,projectId,projectCreator,createdDate){
        this.projectName = projectName;
        this.projectId = projectId;
        this.projectCreator = projectCreator;
        this.createdDate =createdDate;
    }
}

module.exports = ProjectDto;