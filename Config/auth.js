const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: "587167700911-t4216j1jmp96smjejjj6mdo09seubv30.apps.googleusercontent.com",
            clientSecret: "YiOwqXAHuR0NIeay_nkCTpNS",
            callbackURL: "/auth/google/redirect"
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};