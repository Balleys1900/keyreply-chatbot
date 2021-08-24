<template>
  <div>
    <el-dialog
      v-model="$props.isShow"
      title="PRODUCT DETAILS"
      width="30%"
      :before-close="handleClose"
      :customClass="'product-modal'"
      :top="'5vh'"
    >
      <el-row>
        <el-col :span="12" class="product-picture product-section">
          <img
            src="../assets/images/product.jpeg"
            alt=""
            style="max-width: 100%"
          />
        </el-col>
        <el-col :span="12" class="product-section product-detail">
          <div class="product-container">
            <h1 class="product-title">MacBook Pro M1 2020</h1>
            <span class="product-price">999$</span>
            <span class="product-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloribus non illum aperiam, inventore explicabo perspiciatis
              maiores totam ipsa itaque voluptatem optio aliquam corrupti nemo
              animi veniam laudantium suscipit repudiandae possimus!
            </span>
            <span class="product-desc">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Doloribus non illum aperiam, inventore explicabo perspiciatis
              maiores totam ipsa itaque voluptatem optio aliquam corrupti nemo
              animi veniam laudantium suscipit repudiandae possimus!
            </span>
            <el-button type="primary" plain>Buy Now</el-button>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isShow: { type: Boolean, default: false, required: true },
    productObj: { type: Object, default: () => null, required: true },
  },
  methods: {
    handleClose(done) {
      this.$confirm("Are you sure to close this dialog?")
        .then(() => {
          done();
          this.$emit("handleCloseModal", false);
        })
        .catch(() => {});
    },
  },
  computed: {
    isShowListener() {
      return this.$props.isShow;
    },
  },
};
</script>


<style >
.product-modal {
  min-width: 70%;
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
</style>