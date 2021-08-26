export default {
	currUser(state) {
		return state.currUser;
	},

	isLogin(state) {
		return state.isLogin;
	},

	isFullscreenLoading(state) {
		return state.masterLoading;
	},

	chatLoading(state) {
		return state.chatLoading;
	},

	chatArr(state) {
		return state.chatArr;
	},
};
