var http     = require('http');
var parse = require('url').parse;
var timeoutTime= 15000;  //timeout in millisecond

exports.get = function(path,callback){
    var options = {
      host   : 'bbs.sjtu.edu.cn',
      port   : '80',
      path   : path,
      method :'GET',
      headers: {
        'Host':'bbs.sjtu.edu.cn',
      }
    };
    // 设置请求超时
    var req = null ,req_timeout = null;
    var bufArr = [];
    var size = 0;

    req_timeout = setTimeout(function() {
        req_timeout = null;
        console.log("timed out here in global");
        req.abort();
        callback(null);
    }, timeoutTime);

    req = http.request(options, function(res) {
        res.on('data', function (chuck) {
            tmp = new Buffer(chuck);
            size += tmp.length;
            bufArr.push(tmp);
        }).on('end', function(){
          //clear the timeout when the request is finished or failed
            clearTimeout(req_timeout);
            callback(Buffer.concat(bufArr,size));

        }).on('error', function(err) {
            clearTimeout(req_timeout);
            callback(err /* , res */);
        }).on('aborted', function() {
            clearTimeout(req_timeout);
        });
    }).on('error', function(e) {
        if(req_timeout) {
              clearTimeout(req_timeout);
              //console.log("Got error: " + e.message);
              callback(null );
        }
    });
    req.end();

}


