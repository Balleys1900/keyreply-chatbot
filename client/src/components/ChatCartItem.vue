<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="product.thumb" class="image" />
          <div style="padding: 14px">
            <span>{{ product.text }} </span>
            <div class="bottom">
              Price: <b>{{ product.price }}$</b>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="">
        <el-button
          v-for="button in product.buttons"
          :key="button.id"
          type="primary"
          class="chat-button"
          @click="handleGetNextNode({ currentNode: { ...button } })"
          >{{ button.text }}</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  props: {
    product: { type: Object, required: true },
  },
  setup() {
    const store = useStore();

    const getNextNode = payload => store.dispatch('chat/getNewNode', payload);

    const mutateChatArr = payload => store.commit('chat/PUSH_CHAT_ARR', payload);
    const handleGetNextNode = payload => {
      const { text } = payload.currentNode;
      mutateChatArr({ text: text, isBotReply: false, isShowList: false });
      getNextNode(payload);
    };
    return { handleGetNextNode };
  },
};
</script>
<style scoped>
.bottom {
  margin-top: 13px;
  line-height: 12px;
  text-align: center;
}

.chat-button.chat-button {
  /* display: block; */
  width: 100%;
  margin: 5px 0;
  text-transform: uppercase;
  margin-left: 0;
}

.image {
  width: 100%;
  display: block;
}
</style>