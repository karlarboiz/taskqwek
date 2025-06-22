const CommonValues = require("../../common/CommonValues");

class Organization {
    constructor(rootName = CommonValues.ORGANIZATION) {
        this._rootName = rootName;
    }

    get rootName() {
        return this._rootName;
    }

    set rootName(value) {
        this._rootName = value;
    }
}

module.exports = Organization;
