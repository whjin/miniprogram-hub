const BASE_URL = "";

function request({ url, data, method }) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + url,
      method,
      data,
      success: ({ data }) => {
        if (data.success) {
          resolve(res.data);
        } else {
          uni.wx.showToast({
            title: data.message,
            duration: 3000,
            icon: "none",
            mask: true,
          });
          reject(data.message);
        }
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

export default request;
