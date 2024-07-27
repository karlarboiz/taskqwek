const url = require('url');

const userDashboardPage = (req,res)=>{
    const queryData = url.parse(req.url, true).query;
    console.log(queryData.karl);
    const role = "user";
    res.render('dashboard',{role:role});
}

module.exports = {
    userDashboardPage: userDashboardPage
}