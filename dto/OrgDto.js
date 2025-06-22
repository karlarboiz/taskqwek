class OrgDto {
    constructor(orgName, orgDescription, orgCreatedDate, population) {
        this._orgName = orgName;
        this._orgDescription = orgDescription;
        this._orgCreatedDate = orgCreatedDate;
        this._population = population || 0;
    }

    // Getter and Setter for orgName
    get orgName() {
        return this._orgName;
    }

    set orgName(value) {
        this._orgName = value;
    }

    // Getter and Setter for orgDescription
    get orgDescription() {
        return this._orgDescription;
    }

    set orgDescription(value) {
        this._orgDescription = value;
    }

    // Getter and Setter for orgCreatedDate
    get orgCreatedDate() {
        return this._orgCreatedDate;
    }

    set orgCreatedDate(value) {
        this._orgCreatedDate = value;
    }

    // Getter and Setter for population
    get population() {
        return this._population;
    }

    set population(value) {
        this._population = value;
    }
}

module.exports = OrgDto;
