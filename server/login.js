import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({ username: username }, function(err, user) {
		if (err) { return done(err); }
		if (!user) {
			return done(null, false, { message: 'Incorrect username.' });
		}
		if (!user.validPassword(password)) {
			return done(null, false, { message: 'Incorrect password.' });
		}
		return done(null, user);
		});
	}
));