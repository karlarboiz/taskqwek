const url = require('url');

const dashboardPage = (req,res)=>{
    const queryData = url.parse(req.url, true).query;
    
    let role= req.session.user.role === 1 ? 'leader' : 'member';
    
    if(role !== queryData.role) {
        return res.redirect(`/dashboard?role=${role}`)
    }else {
        res.render('dashboard',
            {role:role,
            activeLink: 'dashboard',
            orgs:[]
            });
    }

    
}

module.exports = {
    dashboardPage
}