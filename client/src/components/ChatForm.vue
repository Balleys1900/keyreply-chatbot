<template>
  <div class="form-container">
    <form action="" class="form-register">
      <el-row>
        <img src="@/assets/images/welcome.png" alt="" class="form-image" />
        <el-col :span="24">
          <el-input
            placeholder="Insert your name to begin"
            v-model="input.name"
          ></el-input>
        </el-col>
        <el-button type="primary" style="width: 100%; margin: 10px 0"
          >Start</el-button
        >
        <el-col :span="24"> </el-col>
      </el-row>
    </form>
  </div>
</template>

<script>
export default {
  name: "chat-form",
  data() {
    return {
      input: {
        name: "",
      },
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