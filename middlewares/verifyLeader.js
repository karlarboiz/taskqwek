function verifyLeaderHandler(req,res,next){
   const user= req.session.user.role;

   if(user === 'leader'){
    return res.render("dashboard");
   }

   next();
}

module.exports = verifyLeaderHandler