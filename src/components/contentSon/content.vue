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
        <router-view></router-view>
      </div>
      <div class="rightBox">
        <div class="showBox">
          <h4>五角的雪花科技论坛</h4>
          <div class="showcont">
            Vue.js（/vjuː/，简称 Vue）是一个用于创建用户界面或者单页面应用的开源 JavaScript 框架。
            2016 年 Vue 有着 89% 的 JS 开发者满意度。为 GitHub 有史以来星标数第 3 多的项目
          </div>
          <div class="butt">
            <button class="btn btn1">加入社区</button>
            <button class="btn btn2">发帖</button>
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
      currentDate: new Date()
    };
  }
};
</script>
<style lang="scss" scoped>
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
        .btn2 {
          margin-left: 10px;
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