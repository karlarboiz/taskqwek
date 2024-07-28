
const Org = require("../model/Org");
const orgCreationFunc = (req,res,next) =>{
    const creatorAuthorId = req.session.user.id;
    const newOrg = new Org({
        name: req.body['org-name'],
        description: req.body.description,
        population: req.body.population,
        creatorAuthorId: creatorAuthorId
    })
}

module.exports = {
    orgCreationFunc
}