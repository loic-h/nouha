function ajax(method, url, args) {

	const promise = new Promise( function (resolve, reject) {

		let client = new XMLHttpRequest();
		let uri = url;

		if (args && (method === 'POST' || method === 'GET')) {
			uri += '?' + Object.keys(args)
						.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(args[key]))
						.join('&');
		}

		client.open(method, uri);
		client.send();

		client.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(this.response);
			} else {
				reject(this.statusText);
			}
		};
		client.onerror = function () {
			reject(this.statusText);
		};
	});

	return promise;
}

export default function request(url){

	return {
		'get' : function(args) {
			return ajax('GET', url, args);
		},
		'post' : function(args) {
			return ajax('POST', url, args);
		},
		'put' : function(args) {
			return ajax('PUT', url, args);
		},
		'delete' : function(args) {
			return ajax('DELETE', url, args);
		}
	};
};
