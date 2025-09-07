const sessionDetails=(req)=>{
    const role = req.session.user?.role === 1  ?"leader": "member";
    const id = req.session.user.id;

    return{
        role,
        id
    }
}


module.exports = sessionDetails;