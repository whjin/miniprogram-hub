<template>
  <view class="hot-container">
    <image class="logo" mode="aspectFit" src="@/static/images/logo.png"></image>
    <view class="search-box" @click="onToSearch">
      <my-search placeholderText="uni-app 自定义组件"></my-search>
    </view>
    <view class="tab-sticky">
      <my-tabs
        :tabData="tabData"
        :defaultIndex="currentIndex"
        :config="{ textColor: '#333' }"
        @tabClick="tabClick"
      ></my-tabs>
    </view>

    <!-- <swiper
      class="swiper"
      :current="currentIndex"
      :style="{ height: currentSwiperHeight + 'px' }"
      @animationfinish="onSwiperEnd"
      @change="onSwiperChange"
    >
      <swiper-item class="swiper-item" v-for="(tabItem, tabIndex) in tabData" :key="tabIndex">
        <view>
          <uni-load-more status="loading" v-if="isLoading"></uni-load-more>
          <block v-else>
            <hot-list-item
              :class="'hot-list-item-' + tabIndex"
              v-for="(item, index) in tabData[tabIndex]"
              :key="index"
              :data="item"
              :ranking="index + 1"
              @click="onItemClick(item)"
            ></hot-list-item>
          </block>
        </view>
      </swiper-item>
    </swiper> -->
  </view>
</template>

<script setup name="hot">
import { ref, onMounted } from 'vue';
import { getHotTabs, getHotListFromTabType } from '@/common/api/hot';
import { onPageScroll } from '@dcloudio/uni-app';

let tabData = ref([]);
const currentIndex = ref(0);
const isLoading = ref(false);
const listData = ref({});
const currentSwiperHeight = ref(0);
const swiperHeightData = ref({});
const currentPageScrollTop = ref(0);

onPageScroll((e) => {
  currentPageScrollTop.value = e.scrollTop;
});

const getHotTabsData = async () => {
  const res = await getHotTabs();
  tabData.value = res.data;
  // getHotListFromTab();
};

const getHotListFromTab = async () => {
  isLoading.value = true;
  const id = tabData.value[currentIndex.value].id;
  const res = await getHotListFromTabType(id);
  console.log('11111111', res);
  listData.value[currentIndex.value] = res.data;
};

const onToSearch = () => {};
const tabClick = (index) => {
  currentIndex.value = index;
};

onMounted(() => {
  getHotTabsData();
});
</script>

<style lang="scss" scoped>
.hot-container {
  background-color: $uni-bg-color;
  .logo {
    width: 100%;
    height: 80px;
  }
  .search-box {
    padding: 0 16px;
    margin-bottom: $uni-spacing-col-base;
  }
  .tab-sticky {
    position: -webkit-sticky;
    position: sticky;
    z-index: 99;
    /* #ifdef APP */
    top: 0;
    /* #endif */
    /* #ifdef H5 */
    top: 44px;
    /* #endif */
  }
}
</style>
