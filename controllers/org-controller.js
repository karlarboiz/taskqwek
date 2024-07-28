
const Org = require("../model/Org");
const orgCreationFunc = async (req,res,next) =>{
    const creatorAuthorId = req.session.user.id;
    const newOrg = new Org({
        name: req.body['org-name'],
        description: req.body.description,
        population: req.body.population,
        creatorAuthorId: creatorAuthorId
    })

    if(req.body.skip) {
        
    }else {
        try {
            await newOrg.save((err,result)=>{
                if(err) {
                    return res.redirect("/signup/")
                }
            });
    
        }catch(e) {
            throw new Error("Something went wrong");
        }   
    }

    
}

module.exports = {
    orgCreationFunc
}