<template>
  <div>
    <el-carousel type="card" :interval="4000" height="220px">
      <el-carousel-item v-for="item in 6" :key="item">
        <el-card :body-style="{ padding: '0px' }" class="product-container">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="product-image"
          />
          <div>
            <span class="product-name">Yummy hamburger</span>
            <div class="product-bottom">
              <el-button
                @click="handleClickProductItem(1)"
                type="primary"
                size="mini"
                class="button"
                >Details</el-button
              >
            </div>
          </div>
        </el-card>
      </el-carousel-item>
    </el-carousel>

    <chat-modal :isShow="dialogVisible" @handleCloseModal="handleCloseModal" />
  </div>
</template>
 
<script>
import ChatModal from "./ChatModal.vue";
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  components: { ChatModal },
  methods: {
    handleCloseModal(value) {
      this.dialogVisible = value;
    },
    handleClickProductItem(number) {
      this.dialogVisible = true;
      console.log(this, number);
    },
  },
};
</script> 


<style scoped>
.el-card {
}

.product-container {
  padding: 15px 0;
  text-align: center;
}

.product-image {
  max-width: 80%;
}

.product-name {
  font-size: 12px;
  text-align: center;
  display: block;
  margin-bottom: 10px;
}

.product-bottom {
  text-align: center;
}
</style>