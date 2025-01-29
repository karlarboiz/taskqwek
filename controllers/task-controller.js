const taskPage = (req,res,next)=>{
    const role = req.session.user?.role === 1  ?"leader": "member";

    res.render("tasks",{
        role:role,
        activeLink: "task"
    })
}


module.exports = {
    taskPage
}