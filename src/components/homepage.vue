<template>
  <div class="personal">
    <div class="perLeft">
      <div class="personInfo">
        <div class="infoHeader">
          <div class="nick">
            <p>
              {{user.nickName}}
            </p>
            <p class="qianming">{{user.qianming}}</p>
          </div>
          <div class="ata">
            <a href>
              <img :src="user.avatar" alt />
            </a>
          </div>
        </div>
        <div class="infoBody">
          <div class="infoLabel">
            <div class="label">文章</div>
            <div class="value"><span> {{tanzhu.allarticlesNum}}</span></div>
          </div>
          <div class="infoLabel">
            <div class="label">粉丝</div>
            <div class="value"><span>{{tanzhu.likemeNum}}</span></div>
          </div>
          <div class="infoLabel">
            <div class="label">关注</div>
            <div class="value"><span>{{tanzhu.focusNum}}</span></div>
          </div>
          <div class="infoLabel">
            <div class="label">收藏</div>
            <div class="value"><span>{{tanzhu.collectingNum}}</span></div>
          </div>
        </div>
        <div class="footer">
          <button class="Btn btn1" @click="focus">{{focusStatus}}</button>
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
      token:sessionStorage.getItem('Authorization'),
      tanzhu:{},
      focusStatus:'关注'
    };
  },
  methods:{
    // 获取关注状态

    getfocusStatus(){
       if(!this.token){
        return 
      }
      this.axios.get('facusStatus',{
        params:{
          userId:this.$route.params.userId
        }
      })
      .then( res => {
        const {data:result} = res
        if(result.code === 8){
          this.focusStatus = "已关注"
        }
        if(result.code === 9){
          this.focusStatus = '关注'
        }
      })
      .catch( err => {
        console.log(err)
      })
    },

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
    // 获取当前坛主当前关注数及粉丝数
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
      this.getfocusStatus()
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
        _id:this.$route.params.userId
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
  },
  mounted(){
    this.getfocusStatus()
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
            font-size: 18px;
            color: rgb(198, 55, 50);
            font-weight: 600;
          }
          p.qianming{
            font-size: 14px;
            font-weight: normal;
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
        .infoLabel{
          .value{
            text-align: center;
            span{
              display: inline-block;
              width: 25px;
              height: 25px;
              background-color: rgb(198, 55, 50);
              color: #fff;
              border-radius: 50%;
            }
          }
        }
      }
      .footer {
        padding: 20px 10px;
        display: flex;
        justify-content: center;
        .Btn {
          border: 1px solid rgb(198, 55, 50);
          color: rgb(198, 55, 50);
          background-color: white;
          width: 50%;
          padding: 5px 0;
        }
        .btn1 {
          // border-right: none;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        // .btn2 {
        //   border-bottom-right-radius: 3px;
        //   border-top-right-radius: 3px;
        // }
      }
    }
  }
  .perRight {
    margin-left: 10px;
    
  }
}
</style>