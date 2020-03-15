<template>
  <div class="content">
      <div class="clear" v-if="flag">
          沒有通知內容
      </div>
      <div class="message" v-else>
          <div class="list" v-for="(item,i) in messageList" :key="i">
              <router-link :to="{name:'articles',params:{articleId:item.articleId,userId:item.userId}}">
              <div class="comment">
                  <span class="messageInfo">{{item.userName}} <span class="commentspan">评论了你的</span> {{item.title}} </span> 
              </div>
              </router-link>
              <span class="biaoji"  @click="del(item.id)">删除</span>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        flag:true,
        messageList:[]
    };
  },
  methods: {
    del(id){
        this.axios({
            method:'get',
            url:'delmessage',
            params:{
                id:id
            }
        })
        .then(res => {
            const {data :result} = res
            console.log(result)
            this.getinfo()
        })
        .catch(err => {
            console.log(err)
        })
    },
    getmessage() {
      this.axios({
        method: "get",
        url: "getUser"
      })
        .then(res => {
          const { data: result } = res;
          let count = result.message;
          console.log(count,111)
          if (count === 0){
              this.flag = true
          }
          else {
              this.flag = false
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
     getinfo() {
      this.axios({
        method: "get",
        url: "message"
      })
        .then(res => {
          const { data: result } = res;
          this.messageList = result;
          console.log(result)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created(){
      this.getmessage()
      this.getinfo()
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 1120px;
  margin: 0 auto;
  background-color: rgb(245, 245, 245);
  padding: 20px;
  .message{
      .list{
          margin: 0 0 20px 0;
          border-bottom: 1px solid #ffffff;
          padding-bottom: 10px;
          a{
              color: blue;
            .comment{
                display: inline-block;
                .messageInfo{
                    .commentspan{
                        color: rgb(50,50,50);
                        font-size: 14px;
                    }
                }
            }
          }
          .biaoji{
              margin-left: 10px;
              color: rgb(207, 71, 66);
              cursor: pointer;
          }
      }
  }
}
</style>