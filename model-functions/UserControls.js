
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

        const users = await UserGeneralInfo.find({ _id: { $in: userIds },deleteFlg:false });

        return users;
    }

    async getUsersInfoByUserId(){
        const userInfo = await UserGeneralInfo.findById(userId);

        return userInfo;
    }
}

module.exports = UserControls;