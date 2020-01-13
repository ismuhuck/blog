<template>
  <div>
    <div class="contentList" v-for="(item,i) in summary" :key="i">
      <img :src="item.avatar" alt class="ata" />
      <span class="span1">分享</span>
      <!-- 通过属性绑定 query进行动态路由传参 -->
      <router-link :to="{path:'/articles',query:{articleId:item._id}}">
        <span class="span2">{{item.title}}</span>
        <span class="span3">
          <span class="span4">{{item.nickName}}发表于</span>
          <span class="span6">|</span>
          <!-- new Date(parseInt(item.createTime))  将时间戳转化为标准时间 -->
          <span class="span5">{{formatTime("YYYY-mm-dd HH:MM",new Date(parseInt(item.createTime)))}}</span>
        </span>
      </router-link>
      
    </div>
  </div>
</template>
<script>
import formatTime from '../../../../util/util'
export default {
  data() {
    return {
      summary:'',
    }
  },
  methods:{
     formatTime:formatTime,
    //  formatTime("YYYY-mm-dd HH:MM",new Date(item.createTime))
    // 获取默认列表
    pullDefault(){
      this.axios({
      method:'get',
      url:'default'
    })
    .then((res) =>{
      const {data:result} = res
      this.summary = result.article
      let time = result.article[0].createTime
      console.log(result)
      // console.log(formatTime("YYYY-mm-dd HH:MM",new Date(parseInt(time)) ) )
    })
    .catch(err =>{
      console.log(err)
    })
    }
  },
  created(){
    this.pullDefault()
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
      width: 280px;
      text-align: right;
      margin-left: auto;
    }
    span.span6{
      margin: 0 10px;
    }
  }
 
}
</style>