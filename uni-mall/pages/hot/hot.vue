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
    <swiper
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
              v-for="(item, index) in listData[tabIndex]"
              :key="item.id"
              :data="item"
              :ranking="index + 1"
              @click="onItemClick(item)"
            ></hot-list-item>
          </block>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup name="hot">
import { ref, onMounted, nextTick, getCurrentInstance } from 'vue';
import { getHotTabs, getHotListFromTabType } from '@/common/api/hot';
import { onPageScroll } from '@dcloudio/uni-app';

let tabData = ref([]);
let currentIndex = ref(0);
let isLoading = ref(false);
let listData = ref({});
let currentSwiperHeight = ref(0);
let swiperHeightData = ref({});
let currentPageScrollTop = ref(0);

const instance = getCurrentInstance();

onPageScroll((e) => {
  currentPageScrollTop.value = e.scrollTop;
});

const getHotTabsData = async () => {
  const data = await getHotTabs();
  tabData.value = data;
  getHotListFromTab();
};

async function getHotListFromTab() {
  isLoading.value = true;
  const id = tabData.value[currentIndex.value].id;
  const data = await getHotListFromTabType(id);
  listData.value[currentIndex.value] = data;
  isLoading.value = false;
  nextTick(async () => {
    currentSwiperHeight.value = await getCurrentSwiperHeight();
    swiperHeightData.value[currentIndex.value] = currentSwiperHeight.value;
  });
}

const tabClick = (index) => {
  currentIndex.value = index;
  getHotListFromTab();
};

const onSwiperChange = (e) => {
  if (currentPageScrollTop > 130) {
    uni.pageScrollTo({
      scrollTo: 130,
    });
  }
  if (e.detail.source === 'touch') {
    currentIndex.value = e.detail.current;
  }
};

const onSwiperEnd = () => {
  if (!listData.value[currentIndex.value]) {
    getHotListFromTab();
    return;
  }
  currentSwiperHeight.value = swiperHeightData.value[currentIndex.value];
};

const getCurrentSwiperHeight = () => {
  return new Promise((resolve, reject) => {
    let sum = 0;
    const query = uni.createSelectorQuery().in(instance);
    query
      .selectAll(`.hot-list-item-${currentIndex.value}`)
      .boundingClientRect((res) => {
        res.forEach((item) => {
          sum += item.height;
        });
        resolve(sum);
      })
      .exec();
  });
};

const onToSearch = () => {
  uni.navigateTo({
    url: '/subpkg/pages/search-blog/search-blog',
  });
};

const onItemClick = (item) => {
  console.log('111111111');
  uni.navigateTo({
    url: `/subpkg/pages/blog-detail/blog-detail?author=${item.user_name}&articleId=${item.id}`,
  });
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
