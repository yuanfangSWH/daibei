// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import axios from 'axios'
import VueQuillEditor from 'vue-quill-editor'
import echarts from "echarts";
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import api from './api/api'

Vue.prototype.api = api
Vue.use(api);
// import {post,fetch,patch,put} from './utils/http'
// //定义全局变量
// Vue.prototype.$post=post;
// Vue.prototype.$fetch=fetch;
// Vue.prototype.$patch=patch;
// Vue.prototype.$put=put;

//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {
  size: 'small'//组件尺寸
});
//v-charts图表插件-按需引入了-折线图
import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)

Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(iView);
Vue.prototype.axios = axios
Vue.use(VueQuillEditor);
Vue.prototype.$echarts = echarts;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
  // if(to.path == '/login'){
  //   next();
  // }else{
  //   alert('您还没有登录，请先登录');
  //   next('/login');
  // }
})
Vue.prototype.$Message.config({
  top: 300,
  duration:2
});
axios.defaults.timeout = 20000;
