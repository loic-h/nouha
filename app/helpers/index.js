import validator from 'validator';

export function notEmpty(str) {
	return !!str.length;
};

export function isEmail(str) {
	return validator.isEmail(str);
};
