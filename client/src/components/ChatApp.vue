<template>
  <div class="chat-container">
    <div class="box-card">
      <transition name="slide-fade">
        <el-card class="card-container" v-show="show">
          <template #header>
            <div class="card-header">
              <div>
                <el-icon>
                  <chat-round />
                </el-icon>
                <span class="chat-title">TALK TO US</span>
              </div>
              <div>
                <span v-if="currUser">Welcome {{ currUser }}</span>
              </div>
            </div>
          </template>
          <ChatForm v-if="!isLogin" />
          <div v-else>
            <ChatBlock
              v-for="nodeInfo in chatArr"
              :nodeInfo="nodeInfo"
              :key="nodeInfo.id"
              :isShowList="true"
            />
          </div>
          <loading-chat v-if="chatLoading" />
        </el-card>
      </transition>
      <div class="chat-circle" @click="show = !show">
        <img src="@/assets/images/chat-icon.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { ChatRound } from '@element-plus/icons';
import ChatBlock from './ChatBlock.vue';
import { mapGetters, useStore } from 'vuex';
import { computed, ref } from '@vue/reactivity';
import ChatForm from './ChatForm.vue';
import LoadingChat from './LoadingChat.vue';
// import ChatFormMessage from './ChatFormMessage.vue';

export default {
  components: { ChatBlock, ChatRound, ChatForm, LoadingChat },
  setup() {
    const store = useStore();

    const show = ref(false);

    const isLogin = computed(() => store.getters['chat/isLogin']);

    const currUser = computed(() => store.getters['chat/currUser']);

    const chatLoading = computed(() => store.getters['chat/chatLoading']);

    const getNewNode = payload => store.dispatch('chat/getNewNode', payload);

    return {
      isLogin,
      chatLoading,
      currUser,
      show,
      getNewNode,
    };
  },

  computed: {
    ...mapGetters({
      chatArr: 'chat/chatArr',
    }),
  },

  
};
</script>

<style>
.box-card {
  position: absolute;
  bottom: 5px;
  right: 80px;
  height: 90%;
}
.card-container {
  width: 400px;
  height: 100%;
}

.chat-circle {
  position: absolute;
  bottom: 35px;
  right: -70px;
  width: 55px;
  height: 55px;
}

.chat-circle img {
  width: 100%;
  cursor: pointer;
}

.el-card__header {
  background-color: #1890ff;
  color: #fff;
  padding: 0;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}

.el-card__body {
  overflow-y: auto;
  height: 90%;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
.chat-title {
  margin-left: 10px;
}

/* Scroll 2 */
.el-card__body::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.el-card__body::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.el-card__body::-webkit-scrollbar-thumb {
  background-color: #bae7ff;
  border-radius: 10px;
}
</style>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
