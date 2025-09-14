
const UserGeneralInfo = require("../model/UserGeneralInfo");
const BaseModelControls = require("./BaseModelControls");

class UserControls extends BaseModelControls{
    constructor(userId){
        super(userId)
    }

    async getUserInfoByUserId(){
        // console.log(this.userId);
        // console.log(await UserGeneralInfo.findOne({
        //     username: "usertesting2"
        // }))
        const user = await UserGeneralInfo.findById(this.userId)
        return user;
    }

    generateContructedUserInfo(){
        
    }
}

module.exports = UserControls;