/*!
 * MongDB logger
 * Copyright(c) 2010 Taguage Inc.
 * Copyright(c) 2011 Tank
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

exports = module.exports = function logger(req,res,next) {
    console.log(req.url);
    var data = {};
    data['date']   = new Date();
    var end = res.end;
    res.end = function(chunk, encoding){
      res.end = end;
      res.end(chunk, encoding);
      console.log('---');
      data['uid']    = req.body.myaid;
      data['method'] = req.method.toLowerCase();
      data['path']   = req.path;
      data['params'] = req.params||req.body;
      data['user-agent'] = req.headers['user-agent'];
      data['remote-addr'] = req.socket && (req.socket.remoteAddress || (req.socket.socket && req.socket.socket.remoteAddress));
      data['http-ver'] = req.httpVersionMajor + '.' + req.httpVersionMinor;
      data['ref'] = req.headers['referer'] || req.headers['referrer'];
      data['status'] = res.statusCode;
      data['resp-time'] = new Date - data['date'];
    };
    next();
};


