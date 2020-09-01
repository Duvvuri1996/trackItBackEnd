const passport = require('passport');
const mongoose = require('mongoose');
const time = require('../app/libs/time');
const GoogleStrategy = require('passport-google-oauth20');

const User = require('../app/models/socialUserModel');

const logger = require('../app/libs/logger');
const check = require('../app/libs/check');

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
    clientID : "548152252166-ib6vh2p329pur33nijhc1ms00ip9aual.apps.googleusercontent.com",
    clientSecret : "CmsrvgQqGu2XSq7J-sm2-FCj",
    callbackURl: "auth/google/callback",
    proxy: true
}, 
function(accessToken, refreshToken, profile, cb){
    for(let x of profile.emails){
        var email = x.value
    }
    User.findOne({ userId : profile.id })
    .exec((err, userDetails) => {
        if(err) {
            logger.error(err.message, "Unknown error at passport find() function", 10)
            cb(err, null)
        } else if(check.isEmpty(userDetails)){
            let newUser = new User ({
                userId : profile.id,
                firstName : profile.name.givenName,
                lastName : profile.name.familyName,
                email : email,
                createdOn : time.now()
            })
            newUser.save((user) => {
                cb(null, user)
            })
            
        } else { 
            cb(null, userDetails)
        }
    })
}))