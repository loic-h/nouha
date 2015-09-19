import express from 'express';

let router = express.Router();

router.get('/', function (req, res) {
	res.render('index', { user : req.user });
});

export default router;