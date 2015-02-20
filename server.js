var express = require("express"),
    app = express(),
    server = require("http").Server(app)

app.use(express.static('.'));

server.listen(process.env.PORT || 5000);