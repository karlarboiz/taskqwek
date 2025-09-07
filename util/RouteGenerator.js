const RouteNames = require("../common/RouteNames");

class RouteGenerator{

    static generalRouteGeneratorHandler(roleValue){    
        const urlRoute= roleValue === 0 ? "/dashboard": (roleValue == 1 ? RouteNames.LEADER_INITIAL_SETUP_PROJECT_CREATION:
                RouteNames.SIGN_UP_COMPLETE_SETUP_MEMBER
        );

        return urlRoute;
    }
}

module.exports = RouteGenerator

