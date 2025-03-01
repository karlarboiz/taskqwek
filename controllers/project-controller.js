const Messages = require("../common/Messages");

const Project = require("../model/Project");
const { encryptValue } = require("../util/encrypt-code");
const projectPage = async(req,res,next)=>{
    console.log("hello hello")
    console.log(req.session)
    const role = req.session.user?.role === 1  ?"leader": "member";
    res.render("project",{
        role:role,
        activeLink: "project"
    })
}

const createProject = async(req,res,next)=>{
    try{
        const {name,description,organizations,}= req.body;
        const leaderId = req.session.user?.id
    
        console.log(name,description,organizations)

        // const leaderIdEnc = await encryptValue(leaderId);
        // console.log(leaderIdEnc)
   

        const project = new Project({
            name:name,
            description:description,
            createAuthorId:leaderId
        })

        const validate = await project.validateSync();

        console.log(validate);
        return res.status(200).send({
            isSuccess: true,
            message: Messages.PROJECT_CREATION_SUCCESS
        })
    }catch(e){
        
    }
}

module.exports = {
    projectPage,
    createProject
}