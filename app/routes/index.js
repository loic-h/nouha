import express from 'express';
import {ensureAuthenticated} from '../auth';
import Busboy from 'busboy';
import config from '../config';
import {inspect} from 'util';
import fs from 'fs';
import path from 'path';
import Image from '../models/image';

const router = express.Router();

router.get('/', ensureAuthenticated, function (req, res) {
	res.render('index');
});

router.post('/upload', function (req, res) {

	let bboy = new Busboy({ headers: req.headers });

	bboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
		if(fieldname !== 'images' && mimetype !== 'image/jpeg') {
			return;
		}

		const image = new Image({
			name: filename,
			_user: req.user._id
		});
		image.getHash();

		file.on('end', () => {
			image.save(function(err) {
				if(err) {
					console.log(err);
				}
			});
		});
		const to = path.join(config.path.images, image.getHashedName());
		file.pipe(fs.createWriteStream(to));

	});

	bboy.on('finish', function () {
		res.send('finish');
	});

	req.pipe(bboy);
});

export default router;
