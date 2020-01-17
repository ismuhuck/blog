<template>
  <div class="container">
      <div class="textInfo">
        <h4>{{article.title}}</h4>
        <div class="content" v-html="article.content">
        </div>
      </div>
      <div class="like">
         <i class="icon iconfont icon-dianzan" @click="like"></i>
         <span>当前有人{{likeList.length}}点赞</span>
         <div class="dianzanAva" v-for="(item,i) in likeList" :key="i">
           <img :src="item" alt="">
         </div>
      </div>
      <div class="discuss">
        <span>评论区</span>
      </div>
       <commentarea :commentInfo="commentInfo" @getArticle='getArticle'></commentarea> 
  </div>
</template>
<script>
import { log } from 'util';
import commentarea from '../components/component/commentarea.vue'
export default {
  data() {
    return {
      article:{},
      commentInfo:{},
      likeList:[],
      comment: "",
      text:'',
      token:localStorage.getItem('Authorization'),
    };
  },
  components:{
    commentarea
  },
  methods:{
    getArticle(){
        this.axios({
            method:'get',
            url:'thisArticle',
            params: {
                articleId:this.$route.params.articleId,
                userId:this.$route.params.userId
             }
        })
        .then( res => {
            const {data:result} = res
            this.article = result.article
            this.commentInfo = result.comment
        })
        .catch(err => {
            console.log(err)
        })
    },
    // 获取文章数量
    getAll(){
      this.axios({
      method:'get',
      url:'getArticle',
      // headers:{
      //     Authorization:token
      //   }
    }).then((res) => {
      const {data:result} = res
      this.text=result
    }).catch((err) => {
      console.log(err)
    });
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
				articleId:this.$route.params.articleId
			}
		})
		.then(res => {
			const {data:result} = res
      this.likeList = result.articleInfo
			if(result.code===2){
				return this.$message.success('点赞成功')
			}
			if(result.code === 3){
				return this.$message.success('取消点赞')
			}
		})
		.catch(err =>{
			console.log(err)
		})
  },
  getlikeList(){
      this.axios.get('likeList',{params:{articleId:this.$route.params.articleId}})
      .then(res => {
        const {data : result} = res
        this.likeList = result.like
      })
      .catch(err => {console.log(err)})
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
          articleId:this.$route.params.articleId
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
  },
  mounted(){
    // this.getUser()
    this.getArticle()
    this.getAll()
    this.getlikeList()
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
        .shoucang{
          float: right;
          font-size: 20px;
          cursor: pointer;
        }
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
</style>