<template>
  <div>
    <div
      class="chat-block"
      :class="{
        bot: nodeInfo.isBotReply,
        user: !nodeInfo.isBotReply,
        showList: nodeInfo.isShowList,
        showItem: nodeInfo.isShowItem,
      }"
    >
      <div class="chat-container">
        <p v-if="!nodeInfo.isShowItem" class="chat-text">{{ nodeInfo.text }}</p>

        <ChatListItem v-if="nodeInfo.isShowList" :products="nodeInfo.buttons" />
        <ChatCartItem v-else-if="nodeInfo.isShowItem" :product="nodeInfo" />
        <div v-else>
          <el-row v-if="nodeInfo.isBotReply">
            <el-col :span="24" class="">
              <el-button
                v-for="button in nodeInfo.buttons"
                :key="button.id"
                type="primary"
                class="chat-button"
                @click="handleGetNextNode({ currentNode: { ...button } })"
                >{{ button.text }}</el-button
              >
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <ChatFormMessage v-if="isLogin" />
  </div>
</template>


<script>
import { useStore } from 'vuex';
import { computed } from '@vue/reactivity';
import ChatListItem from './ChatListItem.vue';
import ChatFormMessage from './ChatFormMessage.vue';
import ChatCartItem from './ChatCartItem.vue';
export default {
  components: {
    ChatListItem,
    ChatFormMessage,
    ChatCartItem,
  },
  props: {
    nodeInfo: { type: Object, default: () => null, required: true },
  },
  setup() {
    const store = useStore();

    const getNextNode = payload => store.dispatch('chat/getNewNode', payload);

    const mutateChatArr = payload => store.commit('chat/PUSH_CHAT_ARR', payload);
    const isLogin = computed(() => store.getters['chat/isLogin']);
    const handleGetNextNode = payload => {
      const { text } = payload.currentNode;
      mutateChatArr({ text: text, isBotReply: false, isShowList: false });
      getNextNode(payload);
    };

    return {
      getNextNode,
      handleGetNextNode,
      isLogin,
    };
  },

  mounted() {
    console.log('mounted');
    const lastChatItem = this.$el;
    lastChatItem?.scrollIntoView({ behavior: 'smooth' });
  },
};
</script>

<style>
.chat-text {
  margin-bottom: 5px;
}

.chat-block .chat-container {
  padding: 20px;
  margin-bottom: 20px;
  width: fit-content;
  border-radius: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.chat-block.showList .chat-container {
  max-width: 100%;
  width: 100%;
}
.chat-block.showItem .chat-container {
  max-width: 100%;
  width: 100%;
}

.chat-block.bot .chat-container {
  background: #fff;
  color: #1890ff;
}

.chat-block.user .chat-container {
  background: #40a9ff;
  color: #9254de;
  text-align: right;
  color: #fff;
}

.chat-block.user .chat-container {
  margin-left: auto;
}

.chat-button.chat-button {
  /* display: block; */
  width: 100%;
  margin: 5px 0;
  text-transform: uppercase;
  margin-left: 0;
}
</style>
