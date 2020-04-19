import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style.css'

import antD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


Vue.use(antD)
Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.log(app)
