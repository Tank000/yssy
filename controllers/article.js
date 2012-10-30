var db_atl = require('../libs/mongodb').article;
var utils  = require('../libs/utils');


/************************************************/
/*  功能：获取所有待审核数据                */
/************************************************/
exports.view = function(req, res) {
    var aid = req.params.id;
    if(aid&&aid.length==24){
        db_atl.findById(aid,function (err,data){
            if(err) return next(err)
            res.render('article',{cont:data});
        })       
    }
    
}
