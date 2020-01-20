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
import LikeArticle from "../components/contentSon/likes/likeArticle.vue"
import Search from "../views/search-view.vue"
import Searcharticles from "../views/search/articles.vue"
import Searchuser from "../views/search/user.vue"
import Searchall from "../views/search/all.vue"
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
    path:'/search',
    component:Search,
    // children:[
    //   {path:'all',component:Searchall,name:'searchall'},
    //   {path:'articles',component:Searcharticles,name:'searcharticles'},
    //   {path:'user',component:Searchuser,name:'searchuser'}
    // ]
    children:[
      {path:'',components:{
        all:Searchall,
        articles:Searcharticles,
        user:Searchuser
      }}
    ]
  },
  {
    path:'/forum',
    component:Content,
    children:[
      {path:'default',component:Default,meta:{index:0}},//通过meta 指定自定义属性，这里通过index来用于表示索引，确保动画的过渡效果是有序的
      {path:'year',component:Year,meta:{index:1}},
      {path:'week',component:Week,meta:{index:2}},
      {path:'mouth',component:Mouth,meta:{index:3}},
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
      {path:'focus',component:Focus,meta:{index:1}},
      {path:'like',component:Likeme,meta:{index:3}},
      {path:'collecting',component:Collecting,meta:{index:2}},
      {path:'articles',component:Articles_me,meta:{index:0} },
      {path:'articlesInfo/:articleId/:userId',component:ArticlesInfo,name:'articlesInfo'},
      {path:'likeArticle',component:LikeArticle,meta:{index:4}}
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
  routes,
  mode:'history'//vue默认使用hash 使用history模式会去掉url中的#
});
// 添加路由守卫
const blackList = ['/editor','/personal/articles','/personal','/personal/focus','/personal/collecting','/personal/like','/personal/likeArticle','/edit/editInfo','/edit/edit_ava','/edit/edit_password']
router.beforeEach((to,from, next) =>{
  if(blackList.indexOf(to.path) !== -1){
    let token = localStorage.getItem('Authorization')
    if(token === null || token ===""){
      if(to.path === '/editor'){
        alert('登录后才能发表文章')
      }
      next('/')
    }
    else{
      next()
    }
  }
  else(
    next()
  )
})

export default router;
