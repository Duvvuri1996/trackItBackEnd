const config = require('/home/sowmya/trackIt/trackItBackEnd/config/config');
const mongoose = require('mongoose');
const path = require('path');
const response = require('../libs/response');
const logger = require('../libs/logger');
const crypto = require('crypto');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const multer = require('multer');

let connection = mongoose.createConnection(config.db.uri)
let gfs = Grid(connection.db, mongoose.mongo)
gfs.collection('uploads')

const storage = new GridFsStorage({
    url : config.db.uri,
    file : (req, file) =>{
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buff) => {
                if(err) {
                    logger.error(err.message, "Unknown error at storage file() function", 10)
                    let apiResponse = response.generate(true, "Unknown error at storage file() function", 500, null)
                    reject(apiResponse)
                } else {
                    const fileName = buf.toString('hex')+path.extname(file.originalname)
                    const fileInfo = {
                        fileName : fileName,
                        fileLocation : 'uploads'
                    }
                    resolve(fileInfo)
                }
            })
        })
    }
})

const upload = multer({ storage })

let uploadFile = (req, res) => {
    logger.info("File uploaded successfully", "at uploadeFile() function", 10)
    res.json({ file:req.file, FileName : req.file.fileName })
}

let getAllFiles = (req, res) => {
    gfs.files.find()
    .exec((err, fileDetails) => {
        if(err) {
            logger.error(err.message, "Unknown error occurred at getAllFiels()", 10)
            let apiResponse = response.generate(true, "Unknown error at getAllFiles()", 500, null)
            res.send(apiResponse)
        } else {
            logger.info("Successfully retreived all details", "at getAllFiles() function", 10)
            let apiResponse = response.generate(false, "Successfully retreieved successfully", 200, fileDetails)
            res.send(apiResponse)
        }
    })
}

let getSingleFile = (req, res) => {
    gfs.files.findOne({ fileName : req.params.fileName }).exec((err, file) => {
        if(err) {
            logger.error(err.message, "Unknown error occurred at getSingleFile()", 10)
            let apiResponse = response.generate(true, "Unknown error at getSingleFile()", 500, null)
            res.send(apiResponse)
        } else {
            logger.info("Successfully retreived all details", "at getSingleFile() function", 10)
            let apiResponse = response.generate(false, "Successfully retreieved details", 200, file)
            res.send(apiResponse)
        }
    })
}

let downloadFile = (req, res) => {
    gfs.files.findOne({ fileName : req.params.fileName }).exec((err, file) => {
        if(err) {
            logger.error(err.message, "Unknown error occurred at downloadFile()", 10)
            let apiResponse = response.generate(true, "Unknown error at downloadFile()", 500, null)
            res.send(apiResponse) 
        } else {
            let readStream = gfs.createReadStream({ fileName : file.fileName })
            res.set('Content-Type', file.contentType)
            readStream.pipe(res)
        }
    })
}

let deleteFile = (req, res) => {
    gfs.files.deleteOne({ _id : req.params.id, root : 'uploads' }).exec((err, result) => {
        if(err) {
            logger.error(err.message, "Unknown error occurred at deleteFile()", 10)
            let apiResponse = response.generate(true, "Unknown error at deleteFile()", 500, null)
            res.send(apiResponse)
        } else {
            logger.info("Successfully deleted file", "at deleteFile() function", 10)
            let apiResponse = response.generate(false, "Successfully deleted file", 200, null)
            res.send(apiResponse)
        }
    })
}

module.exports = {
    uploadFile : uploadFile,
    getAllFiles : getAllFiles,
    getSingleFile :getSingleFile,
    downloadFile : downloadFile,
    deleteFile : deleteFile               
}