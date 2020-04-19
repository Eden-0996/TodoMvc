import Vue from 'vue'
import App from './App.vue'
import store from './store'
import antD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false


Vue.use(antD)

const app = new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
console.log(app)