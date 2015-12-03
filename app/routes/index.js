import express from 'express';
import {ensureAuthenticated} from '../auth';

let router = express.Router();

router.get('/', ensureAuthenticated, function (req, res) {
	res.render('index');
});

router.get('/upload', function (req, res) {
	console.log(req.body);
	res.send('{"yo":"prout"}');
});

export default router;
