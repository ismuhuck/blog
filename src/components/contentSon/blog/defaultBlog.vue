<template>
  <div>
    <div class="contentList" v-for="(item,i) in summary" :key="i">
      <img :src="item.userAva" alt class="ata" />
      <span class="span1">分享</span>
      <!-- 通过属性绑定 query进行动态路由传参 -->
      <router-link :to="{path:'/articles',query:{articleId:item._id}}">
        <span class="span2">{{item.blogTitle}}</span>
        <span class="span3">
          <span class="span4">{{item.userNickname}}发表于</span>
          <span class="span6">|</span>
          <span class="span5">3小时前</span>
        </span>
      </router-link>
      
    </div>
  </div>
</template>
<script>
// import ''
export default {
  data() {
    return {
      summary:''
    }
  },
  methods:{
  },
  created(){
    this.axios({
      method:'get',
      url:'default'
    })
    .then((res) =>{
      const {data:result} = res
      this.summary = result.article
      console.log(result)
    })
    .catch(err =>{
      console.log(err)
    })
  }
};
</script>
<style lang="scss" scoped>
.contentList {
  display: flex;
  height: 60px;
  padding: 7px 0;
  align-items: center;
  border-bottom: 1px solid rgb(235,235,235);
  img.ata {
    width: 40px;
    height: 40px;
  }
  span {
    font-size: 14px;
  }
  span.span1 {
    padding: 3px 10px;
    background-color: rgb(232, 232, 232);
    // width: 45px;
    margin-left: 10px;
    border-radius: 5px;
    margin-right: 10px;
  }
  a {
    display: flex;
    justify-content: space-between;
    color: rgb(125, 125, 125);
    text-decoration: none;
    width: 630px;
    span.span3 {
      display: inline-block;
      width: 180px;
      text-align: right;
      margin-left: auto;
    }
    span.span6{
      margin: 0 10px;
    }
  }
 
}
</style>