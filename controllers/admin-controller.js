const Org = require("../model/Org");

const orgCreationSession = require("../util/org-creation-session");

const adminDashboardPage = async (req,res)=>{
    const role = "admin";
    res.render('dashboard',{role:role});
}

const adminCreateOrganizationPage = (req,res)=>{
    res.render("org-creation");
}

const adminCreateOrganizationFunc = async(req,res)=>{


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



   
    const org = new Org({
        name: req.body.name,
        description: req.body.description
    })

    if(req.body['leaders-number']) {
        org.population.leaders = Number(req.body['leaders-number']);
    }

    if(req.body['members-size']) {
        org.population.members = Number(req.body['members-size']) 
    }


}




module.exports = {
    adminDashboardPage,
    adminCreateOrganizationPage,
    adminCreateOrganizationFunc
}