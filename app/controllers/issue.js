const mongoose = require('mongoose');

const shortid = require('shortid');
const authModel = require('../models/authModel');
const userModel = require('../models/userModel');
const socialModel = require('../models/socialUserModel');
const issueModel = require('../models/issueModel');
const commentModel = require('../models/comment');
const watcherModel = require('../models/watcher');
const paramsLib = require('../libs/params');
const passwordLib = require('../libs/password');
const timeLib = require('../libs/time');
const tokenLib = require('../libs/token');
const logger = require('../libs/logger');
const check = require('../libs/check');
const time = require('../libs/time');
const mail = require('../libs/mail');
const nodemailer = require('nodemailer');
const response = require('../libs/response');

let createIssue = (req, res) => {
    let today = new Date()
    let newIssue = {
        issueId : shortid.generate(),
        userId : req.body.userId,
        assigneeId : req.body.assigneeId,
        userName : req.body.userName,
        assigneeName : req.body.assigneeName,
        issueTitle : req.body.issueTitle,
        issueDescription : req.body.issueDescription,
        image : req.body.image,
        createdOn : today
    }
    newIssue.save((err, result) => {
        if (err) {
            logger.error(err.message, "createIssue() function", 10)
            let apiResponse = response.generate(true, "Failed to create event", 404, null)
            res.send(apiResponse)
        } else {
           logger.info("Issue created successfully", "createIssue() function", 10)
           let apiResponse = response.generate(false, "Issue creeated succesfully", 200, result)
           res.send(apiResponse)
        }
    })
}

let deleteIssue = (req, res) => {
    issueModel.findOneAndDelete({issueId : req.params.issueId})
    .exec((err, result) => {
        if(err) {
            logger.error(err.message, "deleteIssue() function", 10)
            let apiResponse = response.generate(true, "Unknown error occured", 500, null)
            res.send(apiResponse)
        } else {
            logger.info("Issue deleted successfully", "deleteIssue() function", 10)
            let apiResponse = response.generate(fasle, "Issue deleted successfully", 200, "deleted")
            res.send(apiResponse)
        }
    })
}

let editIssue = (req, res) => {
    let options = req.body
    issueModel.updateOne({ issueId : req.params.issueId}, options)
    .exec((err, result) => {
        if(err) {
            logger.error(err.message, "Error occured at editIssue() function", 10)
            let apiResponse = response.generate(true, "Unknown error occurred", 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)) {
            logger.error("No issue found to update", "Error occured at editIssue() function", 7)
            let apiResponse = response.generate(true, "No issue found to update", 404, null)
            res.send(apiResponse)
        } else {
            result.modifiedOn = new Date()
            logger.info("Issue updated successfully", "Success at editIssue() function", 10)
            let apiResponse = response.generate(fasle, "Issue updated successfully", 200, result)
            res.send(apiResponse)
        }
    })
}

let getAllIssues = (req, res) => {
    issueModel.find()
    .lean()
    .exec((err, allIssues) => {
        if(err) {
            logger.error(err.message, "Error occured at getAllIssues() function", 10)
            let apiResponse = resposne.generate(true, "Unknown error occured", 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(allIssues)) {
            logger.error("No issues found", "at getAllIssues() function", 7)
            let apiResponse = response.generate(true, "No issues found", 404, null)
            res.send(apiResponse)
        } else {
            logger.info("All issues found", "at getAllIssues() function", 10)
            let apiResponse = response.generate(false, "All issues found", 200, allIssues)
            res.send(apiResponse)
        }
    })
}

let singleIssue = (req, res) => {
    issueModel.findOne({issueId : req.params.issueId})
    .exec((err, issueDetails) => {
        if(err) {
            logger.error(err.message, "Error occurred at singleIssue() function", 10)
            let apiResponse = resposne.generate(true, "Unknown error occured", 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(issueDetails)) {
            logger.error("issueDetails are empty", "error at singleIssue() function", 7)
            let apiResposne = resposne.generate(true, "issueDetails are empty", 404, null)
            res.send(apiResponse)
        } else {
            logger.info("Issue found successfully", "at singleIssue() function", 10)
            let apiResposne = response.generate(false, "Issue found successfully", 200, issueDetails)
            res.send(apiResponse)
        }
    })
}

let getAllIssuesByuserId = (req, res) => {
    issueModel.findOne({userId : req.params.userId})
    .exec((err, issueDetails) => {
        if(err) {
            logger.error(err.message, "Error occurred at getAllIssuesByuserId() function", 10)
            let apiResponse = response.generate(true, "Unknown error occured", 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(issueDetails)) {
            logger.error("issueDetails are empty", "at getAllIssuesByuserId() function",7)
            let apiResponse = response.generate(true, "issueDetails are empty", 404, null)
            res.send(apiResponse)
        } else {
            logger.info("Details found successfully", "at getAllIssuesByuserId() function", 10)
            let apiResponse = response.generate(false, "Details found successfully", 200, issueDetails)
            res.send(apiResponse)
        }
    })
}

let getAllIssuesByassineeId = (req, res) => {
    issueModel.findOne({assigneeId : reqq.params.assigneeId})
    .exec((err, issueDetails) => {
        if(err) {
            logger.error(err.message, "Error occurred at getAllIssuesByassineeId() function", 10)
            let apiResponse = response.generate(true, "Unknown error occured", 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(issueDetails)) {
            logger.error("issueDetails are empty", "at getAllIssuesByassineeId() function",7)
            let apiResponse = response.generate(true, "issueDetails are empty", 404, null)
            res.send(apiResponse)
        } else {
            logger.info("Details found successfully", "at getAllIssuesByassineeId() function", 10)
            let apiResponse = response.generate(false, "Details found successfully", 200, issueDetails)
            res.send(apiResponse)
        }
    })
}

let watchIssue = (req, res) => {
    let newWatch = {
        watchId : shortid.generate(),
        issueId : req.body.issueId,
        userId : req.body.userId
    }
    newWatch.save((err, result) => {
        if(err) {
            logger.error(err.message, "Error occurred at watchIssue() function", 10)
            let apiResponse = response.generate(true, "Unknown error occured", 500, null)
            res.send(apiResponse)
        } else {
            logger.info("Successfully created watch", "at watchIssue() function", 10)
            let apiResponse = response.generate(false, "Successfully created watchIssue", 200, result)
            res.send(apiResponse)
        }
    })
}

let watchCount = (req, res) => {
    watcherModel.countDocuments({ issueId : req.params.issueId })
    .exec((err, count) => {
        if(err) {
            logger.error(err.message, "Error occurred at watchCount() function", 10)
            let apiResponse = response.generate(true, "Unknown error occured", 500, null)
            res.send(apiResponse)
        } else {
            logger.info("Successfully retrieved count", "at watchCount() function", 10)
            let apiResponse = response.generate(false, "Successfully retrieved count", 200, count)
            res.send(apiResponse)
        }
    })
}

let allWatchOfUser = (req, res) => {
    watcherModel.userId({ userId : req.params.userId })
    .exec((err, allDetails))
    if(err) {
        logger.error(err.message, "Error occurred at allWatchOfUser() function", 10)
        let apiResponse = response.generate(true, "Unknown error occured", 500, null)
        res.send(apiResponse)
    }
    else if(check.isEmpty(allDetails)) {
        logger.error("allDetails are empty", "at getAllIssuesByassineeId() function",7)
        let apiResponse = response.generate(true, "issueDetails are empty", 404, null)
        res.send(apiResponse)
    } else {
        logger.info("All details found", "at allWatchOfUser() function", 10)
        let apiResponse = response.generate(false, "All details found", 200, allDetails)
        res.send(apiResponse)
    }
}

