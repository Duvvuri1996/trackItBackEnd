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

let searchIssue = (req, res) => {
    issueModel.find({ $text : { $search : req.body.search } }).limit(10).exec((err, docs) => {
        if(err) {
            logger.error(err.message, "Error occured at searchIssue() function", 10)
            let apiResponse = response.generate(true, "Unknown error occured", 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(docs)) {
            logger.error("docs are empty", "at searchIssue() function", 7)
            let apiResponse = response.generate(true, "docs are empty", 404, null)
            res.send(apiResponse)
        } else {
            logger.info("Docs found", "at searchIssue() function", 10)
            let apiResposne = response.generate(false, "Docs found", 200, docs)
            res.send(apiResponse)
        }
    })
}

let createComment = (req, res) => {
    let newComment = {
        commentId : shortid.generate(),
        reporterId : req.body.reporterId,
        reporterName : req.body.reporterName,
        issueId : req.body.issueId,
        comment : req.body.comment,
        createdOn : timeLib.now()
    }
    newComment.save((err, result) => {
        if(err) {
            logger.error(err.message, "Error occured at createComment() function", 10)
            let apiResponse = response.generate(true, "Unknown error occured", 500, null)
            res.send(apiResponse)
        } else {
            logger.info("Comment created successfully", "at createComment() function", 10)
            let apiResposne = response.generate(false, "Comment created successfullu", 200, result)
            res.send(apiResponse)
        }
    })
}

let editComment = (req, res) => {
    commentModel.findOne({ commentId : req.params.commentId })
    .exec((err, details) => {
        if(err) {
            logger.error(err.message, "Error occured at editComment() function", 10)
            let apiResponse = response.generate(true, "Unknown error occured in finding comment", 500, null)
            res.send(apiResponse)
        } else {
            commentModel.updateOne({ comment : req.body.comment })
            .exec((err, result) => {
                if(err) {
                    logger.error(err.message, "Error occured at editComment() function", 7)
                    let apiResponse = response.generate(true, "Unknown error occured in updating comment", 500, null)
                    res.send(apiResponse)
                } else {
                    logger.info("Successfully updated comment", "at editComment() function", 10)
                    let apiResponse = response.generate(false, "Successfully updated comment", 200, result)
                    res.send(apiResponse)
                }
            })
        }
    })
}

let deleteComment = (req, res) => {
    commentModel.deleteOne({ commentId : req.params.commentId })
    .exec((err, result) => {
        if(err) {
            logger.error(err.message, "Error occured at deleteComment() function", 7)
            let apiResponse = response.generate(true, "Unknown error occured in deleteing comment", 500, null)
            res.send(apiResponse)
        } else {
            logger.info("Successfully deleted comment", "at deleteComment() function", 10)
            let apiResponse = response.generate(false, "Successfully deleted comment", 200, null)
            res.send(apiResponse)
        }
    })
}

let getAllComments = (req, res) => {
    commentId.find({ issueId : req.params.issueId })
    .exec((err, commentDetails) => {
        if(err) {
            logger.error(err.message, "Error occured at getAllComments() function", 7)
            let apiResponse = response.generate(true, "Unknown error occured", 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(commentDetails)) {    
                logger.error("Details are empty", "at getAllComments() function", 7)
                let apiResponse = response.generate(true, "Details are empty", 404, null)
                res.send(apiResponse)
        } else {
            logger.info("All details found", "at getAllComments() function", 10)
            let apiResponse = response.generate(false, "All details found successfully", 200, commentDetails)
            res.send(apiResponse)
        }
    })
}

let numOfDays = (req, res) => {
    issueModel.findOne({ issueId : req.body.issueId }, (err, details) => {
        if(err) {
            logger.error(err.message, "Error occured at numOfDays() function", 7)
            let apiResponse = response.generate(true, "Unknown error occured", 500, null)
            res.send(apiResponse)
        }else {
            if(details.createdOn) {
                let date1 = details.createdOn
                let date2 = new Date()
                function diff(d1, d2) {
                    return Math.round((d2-d1)/(1000*60*60*24))
                }
                if(date2.getDate() > date1.getDate()){
                    let numDays = diff(date1, date2)
                    let apiResponse = response.generate(false, "NumDays", 200, numDays)
                    res.send(apiResponse)
                    
                } else {
                    let hours1 = date1.getHours()
                    let hours2 = date2.getHours()
                    if(hours2 > hours1){
                        let numDays = (hours2-hours1)+1
                        let apiResponse = response.generate(false, "NumDays", 200, numDays)
                        res.send(apiResponse)
                    } else {
                        let minutes1 = date1.getMinutes()
                        let minutes2 = date2.getMinutes()
                        let apiResponse = response.generate(false, "NumDays", 200, numDays)
                        res.send(apiResponse)
                    }

                }
            } else {
                logger.error("CreatedOn doesnot exists", "at numDays()", 3)
                let apiResponse = response.generate(true, "CreatedOn doesnot exists", 404, null)
                res.send(apiResponse)
            }
        }
    })
}