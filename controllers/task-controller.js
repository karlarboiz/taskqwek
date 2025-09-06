const TaskPage = require("../page-controller/task/TaskPage");


const taskPage = async(req,res,next)=>{
    const role = req.session.user?.role === 1  ?"leader": "member";
    const id = req.session.user.id;
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

const createTask = (req,res)=>{

}


module.exports = {
    taskPage
}