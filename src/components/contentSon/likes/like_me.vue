<template>
    <div class="container">
        <div class="textInfo">
            <h4>我的粉丝</h4>
        </div>
        <div class="likeme" v-for="(item , i) in likeme" :key="i">
            <div class="avatar"><img :src="item.avatar" alt=""></div>
            <div class="likemeInfo">
                <div class="box">
                    <div class="nickName"><router-link :to="{ name: 'home', params: { userId: item._id }}"><span>{{item.nickName}}</span></router-link>  <span class="time"> 从{{formatTime("YYYY-mm-dd HH:MM",new Date(parseInt(item.likemeTime)))}}开始关注我</span> </div>
                    <div class="qianming">{{item.qianming}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import formatTime from '../../../../util/util'
export default {
    data() {
        return {
            likeme:{}
        }
    },
    methods:{
        formatTime:formatTime,
        user(){
            this.axios({
                method:'get',
                url:'likeme'
            })
            .then( res => {
                const {data:result} = res 
                this.likeme = result.user 
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
.likeme{
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
    .likemeInfo{
        margin-left: 20px;
            .nickName{
                color: rgb(198, 55, 50);
                display: flex;
                justify-content: space-between;
                a{
                    color: rgb(198, 55, 50);
                }
                .time{
                    position: absolute;
                    right: 50px;
                    font-size: 14px;
                 // margin-left: 100px;
                }
            }
            .qianming{
                font-size: 14px;
                width: 684px;
            }
    }
}
</style>