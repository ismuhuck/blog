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
        <h4>这里是标题</h4>
      </div>
      <div class="discuss">
        <span>评论区</span>
      </div>
      <div class="commentList">
        <div class="comment">
          <div class="avater">
            <router-link to="/personal">
              <img src="../assets/ata.jpg" alt="头像" />
            </router-link>
          </div>
          <div class="content">
            <h4>
              <router-link to="/personal">二哈</router-link>
            </h4>
            <div class="contentBody">这篇文章写得很有内涵</div>
            <div class="contentFooter"></div>
          </div>
        </div>
      </div>
      <div class="commentNew">
        <div class="newtop">请勿发布不友善或者负能量的内容，与人为善，比聪明更重要</div>
        <div class="newcontent">
          <!-- <input type="textarea" class="comInput" v-model="comment"> -->
          <textarea name="commentArea" cols="30" rows="10" class="comInput" v-model="comment"></textarea>
        </div>
        <div class="newbottom">
          <button class="commentBtn">评论</button>
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
      padding: 20px;
      color: rgb(100, 100, 100);
      h4 {
        padding: 20px 0;
        padding-bottom: 30px;
        font-size: 20px;
        font-weight: 400;
        border-bottom: 1px solid rgb(235, 235, 235);
      }
    }
    .discuss {
      text-align: center;
      margin: 34px 0;
      color: rgb(100, 100, 100);
      span::after {
        content: "--------------------";
        display: table-cell;
        position: relative;
        top: 50%;
        width: 50%;
      }
      span::before {
        content: "-------------------";
        display: table-cell;
        position: relative;
        top: 50%;
        width: 50%;
      }
    }
    .commentList {
      margin-bottom: 20px;
      .comment {
        display: flex;
        justify-content: space-between;
        .avater {
          a {
            img {
              width: 55px;
              height: 55px;
              border-radius: 50%;
            }
          }
        }
        .content {
          padding: 20px;
          width: 710px;
          background-color: #fff;
          position: relative;
          h4 {
            font-size: 16px;
            font-weight: 500;
            border-bottom: 1px solid rgb(235, 235, 235);
            padding-bottom: 20px;
            a {
              color: rgb(198, 55, 50);
            }
          }
          .contentBody {
            font-size: 16px;
            color: rgb(100, 100, 100);
            margin-top: 20px;
          }
        }
        .content::before {
          position: absolute;
          top: 11px;
          right: 100%;
          left: -18px;
          display: block;
          width: 0;
          height: 0;
          pointer-events: none;
          content: " ";
          border-color: transparent;
          border-style: solid solid outset;
          border-width: 8px;
          border-right-color: #d4e0e8;
        }
      }
    }
    .commentNew {
      background-color: #fff;
      border-radius: 8px;
      padding: 20px;
  // padding-bottom: 20px;
      .newtop {
        border: 1px solid rgb(198, 55, 50);
        padding: 10px;
        border-radius: 8px;
        color: rgb(198, 55, 50);
      }
      .newcontent {
        margin-top: 20px;
        .comInput {
          width: 100%;
          height: 100px;
          border-radius: 8px;
          border: 1px solid rgb(235, 235, 235);
          color: rgb(100, 100, 100);
        }
      }
      .newbottom {
        margin-top: 10px;
        // float: right;
        display: flex;
        justify-content: flex-end;
        button {
          background-color: rgb(198, 55, 50);
          border: 1px solid rgb(198, 55, 50);
          color: white;
          border-radius: 8px;
          width: 70px;
          height: 30px;
        }
      }
    }
  }
}
</style>