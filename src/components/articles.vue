<template>
  <div class="personal">
    <div class="perLeft">
      <div class="personInfo">
        <div class="infoHeader">
          <div class="nick">
            <p>
              <a href>{{user.nickName}}</a>
            </p>
            <p>{{user.qianming}}</p>
          </div>
          <div class="ata">
            <a href>
              <img :src="user.avatar" alt />
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
          <button class="Btn btn1" @click="focus">{{focu}}</button>
          <button class="Btn btn2">私信</button>
        </div>
      </div>
    </div>
    <div class="perRight">
      <div class="textInfo">
        <h4>{{article.title}}</h4>
        <div class="content" v-html="article.content">
        </div>
      </div>
      <div class="like">
         <i class="icon iconfont icon-dianzan" @click="like" :class="{red:flag}"></i>
         <span>当前有人{{count}}点赞</span>
         <div class="dianzanAva" v-for="(item,i) in dianzan" :key="i">
           <img :src="item.avatar" alt="">
         </div>
      </div>
      <div class="discuss">
        <span>评论区</span>
      </div>
      <div class="commentList"  v-for="(item, index) in commentInfo" :key="index">
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
          <!-- <input type="textarea" class="comInput" v-model="comment"> -->
          <textarea name="commentArea" cols="30" rows="10" class="comInput" v-model="comment"></textarea>
        </div>
        <div class="newbottom">
          <button class="commentBtn" @click="commentText">评论</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id:'',
	  comment: "",
    focu:'关注',
	  flag:false,
      user:{
        nickName:'',
        avatar:'',
        qianming:''
      },
      article:{
        title:'',
        content:''
      },
	  commentInfo:[],
	  dianzan:[],
	  count:0,
	  token:localStorage.getItem('Authorization')
    };
  },
  methods:{

	// 关注
	focus(){
		if(!this.token){
			return this.$message.error('你还未登录请登录')
		}
		this.axios({
			method:'post',
      url:'focus',
		})
		.then(res => {
      const {data:result} = res
      console.log(result)
      this.likeme()
			// if(result.code === 2){
      //   this.focu="已关注"
      // }
      // if(result.code === 3){
      //   this.focu="关注"
      // }

		})
		.catch(err => {
			console.log(err)
		})
  },
  // 粉丝
  likeme(){
    this.axios({
      method:'post',
      url:'likeme',
      data:{
        // 当前文章所在坛主 id
        _id:this.id
      }
    })
    .then(res => {
      const {data:result} = res
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })
  },

    // 点赞
    like(){
		if(!this.token){
			return this.$message.error('您还没有登录，请登录后点赞')
		}
		this.axios({
			method:'post',
			url:'like',
			data:{
				articleId:this.$route.query.articleId
			}
		})
		.then(res => {
			const {data:result} = res
			console.log(result)
			this.dianzan = result.articleInfo.like
			this.count = this.dianzan.length
			if(result.code===2){
				return this.$message.success('点赞成功')
			}
			if(result.code === 3){
				return this.$message.success('取消点赞')
			}
			this.flag = !this.flag
		})
		.catch(err =>{
			console.log(err)
			this.$message.error('服务器错误，请重试')
		})
		
	},

    // 发表评论
    commentText(){
      let token = localStorage.getItem('Authorization')
      if(!token){
        return this.$message.error('您尚未登录，请登录后评论')
      }
      if(this.comment.trim()===''){
        return this.$message.error('不能发表空评论')
      }
      this.axios({
        method:'post',
        url:'commentText',
        data:{
          comment:this.comment,
          articleId:this.$route.query.articleId
        }
      })
      .then(res => {
        const {data:result} = res
        if(result.code===0){
          this.$message.success('评论成功')
          this.comment=""
          this.getArticle()
        }
      })
      .catch(err => {
          return this.$message.error('服务器出错，请稍后重试')
      })
    },
    // 获取文章详情
    getArticle(){
       this.axios({
      method:'get',
      url:'thisArticle',
      params: {
      articleId:this.$route.query.articleId
    }
    })
    .then( res => {
	  const {data:result} = res
	  console.log(result)
      if(result.code===0){
        this.user.nickName=result.user.nickName
        this.user.avatar = result.user.avatar
        this.user.qianming = result.user.qianming
        this.id = result.user._id
        this.article.title = result.article.blogTitle
        this.article.content = result.article.content
		this.commentInfo = result.article.comment
		this.count = result.article.like.length
		this.dianzan = result.article.like
        return this.$message.success('数据请求成功')
      }
      return this.$message.error('服务器错误，数据请求失败')
    })
    .catch(err => {
      console.log(err)
    })
    }
  },
  created() {
    this.getArticle()
  },
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
    .like{
		width: 785px;
      margin: 20px 0 20px 0;
      background-color: #fff;
      padding: 20px;
      i{
        font-size: 18px;
        color: rgb(100, 100, 100);
        cursor: pointer;
      }
	  i.red{
			color: rgb(198, 55, 50)
		}
      span{
        margin-left: 20px;
        font-size: 14px;
        color: rgb(100, 100, 100)
      }
      .dianzanAva{
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: inline-block;
        margin: 0 10px;
        border:1px solid rgb(100, 100, 100);
        vertical-align: middle;
        position: relative;
        img{
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
        .comInput:focus{
          outline: none;
          border: 1px solid rgb(198, 55, 50)
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