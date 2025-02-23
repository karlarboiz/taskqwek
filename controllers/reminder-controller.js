
const reminderPage = async(req,res)=>{
    const role = req.session?.user?.role === 1  ?"leader": "member";
    
    res.render("reminders",{
        role:role,
        activeLink:"reminder"
    })
}

module.exports = {
    reminderPage
}

