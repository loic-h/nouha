import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

let Schema = mongoose.Schema;

let User = new Schema({
	email: String,
	password: String
});

// TODO hashing w/ crypto
User.methods.validPassword = function(password) {
	return password;
};


export default mongoose.model('users', User);
