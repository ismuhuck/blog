<template>
  <div>
    <!-- 综合列表{{articleslist}} -->
    <div v-if="flag">
      <div class="user" v-for="(item,index) in userlist" :key="index+100">
        <div class="avatar">
          <img :src="item.avatar" alt />
        </div>
        <div class="info">
          <div class="nickName">
            <router-link :to="{ name: 'home', params: { userId: item._id }}">{{item.nickName}}</router-link>
          </div>
          <div class="detail">
            <span class="articlescount">{{item.articleNum}}篇文章</span>
            <span class="likeme">{{item.likemeNum}}位粉丝</span>
          </div>
        </div>
        <div class="focus">
          <button>关注</button>
        </div>
      </div>
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
      userlist: [],
      flag:true
    };
  },
  // 因为父组件拿到的数据是异步的，在传递给子组件时，在组件实例的钩子函数中无法拿到数据，这里采用watch监听的方法解决，并将操作放到methods中
  watch: {
    list: function(newval, oldval) {
      
      if (newval.article.length === 0 && newval.user.length === 0) {
        this.flag = false;
      } else {
        this.flag = true;
        this.articleslist = newval.article;
        this.userlist = newval.user;
      }
    }
  },
  methods: {
    formatTime: formatTime,
    update() {
      console.log(this.articleslist);
    }
  }
};
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
.user {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #edeeef;
  .avatar {
    flex: 0 0 auto;
    margin-right: 20px;
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1 1 auto;
    .nickName {
      font-size: 16px;
      font-weight: 600;
      color: #2e3135;
    }
    .detail {
      color: #8a9aa9;
      font-size: 12px;
    }
  }
  .focus {
    button {
      width: 75px;
      height: 30px;
      color: #37c701;
      background-color: #fff;
      border: 1px solid;
      outline: none;
      border-radius: 3px;
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
</style>