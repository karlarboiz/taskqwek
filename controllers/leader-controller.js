const Org = require("../model/Org");
const url = require('url');
// server.js or your route/controller file
const express = require("express");
const sendEmail = require("./mailer");

// const orgCreationSession = require("../util/org-creation-session");
const { encryptValue,decryptValue } = require("../util/encrypt-code");


const createLinkToJoin = (req,res,next)=>{

    // const {emailAdress}=req.body;

    try{

    }catch(e){
        next(e);
    }
}

const leaderDashboardOrganizationPage = (req,res)=>{
    const role = "leader";
    res.render('dashboard',{role:role});
}

module.exports = {
    leaderDashboardOrganizationPage
}