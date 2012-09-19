var overview   = require('./controllers/overview');


//处理所有的路由请求
exports = module.exports = function(app) {
	app.get('/', overview.overview);
}
