import { createStore } from 'vuex';
import search from './modules/search';

export default createStore({
  namespaced: true,
  modules: { search },
});
