import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user';

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, done) {
		done(err, user);
	});
});

passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	},
	function (username, password, done) {

		User.findOne({ username: username }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username'});
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password'});
			}
			return done(null, user);
		})
	}
));