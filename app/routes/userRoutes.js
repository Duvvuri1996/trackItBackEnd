const express = require('express');
const config = require('/home/sowmya/trackIt/trackItBackEnd/config/config');
const auth = require('../middlewares/auth');
const controller = require('../controllers/user');
const passport = require('passport');

module.exports.setRouter = (app) => {

    let baseUrl = `${config.apiVersion}/user`

    app.post(`${baseUrl}/signup`, controller.signUpUser);

    app.post(`${baseUrl}/signin`, controller.signInUser);

    app.post(`${baseUrl}/resetpassword`, controller.resetPassword);

    app.post(`${baseUrl}/recoverymail`, controller.recoveryMail);

    app.post(`${baseUrl}/logout`,auth.isAuthorized ,controller.logout);

    app.get(`${baseUrl}/allusers`, auth.isAuthorized, controller.getAllUsers);

    app.get(`${baseUrl}/alluserscount`, auth.isAuthorized, controller.getAllUsersCount);

    app.get(`${baseUrl}/singleuser/:userId`, auth.isAuthorized, controller.singleUser);

    app.get(`${baseUrl}/allSocialUsers`, auth.isAuthorized, controller.SocialUsers);

    app.get('/auth/google/', passport.authenticate('google', { scope: ['profile', 'email']}));

    app.get('/auth.google/callback', passport.authenticate('google'), (req, res) => {
        let responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
         responseHTML = responseHTML.replace('%value%', JSON.stringify({
        user: req.user
    }));
    res.status(200).send(responseHTML)
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

    app.get('/api/logout', (req, res) => {
        res.send(req.logout())
    })

}