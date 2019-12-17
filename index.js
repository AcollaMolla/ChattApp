var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cookieParser = require('cookie-parser');
var ioCookieParser = require('socket.io-cookie-parser');
app.use(cookieParser());
io.use(ioCookieParser());

var userHelper = require('./Users');

const connectionMessage = " joined the conversation";
const disconnectingMessage = " left the conversation";

app.get('/', function(req, res){
    if(req.query.username !== undefined){
        if(ValidateUser(req.query.username)){
            res.cookie("User", GetCookieValue(req.query.username));
            return res.sendFile(__dirname + '/templates/index.html');
        }
        return res.redirect('/join');
    }
    var cookie = req.cookies['User'];
    if(cookie === undefined){
        return res.redirect('/join');
    }
    else if(ValidateCookie(cookie)){
        return res.sendFile(__dirname + '/templates/index.html');
    }
});

app.get('/join', function(req, res){
    res.sendFile(__dirname + '/templates/join.html');
});

io.on('connection', function(socket){
    var cookie = socket.request.cookies['User'];
    var message = {
        user: GetCookieName(cookie),
        msg: connectionMessage
    };
    io.emit('user-joining', message);

    socket.on('disconnect', function(){
        var message = {
            user: socket.id,
            msg: disconnectingMessage
        };
        io.emit('user-leaving', message);
    })

    socket.on('chat-message', function(msg){
        var message = {
            msg: msg,
            user: socket.id
        };
        io.emit('chat-message', message);
    });

    socket.on('user-typing', function(msg){
        var message = {
            user: socket.id,
            msg: " is typing"
        }
        io.emit('user-typing', message);
    });
});

http.listen(3000, function(){
    console.log("Listening on *:3000...");
});

function GetCookieValue(name){
    var user = userHelper.GetUsers().find(val => val.name === name);
    return user.id;
}

function GetCookieName(value){
    var user = userHelper.GetUsers().find(val => val.id === value);
    return user.name;
}

function ValidateUser(username){
    for(var i = 0;i < userHelper.GetUsers().length;i++){
        if(userHelper.GetUsers()[i].name === username)
            return true;
    }
    return false;
}

function ValidateCookie(value){
    for(var i = 0;i < userHelper.GetUsers().length; i++){
        if(userHelper.GetUsers()[i].id === value)
            return true;
    }
    return false;
}