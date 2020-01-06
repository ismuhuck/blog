import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Content from "../components/contentSon/content.vue"
import Default from "../components/contentSon/blog/defaultBlog.vue"
import Year from "../components/contentSon/blog/year.vue"
import Week from "../components/contentSon/blog/weekBlog.vue"
import Mouth from "../components/contentSon/blog/mouthBlog.vue"
import Editor from "../components/editor.vue"
import Articles from "../components/articles.vue"
import Personal from "../components/personal.vue"
import EditPersonal from "../components/editpersonal.vue"
import EditInfo from "../components/contentSon/edit/edit_info.vue"
import Editava from "../components/contentSon/edit/edit_ava.vue"
import EditPassword from "../components/contentSon/edit/edit_password.vue"
import About from "../components/aboutme.vue"
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
    path:'/articles',component:Articles
  },
  {
    path:'/personal',component:Personal
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

export default router;
