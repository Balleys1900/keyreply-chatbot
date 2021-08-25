import { ElMessage } from 'element-plus';
import { register, getNode } from '@/api/chat';

export default {
	async register({ commit }, payload) {
		try {
			const data = {
				name: payload,
			};
			const res = await register(data);

			if (res.status === 200) {
				commit('REGISTER', res.data);

				const {
					data: { data },
				} = await getNode({ ...res.data, currentNode: 'conversation_welcome' });

				commit('PUSH_CHAT_ARR', { ...data, isBotReply: true, isShowItems: false });

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
