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
            <div class="value">{{tanzhu.allarticlesNum}}</div>
          </div>
          <div class="infiLabel">
            <div class="label">粉丝</div>
            <div class="value">{{tanzhu.likemeNum}}</div>
          </div>
          <div class="infiLabel">
            <div class="label">关注</div>
            <div class="value">{{tanzhu.focusNum}}</div>
          </div>
          <div class="infiLabel">
            <div class="label">收藏</div>
            <div class="value">{{tanzhu.collectingNum}}</div>
          </div>
        </div>
        <div class="footer">
          <button class="Btn btn1" @click="focus">关注</button>
          <button class="Btn btn2">私信</button>
        </div>
      </div>
    </div>
    <div class="perRight">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id:'',
	    comment: "",
	    flag:false,
      user:{},
      article:{},
      commentInfo:[],
      likeList:[],
      token:localStorage.getItem('Authorization'),
      tanzhu:{}
    };
  },
  methods:{
    // 获取文章和坛主详情
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
      if(result.code===0){
        this.user=result.user
        this.id = result.user._id
        this.article = result.article
        // console.log(article)
        this.commentInfo = result.comment
        return this.$message.success('数据请求成功')
      }
      if(result.code===5){
        return this.user= result.user
      }
      return this.$message.error('服务器错误，数据请求失败')
    })
    .catch(err => {
      console.log(err)
    })
    },
    // 获取当前坛主当前关注数或者粉丝数
    getAlltanzhu(){
      this.axios({
        method:'get',
        url:'tanzhu',
        params: {
          articleId: this.$route.params.articleId,
          userId:this.$route.params.userId
        }
      })
      .then( res => {
        const {data:result} = res
        this.tanzhu=result.tanzhu
      })
    },

	// 关注
	focus(){
		if(!this.token){
			return this.$message.error('你还未登录请登录')
    }
		this.axios({
			method:'post',
      url:'focus',
      data:{
        userId:this.$route.params.userId
      }
		})
		.then(res => {
      const {data:result} = res
      if(result.code === 1){
        return this.$message.error('不可关注自己')
      }
      this.likeme()
      this.getAlltanzhu()
      if(result.code === 2){
        return this.$message.success('关注成功')
      }
      if(result.code === 3){
        return this.$message.success('取消关注')
      }
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
    })
    .catch(err => {
      console.log(err)
    })
  },
  },
  created() {
    this.getArticle()
    this.getAlltanzhu()
    // console.log(this.$route.params)
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
    
  }
}
</style>