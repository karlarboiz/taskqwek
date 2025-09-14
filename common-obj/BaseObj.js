class BaseObj{
    constructor(isSuccess,errorResult){
        this._isSuccess = isSuccess;
        this._errorResult = errorResult || {};
    }

    // Getter and Setter for isSuccess
    get isSuccess() {
        return this._isSuccess;
    }

    set isSuccess(value) {
        this._isSuccess = value;
    }

    // Getter and Setter for errorResult
    get errorResult() {
        return this._errorResult;
    }

    set errorResult(value) {
        this._errorResult = value;
    }

}

module.exports = BaseObj;