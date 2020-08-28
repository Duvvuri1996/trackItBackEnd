const mongoose = require('mongoose');

const shortid = require('shortid');
const authModel = require('../models/authModel');
const userModel = require('../models/userModel');
const socialModel = require('../models/socialUserModel');
const paramsLib = require('../libs/params');
const passwordLib = require('../libs/password');
const timeLib = require('../libs/time');
const tokenLib = require('../libs/token');
const logger = require('../libs/logger');
const check = require('../libs/check');
const time = require('../libs/time');
const mail = require('../libs/mail');
const nodemailer = require('nodemailer')

let signUpUser = (req,res) => {

    let validateParams = () => {
        return new Promise((resolve, reject) => {
            if(req.body.userEmail) {
                if(!paramsLib.email(req.body.userEmail)) {
                    logger.error("Email does not meet the requirements", "Signup function", 10)
                    let apiResponse = response.generate(true, 'Email does not meet the requirement',400, null)
                    reject(apiResponse)
                } else if(check.isEmpty(req.body.userEmail) || check.isEmpty(req.body.userPassword)) {
                    logger.error("Password/Email parameter(s) missing", "Signup function", 7)
                    let apiResponse = response.generate(true, "Password/Email parameter(s) missing", 404, null)
                    reject(apiResponse)
                } else {
                    resolve(req)
                }

            }
        })
    } //end of validateParams function in signup function

    let createUser = () => {
        return new Promise((resolve, reject) => {
            userModel.findOne({userEmail : req.body.userEmail})
            .exec((err, userDetails) => {
                if(err) {
                    logger.error(err, "createUser() in signup function", 10)
                    let apiResponse = response.generate(err, "Error occured in finding user", 404, null)
                    reject(apiResponse)
                } else if(check.isEmpty(userDetails)) {
                    let newUser = {
                        userId : shortid.generate(),
                        firstName : req.body.firstName,
                        lastName : req.body.lastName,
                        fullName : `${firstName} ${lastName}`,
                        userEmail : req.body.userEmail,
                        userPassword : passwordLib.hashPassword(req.body.userPassword),
                        mobileNumber : req.body.mobileNumber,
                        country : req.body.country
                    }
                    newUser.save((err, user) => {
                        if(err) {
                            logger.error(err, "createUser() in signup function", 5)
                            let apiResponse = response.generate(true, "User not created", 500, null)
                            reject(apiResponse)
                        } else {
                            logger.info("User created successfully", "createUser() in signup", 10)
                            let userDetailsObj = user.toObject()
                            resolve(userDetailsObj)
                        }
                    })
                } else {
                    logger.error("User cannot be created, as user is already present", "createUser() in signup", 6)
                    let apiResponse = response.generate(true, "User cannot be created, user already present", null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetailsObj) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateJwt(userDetailsObj, (err, tokenDetails) => {
                if(err) {
                    logger.error(err, "generateToken() in signup()", 10)
                    let apiResponse = response.generate(true, "Token generation failed", 500, null)
                    reject(apiResponse)
                } else {
                    logger.info("Token generated successfully", "generateToken() in signup()", 10)
                    tokenDetails.userId = userDetailsObj.userId
                    tokenDetails.userDetails = userDetailsObj
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            authModel.findOne({ userId : tokenDetails.userId})
            .exec((err, foundTokenDetails) => {
                if(err) {
                    logger.error(err, "saveToken() in signup()", 10)
                    let apiResponse = response.generate(true, "Failed to find token details", null)
                    reject(apiResponse)
                } else if(check.isEmpty(foundTokenDetails)) {
                    let newAuthToken = {
                        userId : foundTokenDetails.userId,
                        authToken : foundTokenDetails.token,
                        tokenSecret : foundTokenDetails.tokenSecret,
                        tokenGenertionTime : time.now()
                    }
                    newAuthToken.save((err, newTokenDetails) => {
                        if(err) {
                            logger.error(err, "saveToken() in signup()", 7)
                            let apiResponse = response.generate(true, "Unable to save token", 500, null)
                            reject(apiResponse)
                        } else {
                            logger.info("Token saved successfully", "saveToken() in singup()", 10)
                            let responseBody = {
                                authToken : newTokenDetails.authToken,
                                userDetails : foundTokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                } else {
                    foundTokenDetails.authToken = tokenDetails.token
                    foundTokenDetails.userId = tokenDetails.userId
                    foundTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    foundTokenDetails.tokenGenertionTime = tokenDetails.tokenGenertionTime
                    foundTokenDetails.save((err, newTokenDetails) => {
                        if(err) {
                            logger.error(err, "saveToken() in signup()", 5)
                            let apiResponse = response.generate(true, "Unable to save token", 500, null)
                            reject(apiResponse)
                        } else{
                            logger.info("Successfully saved token details", "saveToken() in signup()", 7)
                            let responseBody = {
                                authToken : newTokenDetails.authToken,
                                userDetails : foundTokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    } //saveToken() end

    validateParams(req, res)
    .then(validateParams)
    .then(createUser)
    .then(generateToken)
    .then(saveToken)
    .then((resolve) => {
        let apiResponse = response.generate(false, "Signup successfull", 200, resolve)
        res.status(200).send(apiResponse)
    })
    .catch((err) => {
        res.send(err)
    })
} //signup() end

//start signInUser()
let signInUser = (req, res) => {

    let findUser = () => {
        //console.log('findUser function is called')
        return new Promise((resolve, reject) => {
            if (req.body.userEmail) {
                //console.log(req.body)
                userModel.findOne({
                        userEmail: req.body.userEmail
                    })
                    .exec((err, userDetails) => {
                        if (err) {
                            logger.error(err, "findUser() in loginFunction()", 10)
                            let apiResponse = response.generate(true, "Failed to find user", 500, null)
                            reject(apiResponse)
                        } else if (check.isEmpty(userDetails)) {
                            let apiResponse = response.generate(true, "No user Found", 404, null)
                            reject(apiResponse)
                        } else {
                            logger.info('User Found', 'userController: findUser()')
                            resolve(userDetails)
                        }
                    })
            } else {
                let apiResponse = response.generate(true, "Email parameter is missing in the body parameter", 400, null)
                reject(apiResponse)
            }

        })
    } //end findUser function

    let validatePasswordInput = (retrievedUserDetails) => {
        //console.log(retrievedUserDetails + 'retrievedUserDetails is called')
        //console.log(req.body.password + 'is called')
        //console.log("validatePasswordInput is called")
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(req.body.userPassword, retrievedUserDetails.userPassword, (err, isMatch) => {
                if (err) {
                    let apiResponse = response.generate(true, "Login failed", 500, null)
                    reject(apiResponse)
                } else if (isMatch) {
                    let userDetails = retrievedUserDetails.toObject()
                    delete userDetails.userPassword
                    delete userDetails._id
                    delete userDetails._v
                    delete userDetails.createdOn
                    delete userDetails.modifiedOn
                    resolve(userDetails)
                } else {
                    logger.info('Login Failed Due To Invalid Password', 'userController: validatePasswordInput')
                    let apiResponse = response.generate(true, "Invalid login password", 400, null)
                    reject(apiResponse)
                }
            })
        })
    } //end validatePasswordInput function

    let generateToken = (userDetails) => {
        //console.log("Generate token is called")
        return new Promise((resolve, reject) => {
            token.generateJwt(userDetails, (err, tokenDetails) => {
                if (err) {
                    logger.error("Failed to generate token", "generateToken()", 10)
                    let apiResponse = response.generate(true, "Failed to generate token", 500, null)
                    reject(apiResponse)
                } else {
                    logger.info("Successfull", "generateToken()")
                    tokenDetails.userId = userDetails.userId;
                    tokenDetails.userDetails = userDetails;
                    resolve(tokenDetails)
                }
            })
        })
    } //end generateToken function

    let saveToken = (tokenDetails) => {
        console.log("SaveToken function is called")
        return new Promise((resolve, reject) => {
            authModel.findOne({
                userId: tokenDetails.userId
            }, (err, foundTokenDetails) => {
                if (err) {
                    let apiResponse = response.generate(true, "Failed to find userId", 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(foundTokenDetails)) {
                    let newAuthToken = new authModel({
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenarationTime: time.now(),
                        isAdmin: tokenDetails.isAdmin
                    })
                    newAuthToken.save((err, newToken) => {
                        if (err) {
                            let apiResponse = response.generate(true, "Failed to create new token", 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newToken.authToken,
                                userDetails: tokenDetails.userDetails,
                            }
                            
                            resolve(responseBody)
                            console.log("Token saved")
                        }
                    })
                } else {
                    foundTokenDetails.authToken = tokenDetails.token
                    foundTokenDetails.userId = tokenDetails.userId
                    foundTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    foundTokenDetails.tokenGenarationTime = tokenDetails.tokenGenarationTime
                    foundTokenDetails.isAdmin = tokenDetails.isAdmin

                    foundTokenDetails.save((err, newToken) => {
                        if (err) {
                            let apiResponse = response.generate(true, "Failed to update newToken", 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newToken.authToken,
                                userDetails: tokenDetails.userDetails,

                            }
                            resolve(responseBody)
                            console.log("Token saved")
                        }
                    })

                }
            })
        })
    } //end saveToken function

    findUser(req, res)
        .then(validatePasswordInput)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Login successfull", 200, resolve)
            res.status(200)
            res.send(apiResponse)
            //console.log(resolve.authToken)
        })
        .catch((err) => {
            res.send(err)
        })
} //end login function

//start logout function
let logout = (req, res) => {
    authModel.findOneAndRemove({
        userId: req.user.userId
    }, (err, userDetails) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'logout Function', 10)
            let apiResponse = response.generate(true, `error occurred at: ${err.message}`, 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(userDetails)) {
            let apiResponse = response.generate(true, 'Logged Out or Invalid UserId', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Logged Out Successfully', 200, null)
            res.send(apiResponse)
            userDetails.onlineStatus = "offline"
        }
    })
} //end logout function

let recoveryMail = (req,res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            userModel.findOne({userEmail : req.body.userEmail})
            .exec((err, userDetails) => {
                if (err) {
                    logger.error(err, "findUser() in recoveryMail", 10)
                    let apiResponse = response.generate(true, "Unexpected error occurred in finding user", 404, null)
                    reject(apiResponse)
                } else if (check.isEmpty(userDetails)) {
                    logger.error('No User Found', 'generateToken()', 7)
                    let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                    reject(apiResponse)
                } else {
                    logger.info('User Found', 'userController: findUser()', 10)
                    resolve(userDetails)
                }
            })
        })
    }

    let generateRecoveryToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateJwt(userDetails, (err, tokenDetails) => {
                if (err) {
                    logger.error(err, "generateRecoveryToken() in recoveryMail()", 7)
                    let apiResponse = response.generate(true, 'Unexpected error occured', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    userDetails.recoveryToken = tokenDetails.token
                    userDetails.save((err, updatedDetails) => {
                        if(err) {
                            logger.error(err, "generateRecoveryToken() in recoveryMail()", 3)
                            let apiResponse = response.generate(true, "Failed to save userDetails", 500, null)
                            reject(apiResponse)
                        } else {
                            console.log(updatedDetails.recoveryToken)
                            resolve(updatedDetails)
                        }
                    })
                }
            })
        })
    }

    let sendMail = (updatedDetails) => {
        return new Promise((resolve, reject) => {
            let transporter = mail.transporter
            let mailOptions = mail.sendMail(updatedDetails)
            mailOptions.subject = "Reset Password"
            mailOptions.html = `<h4>Hi ${userDetails.fullName}<h4>
            <p>You are receiving this because you have requested the reset of the password for your account.<br>
                <br>'Please click on the following link to complete the process.'<br>
                <br> <a href="http://localhost:4200/resetpassword/${userDetails.recoveryToken}">Reset Password</a>
            </p>
            <p>
            <br>If You have'nt initiated this request please ignore<br>
            <br>Thank you<br>
            </p>`
            console.log(mailOptions)
            transporter.sendMail(mailOptions, (err, info) => {
                if(err) {
                    logger.error(err, "sendMail() in recoveryMail()", 10)
                    let apiResponse = response.generate(true, "Unexpected error occured", 500, null)
                    reject(apiResponse)
                } else {
                    resolve(info)
                }
            })
        })
    }

    findUser(req,res)
    .then(generateRecoveryToken)
    .then(sendMail)
    .then((resolve) => {
        let apiResponse = response.generate(false, "Mail sent successfully", 200, resolve)
        res.send(apiResponse)
    })
    .catch((err) => {
        res.send(err)
    })
}

let resetPassword = (req, res) => {
    let findUser = () => {
        //console.log(req.body)
        return new Promise((resolve, reject) => {
            if (req.body.recoveryToken) {
                userModel.findOne({
                    recoveryToken: req.body.recoveryToken
                }, (err, userTokenDetails) => {
                    console.log(userTokenDetails)
                    if (err) {
                        console.log(err)
                        logger.error('Failed To Retrieve User Data', 'findUser() in resetPassword()', 10)
                        let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userTokenDetails)) {
                        /* generate the response and the console error message here */
                        logger.error('No User Found', 'findUser()', 7)
                        let apiResponse = response.generate(true, 'No User Details Found', 404, null)
                        reject(apiResponse)
                    } else {
                        /* prepare the message and the api response here */
                        logger.info('User Found', 'findUser() in resetPassword()', 10)
                        resolve(userTokenDetails)
                    }
                })
            } else {
                logger.error("ValidationToken parameter is missing", "findUser() in resetPassword()", 3)
                let apiResponse = response.generate(true, '"validationToken" parameter is missing', 400, null)
                reject(apiResponse)
            }
        })
    }

    let updateResetPassword = (userTokenDetails) => {
        return new Promise((resolve, reject) => {
            let options = {
                password: passwordLib.hashPassword(req.body.password),
                recoveryToken:'Null'
            }
            userModel.update({ 'userId': userTokenDetails.userId }, options).exec((err, result) => {
                if (err) {
                    console.log(err)
                    logger.error(err.message, 'updateResetPassword function', 10)
                    let apiResponse = response.generate(true, 'Failed To reset user Password', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(result)) {
                    logger.info('No User Found with given Details', 'updateResetPassword function')
                    let apiResponse = response.generate(true, 'No User Found', 404, null)
                    reject(apiResponse)
                } else {
                    let apiResponse = response.generate(false, 'Password Updated successfully', 200, result)
                    resolve(apiResponse)
                }
            })
        })
    }
    findUser(req, res)
    .then(updateResetPassword)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Password reset successful...please login to continue", 200, null)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
}

let getAllUsers = (req, res) => {
    userModel.find()
    .select(' -__v -_id -userPassword')
    .lean()
    .exec((err, result) => {
        if(err) {
            logger.error(err.message, 'getAllUsers() function', 10)
                let apiResponse = response.generate(true, "Failed to find user", 404, null)
                res.send(apiResponse)
        } else if(check.isEmpty(result)) {
            logger.info('No user Found', 'getAllUser')
                let apiResponse = response.generate(true, "No user found", 500, null)
                res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, "All user details found", 200, result)
                res.send(apiResponse)
        }
    })
}

let getAllUsersCount = (req, res) => {
    userModel.count()
    .exec((err, result) => {
        if(err) {
            logger.error(err.message, 'getAllUsersCount() function', 10)
            let apiResponse = response.generate(true, "Failed to retrieve users data", 404, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)) {
            logger.info('No user found', 'getAllUsersCount() function')
            let apiResponse = response.generate(true, "No user found", 500, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, "Count retrieved of all normal users", 200, result)
            res.send(apiResponse)
        }
    }) 
}

let singleUser = (req,res) => {
    userModel.findOne({
        'userId': req.params.userId
    })
    .select('-userPassword -__v -_id')
    .lean()
    .exec((err, result) => {
        if (err) {
            logger.error(err.message, 'error in singleUser() function', 10)
            let apiResponse = response.generate(true, "Failed to find user", 404, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.error('No user Found', 'singleUser() function', 7)
            let apiResponse = response.generate(true, "No user found", 500, null)
            res.send(apiResponse)
        } else {
            logger.info("User found", "singleUser() function", 10)
            let apiResponse = response.generate(false, "User with specified userId found", 200, result)
            res.send(apiResponse)
        }
    })
}
let SocialUsers = (req, res) => {
    
}

module.exports = {
    signUpUser : signUpUser,
    signInUser : signInUser,
    resetPassword : resetPassword,
    recoveryMail : recoveryMail,
    logout : logout,
    getAllUsers : getAllUsers,
    getAllUsersCount : getAllUsersCount,
    singleUser : singleUser,
    SocialUsers : SocialUsers
}