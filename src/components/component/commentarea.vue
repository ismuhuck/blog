<template>
  <div class="comment-box">
    <div class="commentNew">
      <div class="newtop">请勿发布不友善或者负能量的内容，与人为善，比聪明更重要</div>
      <div class="newcontent">
        <textarea name="commentArea" cols="30" rows="10" class="comInput" v-model="comment"></textarea>
      </div>
      <div class="newbottom">
        <button class="commentBtn" @click="commentText">评论</button>
      </div>
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
          <div class="contentBody">
            <p>{{item.comment}}</p>
            <div class="reply-start">
              <span class="time">{{item.commentTime}}</span>
              <div class="action-box">
                <i class="icon iconfont icon-dianzan"></i>
                <span class="reply" @click="reply(item)">回复</span>
              </div>
            </div>
            <div class="reply-content" v-for="(replyItem,i) in item.reply" :key="i">
                
              <p><span class="reply1">{{replyItem.userNickname}}</span>
              <!-- <span class="huifu">回复</span>
              <span class="reply0">{{replyItem.commentNickname}}：</span> -->
              <span>{{replyItem.content}}</span></p>
              <div class="replyson"><span>{{replyItem.replyTime}}</span><span class="reply" @click="reply(replyItem)">回复</span></div>
              <div class="contentFooter" v-if="showitemId === replyItem.commentID">
                <div class="newcontent">
                  <textarea
                    name="commentArea"
                    cols="30"
                    rows="10"
                    class="comInput"
                    v-model="replycomment"
                  ></textarea>
                </div>
                <div class="newbottom">
                  <button class="commentBtn" @click="replyComment(item.commentID)">回复评论</button>
                </div>
              </div>
            </div>
            <div class="contentFooter" v-if="showitemId === item.commentID">
                <div class="newcontent">
                  <textarea
                    name="commentArea"
                    cols="30"
                    rows="10"
                    class="comInput"
                    v-model="replycomment"
                  ></textarea>
                </div>
                <div class="newbottom">
                  <button class="commentBtn" @click="replyComment(item.commentID)">回复评论</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      comment: "",
      replycomment: "",
      showitemId:''
    };
  },
  props: ["commentInfo"],
  methods: {
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
            this.$emit("getArticle");
          }
        })
        .catch(err => {
          return this.$message.error("服务器出错，请稍后重试");
        });
    },
    reply(item) {
        console.log(item)
        this.replycomment ="@"+item.nickName+"："
        if(this.showitemId !==item.commentID){
            this.showitemId=item.commentID
        }
        else{
            this.showitemId =false
        }
    },
    replyComment(commentID){
        this.axios({
            method:'post',
            url:'commentson',
            data:{
                articleId: this.$route.params.articleId,
                replycontent:this.replycomment,
                commentID:commentID
            }
        })
        .then( res => {
            const {data:result} = res
            this.$emit("getArticle");
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
  }
};
</script>

<style lang="scss" scoped>
p,
h4 {
  margin: 0;
}
.commentList {
  margin-bottom: 20px;
  .comment {
    display: flex;
    justify-content: space-between;
    .avater {
      a {
        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
        }
      }
    }
    .content {
      padding: 10px;
      width: 730px;
      background-color: #fff;
      position: relative;
      h4 {
        font-size: 16px;
        font-weight: 500;
        border-bottom: 1px solid rgb(235, 235, 235);
        padding-bottom: 10px;
        a {
          color: rgb(198, 55, 50);
        }
      }
      .contentBody {
        font-size: 15px;
        color: rgb(100, 100, 100);
        margin-top: 10px;
        .reply-start {
          display: flex;
          justify-content: space-between;
        }
        .reply {
          margin-left: 20px;
          background-color: rgb(198, 55, 50);
          color: #fff;
          font-size: 12px;
          padding: 0 5px;
          border-radius: 3px;
          cursor: pointer;
          margin-right: 20px;
        }
        .reply-content {
          margin: 0 0 0 20px;
          border-bottom: 1px solid rgb(235, 235, 235);
          padding-bottom: 10px;
          .reply1 {
            color: blue;
            margin-right: 5px;
          }
          .huifu {
            font-size: 13px;
          }
          .reply0 {
            color: blue;
            margin-left: 5px;
          }
          .replyson{
              display: flex;
              justify-content: space-between;
              font-size: 12px;
              .reply{
                  margin-right: 400px;
              }
          }
        }
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
}
.newcontent {
  margin-top: 20px;
  .comInput {
    width: 100%;
    height: 50px;
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
</style>