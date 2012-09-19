var config  = require('../config').config;
var mongo = require('mongoskin');
var db = mongo.db(config.mongo_addr);

exports.insert = function(collection, documents, options, callback) {
	db.collection(collection).insert(documents, options, function(err, documents) {
		callback(documents);
	})
}

exports.find = function(collection, condition, fields, options, callback) {
	db.collection(collection).find(condition, fields, options).toArray(function(err, documents) {
		callback(documents);
	})
}

exports.findOne = function(collection, condition, fields, options, callback) {
	db.collection(collection).findOne(condition, fields, options, function(err, document) {
		callback(document);
	})
}

exports.update = function(collection, selector, document, options, callback) {
	db.collection(collection).update(selector, documents, options, function(err, documents) {
		callback(documents);
	})
}

exports.remove = function(collection, selector, options, callback) {
	db.collection(collection).remove(selector, options, function(err, documents) {
		callback(documents);
	})
}

exports.group = function(collection, keys, condition, initial, reduce, callback) {
	db.collection(collection).group(keys, condition, initial, reduce, function(err, results) {
		callback(results);
	})
}