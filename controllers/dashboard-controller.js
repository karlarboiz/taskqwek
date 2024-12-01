const url = require('url');

const dashboardPage = (req,res)=>{
    const user = req.session?.user; 
    res.render('dashboard',
        {role:"kwan",
        activeLink: 'dashboard',
        orgs:[]
        });

    
}

module.exports = {
    dashboardPage
}