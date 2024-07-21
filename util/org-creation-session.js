function orgCreationSessionPage(req){
    
    let orgCreationInputs = req.session?.orgCreationInputs;
    
    if(!orgCreationInputs){

        orgCreationInputs = {
            hasError: false,
            errorMessage:{},
            name: '',
            description: '',
            leaders: '',
            members: ''
        }
    }
    
    req.session.signupInputs = null;
  
    return signupInputs;
}

function orgErrorSessionPage(req,data,action){
    req.session.orgcreationInputs = {
        hasError: true,
        ...data
    }

    req.session.cookie.originalMaxAge = 5000;

    req.session.save(action);
}

module.exports = {
  orgCreationSessionPage,
  orgErrorSessionPage
}