
const UserGeneralInfo = require("../model/UserGeneralInfo");
const BaseModelControls = require("./BaseModelControls");
const { default: mongoose } = require("mongoose");

class UserControls extends BaseModelControls{
    constructor(userId){
        super(userId)
    }

    async getUserInfoByUserId(){
     
        const user = await UserGeneralInfo.findById(this.userId)
        return user;
    }

    generateContructedUserInfo(){
        
    }

    async getUsersInfosByUserIds(userIds){
        const objectIds = userIds.map(id => new mongoose.Types.ObjectId(id));
        const users = await UserGeneralInfo.find({ _id: { $in: userIds },deleteFlg:false });

        return users;
    }
}

module.exports = UserControls;