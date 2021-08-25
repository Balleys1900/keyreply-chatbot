import request from '../utils/request';

//Create User
export function checkLogin(options) {
	return request({
		url: 'v1/login',
		method: 'POST',
		...options,
	});
}

// Get Chat Node
export function getNode(data, options) {
	return request({
		url: 'v1/chatbot',
		method: 'POST',
		data,
		...options,
	});
}
