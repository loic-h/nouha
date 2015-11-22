import express from 'express';
import User from '../models/user';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import config from '../config';
import path from 'path';
import emailer from '../helpers/emailer';
import {ensureAuthenticated} from '../auth';
import {createPassword} from '../helpers';

let app = express();
let router = express.Router();


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
	res.render('user/login');
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
			emailer.send({
				tpl: 'add-user',
				to: data.email,
				data: data
			}, function (error, info) {
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


router.get('/pass', function (req, res) {
	res.render('user/pass', {
		error: req.flash('error'),
		message: req.flash('message')
	});
});

router.post('/pass', function(req, res) {
	let email = req.body.email;
	if(email === '') {
		req.flash('error', 'Le champ email est vide.');
		return res.redirect('/user/pass');
	}
	User.findOne({ email: email }, function (err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			req.flash('error', 'L\'email est inconnu');
			return res.redirect('/user/pass');
		}
		user.changePassword(function (err, user, password) {
			if(err) {
				console.log(err);
				req.flash('error', 'Une erreur est survenue pendant la modification de l\'utilisateur');
			}
			else {
				emailer.send({
					tpl: 'change-password',
					to: user.email,
					data: {
						name: user.name,
						password: password
					}
				}, function (err, info) {
					if(err) {
						console.log(err);
						req.flash('error', 'Une erreur est survenue pendant l\'envoi du message.');
					}
					else {
						req.flash('message', 'Le nouveau mot de passe a été envoyé par mail.');
					}
					return res.redirect('/user/pass');
				});
			}
		});
	});
});



export default router;
