// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './components'
import http from './lib/http';
import { message } from 'ant-design-vue';
Vue.prototype.$message = message

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.prototype.$post = http.post;
Vue.prototype.$get = http.get;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
