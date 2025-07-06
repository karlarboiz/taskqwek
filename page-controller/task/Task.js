const CommonValues = require("../../common/CommonValues");

class Task{
    constructor(rootName = CommonValues.TASK) {
        this._rootName = rootName;
    }

    get rootName() {
        return this._rootName;
    }

    set rootName(value) {
        this._rootName = value;
    }
}

module.exports = Task;