function signupSessionPage(req){
    
    let signupInputs = req.session?.signupInputs;
    
    if(!signupInputs){

        signupInputs = {
            hasError: false,
            errorMessage:{},
            firstName: '',
            lastName:'',
            username:'',
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

    req.session.cookie.originalMaxAge = 5000;

    req.session.save(action);
}

function signupSuccessSessionPage(req,data,action) {
    req.session.signupInputs = {
        hasError: false,
        ...data
    }

    req.session.cookie.originalMaxAge = 360000;

    req.session.save(action);
}

module.exports = {
    signupErrorSessionPage:signupErrorSessionPage,
    signupSessionPage:signupSessionPage
}