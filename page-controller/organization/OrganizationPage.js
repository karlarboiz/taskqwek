const CommonValues = require("../../common/CommonValues");
const Organization = require("./Organization");

class OrganizationPage extends Organization{
    constructor(rootName,role){
        super(rootName)
        this._role = role
    }

    get role(){
        return this._role;
    }

    set role(value){
        return this._role = value;
    }

    createPageRoute(){
       return `${this.rootName}/${CommonValues.ORGANIZATION}-${this.role}`; 
    }

}

module.exports = OrganizationPage;