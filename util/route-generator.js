const RouteNames= require("../common/RouteNames");


const generalRouteGeneratorHandler =(roleValue)=>{

    
    const urlRoute= roleValue === 0 ? "/dashboard": (roleValue == 1 ? RouteNames.LEADER_INITIAL_SETUP_PROJECT_CREATION:
            `/signup/complete-setup/member`
    );

    return urlRoute;
}

module.exports = {
    generalRouteGeneratorHandler
}