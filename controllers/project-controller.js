const Messages = require("../common/Messages");

const Project = require("../model/Project");
// const { encryptValue } = require("../util/encrypt-code");
const { errorParsingFromValidations } = require("../util/error-parsing");
const projectPage = async(req,res,next)=>{
 
    const role = req.session.user?.role === 1  ?"leader": "member";
    res.render("project",{
        role:role,
        activeLink: "project"
    })
}

const createProject = async(req,res,next)=>{
    try{
        const {name,description,organizations,deadline}= req.body;
        const leaderId = req.session.user?.id

        console.log(deadline)
        // const leaderIdEnc = await encryptValue(leaderId);
        // console.log(leaderIdEnc)
   

        const project = new Project({
            name:name,
            description:description,
            createAuthorId:leaderId,
            deadline:deadline
        })

        const validate = await project.validateSync();

       const result = errorParsingFromValidations(validate.errors);
   
       const success = !result;

        return res.status(200).send({
            isSuccess: success,
            message: Messages.PROJECT_CREATION_SUCCESS
        })
    }catch(e){
        res.status(200).send({
            isSuccess: false,
            message: Messages.FAILED
        })
    }
}

module.exports = {
    projectPage,
    createProject
}