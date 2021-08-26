export default {
  SET_LOGIN(state, payload) {
    state.isLogin = payload.isLogin;
    state.currUser = payload.currUser || null;
  },

  PUSH_CHAT_ARR(state, payload) {
    state.chatArr.push(payload);
  },

  SET_LOADING(state, payload) {
    state.masterLoading = payload;
  },

  SET_CHAT_LOADING(state, payload) {
    state.chatLoading = payload;
  },

  REPLACE_CHAT_ARR(state, payload) {
    state.chatArr = payload;
  },
};
