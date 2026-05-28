import hotTabs from '../mock/hot-tabs';
import hotList from '../mock/hot-list';
export function getHotTabs() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(hotTabs);
    }, 300);
  });
}

// 热搜文章列表
export function getHotListFromTabType(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(hotList[id]);
    }, 500);
  });
}
