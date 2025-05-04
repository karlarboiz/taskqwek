
const User = require("../model/User");


class UserControls{
    constructor(userId){
        this.userId = userId
    }


    async getUserInfoByUserId(){
        const user = await User.findOne({
            _id: this.userId
        })

        return user;
    }

    generateContructedUserInfo(){
        
    }
}

module.exports = UserControls;