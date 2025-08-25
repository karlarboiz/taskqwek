

const generalRouteGeneratorHandler =(roleValue)=>{

    
    const urlRoute= roleValue === 0 ? "/dashboard": (roleValue == 1 ? `/signup/project-creation/complete-setup/leader`:
            `/signup/complete-setup/member`
    );

    return urlRoute;
}

module.exports = {
    generalRouteGeneratorHandler
}