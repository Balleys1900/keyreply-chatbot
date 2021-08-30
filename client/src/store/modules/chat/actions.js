import { ElMessage } from 'element-plus';
import { getNode, checkLogin, getChatLog, storeChatLog, getNodeText } from '@/api/chat';
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
        const { data } = await checkLogin({
          headers: { Authorization: 'Bearer ' + LOCAL_TOKEN },
        });
        commit('SET_LOGIN', { isLogin: true, currUser: data.username });

        await dispatch('getChatLog');
        commit('SET_LOADING', false);
      } catch (error) {
        commit('SET_LOADING', false);
        localStorage.removeItem('zc');
      }
    }
  },

  async register({ commit, dispatch }, payload) {
    try {
      commit('SET_LOADING', true);

      const res = await request.post('v1/login', payload);

      if (res.status === 200) {
        commit('SET_LOADING', false);

        localStorage.setItem('zc', res.data);
        commit('SET_LOGIN', { isLogin: true, currUser: payload.username });
        dispatch('getNewNode');
        ElMessage({
          message: 'Login successfully',
          type: 'success',
        });
      }
    } catch (error) {
      commit('SET_LOADING', false);

      ElMessage({
        message: error.message,
        type: 'error',
      });
    }
  },

  async getNewNode({ commit, getters }, payload) {
    try {
      commit('SET_CHAT_LOADING', true);
      const localToken = localStorage.getItem('zc');

      const res = await getNode(payload, {
        headers: { Authorization: 'Bearer ' + localToken },
      });

      if (res.status === 200) {
        commit('SET_CHAT_LOADING', false);

        const {
          data: { data },
        } = res;

        const regex = /show_item/;
        const isShowItem = regex.exec(data.id) ? true : false;
        const isShowItems = data.id === 'list_items' ? true : false;
        commit('PUSH_CHAT_ARR', { ...data, isBotReply: true, isShowItems, isShowItem });

        const newChatArr = getters.chatArr;
        const axiosConfig = {
          headers: { Authorization: 'Bearer ' + localToken },
        };
        storeChatLog({ chatArr: newChatArr }, axiosConfig);
      }
    } catch (error) {
      commit('SET_CHAT_LOADING', false);
    }
  },

  async getChatLog({ commit }) {
    try {
      commit('SET_CHAT_LOADING', true);
      const localToken = localStorage.getItem('zc');
      const res = await getChatLog({
        headers: { Authorization: 'Bearer ' + localToken },
      });

      if (res.status === 200) {
        const { data } = res;

        console.log(res);

        commit('REPLACE_CHAT_ARR', data);
        commit('SET_CHAT_LOADING', false);
      }
    } catch (error) {
      commit('SET_CHAT_LOADING', false);
    }
  },
<<<<<<< HEAD
=======

  async getNodeInput({ commit, getters }, payload) {
    try {
      commit('SET_CHAT_LOADING', true);
      const localToken = localStorage.getItem('zc');

      const res = await getNodeText(payload, {
        headers: { Authorization: 'Bearer ' + localToken }
      });

      if (res.status === 200) {
        commit('SET_CHAT_LOADING', false);

        const {
          data: { content }
        } = res;

        console.log(content);
        const regex = /show_item/;
        const isShowItem = regex.exec(content.id) ? true : false;
        console.log(isShowItem);
        const isShowItems = content.id === 'list_items' ? true : false;

        commit('PUSH_CHAT_ARR', { ...content, isBotReply: true, isShowItems, isShowItem });

        const newChatArr = getters.chatArr;
        const axiosConfig = {
          headers: { Authorization: 'Bearer ' + localToken }
        };
        storeChatLog({ chatArr: newChatArr }, axiosConfig);
      }
    } catch (error) {
      commit('SET_CHAT_LOADING', false);
    }
  }
>>>>>>> 899d30ea454b996e1207202dd3f0c6e041276155
};
