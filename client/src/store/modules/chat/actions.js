import { getData } from '../../../api/auth';

export default {
	handleIncrementNumber({ commit }, payload) {
		commit('chat/INCREMENT', payload, { root: true });

		// dispatch('handleFn')
	},

	async handleGetData({ commit }) {
		// return new Promise((resolve, reject) => {
		// 	return getData()
		// 		.then((data) => {
		// 			commit('chat/FETCH', data, { root: true });
		// 			resolve(data);
		// 		})
		// 		.catch((err) => {
		// 			reject(err);
		// 		});
		// });

		try {
			const res = await getData();
			commit('chat/FETCH', res, { root: true });
			return res;
		} catch (error) {
			return error;
		}
	},

	// handleFn
};
