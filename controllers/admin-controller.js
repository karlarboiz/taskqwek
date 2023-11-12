const uploadformPage = async(req,res,next)=>{
    const csrf = req.csrfToken(); 
    
    if(req.session?.user !== null &&
        req.session?.user !== undefined &&
        req.session?.user?.isAdmin) {
            res.render('uploadform',{
        csrf: csrf});
        }
    else {
        res.redirect('/');
    }
} 


const uploadformFunc = async(req,res,next)=>{
    const data = req.body;
    console.log(data);
    res.redirect('/uploadform');
}

module.exports = {
    uploadformPage:uploadformPage,
    uploadformFunc:uploadformFunc
}