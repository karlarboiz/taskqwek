
const UserGeneralInfo = require("../model/UserGeneralInfo");

class UserControls{
    constructor(userId){
        this.userId = userId
    }

    async getUserInfoByUserId(){
        const user = await UserGeneralInfo.findOne({
            _id: this.userId
        })

        return user;
    }

    generateContructedUserInfo(){
        
    }
}

module.exports = UserControls;