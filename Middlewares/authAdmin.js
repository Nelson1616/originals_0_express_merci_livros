function adminAuth(req, res, next)
{
    if(req.session.email != undefined)
    {
        next();
    }
    else
    {
        res.redirect('/login');
    }   
}

module.exports = adminAuth;

