<template>
  <form class="form-container" @submit="submitForm" autocomplete="off">
    <div prop="command">
      <el-row>
        <el-col :span="24" class="text-box">
          <input
            type="text"
            v-model="command"
            name="command"
            id="command"
            ref="commandText"
            placeholder="Type something..."
          />
          <button class="btn-submit" @click="submitForm">Gửi</button>
        </el-col>
      </el-row>
    </div>
    <!-- <el-col :span="12"> </el-col> -->
  </form>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

export default {
  name: 'chat-form',
  setup() {
    const command = ref('');

    const rules = {
      command: [
        { required: true, message: 'Please input your name.', trigger: 'blur' },
        {
          min: 2,
          max: 50,
          message: 'Length of 2 to 50 characters',
          trigger: 'blur',
        },
      ],
    };

    const store = useStore();

    const getNode = () => store.dispatch('chat/getNodeInput', { command: command.value });

    const mutateChatArr = payload => store.commit('chat/PUSH_CHAT_ARR', payload);

    return {
      // State
      rules,
      command,
      // Methods
      mutateChatArr,
      // Actions
      getNode,
      // Getters
    };
  },
  methods: {
    submitForm() {
      event.preventDefault();
      if (this.command.length < 1) {
        ElMessage({
          message: 'Vui lòng nhập ....',
          type: 'warning',
        });
      } else {
        this.mutateChatArr({ text: this.command, isBotReply: false, isShowItems: false });
        this.getNode();
        this.command = '';
      }
    },
  },
  mounted() {
    this.$refs.commandText.focus();
  },
};
</script>

<style scoped>
.form-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: #1890ff;
  z-index: 999;
}

.el-form-item.el-form-item {
  margin-bottom: 0px;
}

.btn-submit {
  padding: 5px;
  color: #597ef7;
  background: transparent;
  border: 0;
  cursor: pointer;
  text-transform: uppercase;
}

#command {
  border: 0;
  outline: 0;
  flex: 1;
  padding: 0 10px;
}

#command::placeholder {
  color: #a0a0a0;
}

.text-box {
  display: flex;
  justify-content: space-between;

  padding: 5px;
  background: #fff;
  border-radius: 500px;
}
</style>
