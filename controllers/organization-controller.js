const orgPage = async (req, res, next) => {
    let isLoggedIn = req?.session?.user;

    if (isLoggedIn === null ||
        isLoggedIn === undefined) {
        res.redirect('/');
    }

    else {
        res.render('dashboard', { content: 'organization', isAdmin: req?.session?.user?.isAdmin });
    }
}

module.exports = {
    orgPage: orgPage
}