import express from 'express';
import {ensureAuthenticated} from '../auth';
import multer from 'multer';
import config from '../config';

const router = express.Router();
const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, done) {
			done(null, config.path.images);
		},
		filename: function (req, file, done) {
			done(null, `${file.fieldname}-${Date.now()}`);
		}
	})
});

router.get('/', ensureAuthenticated, function (req, res) {
	res.render('index');
});

router.post('/upload',
	upload.fields([
		{name: 'images'}
	]),
function (req, res) {
	const images = req.images;
	console.log(images);
	res.send('{"post":"prout"}');
});

router.get('/upload', function (req, res) {
	let data = req.query;
	console.log('get');
	console.log(data);
	res.send('{"get":"prout"}');
});


export default router;
