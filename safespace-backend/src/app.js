var express = require('express');


// Create global app object
var app = express();

var server = app.listen( process.env.PORT || 5000, function(){
  console.log('Listening on port ' + server.address().port);
});