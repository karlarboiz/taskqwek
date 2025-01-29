const profilePage = (req,res,next)=>{
    const role = req.session.user?.role === 1  ?"leader": "member";
    res.render("profile",
        {
            role:role,
        activeLink: "profile"
        }
    )
}

module.exports = {
    profilePage
}