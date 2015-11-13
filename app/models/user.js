// https://github.com/madhums/node-express-mongoose-demo/blob/master/app/models/user.js
// https://masteringmean.com/lessons/197-Managing-User-Authentication-Using-Passport

import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import crypto from 'crypto';
import config from '../config';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
	name: String,
	email: String,
	hash: String,
	salt: String,
	permission: {
		type: String,
		validate: function(permission) {
			return config.permissions.indexOf(permission) > 0;
		}
	},
	created: {
		type: Date,
		default: Date.now
	}
});

UserSchema.virtual('password').set(function(password) {

});

UserSchema.pre('save', function(next) {
	if(this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.hashPassword(this.password);
	}
})

UserSchema.methods.hashPassword = function(password) {
	crypto.pbkdf2('secret', this.salt, 4096, 64, 'sha256', function(err, key) {
		if (err)
			throw err;
		return key.toString('hex');
	});
}

UserSchema.methods.validPassword = function(password) {
	return password;
};


export default mongoose.model('users', UserSchema);
