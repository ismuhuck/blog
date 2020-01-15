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
      <i class="icon iconfont icon-dianzan" @click="like" :class="likeArticleflag ? likeactive :unlikeactive"></i>
      <span>当前有人{{likeList.length}}点赞</span>
      <div class="dianzanAva" v-for="(item,i) in likeList" :key="i">
        <img :src="item" alt />
      </div>
    </div>
    <div class="discuss">
      <span>评论区</span>
    </div>
    <div class="commentList" v-for="(item, index) in commentInfo" :key="index">
      <div class="comment">
        <div class="avater">
          <router-link to="/personal">
            <img :src="item.avatar" alt="头像" />
          </router-link>
        </div>
        <div class="content">
          <h4>
            <router-link to="/personal">{{item.nickName}}</router-link>
          </h4>
          <div class="contentBody">{{item.comment}}</div>
          <div class="contentFooter"></div>
        </div>
      </div>
    </div>
    <div class="commentNew">
      <div class="newtop">请勿发布不友善或者负能量的内容，与人为善，比聪明更重要</div>
      <div class="newcontent">
        <textarea name="commentArea" cols="30" rows="10" class="comInput" v-model="comment"></textarea>
      </div>
      <div class="newbottom">
        <button class="commentBtn" @click="commentText">评论</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
  methods: {
    
    // 获取收藏状态

    getcollectingStatus(){
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
        console.log(result)
      })
      .catch( err => {
        console.log(err)
      })
    },
  // 获取点赞状态

    getlikeArticle(){
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

    // 发表评论
    commentText() {
      let token = localStorage.getItem("Authorization");
      if (!token) {
        return this.$message.error("您尚未登录，请登录后评论");
      }
      if (this.comment.trim() === "") {
        return this.$message.error("不能发表空评论");
      }
      this.axios({
        method: "post",
        url: "commentText",
        data: {
          comment: this.comment,
          articleId: this.$route.params.articleId
        }
      })
        .then(res => {
          const { data: result } = res;
          if (result.code === 0) {
            this.$message.success("评论成功");
            this.comment = "";
            this.getArticle();
          }
        })
        .catch(err => {
          return this.$message.error("服务器出错，请稍后重试");
        });
    }
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
    .comInput:focus {
      outline: none;
      border: 1px solid rgb(198, 55, 50);
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
</style>