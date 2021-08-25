import request from '../utils/request';

//Create User
export function register(data) {
	return request({
		url: 'token/webchat_new_session',
		method: 'POST',
		data,
	});
}

// Get Chat Node
export function getNode(data) {
	return request({
		url: 'token/webchat',
		method: 'POST',
		data,
	});
}
