var main    = require('./controllers/main');
var board   = require('./controllers/board');
var article = require('./controllers/article');
var page    = require('./controllers/page');
var login   = require('./controllers/login');


//处理所有的路由请求
exports = module.exports = function(app) {
    app.get   ('/'             , main.index);
    app.get   ('/login'        , login.index);
	app.get   ('/bbsdoc'       , board.list);
    app.get   ('/bbscont/:id'  , article.view);
    app.get   ('/page/:id'     , page.next);
    app.get   ('/next/:id'     , page.redir);
    app.get   ('/prev/:id'     , page.redir);
    app.get   ('/file/*'         , article.file);

    app.all('/*',function (req,res,next){
        res.render('404',{layout:false})
    })
}
