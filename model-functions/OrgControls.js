const Org = require("../model/Org")


class OrgControls{
    constructor(leaderId,isOrgActive){
        this.leaderId = leaderId;
        this.isOrgActive = isOrgActive;
    }

    async getOrgListBasedOnLeaderId(){
     
        const leaderOrgs = await Org.aggregate([
            {
                $match: {
                    creatorAuthorId: this.leaderId,
                    deleteFlg: this.isOrgActive}
            }
        ]);

        return leaderOrgs
    }
}

module.exports = OrgControls;