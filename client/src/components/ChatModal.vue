<template>
  <div>
    <el-dialog
      v-model="isShowListener"
      title="PRODUCT DETAILS"
      :before-close="handleClose"
      :customClass="'product-modal'"
      :top="'5vh'"
    >
      <el-row>
        <el-col :span="12" class="product-picture product-section">
          <img :src="productInfo.thumb" alt="" style="max-width: 100%" />
        </el-col>
        <el-col :span="12" class="product-section product-detail">
          <div class="product-container">
            <h1 class="product-title">{{ productInfo.text }}</h1>
            <span class="product-price">{{ productInfo.price }}$</span>
            <span class="product-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid veritatis possimus
              nulla! Rem ab quas laboriosam enim quae mollitia. Placeat doloremque ipsa quas iusto
              molestiae reiciendis aliquid a earum esse?
            </span>
            <span class="product-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid veritatis possimus
              nulla! Rem ab quas laboriosam enim quae mollitia. Placeat doloremque ipsa quas iusto
              molestiae reiciendis aliquid a earum esse?
            </span>
            <el-row :gutter="10">
              <el-col
                :lg="12"
                :md="24"
                :xs="24"
                v-for="(button, index) in productInfo.buttons"
                :key="index"
              >
                <el-button class="button-item" type="primary" @click="handleClick(button)" plain>{{
                  button.text
                }}</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
export default {
  data() {
    return {
      isVisible: false,
    };
  },
  props: {
    isShow: { type: Boolean, default: false, required: true },
    productInfo: { type: Object, required: true },
  },
  methods: {
    ...mapMutations({
      PUSH_CHAT_ARR: 'chat/PUSH_CHAT_ARR',
    }),
    ...mapActions({
      getNewNode: 'chat/getNewNode',
    }),
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(() => {
          done();
          this.$emit('handleCloseModal', false);
        })
        .catch(() => {});
    },
    handleClick(payload) {
      this.PUSH_CHAT_ARR({ text: payload.text });
      this.$emit('handleCloseModal', false);
      this.getNewNode({ currentNode: { ...payload } });
    },
  },
  computed: {
    isShowListener() {
      return this.isShow;
    },
  },
};
</script>

<style>
.product-modal {
  max-width: 100vw;
  width: 70% !important;
  text-align: left;
}
.product-section {
  padding: 0 10px;
}

.product-detail {
  padding: 20px;
}
.product-picture {
}

.product-picture img {
}

.el-dialog__header {
  background: #597ef7;
  text-align: center;
}

.el-dialog__body.el-dialog__body {
  padding: 10px;
}

.el-dialog__title {
  color: #fff !important;
}

.el-dialog__headerbtn .el-icon.el-dialog__close {
  color: #fff;
}

.product-title {
  font-size: 26px;
}

.product-price {
  font-size: 26px;
  color: #0050b3;
}
</style>

<style scoped>
span {
  display: block;
  margin: 20px 0;
}

.button-item {
  width: 100%;
  margin-bottom: 10px;
}
</style>
