var tinylr = require('tiny-lr');
var lrPort = 35729;

tinylr().listen(lrPort, function() {
  console.log('LiveReload listening on port %s', lrPort);
});
