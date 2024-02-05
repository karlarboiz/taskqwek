function signupSessionPage(req){
    
    let uploadFormSession = req.session?.uploadFormSession;
    
    if(!uploadFormSession){

        uploadFormSession = {
            hasError: false,
            formName: '',
            description: ''
        }
    }
    
    req.session.uploadFormSession = null;
  
    return uploadFormSession;
}

function signupErrorSessionPage(req,data,action){
    req.session.uploadFormSession= {
        hasError: true,
        ...data
    }
    req.session.save(action);
}

module.exports = {
    signupSessionPage:signupSessionPage,
    signupErrorSessionPage: signupErrorSessionPage
}