var db_atl = require('../libs/mongodb').article;
var utils   = require('../libs/utils');


/************************************************/
/*  功能：获取所有待审核数据                */
/************************************************/
exports.list = function(req, res) {
    var board = req.query.board;
    console.log(req.query);
	db_atl.find({'board':board},{'title':1,'content':1,'author':1,'time':1,'reid':1}).sort({'_id':-1}).limit(25).toArray(function (err,dataArr){
        if(err) return next(err)
        dataArr.forEach(function(result){
            result.content     = utils.thin(result.content);
        })
        res.render('board',{dataArr:dataArr,board:board});
	})
	
}

