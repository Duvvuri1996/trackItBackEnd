const express = require('express');
const config = require('/home/sowmya/trackIt/trackItBackEnd/config/config');
const auth = require('../middlewares/auth');
const controller = require('../controllers/issue');
const { base } = require('../models/comment');

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

    app.put(`${baseUrl}/deletecomment/:commentId`, auth.isAuthorized, controller.deleteComment);

    app.get(`${baseUrl}/comments/:issueId`, auth.isAuthorized, controller.getAllComments);

    //app.get(`${baseUrl}/:eventId/status`, auth.isAuthorized, controller.status);

    app.get(`${baseUrl}/numOfDays`, auth.isAuthorized, controller.numOfDays);

    //app.get(`${baseUrl}/comments/:issueId/:userId`, auth.isAuthorized, controller.commentsOfUser);


}