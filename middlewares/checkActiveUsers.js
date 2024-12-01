const checkActiveUser = (req,res,next)=>{
    if(req.session?.user){
        return res.redirect("/dashboard");
    }

    next();
}

const checkSessionRole = (req,res,next)=>{
    const role = req.params["role"];
    try{
        if(req.session.user === undefined || !role){
            res.status(404).render('404');
        }
    }catch(e){
        next(e)
    }
}

const checkSessionRoleMatchesQuery = (req,res,next)=>{
    const role = req.params["role"];
    const session = req.session;

    const roleSession = session.role === 1 ? "leader":"member";
    try{
        if(role !== roleSession){
            res.redirect(`/signup/complete-setup/${roleSession}`);
        }
    }catch(e){
        next(e)
    }
}

module.exports ={
    checkActiveUser,
    checkSessionRole,
    checkSessionRoleMatchesQuery

}