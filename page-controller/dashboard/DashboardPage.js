const BasePage = require("../base/BasePage");

class DashboardPage extends BasePage {

    constructor(rootName,role,id){
        super(rootName)
        this._role = role;
        this._id = id;
    
    }

    get role(){
        return this._role;
    }

    set role(value){
        return this._role = value;
    }


    get id(){
        return this._id;
    }

    set id(value){
        return this._id = value;
    }
}

module.exports = DashboardPage;