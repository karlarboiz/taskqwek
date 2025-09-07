const RouteNames = require("../common/RouteNames");
const ProjectControls = require("../model-functions/ProjectControls");
const TaskPage = require("../page-controller/task/TaskPage");
const sessionDetails = require("../util/session-details");


const taskPage = async(req,res,next)=>{

    const {role,id}=sessionDetails(req);

    const {projectId,orgId,memberId} =req.query;

    const route = new TaskPage();
    route._role = role;
    route._id =id;

    const routePage = route.createPageRoute();
    const leaderOrgs = await route.getPageData();

    const projectControls = new ProjectControls(null,id);

    const leaderProjects = await projectControls.getLeaderProjects();

    
    console.log(projectId);

    const pageDetails = {
        leaderProjects
    }
    console.log(pageDetails)
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
    const {role,id}=sessionDetails(req);
    const {projectId,orgId,memberId} =req.query;


    if(!projectId || !orgId || !memberId){
        return res.redirect(RouteNames.TASK_TASK_PAGE);
    }

}


module.exports = {
    taskPage,
    taskPageCustomize,
    taskCreationHandler
}