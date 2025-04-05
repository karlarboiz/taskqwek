const checkActiveUser = (req,res,next)=>{
    if(req.session?.user){
        next();
    }else {
        return res.redirect("/");
    }

    
}

const loginPageCheckForActiveUser = (req,res,next)=>{

    if(req.session?.user){
        return res.redirect("/dashboard")
    }


    next();
}

const checkSessionRole = (req,res,next)=>{
    const role = req.params["role"];
    try{
      
        if(!role){
           return res.status(404).render('404');
        }
        next();
    }catch(e){
        next(e)
    }
}

const checkSessionRoleMatchesQuery = (req,res,next)=>{
    const role = req.params["role"];
    const session = req.session.user;

    const roleSession = session.role === 1 ? "leader":"member";
    try{
        if(role !== roleSession){
          return  res.redirect(`/signup/complete-setup/${roleSession}`);
        }
        next()
    }catch(e){
        next(e)
    }
}

const checkIfUserJustGotNewlyRegistered = (req,res,next)=>{
    
    const newSignup = req.session?.newSignup;

    try{
        if(!newSignup) {
            return  res.redirect(`/dashboard}`);
        }
    }catch(e){
        next(e);
    }
}

module.exports ={
    checkActiveUser,
    checkSessionRole,
    checkSessionRoleMatchesQuery,
    checkIfUserJustGotNewlyRegistered,
    loginPageCheckForActiveUser

}