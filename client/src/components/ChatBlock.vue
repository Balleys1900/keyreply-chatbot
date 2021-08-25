<template>
  <div
    class="chat-block"
    :class="{
      bot: nodeInfo.isBotReply,
      user: !nodeInfo.isBotReply,
      showItem: isShowItems,
    }"
  >
    <div class="chat-container">
      <p class="chat-text">{{ nodeInfo.text }}</p>

      <ChatListItem v-if="nodeInfo.isShowItems" />

      <el-row v-if="nodeInfo.isBotReply">
        <el-col :span="24" class="">
          <el-button
            v-for="button in nodeInfo.buttons"
            :key="button.id"
            type="primary"
            class="chat-button"
            >{{ button.text }}</el-button
          >
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ChatListItem from "./ChatListItem.vue";
export default {
  components: {
    ChatListItem,
  },
  props: {
    nodeInfo: { type: Object, default: () => null, required: true },
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
  max-width: 90%;
  border-radius: 5px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.chat-block.showItem .chat-container {
  max-width: 100%;
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