import { login } from 'common/api/user';
import { act } from 'react';
const STORAGE_KEY = 'user-info';
const TOKEN_KEY = 'token';

export default {
  state: {
    token: uni.getStorageSync(TOKEN_KEY) || '',
    userinfo: uni.getStorageSync(STORAGE_KEY) || {},
  },
  mutations: {
    // 保存 token 到 vuex
    setToken(state, token) {
      state.token = token;
      this.commit('user/saveToken');
    },
    // 保存 token 到本地
    saveToken(state) {
      uni.setStorage({
        key: TOKEN_KEY,
        data: state.token,
      });
    },
    // 删除 token
    removeToken(state) {
      state.token = '';
      this.commit('user/saveToken');
    },
    // 保存用户信息到 vuex
    setUserInfo(state, userinfo) {
      state.userinfo = userinfo;
      this.commit('user/saveUserInfo');
    },
    // 保存用户信息到本地
    saveUserInfo(state) {
      uni.setStorage({
        key: STORAGE_KEY,
        data: state.userinfo,
      });
    },
    // 删除用户信息
    removeUserInfo(state) {
      state.userinfo = {};
      this.commit('user/saveUserInfo');
    },
  },
  actions: {
    // 登录
    async login(context, userProfile) {
      // 用户数据
      const rawData = JSON.parse(userProfile.rawData);

      const { data: res } = await login({
        signature: userProfile.signature,
        iv: userProfile.iv,
        nickName: rawData.nickName,
        avatarUrl: rawData.avatarUrl,
        gender: rawData.gender,
        city: rawData.city,
        province: rawData.province,
      });
      this.commit('user/setToken', res.token);
      this.commit('user/setUserInfo', JSON.parse(userProfile.rawData));
    },
    // 登出
    logout(context) {
      this.commit('user/removeToken');
      this.commit('user/removeUserInfo');
    },
    // 进行登录校验
    async isLogin(context) {
      if (context.state.token) return true;
      const [error, res] = await uni.wx.showModal({
        title: '登录之后才可以进行后续操作',
        content: '立即跳转到登录页面？（登录后会自动返回当前页面）',
      });
      const { cancel, confirm } = res;
      if (confirm) {
        uni.navigateTo({
          url: '/subpkg/pages/login-page/login-page',
        });
      }
      return false;
    },
  },
};
