const Organization = require("../model/Organization");

const orgList = async (userId) => {
    return await Organization.aggregate([
        { $match: { adminId: userId, deleteFlg: false } },
        { $project: { _id: 1, name: 1, description: 1 } }
    ]);

}

module.exports = {
    orgList: orgList
}