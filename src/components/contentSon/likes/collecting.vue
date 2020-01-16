<template>
    <div class="container">
        <div class="textInfo">
            <h4>我的收藏</h4>
        </div>
        <div class="box" v-if="flag">
            <div class="collecting" v-for="(item,i) in collecting" :key="i">
                <div class="title">{{item.title}} <span class="time"> 收藏于：{{formatTime("YYYY-mm-dd HH:MM",new Date(parseInt(item.likeTime)))}}</span></div>
                <div class="content" v-html="item.content"></div>
                <router-link :to="{name:'articles',params:{articleId:item._id,userId:item.userId}}">查看全文</router-link>
            </div>
        </div>
        <div class="nothing" v-else>
            <img src="../../../assets/img/暂无数据.png" alt="">
            <div class="hint">暂时还没有收藏的内容哦</div>
        </div>
        
    </div>
</template>
<script>
import formatTime from '../../../../util/util'
export default {
    data() {
        return {
            collecting:[],
            flag:true
        }
    },
    methods:{
        formatTime:formatTime,
        articles(){
            this.axios.get('collecting')
            .then( res => {
                const {data:result} = res
                if(result.collecting.length === 0){
                    this.flag = false
                }
                else{
                    this.flag = true
                    this.collecting = result.collecting
                }
            })
        }
    },
    created(){
        this.articles()
    }
}
</script>
<style scoped lang="scss" >
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
.nothing{
    text-align: center;
    img{
        width: 300;
        height: 250px;
    }
    .hint{
        font-size: 18px;
        color: rgb(198, 55, 50);
        font-weight: 600;
    }
}
.collecting{
    margin-top: 20px;
    border-bottom: 1px solid rgb(235, 235, 235);
    padding-bottom: 10px;
    position: relative;
    .title{
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 600;
        color: rgb(198, 55, 50);
        .time{
            position: absolute;
            font-weight: 500;
            right: 50px;
            font-size: 14px;
        }
    }
    .content{
        height: 20px;
        width: 784px;
        overflow: hidden;
    }
    a{
        color: rgb(198, 55, 50);
        font-size: 14px;
    }
}
</style>