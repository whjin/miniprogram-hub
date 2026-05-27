import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import rTime from 'dayjs/plugin/relativeTime';

dayjs.locale('zh-cn');
dayjs.extend(rTime);

// 把【当前时间】转为【相对时间】
// dayjs().to(dayjs(val))
export function ralativeTime(val) {
  return dayjs().to(dayjs(val));
}

// 把字符串转为以 千 为单位的字符
export function hotNumber(val) {
  const num = parseInt(val);
  if (num < 1000) return val;
  val = val + '';
  return val.slice(0, val.length - 3) + 'k';
}
