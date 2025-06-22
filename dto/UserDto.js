
class UserDto {
    constructor(firstName, lastName, orgId, orgName) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._orgId = orgId;
        this._orgName = orgName;
    }

    // Getter and Setter for firstName
    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    // Getter and Setter for lastName
    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    // Getter and Setter for orgId
    get orgId() {
        return this._orgId;
    }

    set orgId(value) {
        this._orgId = value;
    }

    // Getter and Setter for orgName
    get orgName() {
        return this._orgName;
    }

    set orgName(value) {
        this._orgName = value;
    }
}

module.exports = UserDto;
