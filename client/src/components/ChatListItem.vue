<template>
  <div>
    <el-carousel type="card" :interval="4000" height="220px">
      <el-carousel-item v-for="product in products" :key="product.text">
        <el-card :body-style="{ padding: '0px' }" class="product-container">
          <img :src="product.thumb" class="product-image" />
          <div>
            <span class="product-name">{{ product.text }}</span>
            <div class="product-bottom">
              <el-button
                @click="handleClickProductItem({ currentNode: { ...product } })"
                type="primary"
                size="mini"
                class="button"
                >Chi tiết</el-button
              >
            </div>
          </div>
        </el-card>
      </el-carousel-item>
    </el-carousel>

    <chat-modal
      :isShow="dialogVisible"
      @handleCloseModal="handleCloseModal"
      :productInfo="productInfo"
    />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import ChatModal from './ChatModal.vue';
import { getNode } from '@/api/chat';
export default {
  components: { ChatModal },
  props: {
    products: { type: Array, required: true }
  },
  setup() {
    let productInfo = ref({});

    const getProductInfo = async payload => {
      try {
        const tokenLocal = localStorage.getItem('zc');
        const res = await getNode(payload, {
          headers: {
            Authorization: `Bearer ${tokenLocal}`
          }
        });
        productInfo.value = res.data.content;
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    const dialogVisible = ref(false);

    const handleCloseModal = value => {
      dialogVisible.value = value;
    };

    const handleClickProductItem = payload => {
      getProductInfo(payload);
      dialogVisible.value = true;
    };
    return {
      dialogVisible,
      productInfo,
      handleCloseModal,
      handleClickProductItem
    };
  }

  // data() {
  //   return {
  //     dialogVisible: false,
  //   };
  // },
  // methods: {
  //   handleCloseModal(value) {
  //     this.dialogVisible = value;
  //   },
  //   handleClickProductItem(number) {
  //     this.dialogVisible = true;
  //     console.log(this, number);
  //   },
  // },
};
</script>

<style scoped>
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
