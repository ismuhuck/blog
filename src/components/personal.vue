<template>
  <div class="personal">
    <div class="perLeft">
      <div class="personInfo">
        <div class="infoHeader">
          <div class="nick">
            <p>
              <a href>二哈</a>
            </p>
            <p>这里是个人签名</p>
          </div>
          <div class="ata">
            <a href>
              <img src="../assets/ata.jpg" alt />
            </a>
          </div>
        </div>
        <div class="infoBody">
          <div class="infiLabel">
            <div class="label">文章</div>
            <div class="value">10</div>
          </div>
          <div class="infiLabel">
            <div class="label">粉丝</div>
            <div class="value">10</div>
          </div>
          <div class="infiLabel">
            <div class="label">喜欢</div>
            <div class="value">10</div>
          </div>
          <div class="infiLabel">
            <div class="label">收藏</div>
            <div class="value">10</div>
          </div>
        </div>
        <div class="footer">
          <button class="Btn btn1">关注</button>
          <button class="Btn btn2">私信</button>
        </div>
      </div>
    </div>
    <div class="perRight">
      <div class="textInfo">
        <h4>他的全部动态</h4>
      </div>
      <div class="personalBlog">
        <div class="blog">
          <div class="blogLeft">
            <router-link to>华为帝瓦雷联名音响 <i class="icon iconfont icon-daohang"></i></router-link>
          </div>
          <div class="blogRight">
            <span class="icon iconfont icon-dianzan"></span>
            <span class="icon iconfont icon-xinxi"></span>
          </div>
        </div>
        <div class="blogBottom">
            <span>创建于一个月前</span>
            <span>|</span>
            <span>评论数</span>
            <span>|</span>
            <span>阅读数</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comment: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.personal {
  display: flex;
  width: 1120px;
  margin: 0 auto;
  .perLeft {
    width: 320px;
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
      }
      .footer {
        padding: 20px 10px;
        display: flex;
        justify-content: center;
        .Btn {
          border: 1px solid rgb(198, 55, 50);
          background-color: white;
          width: 50%;
          padding: 5px 0;
        }
        .btn1 {
          border-right: none;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        .btn2 {
          border-bottom-right-radius: 3px;
          border-top-right-radius: 3px;
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
                border: 1px solid rgb(235, 235, 235);
                border-radius: 5px;
                margin-right: 10px;
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