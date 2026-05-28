<template>
  <view class="ranking-container">
    <image class="ranking-bg" :src="getRankingBg" />
    <text class="ranking-text" :class="{ 'text-white': ranking <= 3 }">{{ ranking }}</text>
  </view>
</template>

<script setup name="hot-ranking">
import { ref, computed } from 'vue';

const props = defineProps({
  ranking: {
    type: Number,
    required: true,
  },
});

const curRanking = ref(props.ranking);

const getRankingBg = computed(() => {
  if (curRanking.value <= 3) {
    return require(`@/static/images/ranking-${curRanking.value}.png`);
  }
  return require('@/static/images/ranking-other.png');
});
</script>

<style lang="scss" scoped>
.ranking-container {
  position: relative;
  text-align: center;
  width: 18px;
  height: 20px;
  .ranking-bg {
    width: 100%;
    height: 100%;
  }
  .ranking-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: $uni-text-color;
  }
  .text-white {
    color: white;
  }
}
</style>
