const CommonValues = require("../../common/CommonValues");
const ProjectDto = require("../../dto/ProjectDto");
const Project = require("./Project");
class ProjectPage extends Project{
    constructor(rootName,role,id,projectId){
        super(rootName)
        this._role = role;
        this._id = id;
        this._projectId = projectId;
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

    get projectId(){
        return this._projectId;
    }

    set projectId(value){
        return this._projectId = value;
    }

    createPageRoute(){
       return `${this.rootName}/${CommonValues.PROJECT}-${this.role}`; 
    }

    createCustomizePage(secondPar){
        return `${this.rootName}/${secondPar}`
    }

    async getPageData(){
        if(this.role === "member"){
            const orgDto = new ProjectDto();
            const orgDetails = await Org.findOne({
                _id: this.orgId
            })
            const kwan = {
                kwan: "aksdfasd"
            }
            if(!orgDetails){
                
                return {
                    orgDto:{...orgDto},
                    kwan
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
            const leaderProjects = new ProjectControls(null,id).getLeaderProjects();
            const leaderOrgs = new OrgControls(this.id,false);
            return {
                leaderProjects,
                leaderOrgs
            }
        }
    }


}

module.exports = ProjectPage;