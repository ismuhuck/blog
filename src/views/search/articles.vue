<template>
  <div class="articles">
    <!-- 文章列表{{articleslist}} -->
    <div v-if="flag">
      <div class="box" v-for="(item,index) in articleslist" :key="index">
        <div class="author">
          <img :src="item.avatar" alt />
          <span class="nickName">猪八戒</span>
          <span
            class="createTime"
          >{{formatTime("YYYY-mm-dd HH:MM",new Date(parseInt(item.createTime)))}}</span>
        </div>
        <div class="articles">
          <div class="title">
            <router-link
              :to="{name:'articles',params:{articleId:item._id,userId:item.userId}}"
            >{{item.blogTitle}}</router-link>
          </div>
          <div class="content" v-html="item.content"></div>
          <div class="like">
            <span class="icon iconfont icon-z-like hudong" title="点赞数">
              <span>{{item.likeNum}}</span>
            </span>
            <span class="icon iconfont icon-pinglun hudong" title="评论数">
              <span>{{item.commentNum}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="nothing" v-else>
      <img src="../../assets/img/暂无数据.png" alt />
      <div class="hint">暂时还没有相关文章</div>
    </div>
  </div>
</template>
<script>
import formatTime from "../../../util/util";
export default {
  props: ["list"],
  data() {
    return {
      articleslist: [],
      flag: true
    };
  },
  watch: {
    // this未定义
    // 'list':(newval,oldval) => {
    //   this.articleslist = newval.article
    // }
    list: function(newval, oldval) {
      if (newval.article.length === 0) {
        this.flag = false;
      } else {
        this.flag = true;
        this.articleslist = newval.article;
      }
    }
  },
  methods: {
    formatTime: formatTime
  }
};
</script>
<style lang="scss" scoped>
.articles {
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
        margin: 6px 0 12px;
        // a{
        //   color: #2e3135;
        // }
      }
      .content {
        font-size: 13px;
        color: #5b6169;
        margin-bottom: 12px;
        height: 50px;
        overflow: hidden;
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
  .nothing {
    text-align: center;
    img {
      width: 300;
      height: 250px;
    }
    .hint {
      font-size: 18px;
      color: rgb(198, 55, 50);
      font-weight: 600;
    }
  }
}
</style>