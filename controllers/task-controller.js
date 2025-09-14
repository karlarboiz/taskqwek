const CommonValues = require("../common/CommonValues");
const RouteNames = require("../common/RouteNames");
const ProjectControls = require("../model-functions/ProjectControls");
const OrganizationPage = require("../page-controller/organization/OrganizationPage");
const TaskPage = require("../page-controller/task/TaskPage");
const TaskSession = require("../session/TaskSession");
const sessionDetails = require("../util/session-details");
const userAssignedOrg = require("../model-1/UserAssignedOrg");

const taskPage = async(req,res,next)=>{

    const taskSession = new TaskSession();
    taskSession._req = req;

    const {role,id}=sessionDetails(req);

    const {projectId,orgId,memberId} =req.query;

    const route = new TaskPage();
    route._rootName = CommonValues.TASK;
    route._role = role;
    route._id =id;

    const orgPage = new OrganizationPage();
    orgPage._role = role;
    orgPage._id =id;

    const routePage = route.createPageRoute();

    const projectControls = new ProjectControls();
    projectControls._userId = id;
    const leaderProjects = await projectControls.getLeaderProjects();
    const pageDetails = {
            leaderProjects
        } 

    if(projectId){
        const leaderOrgs = await orgPage.getOrgList(projectId);
        
        pageDetails.leaderOrgs = leaderOrgs;
        const projectDetailsControl= new ProjectControls(projectId,null,null);

        const projectDetails = await projectDetailsControl.getProjectDetails();
        
        if(orgId){
       
            const orgDetails = await orgPage.getOrgDetails(orgId);

            const UserAssignedOrg = userAssignedOrg();

            const userListUnderOrg = await UserAssignedOrg.findAll({
                where:{
                    org_assigned_org_id: orgId,
                     project_assigned_project_id: projectId
                }
            })

            const userListItems = userListUnderOrg.map(val=>val?.dataValues);
            
            return res.render(routePage,{
                        role:role,
                        activeLink: "task",
                        pageDetails:pageDetails,
                        projectDetails:projectDetails,
                        orgDetails:orgDetails,
                        userListItems:userListItems
                    })

        } 

        return res.render(routePage,{
                    role:role,
                    activeLink: "task",
                    pageDetails:pageDetails,
                    projectDetails:projectDetails,
                    orgDetails:null,
                    userListItems: null
                    
                })
    }

    return res.render(routePage,{
        role:role,
        activeLink: "task",
        pageDetails:pageDetails,
        projectDetails: null,
        orgDetails:null,
        userListItems: null
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
        }else if(projectId && orgId && !memberId){
            return res.redirect(RouteNames.TASK_TASK_PAGE + `?projectId=${projectId}&orgId=${orgId}`);
        }
    }else {
            return res.redirect(RouteNames.TASK_TASK_PAGE + `?projectId=${projectId}&orgId=${orgId}&memberId=${memberId}`);
        }

}


module.exports = {
    taskPage,
    taskPageCustomize,
    taskCreationHandler
}