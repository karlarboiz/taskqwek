const uploadFormSession = require('../util/uploadform-session');
const Form = require('../model/Form');
const uploadformPage = async(req,res,next)=>{
    if(req.session?.user !== null &&
        req.session?.user !== undefined &&
        req.session?.user?.isAdmin) {
            res.render('uploadform',{csrf: req.csrfToken()});
        }
    else {
        res.redirect('/');
    }
} 

const uploadformFunc = (req,res)=>{
   if(req.body['form-name'].trim().length < 0 ||
   req.body.description.trim().length < 0 ||
   req.file) {
    uploadFormSession.signupErrorSessionPage(req,{
        message: "Error! Please check for field/fields that is/are empty or valid.",
        formName: req.body['form-name'],
        description: req.body.description
    },()=>{
        res.redirect('/uploadform');
    })

    return;
   }

   let newForm = new Form({
    name: req.body['form-name'],
    description: req.body.description,
    form: {
        data: req.file.path,
        contentType: 'application/form'
    }
   })

   return newForm.save().then(
    (result,err)=>{
        if(err) {
            return res.status(500).render('500');
        }

        res.redirect('/uploadform');
    }
   )
}

module.exports = {
    uploadformPage:uploadformPage,
    uploadformFunc:uploadformFunc
}