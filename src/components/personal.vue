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
            <div class="value">{{text.length}}</div>
          </div>
          <div class="infiLabel">
            <div class="label">粉丝</div>
            <div class="value">{{likeme}}</div>
          </div>
          <div class="infiLabel">
            <div class="label">关注</div>
            <div class="value">{{focus}}</div>
          </div>
          <div class="infiLabel">
            <div class="label">收藏</div>
            <div class="value">{{shoucang}}</div>
          </div>
        </div>
      </div>

      <div class="btnText">
        <router-link to="/editor" class="btn">编写文章</router-link>
      </div>
    </div>
    <div class="perRight">
      <div class="textInfo">
        <h4>我的主页</h4>
      </div>
      <div class="personalBlog" v-for="(item,i) in text" :key="i">
        <div class="blog">
          <div class="blogLeft">
            <router-link :to='{path:"/articlesInfo",query: { articleId: item._id }}'>{{item.blogTitle}}<i class="icon iconfont icon-daohang"></i></router-link>
          </div>
          <div class="blogRight">
            <span class="icon iconfont icon-dianzan"><span>{{item.like.length}}</span> </span>
            <span class="icon iconfont icon-xinxi"><span>{{item.comment.length}}</span> </span>
            <span class="icon iconfont icon-set" @click="deleted(item._id)"></span>
          </div>
        </div>
        <div class="blogBottom">
            <span>创建于一个月前</span>
            <span>|</span>
            <span>评论数：{{item.comment.length}}</span>
            <span>|</span>
            <span>点赞数：{{item.like.length}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { log } from 'util';
export default {
  data() {
    return {
      comment: "",
      text:'',
      token:localStorage.getItem('Authorization'),
      user:{},
      likeme:0,
      focus:0,
      shoucang:0
    };
  },
  methods:{
    // 删除文章方法

    deleted(_id){
        this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           
          this.axios.post('deleted',{
          _id:_id
        })
        .then(res => {
          const {data:result} = res
          this.getArticle()
        })
        .catch(err => {
          console.log(err)
        })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       
    },

    getUser(){
      this.axios({
        method:'get',
        url:'getUser'
      })
      .then( res => {
        const {data:result} = res
        this.user = result
        this.focus = this.user.focus.length
        this.likeme = this.user.likeme.length
        this.shoucang = this.user.collecting.length
      })
      .catch( err => {
        console.log(err)
      })
    },
    getArticle(){
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
    }
  },
  mounted(){
    this.getUser()
    this.getArticle()
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
    .btnText{
      margin-top: 40px;
      margin-bottom: 40px;
      text-align: center;
      .btn{
        background-color: rgb(198, 55, 50);
        width: 100%;
        color: #fff;
        font-weight: 600;
      }
    }
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
    }
  }
  .perRight {
    margin-left: 10px;
    .textInfo {
      width: 784px;
      background-color: #fff;
      border-radius: 8px;
      padding: 5px;
      color: rgb(100, 100, 100);
      border: 1px solid rgb(235, 235, 235);
      h4 {
        padding: 5px 0;
        // padding-bottom: 30px;
        font-size: 16px;
        font-weight: 500;
        text-align: center;
        color: rgb(54, 54, 54);
        // border-bottom: 1px solid rgb(235, 235, 235);
      }
    }
    .personalBlog {
      border: 1px solid rgb(235, 235, 235);
      background-color: #fff;
      border-radius: 8px;
      margin-top: 20px;
      padding: 20px;

      .blog {
        display: flex;
        justify-content: space-between;
        .blogLeft{
            a{
                 color: rgb(100, 100, 100);
            }
           
        }
        .blogRight{
            span{
                padding: 5px 10px;
                border: 1px solid ;
                border-radius: 5px;
                margin-right: 10px;
                color: rgb(27,161,252);
                span{
                  margin-left: 10px;
                  margin-right: 0;
                  border: none;
                }
            }
        }
      }
      .blogBottom{
          margin-top: 20px;

          span{
              padding: 5px 10px;
              color: rgb(100, 100, 100);
          }
          span:nth-child(1){
              padding-left: 0px;
          }
      }
    }
  }
}
</style>