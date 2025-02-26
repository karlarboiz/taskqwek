const Messages = require("../common/Messages");

const Project = require("../model/Project");
const projectPage = (req,res,next)=>{

    const role = req.session.user?.role === 1  ?"leader": "member";
    res.render("project",{
        role:role,
        activeLink: "project"
    })
}

const createProject = (req,res,next)=>{
    const {name,description,organizations,}= req.body;
    const leaderId = req.session.user?._id

    console.log(name,description,organizations)
    
    // const newProject = new Project({
    //     name:name,
    // })
    return res.status(200).send({
        isSuccess: true,
        message: Messages.PROJECT_CREATION_SUCCESS
    })
}

module.exports = {
    projectPage,
    createProject
}