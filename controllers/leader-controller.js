const Org = require("../model/Org");
const url = require('url');
const orgCreationSession = require("../util/org-creation-session");
const { encryptValue,decryptValue } = require("../util/encrypt-code");

const leaderCreateOrganizationFunc = async(req,res)=>{
    let errorMessage = {};

    let nameValid =  req.body.name.trim().length < 5 ||  req.body.name.trim().length > 15;
    let descriptionValid = req.body.description.trim().length < 40 || req.body.name.trim().length > 255;
    let existedOrg = await Org.findOne({name: req.body.name}).then(result => result);

    if(!req.body.name || !nameValid) {
        errorMessage.name = "Organization name length invalid (minimum 5 and maximum 15)";
    }

    if(!req.body.description || !descriptionValid) {
        errorMessage.description = "Organization description length invalid (minimum 40 and maximum 255)";
    }

    if(existedOrg) {
        errorMessage.name = "Organization has already existed";
    }

    if(Object.entries(errorMessage).length > 0) {
        
    }

    const org = new Org({
        name: req.body.name,
        description: req.body.description
    })

}

// const leaderDashboardPage = (req,res)=>{
//     const queryData = url.parse(req.url, true).query;

//  const role = "leader";

//     // if(req.user.role !== 1) {
//     //     let realRole = req.user.role === 1 ? 'leader': 'user';

//     //     return res.redirect(`/dashboard/${realRole}`)
//     // }else {
        
//     // }

//     res.render('dashboard',{role:role});
   
// }

const createLinkToJoin = (req,res,next)=>{

    const {emailAdress}=req.body
    try{

    }catch(e){
        next(e);
    }
}

const leaderDashboardOrganizationPage = (req,res)=>{
    const role = "leader";
    res.render('dashboard',{role:role});
}

module.exports = {
    leaderCreateOrganizationFunc,
    leaderDashboardOrganizationPage
}