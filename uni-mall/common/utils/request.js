import store from '../../store';

const BASE_URL = '';

function request({ url, data, method }) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      data,
      method,
      header: {
        Authorization: store.state.user.token,
      },
      success: (res) => {
        if (res.success) {
          resolve(res.data);
        } else {
          uni.wx.showToast({
            title: data.message,
            duration: 3000,
            icon: 'none',
            mask: true,
          });
          reject(data.message);
        }
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {
        uni.hideLoading();
      },
    });
  });
}

export default request;
