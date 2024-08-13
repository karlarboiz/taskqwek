
const Org = require("../model/Org");
const url = require('url');
const orgCreationFunc = async (req,res,next) =>{
    const creatorAuthorId = req.session.user.id;

     const role = 'member';

     console.log(req.body)

    return res.redirect(`/dashboard/member`);
    // const newOrg = new Org({
    //     name: req.body['org-name'],
    //     description: req.body.description,
    //     population: req.body.population,
    //     creatorAuthorId: creatorAuthorId
    // })

    // const role = req.session.user.role === 1 ? 'leader' : 'member';

    // if(req.body.skip) {
    //     return res.redirect(`/dashboard/${role}`)
    // }else {
    //     try {
    //         await newOrg.save((err,result)=>{
    //             if(err) {
    //                 return res.redirect("/signup/")
    //             }
    //         });
    
    //     }catch(e) {
    //         throw new Error("Something went wrong");
    //     }   
    // }
}

const orgDashboardOrgPage = (req,res)=>{
    const queryData = url.parse(req.url, true).query;
    const role = queryData.role;
    const pageVisit = queryData.visit;

    res.render("dashboard",)
}

module.exports = {
    orgCreationFunc,
    orgDashboardOrgPage
}