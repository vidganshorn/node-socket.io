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
