var db_atl = require('../libs/mongodb').article;
var utils  = require('../libs/utils');
var _get   = require('../libs/client').get;
var fs     = require('fs');


/************************************************/
/*  功能：获取所有待审核数据                */
/************************************************/
exports.view = function(req,res,next) {
    var aid = req.params.id;
    if(aid&&aid.length==24){
        db_atl.findById(aid,function (err,data){
            if(err) return next(err)
            console.log(data);
            res.render('article',{cont:data});
        })       
    }
    
}

exports.file = function(req,res,next) {
    var path = req.path;
    _get(path,function(data){
        if(data) return res.end(data);
        else return next();
    })
}
