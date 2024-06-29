const org = require("../query/adminquery");

const dashboardPage = async (req, res, next) => {
    let isLoggedIn = req?.session?.user;

    const orgList = await org.orgList(req?.session?.user?.id);

    if (isLoggedIn === null ||
        isLoggedIn === undefined) {
        res.redirect('/');
    }

    else {
        res.render('dashboard', { orgList: orgList, content: 'dashboard', isAdmin: req?.session?.user?.isAdmin });
    }
}


module.exports = {
    dashboardPage: dashboardPage
}