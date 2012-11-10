var db_atl   = require('../libs/mongodb').article;
var db_board = require('../libs/mongodb').board;
var utils    = require('../libs/utils');


/************************************************/
/*  功能：获取所有待审核数据                */
/************************************************/
exports.list = function(req, res,next) {
    var board = req.query.board;
    db_board.findOne({'name':board},function (err,boardInfo){
        if(err) return next(err)
        if(boardInfo){    
        	db_atl.find({'board':board},{'title':1,'content':1,'author':1,'time':1,'reid':1}).sort({'_id':-1}).limit(25).toArray(function (err,dataArr){
                if(err) return next(err)
                dataArr.forEach(function(result){
                    result.content     = utils.thin(result.content);
                })
                res.render('board',{dataArr:dataArr,board:board,boardInfo:boardInfo});
        	})
        }else{
            return next()
        }
    })
	
}

