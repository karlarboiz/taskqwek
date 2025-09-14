class BaseModelControls {
    constructor(userId, role) {
        this._userId = userId;
        this._role = role;
    }

    // Getter for userId
    get userId() {
        return this._userId;
    }

    // Setter for userId
    set userId(value) {
        this._userId = value;
    }

    // Getter for role
    get role() {
        return this._role;
    }

    // Setter for role
    set role(value) {
        this._role = value;
    }
}

module.exports = BaseModelControls;
