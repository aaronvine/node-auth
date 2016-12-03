module.exports = function (app, passport) {

    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    app.get('/login', function (req, res) {
        console.log('redirecting to login page...');
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));

    app.get('/profile', function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.render('login.ejs');
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
