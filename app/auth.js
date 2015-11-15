export function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	else {
		req.session.url = req.originalUrl;
		res.redirect('/user/login');
	}
}
