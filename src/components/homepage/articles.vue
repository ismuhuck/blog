<template>
  <div>
    <div class="textInfo">
      <h4>
        {{article.title}}
        <span class="icon iconfont icon-xin shoucang" :class="[flag ? active : unactive] " title="收藏本文" @click="shoucang"></span>
      </h4>
      <div class="content" v-html="article.content"></div>
    </div>
    <div class="like">
      <i class="icon iconfont icon-z-like" @click="like" :class="likeArticleflag ? likeactive :unlikeactive"></i>
      <span>当前有人{{likeList.length}}点赞</span>
      <div class="dianzanAva" v-for="(item,i) in likeList" :key="i">
        <img :src="item" alt />
      </div>
    </div>
    <div class="discuss">
      <span>评论区</span>
    </div>
    <commentarea :commentInfo="commentInfo" @getArticle='getArticle'></commentarea> 
  </div>
</template>
<script>
import commentarea from '../component/commentarea.vue'
export default {
  data() {
    return {
      isReply:false,
      comment: "",
      likeList: {},
      commentInfo: [],
      article: {},
      token: localStorage.getItem("Authorization"),
      flag:false,
      active:'active',
      unactive:'unactive',
      likeArticleflag:false,
      likeactive:'likeactive',
      unlikeactive:'unlikeactive'
    };
  },
  components:{
    commentarea,
  },
  methods: {
    reply(){
      this.isReply = !this.isReply
    },
    // 获取收藏状态

    getcollectingStatus(){
       if(!this.token){
        return 
      }
      this.axios.get('collectingStatus',{
        params:{
          articleId:this.$route.params.articleId
        }
      })
      .then( res => {
        const {data:result} = res
        if(result.code === 10){
          this.flag = true
        }
        else{
          this.flag = false
        }
      })
      .catch( err => {
        console.log(err)
      })
    },
  // 获取点赞状态

    getlikeArticle(){
       if(!this.token){
        return 
      }
      this.axios.get('likeStatus',{
        params:{
          articleId:this.$route.params.articleId
        }
      })
      .then(res => {
        const {data:result} = res
        if(result.code ===12){
          this.likeArticleflag=true
        }
        else{
          this.likeArticleflag = false
        }
      })
      .catch(err => {
        console.log(err)
      })
    },

    // 获取文章内容和评论
    getArticle() {
      this.axios({
        method: "get",
        url: "thisArticle",
        params: {
          articleId: this.$route.params.articleId,
          userId: this.$route.params.userId
        }
      })
        .then(res => {
          const { data: result } = res;
          if (result.code === 0) {
            this.article = result.article;
            this.commentInfo = result.comment;
            return this.$message.success("数据请求成功");
          }
          return this.$message.error("服务器错误，数据请求失败");
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 收藏文章
    shoucang() {
      if (!this.token) {
        return this.$message.error("请登录后收藏");
      }
      this.axios({
        method: "post",
        url: "shoucang",
        data: {
          articleId: this.$route.params.articleId
        }
      })
        .then(res => {
          const { data: result } = res;
          this.getcollectingStatus()
          if(result.code === 2){
             return this.$message.success('收藏成功')
          }
          if(result.code === 3){
              return this.$message.success('取消收藏')
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点赞
    like() {
      if (!this.token) {
        return this.$message.error("您还没有登录，请登录后点赞");
      }
      this.axios({
        method: "post",
        url: "like",
        data: {
          articleId: this.$route.params.articleId
        }
      })
        .then(res => {
          const { data: result } = res;
          this.likeList = result.articleInfo;
          this.getlikeArticle()
          if (result.code === 2) {
            return this.$message.success("点赞成功");
          }
          if (result.code === 3) {
            return this.$message.success("取消点赞");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器错误，请重试");
        });
    },
    // 获取点赞列表
    getlikeList() {
      this.axios
        .get("likeList", { params: { articleId: this.$route.params.articleId } })
        .then(res => {
          const { data: result } = res;
          this.likeList = result.like;
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  created() {
    this.getlikeList()
    this.getArticle()
    this.getcollectingStatus()
    this.getlikeArticle()
  }
};
</script>
<style lang="scss" scoped>
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
    .shoucang {
      float: right;
      font-size: 20px;
      cursor: pointer;
    }
    .active{
      color: rgb(198, 55, 50);
    }
    .unactive{
      color: rgb(75,75,75)
    }
  }
  .content{
    overflow: hidden;
  }
}
.like {
  width: 785px;
  margin: 20px 0 20px 0;
  background-color: #fff;
  line-height: 76px;
  padding: 5px 20px;
  i {
    font-size: 18px;
    color: rgb(100, 100, 100);
    cursor: pointer;
  }
  .unlikeactive{
    color: rgb(100, 100, 100)
  }
  .likeactive{
    color: rgb(198, 55, 50)
  }
  i.red {
    color: rgb(198, 55, 50);
  }
  span {
    margin-left: 20px;
    font-size: 14px;
    color: rgb(100, 100, 100);
  }
  .dianzanAva {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-block;
    margin: 0 10px;
    border: 1px solid rgb(100, 100, 100);
    vertical-align: middle;
    position: relative;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 2px;
    }
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
</style>