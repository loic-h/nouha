import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

let Schema = mongoose.Schema;

let Account = new Schema({
	username: String,
	password: String
});

Account.plugin(passportLocalMongoose);

export default mongoose.model('accounts', Account);
