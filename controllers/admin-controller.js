const adminDashboardPage = async (req,res)=>{

    res.render('dashboard');
}


module.exports = {
    adminDashboardPage: adminDashboardPage
}