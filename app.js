var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
var socketIoCookieParser = require('socket.io-cookie-parser');
var expressSession = require('express-session');
var MemoryStore = require('memorystore')(expressSession)
var sharedsession = require("express-socket.io-session");

app.use(cookieParser());
let session = expressSession({
    secret: 'Game of Life',
    saveUninitialized: true,
    resave: true,
    store: new MemoryStore({
        checkPeriod: 24 * 60 * 60 * 1000
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
});
app.use(session);
app.use(express.static(path.join(__dirname, 'build')));
var server = http.createServer(app);
server.listen(process.env.PORT || '5000');

// Frontend
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Backend
var io = require('socket.io')(server);
io.use(socketIoCookieParser());
io.use(sharedsession(session, {
    autoSave:true
})); 
var gamerController = require('./controllers/gameController')(io);


// https://hackmd.io/@terminal1/assessment-conway
