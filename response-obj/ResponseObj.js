class ResponseObj {
    constructor(isSuccess,message,errorResult,data){
        this.isSuccess = isSuccess
        this.message = message
        this.errorResult = errorResult || {}
        this.data = data || []
    }
}

module.exports = ResponseObj