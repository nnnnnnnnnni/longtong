// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

import { Button, Input, FormModel, Card, Icon, Tooltip, Avatar, DatePicker, Upload } from 'ant-design-vue'
Vue.use(FormModel)
Vue.use(Button)
Vue.use(Input)
Vue.use(Card)
Vue.use(Icon)
Vue.use(Tooltip)
Vue.use(Avatar)
Vue.use(DatePicker)
Vue.use(Upload)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
