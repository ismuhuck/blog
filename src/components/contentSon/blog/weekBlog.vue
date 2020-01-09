<template>
  <div>
    <div class="contentList" v-for="(item,i) in summary" :key="i">
      <img src="../../../assets/ata.jpg" alt class="ata" />
      <span class="span1">分享</span>
      <router-link to="/articles">
        <span class="span2">{{item.blogTitle}} 这是周排行页面</span>
        <span class="span3">
          <span class="span4">sss</span>
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
  created(){
    this.axios({
      method:'get',
      url:'week'
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