import express from 'express';
import User from '../models/user';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import config from '../config';
import nodemailer from 'nodemailer';
import path from 'path';
import jade from 'jade';
import {ensureAuthenticated} from '../auth';

let app = express();
let router = express.Router();
let transport = nodemailer.createTransport();
let tplEmailAddUser = jade.compileFile(path.join(__dirname, '../../assets/views/email/add-user.jade'));


router.get('/', ensureAuthenticated, function (req, res) {
	let user = req.user;
	res.render('user', {name: user.name, email: user.email});
});

router.post('/', ensureAuthenticated, function (req, res) {
	let data = {
		name: req.body.name
	};
	if(req.body.password !== '') {
		data.hash = req.user.hashPassword(req.body.password);
	}
	req.user.update(data, function(err) {
		let data = {
			name: req.user.name,
			email: req.user.email
		};
		if(err) {
			data.error = [];
			let errors = err.errors;
			for(let err in errors) {
				if(errors.hasOwnProperty(err)) {
					data.error.push(errors[err].message);
				}
			}
		}
		else {
			data.message = 'Vos informations ont été modifiées';
		}
		res.render('user', data);
	});
});


router.get('/login', function (req, res) {
	let error =  req.flash('error');
	error = error.length > 0 ? error : null;
	res.render('user/login', {error: error, email: 'loic.hamet@gmail.com', password: '1234'});
});

router.post('/login', passport.authenticate('local-login', {
	failureRedirect: '/user/login',
	failureFlash : true
}), function (req, res) {
	let url;
	if(req.session.url) {
		url = req.session.url;
		delete req.session.url;
	}
	else {
		url = '/';
	}
	res.redirect(url);
});


router.get('/logout', ensureAuthenticated, function (req, res) {
	req.logout();
	res.redirect('/user/login');
});


router.get('/add', ensureAuthenticated, function (req, res) {
	res.render('user/add', {
		permissions: config.permissions,
		error: req.flash('error'),
		message: req.flash('message')
	});
});

router.post('/add', ensureAuthenticated, function (req, res) {
	let data = {
		name: req.body.name,
		email: req.body.email,
		permission: req.body.permission,
		permissions: config.permissions
	};

	let user = new User(data);
	user.save(function(err) {
		if (err) {
			data.error = [];
			let errors = err.errors;
			for(let err in errors) {
				if(errors.hasOwnProperty(err)) {
					data.error.push(errors[err].message);
				}
			}
			return res.render('user/add', data);
		} else {
			data.password = user.password;
			sendMail(data, function (error, info) {
				if(error) {
					data.error = 'Une erreur est survenue. Merci de vérifier l\'email renseigné';
					console.log(error);
					user.remove();
					return res.render('user/add', data);
				}
				else {
					req.flash('message', 'L\'utilisateur a été enregistré');
					return res.redirect('/user/add');
				}
			});
		}
	});
});

function sendMail (data, fn) {
	transport.sendMail({
		from: config.emailAdmin,
		to: data.email,
		subject: 'Bienvenue sur Nouha',
		html: tplEmailAddUser(data)
	}, fn);
}


export default router;
