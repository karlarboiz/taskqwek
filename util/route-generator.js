

const generalRouteGeneratorHandler =(roleValue, urlPart,isSignup)=>{
    let urlRoute;
    
    if(isSignup){
        urlRoute= roleValue === 0 ? "/dashboard": (roleValue == 1 ? `${urlPart}/leader`:
            `${urlPart}/member`
        );

    }else {
        urlRoute= roleValue === 0 ? "/dashboard": (roleValue ==1 ? `/leader/${urlPart}`:
            `/member/${urlPart}`
        );

    }

    return urlRoute;
}

module.exports = {
    generalRouteGeneratorHandler
}