// const url = require('url');
const OrgControls = require('../model-functions/OrgControls');
const ProjectControls = require('../model-functions/ProjectControls');
const ResponseObj = require('../response-obj/ResponseObj');
const Messages = require('../common/Messages');

const dashboardPage = async(req,res)=>{
    const role = req.session.user?.role === 1  ?"leader": "member";

    const id = req.session.user?.id;

    res.render('dashboard',
        {role:role,
        activeLink: 'dashboard'
        });    
}

const fetchDashboardPageData = async(req,res)=>{
    const id = req.session.user?.id;
    try{

        const orgControls = new OrgControls(id,false,null);

        const orgs = await orgControls.getOrgListBasedOnLeaderId();
    
        const projectControls = new ProjectControls(null,id);
    
        const projects = await projectControls.getLeaderProjects();
        
        const data = {
            orgs,
            projects
        }
        const responseObj = new ResponseObj(true,
            Messages.FETCH_LIST_SUCCESS + "initial data",null,data)
        return res.status(200).send(responseObj)
    }catch(e){
        const responseObj = new ResponseObj(false,
            Messages.FAILED,e.message,null)
        res.status(200).send(responseObj)
    }
}

module.exports = {
    dashboardPage,
   fetchDashboardPageData
}