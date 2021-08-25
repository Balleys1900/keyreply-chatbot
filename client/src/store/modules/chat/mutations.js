export default {
	REGISTER(state, payload) {
		state.currUser = payload;
	},

	PUSH_CHAT_ARR(state, payload) {
		state.chatArr.push(payload);
	},
};
