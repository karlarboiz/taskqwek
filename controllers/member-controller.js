const url = require('url');

const memberDashboardPage = (req,res)=>{
    const queryData = url.parse(req.url, true).query;

    const role = "role";

    if(req.user.role !== 2) {
        let realRole = req.user.role === 1 ? 'leader': 'member';

        return res.redirect(`/dashboard/${realRole}`)
    }else {
        res.render('dashboard',{role:role});
    }
}

module.exports = {
    memberDashboardPage
}