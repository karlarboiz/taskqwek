
const leaderDashboardPage = (req,res)=>{
    const role = "leader";
    res.render('dashboard',{role:role});
}

module.exports = {
    leaderDashboardPage: leaderDashboardPage
}