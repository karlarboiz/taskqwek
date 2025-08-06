const QueryObj = require("../common-obj/QueryObj");
const Messages = require("../common/Messages");
const Org = require("../model/Org")


class OrgControls {
    constructor(leaderId, isOrgActive, orgId) {
        this._leaderId = leaderId;
        this._isOrgActive = isOrgActive;
        this._orgId = orgId;
    }

    // Getter and Setter for leaderId
    get leaderId() {
        return this._leaderId;
    }

    set leaderId(value) {
        this._leaderId = value;
    }

    // Getter and Setter for isOrgActive
    get isOrgActive() {
        return this._isOrgActive;
    }

    set isOrgActive(value) {
        this._isOrgActive = value;
    }

    // Getter and Setter for orgId
    get orgId() {
        return this._orgId;
    }

    set orgId(value) {
        this._orgId = value;
    }

    async getOrgListBasedOnLeaderId() {
        try {
            const leaderOrgs = await Org.aggregate([
                {
                    $match: {
                        creatorAuthorId: this.leaderId,
                        deleteFlg: this.isOrgActive
                    }
                }
            ]);
            return leaderOrgs;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async getOrgDetailsBasedOnOrgId() {
        try {
            const org = await Org.findOne({
                _id: this.orgId
            });
            return org;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async getOrgDetailsBasedOnMemberId() {
        try {
            const org = await Org.findOne({
                _id: this.orgId
            });
            return org;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async deleteOrgByLeader(dataUpdates,operation) {
        let errorMessage = {};
        const queryObj = new QueryObj();
        try{
            
            

            if(operation === "delete"){
                await Org.findByIdAndUpdate(this.orgId, {deleteFlg: true}).exec();
            }else {
                await Org.findByIdAndUpdate(this.orgId, dataUpdates).exec();
            }

            queryObj._isSuccess = true;
            queryObj._errorResult = null;
            return queryObj
        }catch(e){
             errorMessage["org"] = Messages.FAILED;

             queryObj._isSuccess = false;
            queryObj._errorResult = errorMessage;
            return queryObj;
        }  
    }
}


module.exports = OrgControls;