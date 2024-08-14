
const Org = require("../model/Org");
const url = require('url');
const orgCreationFunc = async (req,res,next) =>{
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
                return res.redirect(`/dashboard?role=${role}`)
            }
            return res.redirect(`/dashboard?role=${role}`)
        });
    }
}

const orgDashboardOrgPage = async (req,res)=>{
    const queryData = url.parse(req.url, true).query;
   
    const role = queryData.role;
    // const pageVisit = queryData.visit;
    const creatorAuthorId = req.session.user.id;
    const leaderOrgs = await Org.aggregate([
        {
            $match: {creatorAuthorId: creatorAuthorId}
        }
    ]);

    res.render("dashboard",{role:role,orgs: leaderOrgs,activeLink: 'org'});
}

module.exports = {
    orgCreationFunc,
    orgDashboardOrgPage
}