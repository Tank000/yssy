var config  = require('../config').config;
var mongo   = require('mongoskin');
var db      = mongo.db(config.mongo_addr);

exports.board   = db.collection('board');
exports.user    = db.collection('user');
exports.article = db.collection('article');
exports.toId = db.ObjectID.createFromHexString;
