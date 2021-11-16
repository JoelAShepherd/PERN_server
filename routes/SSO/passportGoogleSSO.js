//Google login in development

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const pool = require('../../database/db')
require('dotenv').config()

const googleCallbackURL = 'http://localhost:5000/google/callback'

passport.use(new GoogleStrategy({
    clientID: process.env.GoogleClientID,
    clientSecret: process.env.GoogleOAuthSecret,
    callbackURL: googleCallbackURL,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, cb) => {

    //create user object from Google profile info
    const defaultUser = {
        name: profile.name,
        email: profile.emails[0].value,
        googleID: profile.id
    }

    //check for user existance in database
    try{
        
        const user = await pool.query("SELECT * FROM users WHERE google_id = $1",
        [defaultUser.googleID])
        

        let newUser;

        if (user.rows.length !== 0){ //user from db has been returned
            console.log('user from db: ', user.rows[0])
            return cb(null, user.rows[0])
        } else { //no user in db
            newUser = await 
            pool.query("INSERT INTO users (user_name, user_email, google_id) VALUES ($1, $2, $3) RETURNING *",
            [defaultUser.name.givenName, defaultUser.email, defaultUser.googleID])
            console.log('New user entered into db: ', newUser.rows[0])
            return cb(null, newUser.rows[0])
        }

        

    } catch (err){
        console.log('google get user error', err)
        cb(err, null)
    }



}

))

passport.serializeUser((user, cb) => {
    console.log('Serializing user', user);
    cb(null, user.user_id)
})

passport.deserializeUser(async (id, cb) => {
    console.log('deserializing user', id);
    try{
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1",
         [id]);
        console.log('deserialized user: ', user)
        if(user) cb(null, user);
    } catch (err){
        console.log('err deserializing user', err)
        cb(err, null)
    }
})
