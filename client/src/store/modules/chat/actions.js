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
			const res = await getNode(payload);

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
