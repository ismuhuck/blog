import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import axios from 'axios';
import VueAxios from 'vue-axios';
import "./plugins/element.js";
import "bootstrap/dist/css/bootstrap.css";
import "jquery/dist/jquery";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/css/global.css"
import "./assets/form/iconfont.css"

// import "./css/font-awesome.min.css"
// import "tinymce/skins"
// import

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
// 配置全局请求根路径
axios.defaults.baseURL = 'http://localhost:5000/api/'
// axios 请求拦截器 为每次请求添加token 在vue挂载完成之前获取到token 否则在created和mounted执行的过程中 token为undefined
axios.interceptors.request.use(
  config =>{
    let token = localStorage.getItem('Authorization')
    if(token){
      config.headers.Authorization=token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// router.beforeEach((to,from, next) =>{
//   if(to.path === '/'){
//     next()
//   }else{
//     let token = localStorage.getItem('Authorization')
//     // console.log('本地存储的token'+token);
//     if(token === 'null' || token ===''){
//       next('/')
//     }else{
//       next()
//     }
    
//   }
// })
