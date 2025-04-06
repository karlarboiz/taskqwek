const errorParsingFromValidations = (errorObj)=>{
    const parsedErrors = {};
    if(!errorObj) {
        return null;
    }


    for(const [key,value] of Object.entries(errorObj)) {
        
    
        parsedErrors[key] = value.properties?.message;
    }



    return parsedErrors;

}

module.exports = {
    errorParsingFromValidations
}