import axios from "axios";
import { message } from "ant-design-vue";
import router from "../router";

axios.interceptors.response.use(
  response => {
    const status = response.data.status;
    if(status == 200) {
      return Promise.resolve(response.data);
    } else if(status == 403 || status == 401){
      message.warn(response.data.msg);
      router.push({name: 'login'})
    } else if(response.status == 404 || status == 404){
      message.warn('NOT FOUND');
    } else {
      message.error(response.data.msg);
      return Promise.resolve(response.data);
    }
  },
  error => {
    return Promise.resolve(error.response);
  }
);

let baseURL = "";
if (process.env.NODE_ENV == "development") {
  baseURL = "http://localhost:8081";
} else {
  baseURL = "http://localhost:8081";
}

export default {
  post(url, data) {
    return new Promise((reslove, reject) => {
      axios({
        method: "POST",
        baseURL: baseURL,
        url,
        data: data,
        timeout: 10000,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(response => {
          reslove(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  get(url, params) {
    return new Promise((reslove, reject) => {
      axios({
        method: "GET",
        baseURL: baseURL,
        url,
        params, // get 请求时带的参数
        timeout: 10000,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(response => {
          reslove(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  put(url, data) {
    return new Promise((reslove, reject) => {
      axios({
        method: "PUT",
        baseURL: baseURL,
        url,
        data: data,
        timeout: 10000,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(response => {
          reslove(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  delete(url, data) {
    return new Promise((reslove, reject) => {
      axios({
        method: "DELETE",
        baseURL: baseURL,
        url,
        data: data,
        timeout: 10000,
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then(response => {
          reslove(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
