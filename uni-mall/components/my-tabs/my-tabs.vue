<template>
  <view class="tab-container">
    <view class="tab-box">
      <scroll-view
        id="_scroll"
        scroll-x
        class="scroll-view"
        scroll-with-animation
        :scroll-left="scrollLeft"
      >
        <view class="scroll-content">
          <view class="tab-item-box">
            <block v-for="(item, index) in tabList" :key="index">
              <view
                class="tab-item"
                :id="`_tab_${index}`"
                :class="{ 'tab-item-active': activeIndex === index }"
                @click="tabClick(index)"
                :style="{
                  color:
                    activeIndex === index ? defaultConfig.activeTextColor : defaultConfig.textColor,
                }"
              >
                {{ item.label || item }}
              </view>
            </block>
          </view>
          <view
            class="underLine"
            :style="{
              transform: 'translateX(' + slider.left + 'px)',
              width: defaultConfig.underLineWidth + 'px',
              height: defaultConfig.underLineHeight + 'px',
              backgroundColor: defaultConfig.underLineColor,
            }"
          ></view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup name="my-tabs">
import { ref, watch, nextTick, onMounted, getCurrentInstance, computed } from 'vue';

const emit = defineEmits(['tabClick']);

const props = defineProps({
  tabData: {
    type: Array,
    default: () => [],
  },
  defaultIndex: {
    type: Number,
    default: 0,
  },
  config: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const tabList = ref([]);
const activeIndex = ref(-1);
const slider = ref({ left: 0 });
const scrollLeft = ref(0);
const defaultConfig = ref({
  textColor: '#333',
  activeTextColor: '#f94d2a',
  underLineWidth: 24,
  underLineHeight: 2,
  underLineColor: '#f94d2a',
});

const instance = getCurrentInstance();
const updateTabWidth = async () => {
  const data = tabList.value;
  if (data.length === 0) return false;

  const query = uni.createSelectorQuery().in(instance);
  data.forEach((item, index) => {
    query
      .select('#_tab_' + index)
      .boundingClientRect((res) => {
        item._slider = {
          left: res.left + (res.width - defaultConfig.value.underLineWidth) / 2,
        };
        if (data.length - 1 === index) {
          tabToIndex();
        }
      })
      .exec();
  });
};

function tabClick(index) {
  activeIndex.value = index;
  tabToIndex();
  emit('tabClick', index);
}

function tabToIndex() {
  if (tabList.value.length === 0) return;
  const index = activeIndex.value;
  const underLineWidth = defaultConfig.value.underLineWidth;
  slider.value = {
    left: tabList.value[index]._slider.left,
  };
  scrollLeft.value = index * defaultConfig.value.underLineWidth;
}

watch(
  () => props.tabData,
  (newData) => {
    tabList.value = newData;
    nextTick(() => {
      updateTabWidth();
    });
  },
  { immediate: true }
);

watch(
  () => props.defaultIndex,
  (newIndex) => {
    activeIndex.value = newIndex;
    tabToIndex();
  },
  { immediate: true }
);

watch(
  () => props.config,
  (newConfig) => {
    defaultConfig.value = {
      ...defaultConfig.value,
      ...newConfig,
    };
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.tab-container {
  font-size: $uni-font-size-base;
  height: 45px;
  line-height: 45px;
  background-color: $uni-bg-color;
  .tab-box {
    width: 100%;
    height: 45px;
    display: flex;
    position: relative;
    .scroll-view {
      white-space: nowrap;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .scroll-content {
        width: 100%;
        height: 100%;
        position: relative;

        .tab-item-box {
          height: 100%;
          .tab-item {
            height: 100%;
            display: inline-block;
            text-align: center;
            padding: 0 15px;
            position: relative;
            color: $uni-text-color;

            &-active {
              color: $uni-text-color-hot;
            }
          }
        }
        .underLine {
          height: 2px;
          width: 25px;
          background-color: #f01414;
          border-radius: 3px;
          transition: 0.5s;
          position: absolute;
          bottom: 0;
        }
      }
    }
  }

  /* #ifdef H5 */
  /deep/.uni-scroll-view::-webkit-scrollbar {
    display: none;
  }

  /deep/.uni-scroll-view {
    scrollbar-width: none;
  }
  /* #endif */
}
</style>
