<template>
<!-- 我关注的 -->
    <div class="container">
        <div class="textInfo">
            <h4>我的关注</h4>
        </div>
        <div class="box" v-if="flag" >
            <div class="focus"  v-for="(item , i) in focus" :key="i">
            <div class="avatar"><img :src="item.avatar" alt=""></div>
            <div class="focusInfo">
                <div class="nickName"> <router-link :to="{ name: 'home', params: { userId: item._id }}"> {{item.nickName}} </router-link> <span class="time"> 关注于：{{formatTime("YYYY-mm-dd HH:MM",new Date(parseInt(item.focusTime)))}}</span></div>
                <div class="qianming">{{item.qianming}} </div>
            </div>
            </div>
        </div>
        <div class="nothing" v-else >
            <img src="../../../assets/img/暂无数据.png" alt="">
            <div class="hint">暂时还没有关注的人哦</div>
        </div>
    </div>
</template>
<script>
import formatTime from '../../../../util/util'
export default {
    data() {
        return {
            focus:{},
            flag:true
        }
    },
    methods:{
        formatTime:formatTime,
        user(){
            this.axios({
                method:'get',
                url:'focus'
            })
            .then( res => {
                const {data:result} = res 
                if(result.user.length === 0){
                    this.flag = false
                }
                else{
                    this.flag = true
                    this.focus = result.user
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created(){
        this.user()
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
.focus{
    display: flex;
    align-items: center;
    margin: 20px 0;
    border-bottom: 1px solid rgb(235, 235, 235);
    padding-bottom: 20px;
    position: relative;
    .avatar{
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .focusInfo{
        margin-left: 20px;
        .nickName{
            color: rgb(198, 55, 50);
            .time{
                position: absolute;
                right: 50px;
                font-size: 14px;
            }
            a{
                color: rgb(198, 55, 50);
            }
        }
        .qianming{
            font-size: 14px;
            width: 684px;
        }
    }
}
</style>