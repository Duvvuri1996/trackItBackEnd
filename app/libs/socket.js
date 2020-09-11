const socketio = require('socket.io');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./token");
const redis = require('./redis');

let setServer = (server) => {
    let io = socketio.listen(server)
    let myIo = io.of('/')
    myIo.on('connection', (socket) => {
        //code to verify user to connect to socket
        socket.emit('verify-user', "")
        socket.on('set-user', (authToken) => {
            console.log("set user is called")
            tokenLib.verifyTokenWithoutSecret(authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', {
                        status: 500,
                        error: 'Please provide correct auth token'
                    })
                } else {
                    console.log("user is verified")
                    let currentUser = user.data
                    //setting socket userid
                    socket.userId = currentUser.userId
                    let fullName = currentUser.fullName
                }
            })
        }) //end of set-user event

        socket.on('disconnect', () => {
            console.log("User went offline")
        })

        socket.on('event-updates', (data) => {
            console.log("socket event-updates called")
            console.log(data);
            socket.broadcast.emit(data.userId, data)
        })
    })
}   

module.exports = {
    setServer : setServer
}