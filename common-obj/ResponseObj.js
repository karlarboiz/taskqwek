const BaseObj = require("./BaseObj");

class ResponseObj extends BaseObj{
    constructor(isSuccess,errorResult,message,data = []) {
        super(isSuccess,errorResult);
        this._message = message;
        this._data = data;
    }

    // Getter and Setter for message
    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
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
