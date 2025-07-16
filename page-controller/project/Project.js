const CommonValues = require("../../common/CommonValues");

class Project{
    constructor(rootName = CommonValues.PROJECT) {
        this._rootName = rootName;
    }

    get rootName() {
        return this._rootName;
    }

    set rootName(value) {
        this._rootName = value;
    }
}

module.exports = Project;