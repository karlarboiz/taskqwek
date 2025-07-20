const CommonValues = require("../../common/CommonValues");

class Dashboard {
    constructor(rootName = CommonValues.DASHBOARD) {
        this._rootName = rootName;
    }

    get rootName() {
        return this._rootName;
    }

    set rootName(value) {
        this._rootName = value;
    }
}

module.exports = Dashboard;
