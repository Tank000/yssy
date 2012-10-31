

exports.index = function(req, res) {
    if(req.session)
        res.redirect('login')
    else res.render('index');
}