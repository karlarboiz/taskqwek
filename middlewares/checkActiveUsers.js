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
            next();
        }
    }catch(e){
        next(e)
    }
}

module.exports ={
    checkActiveUser,
    checkSessionRole

}