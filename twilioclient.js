var endpoint;
var activeConversation;
var previewMedia;
var localMediaTarg='local-media';
var remoteMediaTarg='remote-media';
var loggingTarg='log-content';

var twiliomedialocal={ 
    /*Uses accessToken passed back from twilio to register endpoint*/ 
    getTwilioRTC:function(authtoken){ 
        // check for WebRTC
        if (!navigator.webkitGetUserMedia && !navigator.mozGetUserMedia) {
            alert('WebRTC is not available in your browser.');
        }

        window.accessToken = authtoken;                 
        // create an Endpoint and connect to Twilio
        endpoint = new Twilio.Endpoint(accessToken);
        console.log(endpoint);
        endpoint.listen().then(
            this.endpointConnected(this),
            function (error) {
                log('Could not connect to Twilio: ' + error.message);
            }
        );


    },

    // successfully connected!
    endpointConnected:function() { 
        document.getElementById('invite-controls').style.display = 'block';   
        console.log("Connected to Twilio. Listening for incoming Invites as '" + endpoint.address + "'");
        this.log("Connected to Twilio. Listening for incoming Invites as '" + endpoint.address + "'");
        var self=this;
        endpoint.on('invite', function (invite) {    
            log('Incoming invite from: ' + invite.from);
            invite.accept().then(self.conversationStarted);
        });  

        // bind button to create conversation
        document.getElementById('button-invite').onclick = function () {
            var inviteTo = document.getElementById('invite-to').value;

            if (activeConversation) {
                // add a participant
                activeConversation.invite(inviteTo);
            } else {
                // create a conversation
                var options = {};
                if (previewMedia) {
                    options.localMedia = previewMedia;
                }
                endpoint.createConversation(inviteTo, options).then(
                    self.conversationStarted,
                    function (error) {
                        log('Unable to create conversation');
                        console.error('Unable to create conversation', error);
                    }
                );
            }
        };
    }, 

    // conversation is live
    conversationStarted:function(conversation) {
        log('In an active Conversation');
        activeConversation = conversation;
        // draw local video, if not already previewing
        if (!previewMedia) {
            conversation.localMedia.attach('#'+localMediaTarg);
        }
        // when a participant joins, draw their video on screen
        conversation.on('participantConnected', function (participant) {

            console.log("Participant '" + participant.address + "' connected");
            participant.media.attach('#'+remoteMediaTarg);
        });
        // when a participant disconnects, note in log
        conversation.on('participantDisconnected', function (participant) {
            log("Participant '" + participant.address + "' disconnected");
        });
        // when the conversation ends, stop capturing local video
        conversation.on('ended', function (conversation) {
            log("Connected to Twilio. Listening for incoming Invites as '" + endpoint.address + "'");
            conversation.localMedia.stop();
            conversation.disconnect();
            activeConversation = null;
        });
    },
    getLocalMedia:function(){
        if (!previewMedia) {
            previewMedia = new Twilio.LocalMedia();
        }
        Twilio.getUserMedia().then(
            function (mediaStream) {
                console.log('stream here for local-media')
                previewMedia.addStream(mediaStream);
                previewMedia.attach('#'+localMediaTarg);

            },
            function (error) {
                console.log('Unable to access local media', error);
                log('Unable to access Camera and Microphone');
            }
        )
    },
    cancelLocalMedia:function(){
        if (previewMedia) {
            previewMedia.removeCamera();


        }

    }  ,
    log:function(message) {
        console.log(message);
        document.getElementById('log-content').innerHTML = message;

    }


}      

