
const Org = require("../model/Org");
const url = require('url');

const orgDashboardOrgPage = async (req,res)=>{
    const queryData = url.parse(req.url, true).query;
   
    const role = queryData.role;
    // const pageVisit = queryData.visit;
    const creatorAuthorId = req.session.user?.id;
    const leaderOrgs = await Org.aggregate([
        {
            $match: {creatorAuthorId: creatorAuthorId}
        }
    ]);


    res.render("dashboard",{role:role, orgs:leaderOrgs, activeLink: 'org',pageLoc:'in'});
}

const orgCreationFunc = async (req,res,next) =>{
    const pageLoc = req.body.pageLoc;
    const creatorAuthorId = req.session.user.id;

    const newOrg = new Org({
        name: req.body['org-name'],
        description: req.body.description,
        population: req.body.population,
        creatorAuthorId: creatorAuthorId
    })

    const role = req.session.user.role === 1 ? 'leader' : 'member';

    if(req.body.skip) {
        return res.redirect(`/dashboard?role=${role}`)
    }else {
        await newOrg.save().then((err,result)=>{
            if(err) {
                return res.redirect(`/${pageLoc === 'out' ? 'dashboard' : 'org-page'}?role=${role}`)
            }
            return res.redirect(`/dashboard?role=${role}`)
        });
    }
}

const orgEditFunc = async(req,res)=>{

    
}

module.exports = {
    orgCreationFunc,
    orgDashboardOrgPage
}