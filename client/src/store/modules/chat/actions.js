import service from '@/utils/request';
import { ElMessage } from 'element-plus';

export default {
	async register({ commit }, payload) {
		try {
			const data = {
				name: payload,
			};
			const res = await service.post('token/webchat_new_session', data);
			if (res.status === 200) {
				commit('REGISTER', res.data);

				const chatNode = await service.post('token/webchat', {
					...res.data,
					currentNode: 'list_items',
				});

				commit('PUSH_CHAT_ARR', chatNode);

				ElMessage({
					message: 'Successfully registered',
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
};
