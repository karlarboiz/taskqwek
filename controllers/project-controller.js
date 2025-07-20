const Messages = require("../common/Messages");
const ProjectDto = require("../dto/ProjectDto");
const ProjectControls = require("../model-functions/ProjectControls");
const UserControls = require("../model-functions/UserControls");
const Project = require("../model/Project");
const ProjectPage = require("../page-controller/project/ProjectPage");


const ResponseObj = require("../response-obj/ResponseObj");
// const { encryptValue } = require("../util/encrypt-code");
const { errorParsingFromValidations } = require("../util/error-parsing");
const projectPage = async(req,res,next)=>{
 
    const role = req.session.user?.role === 1  ?"leader": "member";
    const projectPage = new ProjectPage();
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
        const responseObj = new ResponseObj( success,
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
        
        const projectControls = new ProjectControls(null,creatorAuthorId);
        
        const leaderProjects = await projectControls.getLeaderProjects();
        
        return res.status(200).send(new ResponseObj(true,Messages.FETCH_LIST_SUCCESS + "projects",{},leaderProjects))
    }catch(e){
      
    }
}

const projectDetailsPageHandler = async(req,res,next)=>{
    const role = req.session.user?.role === 1  ?"leader": "member";
    
    try{
        const projectId = req.params["projectId"];
        
        const projectControls = new ProjectControls(projectId);

        const projectInfo = await projectControls.getProjectDetails();
        
        const userControls = new UserControls(projectInfo.createAuthorId);
        
        const userInfo = await userControls.getUserInfoByUserId();
        
        const projectDto = new ProjectDto(projectInfo.name,projectId,projectInfo.regDate)
        projectDto._projectName = projectInfo["name"];
        projectDto._projectId = projectId;
        projectDto._projectCreator = userInfo.firstName+ " "+ userInfo.lastName;
        projectDto.createdDate = projectInfo.regDate;
        
        const projectPage = new ProjectPage();

        const route = projectPage.createCustomizePage("project-details");

        console.log(projectDto)
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

module.exports = {
    projectPage,
    createProject,
    fetchProjectListFunctionHandler,
    projectDetailsPageHandler
}