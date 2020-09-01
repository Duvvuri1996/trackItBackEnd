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

    app.post(`${baseUrl}/create`, auth.isAuthorized, controller.createIssue);

    app.post(`${baseUrl}/delete/:issueId`, auth.isAuthorized, controller.deleteIssue);

    app.put(`${baseUrl}/edit/:issueId`, auth.isAuthorized, controller.editIssue);

    app.get(`${baseUrl}/allIssues`, auth.isAuthorized, controller.getAllIssues);

    app.get(`${baseUrl}/:issueId`, auth.isAuthorized, controller.singleIssue);

    app.get(`${baseUrl}/:userId`, auth.isAuthorized, controller.getAllIssuesByuserId);

    app.get(`${baseUrl}/:assigneeId`, auth.isAuthorized, controller.getAllIssuesByassineeId);

    app.post(`${baseUrl}/watch`, auth.isAuthorized, controller.watchIssue);

    app.get(`${baseUrl}/watchcount/:issueId`, auth.isAuthorized, controller.watchCount);

    app.get(`${baseUrl}/watchofuser/:userId`, auth.isAuthorized, controller.allWatchOfUser);

    //app.post(`${baseUrl}/assignee/:issueId`, auth.isAuthorized, controller.addAssignee);

    app.post(`${baseUrl}/search`, auth.isAuthorized, controller.searchIssue);

    app.post(`${baseUrl}/createcomment`, auth.isAuthorized, controller.createComment);

    app.put(`${baseUrl}/editcomment/:commentId`, auth.isAuthorized, controller.editComment);

    app.post(`${baseUrl}/deletecomment/:commentId`, auth.isAuthorized, controller.deleteComment);

    app.get(`${baseUrl}/comments/:issueId`, auth.isAuthorized, controller.getAllComments);

    //app.get(`${baseUrl}/:eventId/status`, auth.isAuthorized, controller.status);

    app.post(`${baseUrl}/numOfDays`, auth.isAuthorized, controller.numOfDays);

    //app.get(`${baseUrl}/comments/:issueId/:userId`, auth.isAuthorized, controller.commentsOfUser);

    app.post(`${baseUrl}/uploads`, multer.upload.single('file'), multer.uploadFile);

    app.get(`${baseUrl}/allFiles`, multer.getAllFiles);

    app.get(`${baseUrl}/file/:fileName`, multer.getSingleFile);

    app.get(`${baseUrl}/downloadFile/:fileName`, multer.downloadFile);

    app.post(`${baseUrl}/delete/:id`, multer.deleteFile);
}