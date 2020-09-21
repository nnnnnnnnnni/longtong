import axios from 'axios'

axios.interceptors.response.use(response => {
  return Promise.resolve(response.data)
}, error => {
  return Promise.resolve(error.response)
})

const authorization = localStorage.getItem('token');

let baseURL = '';
if (process.env.NODE_ENV == 'development') {
  baseURL = '/api'
} else {
  baseURL = '/'
}

export default {
  post(url, data) {
    return new Promise((reslove, reject) => {
      axios({
        method: 'POST',
        baseURL: baseURL,
        url,
        data: data,
        timeout: 10000,
        headers: {
          'Authorization': authorization
        }
      }).then(response => {
        reslove(response)
      }).catch(err => {
        reject(err)
      })
    })
  },
  get(url, params) {
    return new Promise((reslove, reject) => {
      axios({
        method: 'GET',
        baseURL: baseURL,
        url,
        params, // get 请求时带的参数
        timeout: 10000,
        headers: {
          'Authorization': authorization
        }
      }).then(response => {
        reslove(response)
      }).catch(err => {
        reject(err)
      })
    })
  },
  put(url, data) {
    return new Promise((reslove, reject) => {
      axios({
        method: 'PUT',
        baseURL: baseURL,
        url,
        data: data,
        timeout: 10000,
        headers: {
          'Authorization': authorization
        }
      }).then(response => {
        reslove(response)
      }).catch(err => {
        reject(err)
      })
    })
  },
  put(url, data) {
    return new Promise((reslove, reject) => {
      axios({
        method: 'DELETE',
        baseURL: baseURL,
        url,
        data: data,
        timeout: 10000,
        headers: {
          'Authorization': authorization
        }
      }).then(response => {
        reslove(response)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
