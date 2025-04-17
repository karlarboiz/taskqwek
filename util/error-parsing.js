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

const errorParsingFromValidationsSequelize = (arr)=>{

    const parsedErrors = {};


    if(arr?.length === 0){
        return null;
    }

    arr?.forEach((value)=>{
        parsedErrors[value.path] = value.message
    })

    return parsedErrors;
}

module.exports = {
    errorParsingFromValidations,
    errorParsingFromValidationsSequelize
}