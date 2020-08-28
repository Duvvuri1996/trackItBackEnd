const express = require('express');
const config = require('/home/sowmya/trackIt/trackItBackEnd/config/config');
const auth = require('../middlewares/auth');
const controller = require('../controllers/user');

module.exports.setRouter = (app) => {

    let baseUrl = `${config.apiVersion}/user`

    app.post(`${baseUrl}/signup`, controller.signUpUser);

    app.post(`${baseUrl}/signin`, controller.signInUser);

    app.post(`${baseUrl}/resetpassword`,auth.isAuthorized, controller.resetPassword);

    app.post(`${baseUrl}/recoverymail`,auth.isAuthorized, controller.recoveryMail);

    app.post(`${baseUrl}/logout`, controller.logout);

    app.get(`${baseUrl}/allusers`, auth.isAuthorized, controller.getAllUsers);

    app.get(`${baseUrl}/alluserscount`, auth.isAuthorized, controller.getAllUsersCount);

    app.get(`${baseUrl}/singleuser/:userId`, auth.isAuthorized, controller.singleUser);

    app.get(`${baseUrl}/socialuser/:userId`, auth.isAuthorized, controller.SocialUsers);

}