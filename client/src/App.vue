<template>
  <div id="app2">
    <master-layout v-loading.fullscreen.lock="isFullscreenLoading" />
  </div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useStore } from 'vuex';
import MasterLayout from './layouts/MasterLayout.vue';

// import { storeChatLog } from "@/api/chat";

export default {
  name: 'App',
  components: { MasterLayout },
  setup() {
    const store = useStore();

    return {
      // Actions
      checkLogin: () => store.dispatch('chat/checkLogin'),
      // Getters
      isFullscreenLoading: computed(() => store.getters['chat/isFullscreenLoading']),

      // Mutations
      setLoading: payload => store.commit('chat/SET_LOADING', payload),
    };
  },
  created() {
    this.checkLogin();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app2 {
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
