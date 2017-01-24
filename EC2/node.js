var restify = require('restify');
var exec = require('child_process').exec;

function respond(req, res, next) {
 var replyFn = function(err, stdout, stderr) {
   console.log(stdout);
   console.log(stderr);
  };

 child = exec('./bs2.sh ' + req.params.path + ' ' + req.params.stage, replyFn);
}

var server = restify.createServer();
server.get('/:path/:stage', respond);

server.listen(8080, function() {
console.log('%s listening at %s', server.name, server.url);
});
