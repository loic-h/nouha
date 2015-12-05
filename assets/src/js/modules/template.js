import templates from '../../../../tmp/templates';

function string (key, data) {
	return templates[key](data);
}

function node (key, data) {
	let str = string(key, data);
	let frag = document.createDocumentFragment();
	let div = document.createElement('div');
	console.log(str);
	div.innerHTML = str;
	console.log(div);
	while (div.firstChild) {
		console.log(div.firstChild);
		frag.appendChild(div.firstChild);
	}
	console.log(frag);
	return frag;
}

export default {
	string: string,
	node: node
}
