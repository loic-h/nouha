import React from 'react';
import ReactDom from 'react-dom';
import ReactApp from './components/app';

const container = document.getElementById('images');

if (container) {
	start();
}

function start() {
	render();
}

function render() {
	ReactDom.render(<ReactApp />, container);
}
