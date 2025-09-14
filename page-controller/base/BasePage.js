class BasePage {
    constructor(rootName){
        this.rootName = rootName;
    }

     get rootName() {
        return this._rootName;
    }

    set rootName(value) {
        this._rootName = value;
    }
}

module.exports = BasePage;