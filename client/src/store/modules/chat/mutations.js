export default {
	INCREMENT(state, payload) {
		state.x += payload;
	},

	FETCH(state, payload) {
		state.post = payload;
	},
};
