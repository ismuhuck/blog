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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
axios.interceptors.request.use(
  config =>{
    if(config.url==='/api/login' || config.url ==='/api/register'){
      console.log('');
      
    }
    else{
      if(localStorage.getItem('Authorization')){
        config.headers.Authorizatior = localStorage.getItem('Authorization');
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
router.beforeEach((to,from, next) =>{
  if(to.path === '/'){
    next()
  }else{
    let token = localStorage.getItem('Authorization')
    console.log('本地存储的token'+token);
    if(token === 'null' || token ===''){
      next('/')
    }else{
      next()
    }
    
  }
})
