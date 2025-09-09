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
        const projectDetailsControl= new ProjectControls(projectId,null,null);

        const projectDetails = await projectDetailsControl.getProjectDetails();
        
        return res.render(routePage,{
                    role:role,
                    activeLink: "task",
                    pageDetails:pageDetails,
                    projectDetails:projectDetails,
                    
                })
    }
    else if(projectId && orgId){
       
        const orgDetails = new OrganizationPage();
            orgDetails._role = role;
            orgDetails._id = id;
    
        const orgInfo = await orgDetails.getPageData();
        console.log(">>>>>")
        console.log(orgInfo);

        return res.render(routePage,{
                    role:role,
                    activeLink: "task",
                    pageDetails:pageDetails,
                    projectDetails:projectDetails,
                    
                })

    } 

    return res.render(routePage,{
        role:role,
        activeLink: "task",
        pageDetails:pageDetails,
        projectDetails: null
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
        if(projectId && !orgId){
            return res.redirect(RouteNames.TASK_TASK_PAGE + `?projectId=${projectId}`);
        }else if(projectId && orgId){
            console.log(">>>> I'm here")
                    return res.redirect(RouteNames.TASK_TASK_PAGE + `?projectId=${projectId}?orgId=${orgId}`);
        }

    }

}


module.exports = {
    taskPage,
    taskPageCustomize,
    taskCreationHandler
}