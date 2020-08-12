const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const config = require('./config/config')

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    next();
});

/**
 * create http server
 */
const server = http.createServer(app);
server.listen(config.port)
server.on('error', onError)
server.on('listening', onListening)
//end server listening code

//const socketLib = require("./app/libs/socket");
//const socketServer = socketLib.setServer(server);

/**
 * Http server error event
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + ' is not an equal listener', 'serverOnErrorHandler', 10)
        throw error
    }
    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ' permission denied', 'serverOnErrorHandler', 10)
            /**
             * The process.exit() method instructs Node.js to terminate the process synchronously with an exit status of code
             * 0 for Succes and 1 for failure
             */
            process.exit(1)
            break;
            //EADDRINUSE - the port number which listen() tries to bind the server to is already in use.
        case 'EADDRINUSE':
            logger.error(error.code + ' port already in use', 'serverOnErrorHandler', 10)
            process.exit(1)
            break;
        default:
            logger.error(error.code + ' :unknown error occured', 'serverOnErrorHandler', 10)
            throw error;
    }
}

/**
 * Http server onListening event
 */

function onListening() {
    var addr = server.address();
    console.log(addr)
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log('Listening on ' + bind)
    logger.info('server listening on port' + addr.port, 'serverOnlisteningHandler', 10)
    let db = mongoose.connect(config.db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}


mongoose.connection.on('error', function (err) {
    console.log("Databse error")
    console.log(err)
    logger.error(err, 'mongoose connection on error handler', 10)
}) //end mongoose connection error

mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("Database error while connecting")
        console.log(err)
        logger.error(err, 'mongoose connection open handler', 10)
    } else {
        console.log("Database connection successfull")
        logger.info("DB connection open", 'DB connection openHandler', 10)
    }
}) // end mongoose connection open handler

module.exports = app;

