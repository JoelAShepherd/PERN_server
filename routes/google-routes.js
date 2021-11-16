const express = require('express');
const passport = require('passport');

const googleRouter = require('express').Router()

const successLoginURL = "http://localhost:8080/login/success";
const errorLoginURL = "http://localhost:8080/errorOnGoogleLogin";

googleRouter.get('/login', passport.authenticate("google", 
{ scope: ["profile", "email"]}));

googleRouter.get('/callback', 
    passport.authenticate("google", 
    {failureMessage: "Cannot login with Google right now...",
    failureRedirect: errorLoginURL,
    successRedirect: successLoginURL
}), (req, res) =>{
    console.log("User in google callback: ", req.user)
    res.send("Feedback from google login")
})


module.exports = googleRouter;