// https://github.com/madhums/node-express-mongoose-demo/blob/master/app/models/user.js
// https://masteringmean.com/lessons/197-Managing-User-Authentication-Using-Passport

import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import crypto from 'crypto';
import config from '../config';
import validator from 'validator';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
	name: String,
	email: String,
	hash: String,
	salt: String,
	permission: String,
	created: {
		type: Date,
		default: Date.now
	}
});

UserSchema.pre('save', function(next) {
	this.password = this.createPassword();
	this.salt = this.createSalt();
	this.hash = this.hashPassword(password);
	next();
});

UserSchema.path('email').validate(function(email, fn) {
	fn(!!email.length);
}, 'L\'email est obligatoire');

UserSchema.path('email').validate(function(email, fn) {
	fn(validator.isEmail(email));
}, 'L\'adresse amil n\'est pas valide');



UserSchema.methods = {
	hashPassword: function(password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	},

	validPassword: function(password) {
		return password;
	},

	createSalt: function() {
		return crypto.randomBytes(16).toString('base64');
	},

	createPassword: function(length = 6) {
		return crypto.randomBytes(Math.ceil(length/2))
			.toString('hex')
			.slice(0,length);
	}

};

function notEmpty(str) {
	return !!str.length;
}

function isEmail(str) {
	return validator.isEmail(str);
}


export default mongoose.model('users', UserSchema);
