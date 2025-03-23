const commonController = require('../controllers/common-controller');

const express = require('express');

const router = express.Router();

router.get('',commonController.homePage)
 

router.get('/about',(req,res)=>{
    res.render('about');
})
router.post('/logout',commonController.logoutFunc);

 

module.exports = router;