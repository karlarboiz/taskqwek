const url = require('url');

const dashboardPage = (req,res)=>{
    const role = req.session.user?.role === 1  ?"leader": "member";

    res.render('dashboard',
        {role:role,
        activeLink: 'dashboard'
        });

    
}

module.exports = {
    dashboardPage
}