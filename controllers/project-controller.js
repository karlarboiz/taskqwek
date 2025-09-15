const Messages = require("../common/Messages");
const ProjectDto = require("../dto/ProjectDto");
const ProjectControls = require("../model-functions/ProjectControls");
const UserControls = require("../model-functions/UserControls");
const Project = require("../model/Project");
const ProjectPage = require("../page-controller/project/ProjectPage");

const ResponseObj = require("../common-obj/ResponseObj");
// const { encryptValue } = require("../util/encrypt-code");
const { errorParsingFromValidations } = require("../util/error-parsing");
const { Json } = require("sequelize/lib/utils");
const { projectCreationSessionPage,projectCreationErrorSessionPage } = require("../util/project-creation-session");
const CommonValues = require("../common/CommonValues");
const projectPage = async(req,res,next)=>{
 
    const role = req.session.user?.role === 1  ?"leader": "member";
    const projectPage = new ProjectPage();
    projectPage.rootName = CommonValues.PROJECT;
    projectPage._id = req.session.user._id;
    projectPage._role = role;

    const route = projectPage.createPageRoute();
    res.render(route,{
        role:role,
        activeLink: "project",
        pageType: "main"
    })
}

const createProject = async(req,res,next)=>{

    const responseObj = new ResponseObj();

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
        
        if(errorResult){
            throw new Error(JSON.stringify(errorResult));
        }else {
            await project.save();
        }
        

        responseObj._isSuccess = true;
        responseObj._message = Messages.PROJECT_CREATION_SUCCESS;

        return res.status(200).send(responseObj)
    }catch(e){
        
        responseObj._isSuccess = false;
        responseObj._message = Messages.PROJECT_CREATION_FAILED;
        responseObj._errorResult = JSON.parse(e.message);
        res.status(200).send(responseObj)
    }
}

const fetchProjectListFunctionHandler = async(req,res,next)=>{

    try{
        const creatorAuthorId = req.session.user?.id;
        
        const projectControls = new ProjectControls();
        projectControls._userId = creatorAuthorId;
        const leaderProjects = await projectControls.getLeaderProjects();
        
        return res.status(200).send(new ResponseObj(true,Messages.FETCH_LIST_SUCCESS + "projects",{},leaderProjects))
    }catch(e){
      
    }
}

const projectDetailsPageHandler = async(req,res,next)=>{
    const role = req.session.user?.role === 1  ?"leader": "member";
    
    try{
        const projectId = req.params["projectId"];
        
        const projectControls = new ProjectControls();
        projectControls._projectId = projectId;
        const projectInfo = await projectControls.getProjectDetails();
        
        const userControls = new UserControls(projectInfo.createAuthorId);
        
        const userInfo = await userControls.getUserInfoByUserId();
        
        const projectDto = new ProjectDto(projectInfo.name,projectId,projectInfo.regDate)
        projectDto._projectName = projectInfo["name"];
        projectDto._projectId = projectId;
        projectDto._projectCreator = userInfo.firstName+ " "+ userInfo.lastName;
        projectDto.createdDate = projectInfo.regDate;
        
        const projectPage = new ProjectPage();
        projectPage.rootName = CommonValues.PROJECT;
        const route = projectPage.createCustomizePage("project-details");

        res.render(route,{
            role:role,
            activeLink: "project",
            pageType: "page-details",
            projectDto: projectDto
        })
    }catch(e){
        next(e);
    }
}


const createProjectAfterInitialSetup = async(req,res,next)=>{
    try{
        const errorMessage = {};
        const creatorAuthorId = req.session.user?.id;
  
        const newProject = await new Project({
            name: req.body['project-name'],
            description: req.body["project-description"],
            deadline: req.body["project-deadline"],
            createAuthorId: creatorAuthorId
        })

    
        const err = await newProject.validateSync();

        const errors = !err? {}:err.errors;
        const errorSet = Object.entries(errors);

        if(req.body.skip) {
          
            req.session.isAuthenticated = true;
            return res.redirect("/dashboard");
        }else {

            const projectExisted = await Project.findOne({
                name: req.body["project-name"]
            })
            
            if(errorSet.length >0){
                for(const [key,value] of errorSet) {
                    errorMessage[key] = value.properties.message;
                }

                projectCreationErrorSessionPage(req,{
                    errorMessage:errorMessage,
                    name: req.body['project-name'],
                    description: req.body["project-description"],
                    deadline: req.body["project-deadline"]
                },()=>{
                    res.redirect("/signup/project-creation/complete-setup/leader")
                })
 
                return;
            }else if(projectExisted){
                projectCreationErrorSessionPage(req,{
                    message:CommonValues.PROJECT_FORMAL_NAME + Messages.DUPLICATE_ENTITY_ERROR,
                    name: req.body['project-name'],
                    description: req.body["project-description"],
                    deadline: req.body["project-deadline"]
                },()=>{
                    res.redirect("/signup/project-creation/complete-setup/leader")
                })

                return;
            }else {
             
                await newProject.save().catch(error => {
                    projectCreationErrorSessionPage(req,{
                            message:Messages.SERVER_ERROR,
                            name: req.body['project-name'],
                            description: req.body["project-description"],
                            deadline: req.body["project-deadline"]
                        },()=>{
                            res.redirect("/signup/project-creation/complete-setup")
                        })

                        return;
                }).finally((result)=>{
                    req.session.isAuthenticated = true;
                    return res.redirect("/signup/complete-setup/leader")
                });

            }

        }
 

    }catch(e){
        next(e);
    }
}



module.exports = {
    projectPage,
    createProject,
    fetchProjectListFunctionHandler,
    projectDetailsPageHandler,
    createProjectAfterInitialSetup
}