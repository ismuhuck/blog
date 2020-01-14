<template>
    <div class="container">
      <div class="textInfo">
        <h4>我的主页</h4>
      </div>
      <div class="personalBlog" v-for="(item,i) in text" :key="i">
        <div class="blog">
          <div class="blogLeft">
            <router-link :to='{name:"articlesInfo",params:{articleId:item._id,userId:item.userId}}'>{{item.blogTitle}}<i class="icon iconfont icon-daohang"></i></router-link>
          </div>
          <div class="blogRight">
            <span class="icon iconfont icon-dianzan" title="点赞数"><span>{{item.like.length}}</span> </span>
            <span class="icon iconfont icon-xinxi" title="评论数" ><span>{{item.comment.length}}</span> </span>
            <span class="icon iconfont icon-set" @click="deleted(item._id)" title="删除" ></span>
          </div>
        </div>
        <div class="blogBottom">
            <span>{{formatTime("YYYY-mm-dd HH:MM",new Date(parseInt(item.createTime)))}}</span>
            <span>|</span>
            <span>评论数：{{item.comment.length}}</span>
            <span>|</span>
            <span>点赞数：{{item.like.length}}</span>
        </div>
      </div>
    </div>
</template>
<script>
import formatTime from '../../../../util/util'
export default {
    data() {
      return {
        text:{}
      }
    },
    methods:{
      formatTime:formatTime,
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
      },
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
    },

    created(){
      this.getArticle()
    }
}
</script>

<style lang="scss" scoped>
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
        font-size: 18px;
        font-weight: 600;
        text-align: center;
        color: rgb(198, 55, 50);
        margin-bottom: 0;
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
                color: rgb(198, 55, 50);
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
</style>