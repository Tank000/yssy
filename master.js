var cluster =require('cluster');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}else{
    require('./app.js');
}

cluster.on('exit', function(worker, code, signal) {
  var exitCode = worker.process.exitCode;
  console.log('worker ' + worker.process.pid + ' died ('+exitCode+'). restarting...');
  cluster.fork();
});
