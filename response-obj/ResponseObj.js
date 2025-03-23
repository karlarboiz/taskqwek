class ResponseObj {
    constructor(isSuccess,message,errorResult){
        this.   isSuccess = isSuccess
        this.message = message
        this.errorResult = errorResult || {}
    }
}

module.exports = ResponseObj