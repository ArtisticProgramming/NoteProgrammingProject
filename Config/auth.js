import { google } from "../Uitlity/Keyes";
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
export default (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: google.ClientID,
            clientSecret: google.Clientsecret,
            callbackURL: google.CallBackURL
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};