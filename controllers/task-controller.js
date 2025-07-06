const TaskPage = require("../page-controller/task/TaskPage");


const taskPage = (req,res,next)=>{
    const role = req.session.user?.role === 1  ?"leader": "member";

    const route = new TaskPage();
    route._role = role;

    const routePage = route.createPageRoute();
    
    res.render(routePage,{
        role:role,
        activeLink: "task"
    })
}

const createTask = (req,res)=>{

}


module.exports = {
    taskPage
}