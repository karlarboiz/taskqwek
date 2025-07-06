const CommonValues = require("../../common/CommonValues");
const Task = require("./Task");

class TaskPage extends Task{ 
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
       return `${this.rootName}/${CommonValues.TASK}-${this.role}`; 
    }
}

module.exports = TaskPage;