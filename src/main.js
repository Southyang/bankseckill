//引入vue
import Vue from 'vue'
//引入App
import App from './App.vue'
//引入VueRouter
import VueRouter from 'vue-router'
//引入路由
import router from './router'
//引入store
import store from './store'
//引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8080/' //定义根路径
// axios.defaults.baseURL = 'http://code.southyang.cn:8080/' //定义根路径
axios.defaults.withCredentials = true //允许后端写入cookie
Vue.prototype.$http = axios //在原型链上给$http赋值为axios对象
//引入qs
import qs from 'qs';
Vue.prototype.$qs = qs;  //其中$xx为新命的名。
//引入default-passive-events
import 'default-passive-events'
//引入element-ui
import './assets/js/message'
import { DatePicker , Dialog, Button} from 'element-ui'
Vue.component('el-date-picker', DatePicker);
Vue.component('el-dialog', Dialog);
Vue.component('el-button', Button);

//关闭Vue的生产提示
Vue.config.productionTip = false
//应用插件
Vue.use(VueRouter)

//创建vm
new Vue({
  el: '#app',
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this //安装全局事件总线
  },
  router,
  store
})
