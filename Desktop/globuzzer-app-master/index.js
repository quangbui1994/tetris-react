var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/'));

// views is directory for all template files

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    // res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname + '/home.html'));
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});