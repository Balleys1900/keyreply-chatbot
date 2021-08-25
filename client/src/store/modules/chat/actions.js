// import { ElMessage } from 'element-plus';
import { getNode } from '@/api/chat';

export default {
	// async register({ commit }, payload) {
	// 	try {
	// 		const data = {
	// 			name: payload,
	// 		};
	// 		const res = await register(data);
	// 		if (res.status === 200) {
	// 			commit('REGISTER', res.data);
	// 			const {
	// 				data: { data },
	// 			} = await getNode({ ...res.data, currentNode: '' });
	// 			commit('PUSH_CHAT_ARR', { ...data, isBotReply: true, isShowItems: false });
	// 			ElMessage({
	// 				message: 'Successfully registered',
	// 				type: 'success',
	// 			});
	// 		}
	// 	} catch (error) {
	// 		ElMessage({
	// 			message: error.message,
	// 			type: 'error',
	// 		});
	// 	}
	// },

	async getNewNode({ commit }, payload) {
		try {
			console.log(payload?.currentNode);
			if (payload)
				commit('PUSH_CHAT_ARR', {
					text: payload.text,
					isBotReply: false,
					isShowItems: false,
				});

			const res = await getNode({ currentNode: payload?.currentNode });

			if (res.status === 200) {
				const {
					data: { data },
				} = res;

				commit('PUSH_CHAT_ARR', { ...data, isBotReply: true, isShowItems: false });
			}
		} catch (error) {
			console.log(error);
		}
	},
};
