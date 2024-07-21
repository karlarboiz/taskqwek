const userDashboardPage = (req,res)=>{
    const role = "user";
    res.render('dashboard',{role:role});
}

module.exports = {
    userDashboardPage: userDashboardPage
}