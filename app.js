/*typical require declaration of express, socketio,http & twilio */
var express = require('express');
var app = express(); 
var http = require('http').Server(app);
var io = require('socket.io')(http); 
var twilio = require('twilio');

//use single page index.html
app.use(express.static(__dirname + '/'));


// You will need your Account Sid and a SigningKey Sid and Secret
// to generate an Access Token for your SDK endpoint to connect to Twilio.
// Got to https://www.twilio.com/user/account/video/signing-keys to get signing key info
var accountSid = 'ACe9f365f2338e22f94bc8be5dc0cc7051';
var signingKeySid = 'xxx-your-signing-key-here';
var signingKeySecret = 'xxx-your-signing-secret-here';
//Send to twilio to get token
var token = new twilio.AccessToken(signingKeySid, accountSid, signingKeySecret);


//socketio event listeners
io.on('connection', function(socket){ 
   
    socket.on('register', function(user){  
        token.addEndpointGrant(user);
        token.enableNTS();
        console.log(token);
        twilioauthtoken=token.toJwt();
        //send token back to socket that initiated the request
        io.sockets.connected[socket.id].emit('twiliortctoken',twilioauthtoken);

    });   

    socket.on('disconnect', function (data) {
        console.log('user disconnected '+socket.id);
       

    });
    
 
});

http.listen(3000, function() {
    console.log('Express started at port 3000');
});
