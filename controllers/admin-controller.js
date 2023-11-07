const uploadformPage = async(req,res,next)=>{

    if(req.session.user?.isAdmin === null 
        || !req.session.user?.isAdmin) {
            res.redirect('/');
        }
} 


const uploadformFunc = async(req,res,next)=>{
    const data = req.body;
    console.log(data);
    res.redirect('/about');
}

module.exports = {
    uploadformPage:uploadformPage,
    uploadformFunc:uploadformFunc
}