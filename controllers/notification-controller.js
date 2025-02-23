
const notificationPage = async(req,res)=>{

    const role = req.session.user?.role === 1  ?"leader": "member";

    res.render('notifications',
        {role:role,
        activeLink: 'notifications'
        });

}

module.exports = {
    notificationPage
}