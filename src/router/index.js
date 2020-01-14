import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Content from "../components/contentSon/content.vue"
import Default from "../components/contentSon/blog/defaultBlog.vue"
import Year from "../components/contentSon/blog/year.vue"
import Week from "../components/contentSon/blog/weekBlog.vue"
import Mouth from "../components/contentSon/blog/mouthBlog.vue"
import Editor from "../components/editor.vue"
import Homepage from "../components/homepage.vue"
import Articles from "../components/homepage/articles.vue"
import ArticlesList from "../components/homepage/articlesList.vue"
import Personal from "../components/personal.vue"
import EditPersonal from "../components/editpersonal.vue"
import EditInfo from "../components/contentSon/edit/edit_info.vue"
import Editava from "../components/contentSon/edit/edit_ava.vue"
import EditPassword from "../components/contentSon/edit/edit_password.vue"
import About from "../components/aboutme.vue"
import ArticlesInfo from "../components/articlesInfo.vue"
import Focus from "../components/contentSon/likes/focus.vue"
import Likeme from '../components/contentSon/likes/like_me.vue'
import Collecting from "../components/contentSon/likes/collecting.vue"
import Articles_me from "../components/contentSon/likes/articles_me.vue"
// import Homepage from "../views/focus_user.vue"
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path:"/detalis",
  },
  {
    path:'/forum',
    component:Content,
    children:[
      {path:'default',component:Default},
      {path:'year',component:Year},
      {path:'week',component:Week},
      {path:'mouth',component:Mouth},
    ]
  },
  {
    path:'/editor',component:Editor
  },
  {
    path:'/homepage',component:Homepage,name:'homepage',
    children:[
      {path:'articles/:articleId/:userId',component:Articles,name:'articles'},
      {path:'articlesList/:userId',component:ArticlesList,name:'home'}
    ]
  },
  // 使用命名路由  动态传参
  // {
  //   path:'/home/:userId',component:Homepage,name:'home'
  // },
  // {
  //   path:'/articlesInfo',name:"articlesInfo",component:ArticlesInfo
  // },
  {
    path:'/personal',component:Personal,redirect:'/personal/articles',
    children:[
      {path:'focus',component:Focus},
      {path:'like',component:Likeme},
      {path:'collecting',component:Collecting},
      {path:'articles',component:Articles_me},
      {path:'articlesInfo/:articleId/:userId',component:ArticlesInfo,name:'articlesInfo'}
    ]
  },
  {
    path :'/edit',component:EditPersonal,redirect:'/edit/editInfo',
    children:[
      {path:'editInfo',component:EditInfo},
      {path:'edit_ava',component:Editava},
      {path:'edit_password',component:EditPassword}
    ]
  },
  {
    path:'/about',component:About
  }
];

const router = new VueRouter({
  routes
});
const whiteList = ['/','/detalis','/forum/default','/articles','/about','/editor','/forum/week','/forum/mouth','/forum/year']
router.beforeEach((to,from, next) =>{
  if(whiteList.indexOf(to.path) !== -1 ){
    next()
  }
  else{
    let token = localStorage.getItem('Authorization')
    // console.log('本地存储的token'+token);
    if(token === null || token ===''){
      next('/')
    }
    else{
      next()
    }
  }
})

export default router;
