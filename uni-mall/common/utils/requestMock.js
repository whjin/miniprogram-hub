import store from '../../store';
import Mock from '../mock';

const BASE_URL = 'https://localhost:8080';

function request({ url, data, method }) {
  return new Promise((resolve, reject) => {
    try {
      if (Mock[url]) {
        const res = Mock[url];
        if (res.success) {
          resolve(res);
        } else {
          reject(res.message);
        }
      } else {
        reject('获取Mock数据失败');
      }
    } catch (err) {
      reject(err);
    }
    uni.hideLoading();
  });
}

export default request;
