class ProjectDto {
    constructor(projectName, projectId, projectCreator, createdDate) {
        this._projectName = projectName;
        this._projectId = projectId;
        this._projectCreator = projectCreator;
        this._createdDate = createdDate;
    }

    // Getter and Setter for projectName
    get projectName() {
        return this._projectName;
    }

    set projectName(value) {
        this._projectName = value;
    }

    // Getter and Setter for projectId
    get projectId() {
        return this._projectId;
    }

    set projectId(value) {
        this._projectId = value;
    }

    // Getter and Setter for projectCreator
    get projectCreator() {
        return this._projectCreator;
    }

    set projectCreator(value) {
        this._projectCreator = value;
    }

    // Getter and Setter for createdDate
    get createdDate() {
        return this._createdDate;
    }

    set createdDate(value) {
        this._createdDate = value;
    }
}

module.exports = ProjectDto;
