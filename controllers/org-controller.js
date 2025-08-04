
const Org = require("../model/Org");

// const url = require('url');
const { orgCreationErrorSessionPage} = require("../util/org-creation-session");
const MONTHS = require("../util/date-value");
const Messages = require("../common/Messages");
const OrgDto = require("../dto/OrgDto");
const OrganizationPage = require("../page-controller/organization/OrganizationPage");
const OrgAssignedProject = require("../model-1/OrgAssignedProject");
const Project = require("../model/Project");
const CommonValues = require("../common/CommonValues");
const ResponseObj = require("../response-obj/ResponseObj");


const orgDashboardOrgPage = async (req,res,next)=>{
    
    const role = req.session.user?.role === 1  ?"leader": "member";
    const id = req.session.user.id;

    try{

        const route = new OrganizationPage();
        route._role = role;
        route._id = id;

        const routeData = await route.getPageData();

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
    

        const newOrg = await new Org({
            name: req.body['org-name'],
            description: req.body.description,
            population: req.body.population,
            creatorAuthorId: creatorAuthorId
        })

        const role = req.session?.user?.role === 1 ? 'leader' : 'member';

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
            }else if(orgExisted){
                orgCreationErrorSessionPage(req,{
                    message:"Organization already existed!",
                    orgName:req.body["org-name"],
                    description:req.body.description,
                    population:req.body.population
                },()=>{
                    res.redirect(returnUrl)
                })
            }else {
                
                await newOrg.save().then((err,result)=>{
                    if(err) {
                        return res.redirect(`/${pageLoc === 'out' ? 'dashboard' : 'org/org-page'}`)
                    }
                    req.session.isAuthenticated = true;
                    return res.redirect(`/dashboard?role=${role}`)
                });
            }
        }
    }catch(e){
        next(e);
    }
}

const orgCreationFuncJson =async (req,res,next)=>{
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
        
        await Project.findById(req.body.project).exec()
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

         const orgAssignedProject = await OrgAssignedProject.create({
            assigned_org_mongodb_id: orgIdSaved,
            assigned_project_mongodb_id:req.body.project
        })

        await orgAssignedProject.save();

        res.status(200).send({
            isSuccess: true,
            message: errorMessage
        })
        
    }catch(e){
        const responseObj = new ResponseObj();
        
        const errorMessage = JSON.parse(e.message);
        res.status(200).send({
            isSuccess: false,
            errorMessage:errorMessage
        })
    }
}

const orgFetchFuncJson = async (req,res,next) =>{
    try{
        const creatorAuthorId = req.session.user?.id;
        
        const leaderOrgs = await Org.aggregate([
            {
                $match: {creatorAuthorId: creatorAuthorId}
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

const deleteOrgHandler=async(req,res,next)=>{
    try{

        const orgId = req.params.orgId;

        await Org.findById(orgId).exec()
        .then((result)=>console.log(result)).catch((err)=>next(e));
        
        await Org.findByIdAndUpdate(orgId,{deleteFlg: true}).exec()
        .then((result)=>console.log(result)).catch((err)=>next(e));
        
    }catch(e){
        next(e);
    }
}

const deleteOrgJson = async(req,res,next)=>{
    
}

module.exports = {
    orgCreationFunc,
    orgDashboardOrgPage,
    orgCreationFuncJson,
    orgFetchFuncJson,
    orgDashboardOrgDetails,
    deleteOrgHandler
}