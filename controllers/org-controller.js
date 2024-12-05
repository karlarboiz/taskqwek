
const Org = require("../model/Org");
const url = require('url');
const { orgCreationErrorSessionPage, orgCreationSessionPage } = require("../util/org-creation-session");

const orgDashboardOrgPage = async (req,res)=>{
    const orgCreationInputs = orgCreationSessionPage(req);
    
    const role = req.session.user.role === 1  ?"leader": "member";
    
    // const pageVisit = queryData.visit;
    const creatorAuthorId = req.session.user?.id;
    const leaderOrgs = await Org.aggregate([
        {
            $match: {creatorAuthorId: creatorAuthorId}
        }
    ]);
    res.render("dashboard",{role:role, 
        orgs:leaderOrgs, 
        activeLink: 'org',
        pageLoc:'in',
        orgCreationInputs:orgCreationInputs});
}

const orgCreationFunc = async (req,res,next) =>{
    try{
        const errorMessage = {};
        const pageLoc = req.body.pageLoc;
    const creatorAuthorId = req.session.user?.id;
        console.log(req.session.user)
    const newOrg = await new Org({
        name: req.body['org-name'],
        description: req.body.description,
        population: req.body.population,
        creatorAuthorId: creatorAuthorId
    })

    const role = req.session?.user?.role === 1 ? 'leader' : 'member';

    const err = await newOrg.validateSync();

    const errors = err?.errors;

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

            console.log(errorMessage)
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
                    return res.redirect(`/${pageLoc === 'out' ? 'dashboard' : 'org-page'}?role=${role}`)
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

const orgEditFunc = async(req,res)=>{

    
}

module.exports = {
    orgCreationFunc,
    orgDashboardOrgPage
}