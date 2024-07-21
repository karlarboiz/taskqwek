const adminDashboardPage = async (req,res)=>{
    const role = "admin";
    res.render('dashboard',{role:role});
}


module.exports = {
    adminDashboardPage: adminDashboardPage
}