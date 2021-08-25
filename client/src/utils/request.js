import axios from 'axios';
// import store from '@/store';

// Create an axios instance
const service = axios.create({
	baseURL: 'http://localhost:8000/api/',
	timeout: 5000, // request timeout.
});

service.interceptors.request.use(
	(config) => {
		config.headers = {
			accept: 'application/json',
		};
		return config;
	},

	(error) => {
		return Promise.reject(error);
	},
);

service.interceptors.response.use((response) => {
	return response;
});

export default service;
