
const projectPage = (req,res,next)=>{

    const role = req.session.user?.role === 1  ?"leader": "member";
    res.render("project",{
        role:role,
        activeLink: "project"
    })
}

const createProject = (req,res,next)=>{
    const {name,description,}= req.body;
}

module.exports = {
    projectPage,
    createProject
}