import jade from 'jade';
import fs from 'fs';
import path from 'path';
import config from '../config';
import nodemailer from 'nodemailer';

const viewPath = path.join(__dirname, '../../assets/views/email/');

let templates = {};

let transport = nodemailer.createTransport();

fs.readdirSync(viewPath).forEach(function(filename) {
	let key = path.basename(filename, '.jade');
	templates[key] = jade.compileFile(viewPath + filename, {cache: true});
});


function getElement(str, key) {
	let reg = new RegExp(`<${key}>(.*)</${key}>`);
	return str.match(reg);
}

export default Object.assign(templates, {

	send: function(params, fn) {
		params.from = params.from || config.defaultEmail;
		params.from = 'test@test.com';

		let template = templates[params.tpl](params.data);
		let subject = getElement(template, 'subject');
		let text = getElement(template, 'text');

		transport.sendMail({
			from: params.from,
			to: params.to,
			subject: subject,
			html: text
		}, fn);
	}

});
