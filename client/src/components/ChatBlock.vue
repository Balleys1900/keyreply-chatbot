<template>
  <div
    class="chat-block"
    :class="{ bot: isBot, user: !isBot, showItem: isShowItems }"
  >
    <div class="chat-container">
      <p class="chat-text">Content</p>

      <ChatListItem v-if="isShowItems" />

      <el-row v-if="isBot">
        <el-col :span="24" class="">
          <el-button type="primary" class="chat-button">Button</el-button>
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
    isBot: { type: Boolean, default: true },
    isShowItems: { type: Boolean, default: false },
  },
  setup(props) {
    console.log(props);
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
  max-width: 70%;
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

.chat-button {
  display: block;
  width: 100%;
  margin: 5px 0;
  text-transform: uppercase;
}
</style>