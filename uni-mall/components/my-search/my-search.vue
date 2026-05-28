<template>
  <view class="my-search-container">
    <uni-search-bar
      v-if="isShowInput"
      class="my-search-bar"
      :radius="100"
      @confirm="onSearch"
      @focus="onFocus"
      @blur="onBlur"
      @clear="onClear"
      @cancel="onCancel"
      @input="onInput"
      :bgColor="config"
    >
      <uni-icons slot="clearIcon" type="clear" color="#999"></uni-icons>
    </uni-search-bar>
    <view
      class="my-search-box"
      v-else
      :style="{
        height: config.height + 'px',
        backgroundColor: config.backgroundColor,
        border: config.border,
      }"
    >
      <image class="icon" :src="config.icon"></image>
      <text
        class="placeholder"
        :style="{
          color: config.textColor,
        }"
        >{{ placeholderText }}</text
      >
    </view>
  </view>
</template>

<script setup name="my-search">
import { ref, onMounted } from 'vue';

const emit = defineEmits([
  'update:modelValue',
  'search',
  'focus',
  'blur',
  'cancel',
  'input',
  'clear',
]);

const props = defineProps({
  modelValue: { type: String, default: '' },
  config: {
    type: Object,
    default: () => {
      return {
        height: 36,
        backgroundColor: '#fff',
        icon: '/static/images/search.png',
        textColor: '#454545',
        border: '1px solid #c9c9c9',
      };
    },
  },
  placeholderText: {
    type: String,
    default: '搜索',
  },
  isShowInput: {
    type: Boolean,
    default: false,
  },
});

const curVal = ref(props.modelValue);
const onSearch = (e) => {
  emit('search', curVal.value);
};
const onFocus = (e) => {
  emit('focus', curVal.value);
};
const onBlur = (e) => {
  emit('blur', curVal.value);
};
const onClear = (e) => {
  emit('clear', curVal.value);
};
const onCancel = (e) => {
  emit('cancel', curVal.value);
};
const onInput = (val) => {
  emit('update:modelValue', val);
};
</script>

<style lang="scss" scoped>
.my-search-container {
  display: flex;
  align-items: center;
  .my-search-bar {
    width: 100%;
  }
  .my-search-box {
    width: 100%;
    height: 36px;
    background-color: #fff;
    border-radius: 15px;
    border: 1px solid #c9c9c9;
    display: flex;
    align-items: center;
    padding: 0 $uni-spacing-row-base;
    .icon {
      width: $uni-img-size-sm;
      height: $uni-img-size-sm;
    }

    .placeholder {
      font-size: $uni-font-size-sm;
      color: #454545;
      margin-left: $uni-spacing-row-sm;
    }
  }
}
</style>
