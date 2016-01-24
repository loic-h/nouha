import mongoose from 'mongoose';
import crypto from 'crypto';
import path from 'path';


let ImageSchema = new mongoose.Schema({
	name: String,
	hash: String,
	created: {
		type: Date,
		default: Date.now
	},
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	hash: String
});

ImageSchema.methods = {

	getHash(name, userId, date) {
		if(this.hash) {
			return this.hash;
		}
		name = name || this.name;
		date = date || this.created || Date.now();
		userId = userId || this._user.toString();
		this.hash = crypto
			.createHash('md5')
			.update(name)
			.update(date.toString())
			.update(userId)
			.digest('hex');
		return this.hash;
	},

	getHashedName(name, hash) {
		if(this.hashedName) {
			return this.hashedName;
		}
		name = name || this.name;
		hash = hash || this.hash;
		const ext = path.extname(this.name);
		this.hashedName = `${path.basename(this.name, ext)}.${this.hash}${ext}`;
		return this.hashedName;
	}
}


ImageSchema.pre('save', function(next) {
	this.hash = this.hash || this.getHash();
	next();
});

export default mongoose.model('images', ImageSchema);
