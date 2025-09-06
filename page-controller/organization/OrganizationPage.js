const CommonValues = require("../../common/CommonValues");
const OrgDto = require("../../dto/OrgDto");
const OrgControls = require("../../model-functions/OrgControls");
const ProjectControls = require("../../model-functions/ProjectControls");
const Org = require("../../model/Org");
const Organization = require("./Organization");
const getUserAssignedOrg = require("../../model-1/UserAssignedOrg");
const MONTHS = require("../../util/date-value");

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

    createCustomizePage(pageValue){
         return `${this.rootName}/${pageValue}`; 
    }

    async getPageData(){
        if(this.role === "member"){
            const orgDto = new OrgDto();

            const UserAssignedOrg = getUserAssignedOrg();

            const userAssignedOrg = await UserAssignedOrg.findOne({
                where:{
                    user_assigned_user_id: this.id
                }
            });

            const userAssignedOrgData = userAssignedOrg?.dataValues;

            const orgDetails = await Org.findOne({
                _id: userAssignedOrgData.org_assigned_org_id
            })

            console.log(orgDetails)
  
            if(!orgDetails){
                
                return {
                    orgDto:{...orgDto}
                };
            }
        
            const parsedDate = new Date(orgDetails["regDate"]);
            const monthConverted = MONTHS[parsedDate.getUTCMonth()].full;    
            const dateConverted = parsedDate.getDate();
            const fullDate = `${monthConverted} ${dateConverted}, ${parsedDate.getFullYear()}`;
            orgDto._orgName = orgDetails.name;
            orgDto._orgDescription = orgDetails.description;
            orgDto._orgCreatedDate = fullDate;
            orgDto._population = orgDetails.population;
            return {
                orgDto:{...orgDto}
            }
        }else {
            const projectControls= new ProjectControls(null,this.id);
            const orgControls = new OrgControls(this.id,false);

            const leaderProjects = await projectControls.getLeaderProjects();
            const leaderOrgs = await orgControls.getOrgListBasedOnLeaderId();
            
            return {
                leaderProjects,
                leaderOrgs
            }
        }
    }

}

module.exports = OrganizationPage;