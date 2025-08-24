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
        const pageLoc = req.body.pageLoc;
        const creatorAuthorId = req.session.user?.id;
    
        const newOrg = await new Project({
            name: req.body['project-name'],
            description: req.body["project-description"],
            deadline: req.body["project-deadline"],
            creatorAuthorId: creatorAuthorId
        })

        const role = req.session?.user?.role === 1 ? 'leader' : 'member';

        const err = await newOrg.validateSync();

        const errors = !err? {}:err.errors;
        const errorSet = Object.entries(errors);

        if(req.body.skip) {
            console.log(errorSet);
            req.session.isAuthenticated = true;
            return res.redirect("/signup/project-creation/complete-setup");
        }else {
            console.log({
                name: req.body['project-name'],
                description: req.body["project-description"],
                deadline: req.body["project-deadline"],
                creatorAuthorId: creatorAuthorId
            })
            return res.redirect("/signup/project-creation/complete-setup");
            // const orgExisted = await Org.findOne({
            //     name: req.body["orgName"]
            // })

            // const isLoggedIn = req.session?.isAuthenticated;
            // const roleConversion = req.session?.user?.role === 1 ? "leader"
            // : "member";
            
            // const returnUrl = isLoggedIn ? "/org/org-page":`/signup/complete-setup/${roleConversion}`

            // if(errorSet.length >0){
            //     for(const [key,value] of errorSet) {
            //         errorMessage[key] = value.properties.message;
            //     }
            //     orgCreationErrorSessionPage(req,{
            //         errorMessage:errorMessage,
            //         orgName:req.body["org-name"],
            //         description:req.body.description,
            //         population:req.body.population
            //     },()=>{
            //         res.redirect(returnUrl)
            //     })
            // }else if(orgExisted){
            //     orgCreationErrorSessionPage(req,{
            //         message:"Organization already existed!",
            //         orgName:req.body["org-name"],
            //         description:req.body.description,
            //         population:req.body.population
            //     },()=>{
            //         res.redirect(returnUrl)
            //     })
            // }else {
                
            //     await newOrg.save().then(async (err,result)=>{
            //         if(err) {
            //             return res.redirect(`/${pageLoc === 'out' ? 'dashboard' : 'org/org-page'}`)
            //         }

            //         req.session.isAuthenticated = true;
            //         return res.redirect(`/dashboard?role=${role}`)
            //     });
            // }
        }

        // if(req.body.skip) {
        //      req.session.isAuthenticated = true;
        //     return res.redirect(`/dashboard`)
        // }else {

        // }

        // return res.redirect("/project/project-creation");

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