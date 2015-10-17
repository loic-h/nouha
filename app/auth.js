export function ensureAuthenticated(req, res, next) {
	console.log('ensureAuthenticated', req.isAuthenticated());
	if(req.isAuthenticated()) {
		return next();
	}
	else {
		res.redirect('user/login');
	}
}
