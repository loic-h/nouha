import path from 'path';

let configs = {
	permissions: {
		'user': 'Utilisateur',
		'admin': 'Administrateur'
	},
	emailAdmin: 'loic.hamet@gmail.com'
}

// Paths
configs.path = {};
configs.path.assets = path.join(__dirname,'../../assets/')
configs.path.views = path.join(configs.path.assets,'views/');
configs.path.dist = path.join(configs.path.assets,'dist');

export default configs;
