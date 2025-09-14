const CommonValues = require("../../common/CommonValues");
const OrgControls = require("../../model-functions/OrgControls");
const BasePage = require("../base/BasePage");

class TaskPage extends BasePage{ 
    constructor(rootName,role,id,orgId){
        super(rootName)
        this._role = role
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

    get orgId(){
        return this._orgId;
    }

    set orgId(value){
        return this._orgId = value;
    }

    createPageRoute(){
       return `${this.rootName}/${CommonValues.TASK}-${this.role}`; 
    }

    async getPageData(){
        if(this._role === "member"){

        }else{
            // const orgControls = new OrgControls(this.id,false);
            // const leaderOrgs = await orgControls.getOrgListBasedOnLeaderId();

            // return {
            //     leaderOrgs
            // }
        }
    }
}

module.exports = TaskPage;