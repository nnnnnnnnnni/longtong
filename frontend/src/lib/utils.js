import axios from "axios";
import moment from 'moment';
export const isEmpty = val => {
  return val === "" || val === null || val === undefined || val === [] || val === {};
};

export const downImg = async () => {
  let res = await axios.get(
    "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1"
  );
  console.log(res);
};

export const isPhone = phone => {
  var regex = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  if (!regex.test(phone)) {
    return false;
  } else {
    return true;
  }
};

export const ismail = mail => {
  var regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!regex.test(mail)) {
    return false;
  } else {
    return true;
  }
};

export const isCode = code => {
  var regex = /^[0-9]{6}$/;
  if (!regex.test(code)) {
    return false;
  } else {
    return true;
  }
};

// 防抖
export const debounce = (fnc, wait) => {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fnc();
    }, wait);
  };
};

// 时间格式化
export const timeFormat = (time) => {
  const timeX = new Date().getTime() - new Date(time).getTime();
  if (timeX < 0) {
    return moment(time).format('MM-DD HH:mm:ss');
  } else if (timeX <= 1000 * 60) {
    return moment().diff(moment(time), 'second') + '秒前'
  } else if (timeX <= 1000 * 60 * 60) {
    return moment().diff(moment(time), "minute") + '分钟前'
  } else if (timeX <= 1000 * 60 * 60 * 24) {
    return moment().diff(moment(time), 'hour') + '小时前'
  } else if (timeX <= 1000 * 60 * 60 * 24 * 30) {
    return moment().diff(moment(time), 'day') + '天前'
  } else {
    return moment(time).format('MM-DD HH:mm:ss');
  }
}
