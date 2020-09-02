// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import { Button, Input, FormModel, Card, Icon, Tooltip, Avatar } from 'ant-design-vue'
Vue.use(FormModel)
Vue.use(Button)
Vue.use(Input)
Vue.use(Card)
Vue.use(Icon)
Vue.use(Tooltip)
Vue.use(Avatar)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
