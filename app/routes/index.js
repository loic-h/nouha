import express from 'express';
import {ensureAuthenticated} from '../auth';

let router = express.Router();

router.get('/', ensureAuthenticated, function (req, res) {
	res.render('index');
});

export default router;