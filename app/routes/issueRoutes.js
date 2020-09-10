const express = require('express');
const mongoose = require('mongoose');
const config = require('/home/sowmya/trackIt/trackItBackEnd/config/config');
const auth = require('../middlewares/auth');
const controller = require('/home/sowmya/trackIt/trackItBackEnd/app/controllers/issue');
const multer = require('/home/sowmya/trackIt/trackItBackEnd/app/multer/multer')
const Grid = require('gridfs-stream');
const passport = require('passport');
let connection = mongoose.createConnection(config.db.uri)
let gfs
connection.once('open', function() {
    gfs = Grid(connection.db, mongoose.mongo)
    gfs.collection('uploads')
})

module.exports.setRouter = (app) => {

    let baseUrl = `${config.apiVersion}/issue`

    app.post(`${baseUrl}/create`, controller.createIssue);

    app.post(`${baseUrl}/delete/:issueId`, controller.deleteIssue);

    app.put(`${baseUrl}/edit/:issueId`, controller.editIssue);

    app.get(`${baseUrl}/allIssues`, controller.getAllIssues);

    app.get(`${baseUrl}/:issueId`, controller.singleIssue);

    app.get(`${baseUrl}/userid/:userId`, controller.getAllIssuesByuserId);

    app.get(`${baseUrl}/assigneeid/:assigneeId`, controller.getAllIssuesByassineeId);

    app.post(`${baseUrl}/watch`, controller.watchIssue);

    app.get(`${baseUrl}/watchcount/:issueId`, controller.watchCount);

    app.get(`${baseUrl}/watchofuser/:userId`, controller.allWatchOfUser);

    //app.post(`${baseUrl}/assignee/:issueId`, controller.addAssignee);

    app.post(`${baseUrl}/search`, controller.searchIssue);

    app.post(`${baseUrl}/createcomment`, controller.createComment);

    app.put(`${baseUrl}/editcomment/:commentId`, controller.editComment);

    app.post(`${baseUrl}/deletecomment/:commentId`, controller.deleteComment);

    app.get(`${baseUrl}/comments/:issueId`, controller.getAllComments);

    //app.get(`${baseUrl}/:eventId/status`, controller.status);

    app.post(`${baseUrl}/numOfDays`, controller.numOfDays);

    //app.get(`${baseUrl}/comments/:issueId/:userId`, controller.commentsOfUser);

    app.post(`${baseUrl}/uploads`, multer.upload.single('file'), multer.uploadFile);

    app.get(`${baseUrl}/allFiles`, multer.getAllFiles);

    app.get(`${baseUrl}/file/:fileName`, multer.getSingleFile);

    app.get(`${baseUrl}/downloadFile/:fileName`, multer.downloadFile);

    app.post(`${baseUrl}/delete/:id`, multer.deleteFile);
}