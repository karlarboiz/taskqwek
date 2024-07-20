
const homePage = async(req,res)=>{

    res.render('/');
}

const logoutFunc = async (req,res)=>{
    req.session.user = null;
    req.session.isAuthenticated = false;
    res.redirect('/login');
}

module.exports = {
    logoutFunc:logoutFunc,
    homePage: homePage,

}   