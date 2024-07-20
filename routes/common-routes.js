const commonController = require('../controllers/common-controller');

const express = require('express');

const router = express.Router();

router.get('',(req,res,next)=>{

    res.render('home',{messages: req.flash("info")});
})
 

router.get('/about',(req,res)=>{
    res.render('about');
})
router.post('/logout',commonController.logoutFunc);



module.exports = router;