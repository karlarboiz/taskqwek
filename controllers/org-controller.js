
const Org = require("../model/Org");

// const url = require('url');
const { orgCreationErrorSessionPage} = require("../util/org-creation-session");
const MONTHS = require("../util/date-value");
const Messages = require("../common/Messages");
const OrgDto = require("../dto/OrgDto");
const OrganizationPage = require("../page-controller/organization/OrganizationPage");
const getOrgAssignedProject = require("../model-1/OrgAssignedProject");
const Project = require("../model/Project");
const CommonValues = require("../common/CommonValues");
const ResponseObj = require("../common-obj/ResponseObj");
const OrgControls = require("../model-functions/OrgControls");
const RouteNames = require("../common/RouteNames");


const orgDashboardOrgPage = async (req,res,next)=>{
    
    const role = req.session.user?.role === 1  ?"leader": "member";
    const id = req.session.user.id;


    try{

        const route = new OrganizationPage();
        route._role = role;
        route._id = id;

        const routeData = await route.getPageData();
        
        console.log(routeData);
        res.render(route.createPageRoute(),
            {role:role, 
            activeLink: 'org',
            ...routeData
        });
    }catch(e){
        next(e)
    }
}
 
const orgDashboardOrgDetails = async(req,res,next)=>{

    const role = req.session.user?.role === 1  ?"leader": "member";

    const orgId = req.params["orgId"];
    try{

        const orgDetails = await Org.findOne({
            _id: orgId
        })

        const parsedDate = new Date(orgDetails["regDate"]);
        const monthConverted = MONTHS[parsedDate.getUTCMonth()].full;
        const dateConverted = parsedDate.getDate();
        const fullDate = `${monthConverted} ${dateConverted}, ${parsedDate.getFullYear()}`;
        const orgDto = new OrgDto(orgDetails.name,orgDetails.description,fullDate,orgDetails.population);

        const orgPage = new OrganizationPage();

        const route = orgPage.createCustomizePage("organization-details");
        
        res.render(route,
            {role:role, 
            activeLink: 'org',
            orgPageType:"orgDetails",
            orgDto:orgDto});
    }catch(e){
        next(e)
    }

}

const orgCreationFunc = async (req,res,next) =>{
    try{
        const errorMessage = {};
        const pageLoc = req.body.pageLoc;
        const creatorAuthorId = req.session.user?.id;
        const projectOptionId = req.body["project-options"];
    
        const newOrg = await new Org({
            name: req.body['org-name'],
            description: req.body.description,
            population: req.body.population,
            creatorAuthorId: creatorAuthorId
        })


        const err = await newOrg.validateSync();

        const errors = !err? {}:err.errors;
        const errorSet = Object.entries(errors);

        if(req.body.skip) {
            req.session.isAuthenticated = true;
            return res.redirect(`/dashboard`)
        }else {
            const orgExisted = await Org.findOne({
                name: req.body["orgName"]
            })

            await Project.findById(projectOptionId).exec().then(result=> console.log(result)).catch(e=>{
                errorMessage["project"] = CommonValues.PROJECT_FORMAL_NAME +  Messages.ENTITY_NOT_FOUND;
            });


            const isLoggedIn = req.session?.isAuthenticated;
            const roleConversion = req.session?.user?.role === 1 ? "leader"
            : "member";
            
            const returnUrl = isLoggedIn ? "/org/org-page":`/signup/complete-setup/${roleConversion}`

            if(errorSet.length >0){
                for(const [key,value] of errorSet) {
                    errorMessage[key] = value.properties.message;
                }
                orgCreationErrorSessionPage(req,{
                    errorMessage:errorMessage,
                    orgName:req.body["org-name"],
                    description:req.body.description,
                    population:req.body.population
                },()=>{
                    res.redirect(returnUrl)
                })

                return;
            }else if(orgExisted){
                orgCreationErrorSessionPage(req,{
                    message:"Organization already existed!",
                    orgName:req.body["org-name"],
                    description:req.body.description,
                    population:req.body.population
                },()=>{
                    res.redirect(returnUrl)
                })

                return;
            }else {
                
                await newOrg.save().catch(e=>{
                   return res.redirect(RouteNames.DASHBOARD)
                }).finally(result=>{
                    return res.redirect(RouteNames.DASHBOARD)
                })

                const OrgAssignedProject = getOrgAssignedProject();

                const orgAssignedProject = await OrgAssignedProject.create({
                    assigned_org_mongodb_id: newOrg._id,
                    assigned_project_mongodb_id:projectOptionId
                })


                await orgAssignedProject.save();
            }
        }
    }catch(e){
        next(e);
    }
}

const orgCreationFuncJson =async (req,res,next)=>{

    const responseObj = new ResponseObj();
    const project = req.body.project
    try{
        let orgIdSaved = CommonValues.EMPTY_STRING;
        const creatorAuthorId = req.session.user?.id;

        const newOrg = await new Org({
            name: req.body['name'],
            description: req.body.description,
            creatorAuthorId: creatorAuthorId,
            population:req.body.population
        });

        const err = await newOrg.validateSync();
        
        const errors = !err? {}:err.errors;
        const errorSet = Object.entries(errors);
        let errorMessage = new Object();
        
        await Project.findById(project).exec()
        .then((result)=>console.log(result)).catch((err)=>errorMessage["project"] = "Project"+Messages.ID_INVALID);
       
        
        for(const [key,value] of errorSet) {
            errorMessage[key] = value.properties.message
        }

        if(Object.entries(errorMessage).length === 0) {
            await newOrg.save().then((result)=>{
               orgIdSaved = result._id.toString();
            }).catch(()=>{
                 errorMessage["message"] = Messages.FAILED;
                throw new Error(JSON.stringify(errorMessage))});
        }else {
            throw new Error(JSON.stringify(errorMessage))
        }

        const OrgAssignedProject = getOrgAssignedProject();

        const orgAssignedProject = await OrgAssignedProject.create({
            assigned_org_mongodb_id: orgIdSaved,
            assigned_project_mongodb_id:req.body.project
        })


        await orgAssignedProject.save();

        responseObj._isSuccess = true;
        responseObj._message = Messages.SUCCESS;
        res.status(200).send(responseObj)
        
    }catch(e){
        
        responseObj._isSuccess = false;
        responseObj._errorResult =JSON.parse(e.message);
        
        res.status(200).send(responseObj)
    }
}

const orgFetchFuncJson = async (req,res,next) =>{
    try{
        const creatorAuthorId = req.session.user?.id;
        
        const leaderOrgs = await Org.aggregate([
            {
                $match: {creatorAuthorId: creatorAuthorId,
                    deleteFlg: false
                }
            }
        ]);

        return res.status(200).send({
            leaderOrgs
        })
    }catch(e){
        res.status(500).send({
            isSuccess: false,
            message:"Something went wrong. Try again!"
        })
    }
}


const orgOperationHandlerJson = async(req,res,next)=>{

    const responseObj = new ResponseObj();
        
    try{
        const operation = req.params.orgOperation;
        const orgId = req.params.orgId;
        
         const orgControls = new OrgControls();

        orgControls._orgId = orgId;
        let result;
        if(operation === "delete"){
            result =await orgControls.deleteOrgByLeader();
        }else if(operation === "update"){
            result = await orgControls.updateOrgByLeader(null,null)
        }
        
        if(!result.isSuccess){
            throw new Error(JSON.stringify(result._errorResult));
        }
        
        responseObj._isSuccess = true;

        return res.status(200).send(responseObj);
    }catch(e){
        responseObj._isSuccess = false;
        responseObj._errorResult = JSON.parse(e.message);
        return res.status(200).send(responseObj);
    }    
}

module.exports = {
    orgCreationFunc,
    orgDashboardOrgPage,
    orgCreationFuncJson,
    orgFetchFuncJson,
    orgDashboardOrgDetails,
    orgOperationHandlerJson
}