function signupSessionPage(req){
    
    let signupInputs = req.session?.signupInputs;
    
    if(!signupInputs){

        signupInputs = {
            hasError: false,
            errorMessage:{},
            completeName: '',
            email: '',
            password: ''
        }
    }
    
    req.session.signupInputs = null;
  
    return signupInputs;
}

function signupErrorSessionPage(req,data,action){
    req.session.signupInputs = {
        hasError: true,
        ...data
    }

    
    req.session.save(action);
}

module.exports = {
    signupErrorSessionPage:signupErrorSessionPage,
    signupSessionPage:signupSessionPage
}