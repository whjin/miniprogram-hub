import hotTabs from './hot-tabs';
import hotList from './hot-list';

export default {
  '/hot/tabs': {
    success: true,
    message: '获取成功',
    data: hotTabs,
  },
  '/hot/list': {
    success: true,
    message: '获取成功',
    data: hotList,
  },
};
