const passport = require('passport');
require('./strategies/local.strategy')();

function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    // Store in user session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Retrieves the user from session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

module.exports = passportConfig;
