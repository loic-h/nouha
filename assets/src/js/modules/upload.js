import request from 'superagent';
import template from './template';
import {target, getParent} from '@loiic/js-utils/dom';

let container = document.query('.upload');
let containerGallery = document.query('.gallery');
let fileInput = null;
let form = null;
let files = [];
const hasFileSystem = window.File && window.FileReader && window.FileList && window.Blob;
const hasFormData = !! window.FormData;

if (container && hasFileSystem) {
	init();
}

function init() {
	fileInput = container.query('input[type=file]');
	fileInput.addEventListener('change', onChange);
	form = container.query('form');
	form.addEventListener('submit', onSubmit);
}

function onChange(event) {
	files = event.target.files || event.dataTransfer.files;
	for(let i = 0, f; f = files[i]; i++) {
		parseFile(i, f);
	}
}

function parseFile(index, file) {
	let reader = new FileReader();

	reader.onloadend = () => {
		let img = template.node('thumb', {src: reader.result, filename: file.name, index: index});
		containerGallery.appendChild(img);
	};

	reader.readAsDataURL(file);
}

function onSubmit(event) {
	event.preventDefault();
	let formdata = new FormData(form);
	for(let i = 0; i < files.length; i++) {
		let file = files[i];
		let check = form.query(`input[name=upload_${i}]:checked`);
		let value = check.value;
		if(value === 'valid') {
			formdata.append('images', file, file.name);
		}
	}
	request.post('/upload')
		.send(formdata)
		.end(success);
}

function success(err, data) {
	if(err) {
		console.log('error');
		throw err;
	}
	else {
		console.log(data);
	}
}

function error(data) {
	throw new Error(JSON.parse(data));
}
