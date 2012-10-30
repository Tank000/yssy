var db_atl  = require('../libs/mongodb').article;
var toId    = require('../libs/mongodb').toId;
var utils   = require('../libs/utils');



/************************************************/
/*  功能：查看下一页的内容                */
/************************************************/
exports.next = function(req, res) {
    var index = parseInt(req.params.id);
    var board = req.query.board;
    var doc = {};
    if(board) doc['board'] = board; 
    db_atl.find(doc,{'title':1,'content':1,'author':1,'time':1,'reid':1}).sort({'_id':-1}).skip(25*(index-1)).limit(25).toArray(function (err,dataArr){
        if(err) return next(err)
        if(dataArr.length==0) return res.send(404);
        dataArr.forEach(function(result){
            result.content  = utils.thin(result.content);
        })
        res.render('board/list',{dataArr:dataArr,next:++index,layout:false});
    })
    
}



/************************************************/
/*  功能：翻页                */
/************************************************/
exports.redir = function(req, res,next) {
    var cid   = req.params.id;
    var board = req.query.board;
    var doc   = {'board':board}; 
    var sort  = {'_id':-1};
    if(req.url.indexOf('/next/')){
        doc['_id']={'$gt':toId(cid)};
        sort['_id'] = 1; 
    }else if(req.url.indexOf('/prev/')){
        doc['_id']={'$lt':toId(cid)};
        sort['_id'] = -1; 
    }
    db_atl.find(doc,{'_id':1}).sort(sort).limit(1).toArray(function (err,data){
        if(err) return next(err)
        if(data.length==0){
            db_atl.find(doc,{'_id':1}).sort(sort).limit(1).toArray(function (err,data){
                if(err) return next(err)
                else res.redirect('/bbscont/'+data[0]._id)
            })
        }else  res.redirect('/bbscont/'+data[0]._id)
    })
    
}