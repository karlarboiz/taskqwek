function projectCreationSessionPage(req){
    
    let projectCreationInputs = req.session?.projectCreationInputs;
    
    if(!projectCreationInputs){

        projectCreationInputs = {
            hasError: false,
            errorMessage:{},
            projectName: '',
            description: '',
            population: ''
        }
    } 
    
    req.session.projectCreationInputs = null;
  
    return projectCreationInputs;
}

function projectCreationErrorSessionPage(req,data,action){
    req.session.projectCreationInputs = {
        hasError: true,
        ...data
    }
    req.session.save(action);
}

module.exports = {
    projectCreationSessionPage,
    projectCreationErrorSessionPage
}