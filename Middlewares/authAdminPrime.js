function adminAuthPrime(req, res, next)
{
    if(req.session.email != undefined && req.session.prime == true)
    {
        next();
    }
    else
    {
        res.redirect('/admin');
    }   
}

module.exports = adminAuthPrime;