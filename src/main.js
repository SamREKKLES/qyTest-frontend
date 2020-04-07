// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import api from './http'
// import axios from 'axios'
// import util from './utils/util'
import 'iview/dist/styles/iview.css'
import './theme/index.less'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import global from './utils/global'
import ViewUI from 'view-design'
import 'font-awesome/css/font-awesome.min.css'
import i18n from './i18n'
import Cookies from 'js-cookie'

Vue.use(ElementUI) // 注册使用Element
Vue.use(iView) // 注册使用iview
Vue.use(api) // 注册使用api模块
Vue.prototype.global = global // 挂载全局配置模块
Vue.prototype.logout = function () {
    Cookies.remove('token')
    sessionStorage.removeItem('user')
    this.$router.push('/login')
    this.$api.login.logout().then((res) => {
}).catch(function (res) {
    })
    }
// // axios.defaults.withCredentials = true
// Vue.prototype.util = util
// Vue.config.productionTip = false
// Vue.prototype.$ajax = axios.create({
//     withCredentials: true,
//     crossDomain: true
// })
// axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    components: { App },
    template: '<App/>'
})
