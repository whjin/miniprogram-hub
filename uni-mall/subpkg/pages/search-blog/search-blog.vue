<template>
  <view class="search-container">
    <view class="search-bar-box">
      <my-search
        :placeholderText="defaultText"
        v-model="searchVal"
        :isShowInput="true"
        :config="{
          backgroundColor: '#f1f0f3',
        }"
        @search="onSearchConfirm"
        @focus="onSearchFocus"
        @blur="onSearchBlur"
        @clear="onSearchClear"
        @cancel="onSearchCancel"
      ></my-search>
    </view>
    <view class="search-hot-list-box card" v-if="showType === HOST_LIST">
      <search-hot-list @onSearch="onSearchConfirm" />
    </view>
    <view class="search-history-box" v-else-if="showType === SEARCH_HISTORY">
      <search-history @onItemClick="onSearchConfirm" />
    </view>
    <view class="search-result-box" v-else>
      <search-result-list ref="mescrollItem" :queryStr="searchVal" />
    </view>
  </view>
</template>

<script setup name="search-blog">
import { ref, onMounted } from 'vue';
import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js';
import store from '@/store';
import { getDefaultText } from '@/common/api/search';

const HOST_LIST = '0';
const SEARCH_HISTORY = '1';
const SEARCH_RESULT = '2';

const defaultText = ref('请输入关键字');
const searchVal = ref('');
const showType = ref(HOST_LIST);
const searchData = ref([]);

const loadDefaultText = async () => {
  const res = await getDefaultText();
  console.log('111', res);
};

const onSearchConfirm = (val) => {
  searchVal.value = val ?? defaultText.value;
};

// 保存搜索历史数据
const saveSearchData = () => {
  const index = searchData.value.findIndex((item) => item === searchVal.value);
  if (index === -1) {
    searchData.value.splice(index, 1);
  }
  searchData.value.unshift(searchVal.value);
};

// 删除数据
const onRemoveSearchData = (index) => {
  searchData.value.splice(index, 1);
};

const onRemoveAllSearchData = () => {
  searchData.value = [];
};

const onSearchFocus = (val) => {
  showType.value = SEARCH_HISTORY;
};

const onSearchBlur = (val) => {};
const onSearchClear = () => {
  showType.value = SEARCH_HISTORY;
};
const onSearchCancel = () => {
  showType.value = HOST_LIST;
};

onMounted(() => {
  loadDefaultText();
});
</script>

<style lang="scss" scoped>
.search-container {
  background-color: $uni-bg-color;
  padding: $uni-spacing-row-sm;
  position: sticky;
  top: 0;
  z-index: 9;
}
</style>
