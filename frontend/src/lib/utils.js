import axios from "axios";
export const isEmpty = val => {
  return val == "" || val == null || val == undefined || val == [] || val == {};
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

export const debounce = (fnc, wait) => {
  let timer = null;
  return function() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fnc();
    }, wait);
  };
};
