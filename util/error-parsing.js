const errorParsingFromValidations = (errorObj)=>{
    const parsedErrors = {};
    if(!errorObj) {
        return parsedErrors;
    }


    for(const [key,value] of Object.entries(errorObj)) {
        parsedErrors[key] = value.properties.message;
    }

    return parsedErrors;

}

module.exports = {
    errorParsingFromValidations
}