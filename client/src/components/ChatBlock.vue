<template>
  <div>
    <div
      class="chat-block"
      :class="{
        bot: nodeInfo.isBotReply,
        user: !nodeInfo.isBotReply,
        showItem: nodeInfo.isShowItems,
      }"
    >
      <div class="chat-container">
        <p class="chat-text">{{ nodeInfo.text }}</p>

        <ChatListItem v-if="nodeInfo.isShowItems" :products="nodeInfo.buttons" />
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
    <ChatFormMessage />
  </div>
</template>


<script>
import { useStore } from 'vuex';
import ChatListItem from './ChatListItem.vue';
import ChatFormMessage from './ChatFormMessage.vue';
export default {
  components: {
    ChatListItem,
    ChatFormMessage,
  },
  props: {
    nodeInfo: { type: Object, default: () => null, required: true },
  },
  setup() {
    const store = useStore();

    const getNextNode = payload => store.dispatch('chat/getNewNode', payload);

    const mutateChatArr = payload => store.commit('chat/PUSH_CHAT_ARR', payload);

    const handleGetNextNode = payload => {
      const { text } = payload.currentNode;
      mutateChatArr({ text: text, isBotReply: false, isShowItems: false });
      getNextNode(payload);
    };

    return {
      getNextNode,
      handleGetNextNode,
    };
  },

  mounted() {
    // console.log(this.$el);
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
