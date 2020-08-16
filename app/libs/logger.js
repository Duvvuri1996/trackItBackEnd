const logger = require('pino')
const moment = require('moment')


let errorFunction = (message, origin, level) => {
    let currentTime = moment()
    let error = {
        timeStamp : currentTime,
        err : message,
        origin : origin,
        level : level
    }
    logger.error(error)
    return error
}

let infoFunction = (message, origin, level) => {
    let currentTime = moment()
    let info = {
        timeStamp : currentTime,
        message : message, 
        origin : origin,
        level : level
    }
    logger.info(info)
    return info
}

module.exports = {
    error : errorFunction,
    info : infoFunction
}