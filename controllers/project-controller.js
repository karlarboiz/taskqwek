
const projectPage = (req,res,next)=>{

    const role = req.session.user?.role === 1  ?"leader": "member";

    console.log(role)
    res.render("project",{
        role:role,
        activeLink: "project"
    })
}

module.exports = {
    projectPage
}