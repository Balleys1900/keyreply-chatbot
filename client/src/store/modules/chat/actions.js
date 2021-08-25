import { ElMessage } from 'element-plus';
import { getNode, checkLogin } from '@/api/chat';
import request from '@/utils/request';
import { LOCAL_TOKEN } from '@/constants/token';

export default {
	async checkLogin({ commit, dispatch }) {
		commit('SET_LOADING', true);
		if (!LOCAL_TOKEN) {
			commit('SET_LOGIN', { isLogin: false });
			commit('SET_LOADING', false);
		} else {
			try {
				const { data } = await checkLogin({ headers: { Authorization: 'Bearer ' + LOCAL_TOKEN } });

				commit('SET_LOGIN', { isLogin: true, currUser: data.username });

				await dispatch('getNewNode');
				commit('SET_LOADING', false);
			} catch (error) {
				commit('SET_LOADING', false);
				console.log(error);
			}
		}
	},

	async register({ commit, dispatch }, payload) {
		try {
			const res = await request.post('v1/login', payload);
			if (res.status === 200) {
				localStorage.setItem('zc', res.data);

				commit('SET_LOGIN', { isLogin: true, currUser: payload.username });

				dispatch('getNewNode');

				ElMessage({
					message: 'Login successfully',
					type: 'success',
				});
			}
		} catch (error) {
			ElMessage({
				message: error.message,
				type: 'error',
			});
		}
	},

	async getNewNode({ commit }, payload) {
		try {
			const localToken = localStorage.getItem('zc');

			const res = await getNode(payload, { headers: { Authorization: 'Bearer ' + localToken } });

			if (res.status === 200) {
				const {
					data: { data },
				} = res;

				const isShowItems = data.id === 'list_items' ? true : false;

				commit('PUSH_CHAT_ARR', { ...data, isBotReply: true, isShowItems });
			}
		} catch (error) {
			console.log(error);
		}
	},
};
