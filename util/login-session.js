function loginSessionPage(req){
    let loginInputs = req.session.loginInputs;
 
    if(!loginInputs){
        loginInputs = {
            hasError: false,
            message: '',
            email: '',
            password: '' 
        }
    }

    req.session.loginInputs = null;

    return loginInputs;
}

function loginErrorSessionPage(req,data,action){
    req.session.loginInputs = {
        hasError: true,
        ...data
    }
    req.session.cookie.originalMaxAge = 5000;

    req.session.save(action);
}


module.exports = {
    loginSessionPage:loginSessionPage,
    loginErrorSessionPage: loginErrorSessionPage
}