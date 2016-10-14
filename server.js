'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

var Parse = require('parse/node');
Parse.initialize('parse_unima','qWX091CBo8APvsWM2La6B6dmj3AdLEv9e9hNFuYZ');
Parse.serverURL = 'https://parse-unima.herokuapp.com/parse/';

var typingUsers = {}
var userList = [];
var roomList = [];

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  .loadChatRooms();



const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  
  
});

func loadChatRooms() {
    /*
     *  After starting Node.JS server
     *  Synchronize Parse and Node.JS server
     *  Get all open ChatRooms and assign users to it
    */
    var chatRoom = Parse.Object.extend("ChatRoom");
            
    var query = new Parse.Query(chatRoom);
        query.equalTo("isOpen", true);
    
        query.find({ success: function(results) {
                   
            console.log("Successfully retrieved " + results.length + " rooms.");
                   
            // Do something with the returned Parse.Object values
            for (var i = 0; i < results.length; i++) {
                   
                var object = results[i];
                   
                // Create Room
                var room = new Room(object.id, object.get('receiverID'), object.get('requesterID'), object.get('messageID'));
                   
                roomList.push(room);
                
                console.log("Room " + object.id + " was created!");
            }
        },
        error: function(error) {
                   
            alert("Error: " + error.code + " " + error.message);
        }
    });
}
