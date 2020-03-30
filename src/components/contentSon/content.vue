<template>
  <div class="content">
    <!-- <div class="top"></div> -->
    <div class="flexBox">
      <div class="container">
        <h4>
          <router-link to="/forum/default">默认</router-link>
          <router-link to="/forum/week">周榜</router-link>
          <router-link to="/forum/mouth">月榜</router-link>
          <router-link to="/forum/year">年榜</router-link>
        </h4>
        <transition :name="transitionName" mode="out-in">
          <router-view></router-view>
        </transition>
          
      </div>
      <div class="rightBox">
        <div class="showBox">
          <h4>五角的雪花科技论坛</h4>
          <div class="showcont">
            五角的雪花科技论坛是一个分享科技与技术的平台，不断更新每日技术资讯，分享最前沿的技术，一起成长和进步
          </div>
          <div class="butt">
            <!-- <button class="btn btn1">加入社区</button> -->
            <router-link to="/editor"> <el-button id="updateBtn">发帖</el-button></router-link>
            
          </div>
        </div>
        <a href>
          <img src="../../assets/rightAd.png" alt="广告位" class="ad1" />
        </a>
        <div class="friend">
          <h4>友情链接</h4>
          <a href>
            <img src="../../assets/ruby-china.png" alt />
          </a>
          <a href>
            <img src="../../assets/cnodejs.png" alt />
          </a>
          <a href>
            <img src="../../assets/test.png" alt />
          </a>
          <a href>
            <img src="../../assets/ease.png" alt />
          </a>
          <a href>
            <img src="../../assets/python.png" alt />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import ''
export default {
  data() {
    return {
      currentDate: new Date(),
      transitionName:''
    };
  },
 watch: {
  '$route' (to, from) {
    // 通过监听路由变化判断具体执行哪个动画  可以通过路由的参数来获取到之前设置的索引，从而判断动画效果是向左还是向右
    const toIndex = to.meta.index
    const fromIndex = from.meta.index
    this.transitionName = toIndex < fromIndex ? 'slide-right' : 'slide-left'
  }
}
};
</script>
<style lang="scss" scoped>
// 动态路由过渡效果
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate(-100%, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate(100%, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate(-100%, 0);
}
.top {
  width: 1120px;
  height: 20px;
}
.flexBox {
  display: flex;
  width: 1120px;
  margin: 0 auto;
  .container {
    padding: 20px;
    background-color: white;
    width: 780px;
    margin: 0 auto;
    border: 1px solid rgb(215, 215, 215);
    border-radius: 8px;
    h4 {
      display: flex;
      justify-content: flex-start;
      // margin: 10px 20px;
      border-bottom: 1px solid rgb(215, 215, 215);
      padding-bottom: 20px;
      a {
        margin-right: 20px;
        color: rgb(45, 45, 45);
        font-size: 15px;
        text-decoration: none;
      }
      .router-link-active{
        color: rgb(207, 71, 66);
     }
    }
  }
  .rightBox {
    width: 324px;
    margin-left: 10px;
    h4 {
      border-bottom: 1px solid rgb(215, 215, 215);
      padding-bottom: 20px;
      margin-top: 20px;
      text-align: center;
    }
    .showBox {
      background-color: white;
      border: 1px solid rgb(215, 215, 215);
      border-radius: 8px;
      font-size: 15px;
      border-top: 3px solid rgb(198, 55, 50);
      .showcont {
        padding: 20px;
        border-bottom: 1px solid rgb(245, 245, 245);
      }
      .butt {
        display: flex;
        justify-content: center;
        margin: 20px 0;
        .btn {
          width: 100px;
          height: 35px;
          border: 1px solid rgb(198, 55, 50);
          border-radius: 5px;
          background-color: #fff;
          color: rgb(198, 55, 50);
          // line-height: 30px;
          // margin-right: 20px;
        }
        .btn1 {
          margin-right: 10px;
        }
        #updateBtn {
          color: rgb(27,161,252);
       }
        #updateBtn:hover{
          color: rgb(207, 71, 66);
          background-color: #fff;
          border: 1px solid rgb(207, 71, 66);
        }
      }
    }
    img.ad1 {
      margin: 20px 0;
      width: 322px;
    }
    .friend {
      background-color: #fff;
      border: 1px solid rgb(215, 215, 215);
      border-radius: 8px;
      text-align: center;
      img{
        width: 150px;
        height: 50px;
        margin: 10px 20px;
      }
    }
  }
}
</style>