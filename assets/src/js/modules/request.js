function ajax(method, url, data) {

	const promise = new Promise( function (resolve, reject) {

		let xhr = new XMLHttpRequest();
		let uri = url;

		if (method === 'GET') {
			uri += '?' + Object.keys(data)
						.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
						.join('&');
		}

		xhr.open(method, uri);
		xhr.send(method === 'GET' ? data : null);

		xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(this.response);
			} else {
				reject(this.statusText);
			}
		};
		xhr.onerror = function () {
			reject(this.statusText);
		};
	});

	return promise;
}

export default function request(url){

	return {
		'get' : function(data) {
			return ajax('GET', url, data);
		},
		'post' : function(data) {
			return ajax('POST', url, data);
		},
		'put' : function(data) {
			return ajax('PUT', url, data);
		},
		'delete' : function(data) {
			return ajax('DELETE', url, data);
		}
	};
};
