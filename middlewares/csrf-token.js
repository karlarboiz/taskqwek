function addCsrfToken(req,res,next){
    res.locals.csrf = req.csrfToken();
    next();
}
 
module.exports = addCsrfToken;