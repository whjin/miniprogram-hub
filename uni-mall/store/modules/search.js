const STORAGE_KEY = 'search-list';
const HISTORY_MAX = 10;

export default {
  state: {
    searchData: uni.getStorageSync(STORAGE_KEY) || [],
  },
  mutations: {
    saveToStorage(state) {},
  },
};
