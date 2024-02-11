

const adminSetupSession = (req)=>{
    let adminSetupInputs = req.session?.adminSetupInputs;
    
    if(!adminSetupInputs) {
        adminSetupInputs = {
            hasError: false,
            message:{},
            name: '',
            description: ''
        }
    }

    req.session.adminSetupInputs = null;
  
    return adminSetupInputs;
}

const adminSetupErrorSessionPage = (req,data,action) =>{
    req.session.adminSetupInputs = {
        hasError: true,
        ...data
    }

    req.session.cookie.originalMaxAge = 5000;

    req.session.save(action);
}

const adminSetupSuccessSessionPage = (req,data,action) =>{
    req.session.adminSetupInputs = {
        hasError: false,
        ...data
    }

    req.session.cookie.originalMaxAge = 360000;

    req.session.save(action);
}

module.exports = {
    adminSetupSession,
    adminSetupErrorSessionPage,
    adminSetupSuccessSessionPage
}