import express from 'express';
import User from '../models/user';
import validator from 'validator';
import passport from 'passport';
import LocalStrategy from 'passport-local';

let app = express();
let router = express.Router();

router.get('/login', function (req, res) {
	res.render('user/login', {email: 'test@test.com', pass: '1234'});
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/',
	failureRedirect: '/user/login'
}));

router.get('/add', function (req, res) {
	res.render('user/add');
});

router.post('/add', function (req, res) {
	let email = req.body.email;
	let pass = req.body.pass;
	let errors = {};

	if(pass === '') {
		errors.pass = 'Password is mandatory';
	}
	if(!validator.isEmail(email)) {
		errors.email = 'Email is invalid';
	}
	if(email === '') {
		errors.email = 'Email is mandatory';
	}

	if(Object.keys(errors).length > 0) {
		res.render('user/add', {email: email, pass: pass, errors: errors});
	}
	else {
		let user = new User({email: email, password: pass});
		user.save(function(err) {
			if (err) {
				return res.render('user/add', {email: email, pass: pass, errors: {'main': err}});
			}

			return res.render('user/add', {});
		});
	}
});


export default router;
