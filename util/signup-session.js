function signupSessionPage(req){
    
    let signupInputs = req.session?.signupInputs;
    
    if(!signupInputs){

        signupInputs = {

            errorMessage:{},
            firstName: '',
            lastName:'',
            username:'',
            email: '',
            password: '',
            role: 1
        }
    }
    
    req.session.signupInputs = null;
  
    return signupInputs;
}

function signupErrorSessionPage(req,data,action){
    req.session.signupInputs = {
     
        ...data
    }

    req.session.cookie.originalMaxAge = 5000;

    req.session.save(action);
}

function signupSuccessSessionPage(req,data,action) {
    req.session.signupInputs = {
        ...data
    }

    req.session.cookie.originalMaxAge = 720000;

    req.session.save(action);
}

module.exports = {
    signupErrorSessionPage:signupErrorSessionPage,
    signupSessionPage:signupSessionPage,
    signupSuccessSessionPage:signupSuccessSessionPage
}