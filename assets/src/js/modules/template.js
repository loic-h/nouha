import templates from '../../../../tmp/templates';

export default function template (key, data) {
	return templates[key](data);
}
