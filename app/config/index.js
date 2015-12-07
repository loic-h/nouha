import path from 'path';

let config = {
	permissions: {
		'user': 'Utilisateur',
		'admin': 'Administrateur'
	},
	emailAdmin: 'loic.hamet@gmail.com'
}

// Paths
config.path = {};
config.path.root = path.join(__dirname, '../../')
config.path.assets = path.join(config.path.root, 'assets/');
config.path.views = path.join(config.path.assets, 'views/');
config.path.dist = path.join(config.path.assets, 'dist');
config.path.uploads = path.join(config.path.assets, 'uploads/');
config.path.images = path.join(config.path.uploads, 'images/');

export default config;
