<template>
    <div>
        <!-- 综合列表{{articleslist}} -->
        <div class="user" v-for="(item,index) in userlist" :key="index">
            <div class="avatar">
                <img :src="item.avatar" alt="">
            </div>
            <div class="info">
                <div class="nickName">{{item.nickName}}</div>
                <div class="detail"><span class="articlescount">32篇文章</span><span class="likeme">25位粉丝</span></div>
            </div>
            <div class="focus">
                <button>关注</button>
            </div>
        </div>
        <div class="box" v-for="(item,index) in articleslist" :key="index">
      <div class="author">
        <img src="../../assets/../../头像/1.jpg" alt />
        <span class="nickName">猪八戒</span>
        <span class="createTime">2018-10-10 10:10</span>
      </div>
      <div class="articles">
        <div class="title">{{item.blogTitle}}</div>
        <div class="content" v-html="item.content"></div>
        <div class="like">
          <span class="icon iconfont icon-dianzan hudong" title="点赞数">
            <span>1</span>
          </span>
          <span class="icon iconfont icon-xinxi hudong" title="评论数">
            <span>222</span>
          </span>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
export default {
    props:['list'],
    data() {
        return {
            articleslist:this.list.article,
            userlist:this.list.user
        }
    },
}
</script>
<style lang="scss" scoped>
  .box {
    padding: 20px;
    border-bottom: 1px solid #edeeef;
    .author {
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
      span {
        font-size: 12px;
        color: #b2bac2;
      }
      span.nickName::after {
        content: "·";
        padding: 0 10px;
      }
      span.nickName::before {
        content: "·";
        padding: 0 10px;
      }
    }
    .articles {
      .title {
        font-size: 17px;
        font-weight: 600;
        color: #2e3135;
        margin: 6px 0 12px;
      }
      .content {
        font-size: 13px;
        color: #5b6169;
        margin-bottom: 12px;
      }
      .like {
        span.hudong {
          color: #b2bac2;
          font-size: 13px;
          padding: 5px 10px;
          border: 1px solid #edeeef;
          border-radius: 2px;
          span {
            padding: 0 5px;
          }
        }
      }
    }
  }
  .user{
        display: flex;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #edeeef;
        .avatar{
            flex: 0 0 auto;
            margin-right: 20px;
            img{
                width: 45px;
                height: 45px;
                border-radius: 50%;
            }
        }
        .info{
            flex: 1 1 auto;
            .nickName{
                font-size: 16px;
                font-weight: 600;
                color: #2E3135;
            }
            .detail{
                color: #8a9aa9;
                font-size: 12px;
            }
        }
        .focus{
            button{
                width: 75px;
                height: 30px;
                color: #37C701;
                background-color: #fff;
                border: 1px solid;
                outline: none;
                border-radius: 3px;
            }
        }
    }
</style>