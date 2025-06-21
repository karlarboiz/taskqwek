const Org = require("../model/Org")


class OrgControls{
    constructor(leaderId,isOrgActive,orgId){
        this.leaderId = leaderId;
        this.isOrgActive = isOrgActive;
        this.orgId = orgId;
    }

    async getOrgListBasedOnLeaderId(){
        
        try{
                
            const leaderOrgs = await Org.aggregate([
                {
                    $match: {
                        creatorAuthorId: this.leaderId,
                        deleteFlg: this.isOrgActive}
                }
            ]);

            return leaderOrgs
        }catch(e){
            throw new Error(e.message);
        }
    }

    async getOrgDetailsBasedOnOrgId(){
        try{
                
            const org = await Org.findOne({
                _id:this.orgId
            })

            return org
        }catch(e){
            throw new Error(e.message);
        }
    }

    async getOrgDetailsBasedOnMemberId(){
        try {

            const org = await Org.findOne({
                _id:this.orgId
            })
        }catch(e){

        }
    }
}

module.exports = OrgControls;