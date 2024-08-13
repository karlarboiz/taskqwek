const url = require('url');

// const memberDashboardPage = (req,res)=>{
//     const queryData = url.parse(req.url, true).query;

//     let role= req.session.user.role === 1 ? 'leader': 'member';

//     let contentRender = queryData.visit;

//     if(req.session.user.role !== 2) {
//         return res.redirect(`/dashboard/${role}`)
//     }else {
//         res.render('dashboard',{role:role});
//     }
// }

// module.exports = {
//     memberDashboardPage
// }