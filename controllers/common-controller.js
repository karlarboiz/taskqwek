
const homePage = async(req,res,next)=>{
    const isAuthenticated = req.session.isAuthenticated;
    res.render('home',{messages: req.flash("info"),
        isAuthenticated
    });
}

const logoutFunc = async (req,res)=>{
    req.session.user = null;
    req.session.isAuthenticated = false;
    res.redirect('/login');
}

module.exports = {
    logoutFunc,
    homePage
}   