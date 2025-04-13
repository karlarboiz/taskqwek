class OrgDto {
    constructor(orgName,orgDescription,orgCreatedDate,population) {
        this.orgName = orgName;
        this.orgDescription = orgDescription;
        this.orgCreatedDate = orgCreatedDate;
        this.population = population || 0;
    }
}

module.exports = OrgDto