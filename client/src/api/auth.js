import request from '../utils/request';

export function getData() {
	return request({
		url: 'api/learnit/tasks',
		// params: { _method: 'PUT' },
		// headers,
		// data,
	});
}
