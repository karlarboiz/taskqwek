const TaskPage = require("../page-controller/task/TaskPage");
const sessionDetails = require("../util/session-details");


const taskPage = async(req,res,next)=>{

    const {role,id}=sessionDetails(req);

    const route = new TaskPage();
    route._role = role;
    route._id =id;

    const routePage = route.createPageRoute();
    const pageDetails = await route.getPageData();
    res.render(routePage,{
        role:role,
        activeLink: "task",
        pageDetails:pageDetails
    })
}

const taskPageCustomize = async(req,res,next)=>{
     const {role,id}=sessionDetails(req);
}

const createTask = (req,res)=>{

}


module.exports = {
    taskPage
}