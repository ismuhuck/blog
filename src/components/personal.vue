<template>
  <div class="personal">
    <div class="perLeft">
      <div class="personInfo">
        <div class="infoHeader">
          <div class="nick">
            <p>
              <a>{{user.nickName}}</a>
            </p>
          </div>
          <div class="ata">
            <a>
              <img :src="user.avatar" alt />
            </a>
          </div>
        </div>
        <div class="infoBody">
          <div class="infoLabel">
            <div class="label">文章</div>
            <div class="value"><span>{{text.length}}</span></div>
          </div>
          <div class="infoLabel">
            <div class="label">粉丝</div>
            <div class="value"><span>{{likeme}}</span></div>
          </div>
          <div class="infoLabel">
            <div class="label">关注</div>
            <div class="value"><span>{{focus}}</span></div>
          </div>
          <div class="infoLabel">
            <div class="label">收藏</div>
            <div class="value"><span>{{shoucang}}</span></div>
          </div>
        </div>
      </div>

      <div class="btnText">
        <router-link to="/editor" class="btn">编写文章</router-link>
      </div>
      <div class="btnText">
        <router-link to="/personal/articles" class="btn">我的发表
        </router-link>
      </div>
      <div class="record">
          <div class="recordTitle"><router-link to="/edit/editInfo">个人档</router-link> </div>
          <p class="recordSex"> <i class="icon iconfont icon-V"></i> {{user.sex | sexFilter()}}</p>
          <p class="recordqianming"> <i class="icon iconfont icon-qianming"></i>{{user.qianming}}</p>
          <transition mode="out-in">
          <p class="downLike" v-if="likes" title="我的收藏" style="text-align:center;color:red;margin-bottom:0;height:176px;"><i @click="likes_show" class="icon iconfont icon-xin" style="font-size:20px;cursor:pointer;"><span style="font-size:14px; vertical-align: 2px;"> 点击查看更多</span></i></p>
          <ul v-else class="likes" style="margin-bottom:0">
            <li><router-link to="/personal/focus"><i class="icon iconfont icon-guanzhu"></i> 我的关注</router-link> </li>
            <li><router-link to="/personal/collecting"><i class="icon iconfont icon-shoucang"></i>我的收藏</router-link> </li>
            <li><router-link to="/personal/like"><i class="icon iconfont icon-fensi"></i>我的粉丝</router-link> </li>
            <li><router-link to="/personal/likeArticle"><i class="icon iconfont icon-z-like"></i>我点赞的</router-link> </li>
            <li style="text-align:center"><i @click="likes_show" class="icon iconfont icon-xin" style="font-size:20px;color:red;cursor:pointer;"></i></li>
          </ul>
          </transition>
        </div>
    </div>
    <div class="perRight"> 
      <transition :name="transitionName" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
import formatTime from '../../util/util'
export default {
  data() {
    return {
      likes:true,
      comment: "",
      text:'',
      token:localStorage.getItem('Authorization'),
      user:{},
      likeme:0,
      focus:0,
      shoucang:0,
      transitionName:'',
    };
  },
  // 过滤器
  filters:{
    sexFilter(data){
      if(data === 'man'){
        return '男'
      }
      else {
        return '女'
      }
    }
  },
  methods:{
    // 时间戳格式化方法
    formatTime:formatTime,
    // 关注的显示与隐藏
    likes_show(){
      this.likes = !this.likes
    },
    getUser(){
      this.axios({
        method:'get',
        url:'getUser'
      })
      .then( res => {
        const {data:result} = res
        this.user = result.user
        this.focus = this.user.focus.length
        this.likeme = this.user.likeme.length
        this.shoucang = result.collecting.length
      })
      .catch( err => {
        console.log(err)
      })
    },
    getArticle(){
      this.axios({
      method:'get',
      url:'getArticle',
      // headers:{
      //     Authorization:token
      //   }
    }).then((res) => {
      const {data:result} = res
      this.text=result
    }).catch((err) => {
      console.log(err)
    });
    }
  },
  watch:{
    '$route'(to,from){
      const toIndex = to.meta.index
      const fromIndex = from.meta.index
      this.transitionName = toIndex > fromIndex ? 'slidedown' : 'slideup'
    }
  },
  mounted(){
    this.getUser()
    this.getArticle()
  }
};
</script>
<style lang="scss" scoped>
.slidedown-enter-active,
.slidedown-leave-active,
.slideup-leave-active,
.slideup-enter-active{
  transition: all 300ms;
  position: absolute;
}
.slideup-enter{
  opacity: 0;
  transform: translate(0,-100%)
}
.slideup-leave-to{
  opacity: 0;
  transform: translate(0,100%)
}
.slidedown-enter{
  opacity: 0;
  transform: translate(0,100%)
}
.slidedown-leave-to{
  opacity: 0;
  transform: translate(0,-100%)
}
.personal {
  display: flex;
  width: 1120px;
  margin: 0 auto;
  .perLeft {
    width: 320px;
    .btnText{
      margin-top: 40px;
      margin-bottom: 40px;
      text-align: center;
      .btn{
        background-color: rgb(198, 55, 50);
        width: 100%;
        color: #fff;
        font-weight: 600;
      }
    }
    .personInfo {
      color: rgb(100, 100, 100);
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      border-top: 3px solid rgb(198, 55, 50);
      .infoHeader {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid rgb(235, 235, 235);
        padding-bottom: 20px;
        .nick {
          p {
            margin-bottom: 5px;
            a {
              color: rgb(100, 100, 100);
            }
          }
        }
        .ata {
          a {
            img {
              width: 55px;
              height: 55px;
              border-radius: 50%;
            }
          }
        }
      }
      .infoBody {
        display: flex;
        justify-content: space-between;
        padding: 20px 10px;
        border-bottom: 1px solid rgb(235, 235, 235);
        .infoLabel{
          .value{
            text-align:center;
            span{
              color: #fff;
              background-color: rgb(198, 55, 50);
              width: 25px;
              height: 25px;
              border-radius: 50%;
              display: inline-block;
            }
          }
        }
      }
    }
    .record{
      background-color: #fff;
      padding: 20px 20px;
      border-radius: 5px;
      .recordTitle{
        font-size: 18px;
        font-weight: 600;
        padding: 10px 0;
        border-bottom: 1px solid rgb(215,215,215);
        a{
          color: rgb(198, 55, 50)
        }
      }
      .recordSex{
        padding-bottom: 10px;
        margin-top: 10px;
        border-bottom: 1px solid rgb(215,215,215)
      }
      .likes{
        list-style: none;
        li{
            padding: 5px 0;
            a{
              color: rgb(198, 55, 50);
              font-weight: 600;
              font-size: 15px
            }
            a.router-link-active::after{
              content: '--';
              font-family: "iconfont";
              display: inline-block;
              margin-left: 10px;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
        }
        li:hover{
          background-color: rgb(235,235,235)
        }
      }
    }
  }
  .perRight {
    margin-left: 10px;
    .textInfo {
      width: 784px;
      background-color: #fff;
      border-radius: 8px;
      padding: 5px;
      color: rgb(100, 100, 100);
      border: 1px solid rgb(235, 235, 235);
      h4 {
        padding: 5px 0;
        // padding-bottom: 30px;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        color: rgb(54, 54, 54);
        // border-bottom: 1px solid rgb(235, 235, 235);
      }
    }
    .personalBlog {
      border: 1px solid rgb(235, 235, 235);
      background-color: #fff;
      border-radius: 8px;
      margin-top: 20px;
      padding: 20px;
      .blog {
        display: flex;
        justify-content: space-between;
        .blogLeft{
            a{
                 color: rgb(100, 100, 100);
            }
        }
        .blogRight{
            span{
                padding: 5px 10px;
                border: 1px solid ;
                border-radius: 5px;
                margin-right: 10px;
                color: rgb(198, 55, 50);
                span{
                  margin-left: 10px;
                  margin-right: 0;
                  border: none;
                }
            }
        }
      }
      .blogBottom{
          margin-top: 20px;

          span{
              padding: 5px 10px;
              color: rgb(100, 100, 100);
          }
          span:nth-child(1){
              padding-left: 0px;
          }
      }
    }
  }
}
</style>