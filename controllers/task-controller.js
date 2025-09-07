const RouteNames = require("../common/RouteNames");
const ProjectControls = require("../model-functions/ProjectControls");
const OrganizationPage = require("../page-controller/organization/OrganizationPage");
const TaskPage = require("../page-controller/task/TaskPage");
const sessionDetails = require("../util/session-details");


const taskPage = async(req,res,next)=>{

    const {role,id}=sessionDetails(req);

    const {projectId,orgId,memberId} =req.query;

    const route = new TaskPage();
    route._role = role;
    route._id =id;

    const orgPage = new OrganizationPage();
    orgPage._role = role;
    orgPage._id =id;

    const routePage = route.createPageRoute();

    const projectControls = new ProjectControls(null,id);

    const leaderProjects = await projectControls.getLeaderProjects();
    const pageDetails = {
            leaderProjects
        }
    if(projectId){
        const leaderOrgs = await orgPage.getOrgList(projectId);
        
        pageDetails.leaderOrgs = leaderOrgs;
    }

    
    console.log(pageDetails);
    res.render(routePage,{
        role:role,
        activeLink: "task",
        pageDetails:pageDetails
    })
}

const taskPageCustomize = async(req,res,next)=>{
     const {role,id}=sessionDetails(req);
     const {projectId,orgId} =req.query;

}

const taskCreationHandler = async(req,res)=>{
    
    const projectId = req.body["project-options"];
    const orgId = req.body["organization-options"];
    
    const memberId = req.body["member-options"];
    if(!projectId || !orgId || !memberId){
        return res.redirect(RouteNames.TASK_TASK_PAGE + `?projectId=${projectId}`);
    }

}


module.exports = {
    taskPage,
    taskPageCustomize,
    taskCreationHandler
}