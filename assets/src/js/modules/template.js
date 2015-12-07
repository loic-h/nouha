import templates from '../../../../tmp/templates';

function string (key, data) {
	return templates[key](data);
}

function node (key, data) {
	let str = string(key, data);
	let frag = document.createDocumentFragment();
	let div = document.createElement('div');
	div.innerHTML = str;
	while (div.firstChild) {
		frag.appendChild(div.firstChild);
	}
	return frag;
}

export default {
	string: string,
	node: node
};
