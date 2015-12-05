import './request';
import template from './template';

let container = document.query('.upload');
let containerGallery = document.query('.gallery');
let fileInput;

if (container && window.File && window.FileReader && window.FileList && window.Blob) {
	init();
}

function init() {
	fileInput = document.query('input[type=file]');

	fileInput.addEventListener('change', onChange);
}

function onChange(event) {
	const files = event.target.files || event.dataTransfer.files;
	for(let i = 0, f; f = files[i]; i++) {
		console.log(f);
		parseFile(f);
	}
}

function parseFile(file) {
	console.log(file.name, file.type, file.size);
	let reader = new FileReader();

	reader.onloadend = () => {
		let img = template.node('thumb', {src: reader.result, title: 'prout'});
		containerGallery.appendChild(img);
	};

	reader.readAsDataURL(file);


}
