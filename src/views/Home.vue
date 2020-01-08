<template>
  <div class="content">
    <!-- <div class="top"></div> -->
    <div class="container">
      <div class="contentLeft">
        <!-- <button @click="submitFun">提交</button> -->
        <div class="newlist" v-for="(item,index) in list" :key="index">
          <div class="list_box">
            <h4>{{ item.newTitle }}</h4>
            <ul class="seeinfo">
              <li class="author">{{ item.newName }}</li>
              <li class="time">发表于{{ item.newTime }}</li>
              <li class="comment"><i class="icon iconfont icon-xinxi"> {{ item.commentNum }}</i></li>
              <li class="watch"><i class="icon iconfont icon-yanjing">{{ item.watchNum }}</i> </li>
            </ul> 
            <div class="pic">
              <a href="#">
                <img :src="item.imgSrc" alt="手机" />
              </a>
            </div>
            <p>
              {{ item.newSmall }}
              <span>
                <router-link to="/index/details">查看全文</router-link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="contentRight">
        <div class="focus">
          <h4>关注我们</h4>
          <div class="qq">
            <div class="qq1">官方qq</div>
            <div class="qq1">官方微信</div>
            <div class="qq1">官方微博</div>
          </div>
          <div class="applist">
            <img src="../assets/pic2.jpg" alt="logo" class="logo">
            <dl>
              <dt>雪花科技论坛</dt>
              <dd>不仅仅是论坛</dd>
            </dl>
            <img src="../assets/二维码.png" alt="" class="erweima">
          </div>
        </div>
        <img src="../assets/ad1.png" alt="广告位1" class="ad">
        <img src="../assets/ad2.png" alt="广告位2" class="ad">
        <div class="plate">板块推荐</div>
        <div class="focus">
          <h4>游戏推荐</h4>
          <a href="">
            <img src="../assets/game1.png" alt="推荐游戏1" class="game">
          </a>
          <a href="">
            <img src="../assets/game2.png" alt="推荐游戏2" class="game">
          </a>
        </div>
        <div class="focus">
          <h4>应用推荐</h4>
          <a href="">
            <img src="../assets/yingyong1.png" alt="推荐应用1" class="game">
          </a>
          <a href="">
            <img src="../assets/game2.png" alt="推荐应用1" class="game">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list:[
        {
          newTitle:'华为今日发布华为matepad',
          newName:'华为官方',
          newTime:'2019-11-16',
          watchNum:'11112',
          commentNum:'2121',
          imgSrc: require('../assets/pic1.jpg'),
          newSmall:'华为mate30搭载了海思麒麟990芯片'
        },
        {
          newTitle:'华为今日发布华为matepad',
          newName:'华为官方',
          newTime:'2019-11-16',
          watchNum:'11112',
          commentNum:'2121',
          imgSrc: require('../assets/pic1.jpg'),
          newSmall:'华为mate30搭载了海思麒麟990芯片'
        },
      ]
    }
  },
  methods:{
    submitFun(){
      this.axios(
        {
          method: "get",
          url: "http://localhost:5000/api/",
        }
      ).then(res => {
        console.log(res);
        
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 1120px;
  margin: 0 auto;
  .top {
    width: 100%;
    height: 20px;
  }
  .container {
    display: flex;
    .contentLeft {
      // border: 1px solid rgb(215, 215, 215);
      // box-shadow: 1px 1px 1px rgb(215, 215, 215);
      width: 784px;
      background-color: rgb(245, 245, 245);
      border-radius: 8px;
      .newlist {
        background-color: #fff;
        margin-bottom: 20px;
        padding-bottom: 1px;
        .list_box {
          margin: 0 30px 30px 30px;
          // border-top: 1px solid rgb(215, 215, 215);
          h4 {
            color: #444444;
            font-weight: 550;
          }
          ul.seeinfo {
            list-style: none;
            font-size: 12px;
            padding: 17px 0;
            margin-bottom: 17px;
            color: rgb(215, 215, 215);
            li.author {
              float: left;
              color: rgb(170, 170, 170);
            }
            li.author::after {
              content: "|";
              padding-left: 20px;
              color: rgb(235, 235, 235);
            }
            li.time {
              float: left;
              margin-left: 10px;
            }
            li.comment {
              float: right;
            }
            li.watch {
              float: right;
              margin-right: 20px;
            }
          }
          .pic1 {
            width: 725px;
            height: 300px;
            a {
              img {
                width: 725px;
                height: 300px;
              }
            }
          }
          p {
            margin-top: 10px;
            font-size: 15px;
            color: rgb(170, 170, 170);
            span {
              a {
                text-decoration: none;
                color: rgb(198, 55, 50);
                margin-left: 20px;
              }
            }
          }
        }
      }
      h4 {
        height: 50px;
        line-height: 50px;
        background-image: linear-gradient(white, rgb(245, 245, 245));
        // border-bottom: 1px solid rgb(235, 235, 235);
        a {
          color: #444444;
          text-decoration: none;
          padding: 5px 15px;
        }
      }
    }
    .contentRight {
      width: 324px;
      margin-left: 10px;
      background-color: rgb(245,245,245);
      border-radius: 10px;
      img.ad{
        width: 322px;
        height: 198px;
        border-radius: 8px;
        margin-bottom: 20px;
      }
      .focus{
        border: 1px solid rgb(215, 215, 215);
        margin-bottom: 20px;
        border-radius: 8px;
        box-shadow: rgba(0,0,0,.07) 0 1px 3px;
        background-color: rgb(255,255,255);
        border-top: 3px solid rgb(198, 55, 50);
        .qq{
          display: flex;
          .qq1{
            flex: 1;
            padding: 20px 10px ;
            color: rgb(145, 145, 145);
          }
        }
        h4{
          height: 58px;
          line-height: 58px;
          text-align: center;
          color: rgb(145, 145, 145);
          border-bottom: 1px solid rgb(215, 215, 215);
          background-color: rgb(245,245,245)
        }
        .applist{
          display: flex;
          img.logo{
          width: 40px;
          height: 40px;
          margin:20px;
        }
        dl{
          margin: 20px 30px;
          dd{
            font-size: 13px;
            color: rgb(145, 145, 145)
          }
        }
         img.erweima{
          width: 30;
          height: 34px;
          margin: 20px;
        }
        
        
        }
        img.game{
          margin-left: 15px;
          width: 292px;
          height: 126px;
          margin-top: 10px;
          // margin: 10 auto;
        }
      }
      .plate{
        height: 57px;
        border: 1px solid rgb(215, 215, 215);
        border-radius: 8px;
        color: rgb(145, 145, 145);
        text-align: center;
        font-weight: 600;
        line-height: 57px;
        margin-bottom: 20px;
        //  vertical-align: middle;
      }
    }
  }
}
</style>
