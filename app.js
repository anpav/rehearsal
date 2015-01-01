var express = require('express'),
    app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/src/views/index.html");
});

app.listen(8080);