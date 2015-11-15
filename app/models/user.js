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
	this.hash = this.hashPassword(this.password);
	next();
});

UserSchema.path('email').validate(function(email, fn) {
	fn(!!email.length);
}, 'L\'email est obligatoire');

UserSchema.path('email').validate(function(email, fn) {
	fn(validator.isEmail(email));
}, 'L\'adresse email n\'est pas valide');

UserSchema.path('email').validate(function(email, fn) {
	mongoose.models["users"].findOne({email : email},function(err, user) {
		fn(!(user || err));
	});
}, 'Cette adresse email est déjà utilisée');



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
