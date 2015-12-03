import './request';

let container;
let fileInput;

if (window.File && window.FileReader && window.FileList && window.Blob) {
	init();
}

function init() {
	container = document.getElementById('upload');
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
		console.log('yo');
		let img = document.createElement('img');
		img.src = reader.result;
		container.appendChild(img);
		console.log(img);
	};

	reader.readAsDataURL(file);


}
