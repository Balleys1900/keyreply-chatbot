<template>
  <div class="form-container">
    <form action="" class="form-register">
      <el-row>
        <img src="@/assets/images/welcome.png" alt="" class="form-image" />
        <el-col :span="24">
          <el-input
            placeholder="Insert your name to begin"
            v-model="username"
          ></el-input>
        </el-col>
        <el-button
          @click="register"
          type="primary"
          style="width: 100%; margin: 10px 0"
          >Start</el-button
        >
        <el-col :span="24"> </el-col>
      </el-row>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  name: "chat-form",
  setup() {
    const username = ref("");
    const store = useStore();

    const register = () => store.dispatch("chat/register", username.value);

    return {
      // State
      username,
      register,
      // Actions
      // Getters
    };
  },
};
</script>

<style scoped>
.form-container {
  position: relative;
  height: 100%;
}

.form-image {
  max-width: 100%;
}

.form-register {
  width: 80%;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
</style>