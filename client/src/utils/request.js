import axios from 'axios';
// import store from '@/store';

// Create an axios instance
const service = axios.create({
	baseURL: 'https://6082ca2a5dbd2c001757a803.mockapi.io/',
	timeout: 5000, // request timeout.
});

service.interceptors.request.use(
	(config) => {
		// if (store.getters['auth/getTokenAuth']) {
		config.headers = {
			accept: 'application/json',
			// Authorization: 'Bearer ' + getToken(),
		};
		// }
		return config;
	},

	(error) => {
		return Promise.reject(error);
	},
);

service.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		console.log(error.response);
		// if (error.response.status === 404) {
		//   Message({
		//     message: 'Lỗi 404: Trang không tồn tại !',
		//     type: 'error',
		//     duration: 5 * 1000
		//   }); return;
		// }
		// if (error.response.status === 403) {
		//   MessageBox.confirm('Lỗi 403: Quyền truy cập vào tài nguyên được yêu cầu bị cấm, vui lòng liên hệ thành viên có thẩm quyền ban hành nhiệm vụ', 'Xác nhận', {
		//     confirmButtonText: 'Đồng ý',
		//     cancelButtonText: 'Hủy',
		//     type: 'warning'
		//   }).then(() => {
		//     Message({
		//       message: 'Vui lòng rời khỏi tab nhiệm vụ này !',
		//       type: 'warning',
		//       duration: 5 * 1000
		//     });
		//   }); return;
		// }
		// if (error.response.status === 401) {
		//   MessageBox.confirm('Bạn đã đăng xuất, bạn có thể hủy để ở lại trang này hoặc đăng nhập lại', 'Xác nhận đăng xuất', {
		//     confirmButtonText: 'Đăng nhập lại',
		//     cancelButtonText: 'Hủy',
		//     type: 'warning'
		//   }).then(() => {
		//     store.dispatch('auth/resetTokenAuth').then(() => {
		//       location.reload()
		//     });
		//   }); return;
		// }
		return Promise.reject(error.response);
	},
);

export default service;
