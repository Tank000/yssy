
exports.index = function(req, res) {
    res.render('login',{layout:false});
}

exports.check = function(req, res) {
    var uid = req.body.id;
    var pwd =req.body.pswd;
    req.session.uid = uid;
    res.redirect('/bbsdoc?board=PPPerson');
}

exports.logout = function(req, res, next) {
    req.session.destroy();
    // res.clearCookie(config.auth_cookie_name, { path: '/' });
    res.redirect('/');
};