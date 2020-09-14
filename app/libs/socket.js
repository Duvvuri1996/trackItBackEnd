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
                    let key = currentUser.userId
                    let value = fullName
                    let setUserOnline = redisLib.setNewOnlineUserInHash('trackItOnlineUserlist', key, value, (err, result) => {
                        if (err) {
                            console.log("some error occured")
                        } else {
                            redisLib.getAllUsersInHash('trackItOnlineUserlist', (err, result) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log(`${fullName} is online`)
                                    socket.broadcast.emit('online-user-list', result)
                                }
                            })
                        }
                    })
                }
            })
        }) //end of set-user event

        socket.on('disconnect', () => {
            console.log("User went offline")
            if (socket.userId) {
                redisLib.deleteUserFromHash('trackItOnlineUserlist', socket.userId)
                redisLib.getAllUsersInHash('trackItOnlineUserlist', (err, result) => {
                    if (err) {
                        console.log("Some error occured")
                    } else {
                        socket.broadcast.emit('online-user-list', result)
                    }
                })
            }
        })

        socket.on('event-updates', (data) => {
            socket.broadcast.emit(data.userId, data)
        })
    })
}   

module.exports = {
    setServer : setServer
}