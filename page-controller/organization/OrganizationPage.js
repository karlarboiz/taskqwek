const CommonValues = require("../../common/CommonValues");
const OrgControls = require("../../model-functions/OrgControls");
const ProjectControls = require("../../model-functions/ProjectControls");
const Organization = require("./Organization");

class OrganizationPage extends Organization{
    constructor(rootName,role,id,orgId){
        super(rootName)
        this._role = role;
        this._id = id;
        this._orgId = orgId;
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
       return `${this.rootName}/${CommonValues.ORGANIZATION}-${this.role}`; 
    }

    async getPageData(){
        if(role === "member"){
            const orgDetails = await Org.findOne({
                _id: orgId
            })

            const parsedDate = new Date(orgDetails["regDate"]);
            const monthConverted = MONTHS[parsedDate.getUTCMonth()].full;    
            const dateConverted = parsedDate.getDate();
            const fullDate = `${monthConverted} ${dateConverted}, ${parsedDate.getFullYear()}`;

            
        }else {
            const leaderProjects = new ProjectControls(null,id).getLeaderProjects();
            const leaderOrgs = new OrgControls(this.id,false);

            // OrgControls
            return {
                leaderProjects,
                leaderOrgs
            }
        }
    }

}

module.exports = OrganizationPage;