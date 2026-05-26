<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view class="subpackage">
      <button type="primary" @click="gotoSearch('search')">跳转至搜索页</button>
      <button type="primary" @click="gotoSearch('goods:list')">
        跳转至商品列表页
      </button>
      <button type="primary" @click="gotoSearch('goods:detail')">
        跳转至商品详情页
      </button>
      <button type="primary" @click="gotoSearch('order')">跳转至订单页</button>
    </view>
  </view>
</template>

<script setup name="Hello">
import { ref, onMounted } from "vue";

const title = ref("Hello World");
const gotoSearch = (type) => {
  let url = "";
  switch (type) {
    case "search":
      url = "/subpkg/search/index";
      break;
    case "goods:list":
      url = "/subpkg/goods/list";
      break;
    case "goods:detail":
      url = "/subpkg/goods/detail";
      break;
    case "order":
      url = "/subpkg/order/index";
      break;
  }
  uni.navigateTo({ url });
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
button {
  margin: 16rpx;
}
</style>
