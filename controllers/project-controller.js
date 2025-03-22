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
   

        const project = new Project({
            name:name,
            description:description,
            createAuthorId:leaderId,
            deadline:deadline
        })

        const validate = await project.validateSync();

        const errorResult = errorParsingFromValidations(validate.errors);
   
        const success = !result;

        return res.status(200).send({
            isSuccess: success,
            message: Messages.PROJECT_CREATION_SUCCESS,
            errorResult: errorResult
        })
    }catch(e){
      next(e)
    }
}

module.exports = {
    projectPage,
    createProject
}