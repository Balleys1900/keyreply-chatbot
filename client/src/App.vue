<template>
  <div id="app2">
    <master-layout v-loading.fullscreen.lock="isFullscreenLoading" />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import MasterLayout from "./layouts/MasterLayout.vue";
import { onMounted, onUnmounted, onUpdated } from "vue";

export default {
  name: "App",
  components: { MasterLayout },
  setup() {
    const store = useStore();

    onMounted(() => {
      console.log("onMounted");
    });

    onUpdated(() => {
      console.log("updated!");
    });

    onUnmounted(() => {
      console.log("unmounted!");
    });

    return {
      // Actions
      getData: () => store.dispatch("chat/handleGetData"),
      // Getters
      isFullscreenLoading: computed(
        () => store.getters["chat/isFullscreenLoading"]
      ),
    };
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
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>
