import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

let Schema = mongoose.Schema;

let User = new Schema({
	email: String,
	password: String
});

// TODO hashing w/ crypto

export default mongoose.model('users', User);
