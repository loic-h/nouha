import request from './request';
import template from './template';
import {target, getParent} from '@loiic/js-utils/dom';

let container = document.query('.upload');
let containerGallery = document.query('.gallery');
let fileInput;
let form;
let files;
const hasFileSystem = window.File && window.FileReader && window.FileList && window.Blob;
const hasFormData = !! window.FormData;

request('/upload')
		.post({'caca': 'prout'})
		.then(success)
		.catch(error);

if (container && hasFileSystem) {
	// init();
}

function init() {
	fileInput = container.query('input[type=file]');
	fileInput.addEventListener('change', onChange);
	form = container.query('form');
	form.addEventListener('submit', onSubmit);
}

function onChange(event) {
	files = event.target.images || event.dataTransfer.images;
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
	let formdata = new FormData();
	for(let i = 0; i < files.length; i++) {
		let file = files[i];
		let check = form.query(`input[name=upload_${i}]:checked`);
		let value = check.value;
		if(value === 'valid') {
			console.log(file);
			formdata.append('images', file);
			console.log(formdata);
		}
	}
	request('/upload')
		.post(formdata)
		.then(success)
		.catch(error);
}

function success(data) {
	console.log(data);
}

function error(data) {
	throw new Error(JSON.parse(data));
}
