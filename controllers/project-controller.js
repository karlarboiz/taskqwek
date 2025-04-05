const Messages = require("../common/Messages");

const Project = require("../model/Project");
const ResponseObj = require("../response-obj/ResponseObj");
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
        const {name,description,deadline}= req.body;
        const leaderId = req.session.user?.id
   
        const project = new Project({
            name:name,
            description:description,
            createAuthorId:leaderId,
            deadline:deadline
        })

        const validate = await project.validateSync();
     
        const errorResult = errorParsingFromValidations(validate?.errors);
   
        const success = !errorResult;
        
        if(!errorResult){
            await project.save();
        }

        const responseObj = new ResponseObj(    success,
            success ? Messages.PROJECT_CREATION_SUCCESS : 
            Messages.PROJECT_CREATION_FAILED,
            errorResult   
        )

        return res.status(200).send(responseObj)
    }catch(e){
        console.log(e.message)
    }
}

const fetchProjectListFunctionHandler = async(req,res,next)=>{

    try{
        const creatorAuthorId = req.session.user?.id;

        console.log(creatorAuthorId);
        
        const leaderProjects = await Project.aggregate([
            {
                $match: {createAuthorId: creatorAuthorId}
            }
        ]);

        return res.status(200).send(leaderProjects)
    }catch(e){

    }
}

module.exports = {
    projectPage,
    createProject,
    fetchProjectListFunctionHandler
}