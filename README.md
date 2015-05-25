# twilio socketio node.js video conference
Project integrating Twilio Video using Socket.io and Node.js

The code is a modification fo the twilio video quickstart example. We are using socket.io to communicate the AccessToken from the server to the browser which should allow for device independence.

#requirements
Node.js installed
Project files (app.js,index.html,twiliocient.js,node_modules folder)
Twilio account with video enabled
Twilio video signing keys

#installation
1. Install node.js
2. Create directory behind the web root(i.e. /var/www/twiliovideo
(I install the server code behind the web root so prying eyes can't see peruse the files. Please take security precautions with any confidential information)
3. Install express- npm install express
4. Install socket.io npm install socket.io
5. Go to your Twilio account- click video - click signing keys
6. Modify the app.js with the signing keys from your twilio account
6. Shell to the folder with the app.js file and enter node app.js to run the server.

You should be able to connect to the index.html page then with the ip address of your server and :3000. For example, http://00.00.00.00:3000

#usage
1. A user should be able to go to the page and Type in a name in the text box and click get ID.
2. This will fetch the token from Twilio and add the appropriate listeners.
3. Another user must do the same thing and you will need to manually share the usernames.
4. Type in the other person's username and click invite.
5. It will ask you to allow the use of your camera.
6. It will then prompt the other user to allow the use of their camera.
7. Once the other person accepts then the video conference will be live.

#disclaimers
This is a quick experiment to test Twilio's new functions that I thought I would share as a helper to those using node.js, socket.io and Twilio's new video conference feature. There are improvements and modifiications that would make it more functional and better organized. Use at your own risk but make sure to pay attention to security in all situations.





