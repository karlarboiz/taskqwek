function orgCreationSessionPage(req){
    
    let orgCreationInputs = req.session?.orgCreationInputs;
    
    if(!orgCreationInputs){

        orgCreationInputs = {
            hasError: false,
            errorMessage:{},
            orgName: '',
            description: '',
            population: ''
        }
    }
    
    req.session.orgCreationInputs = null;
  
    return orgCreationInputs;
}

function orgCreationErrorSessionPage(req,data,action){
    req.session.orgCreationInputs = {
        hasError: true,
        ...data
    }
    req.session.save(action);
}

module.exports = {
    orgCreationSessionPage,
    orgCreationErrorSessionPage
}