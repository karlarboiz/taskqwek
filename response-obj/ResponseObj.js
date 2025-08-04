class ResponseObj {
    constructor(isSuccess, message, errorResult = {}, data = []) {
        this._isSuccess = isSuccess;
        this._message = message;
        this._errorResult = errorResult;
        this._data = data;
    }

    // Getter and Setter for isSuccess
    get isSuccess() {
        return this._isSuccess;
    }

    set isSuccess(value) {
        this._isSuccess = value;
    }

    // Getter and Setter for message
    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
    }

    // Getter and Setter for errorResult
    get errorResult() {
        return this._errorResult;
    }

    set errorResult(value) {
        this._errorResult = value;
    }

    // Getter and Setter for data
    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }
}

module.exports = ResponseObj;
