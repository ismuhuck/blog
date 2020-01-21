<template>
    <div class="users">
        <!-- 用户列表{{userlist}} -->
        <div v-if="flag">
            <div class="user" v-for="(item,index) in userlist" :key="index">
            <div class="avatar">
                <img :src="item.avatar" alt="">
            </div>
            <div class="info">
                <div class="nickName"><router-link :to="{ name: 'home', params: { userId: item._id }}"> {{item.nickName}} </router-link></div>
                <div class="detail"><span class="articlescount">{{item.articleNum}}篇文章</span><span class="likeme">{{item.likemeNum}}位粉丝</span></div>
            </div>
            <div class="focus">
                <button>关注</button>
            </div>
            </div>
        </div>
        <div class="nothing" v-else>
            <img src="../../assets/img/暂无数据.png" alt="">
            <div class="hint">暂时还没有相关用户</div>
        </div>
    </div>
</template>
<script>
import formatTime from '../../../util/util'
export default {
    props:['list'],
    data() {
        return {
            userlist:this.list.user,
            flag:true
        }
    },
    watch: {
        "list":function(newval,oldval){
            if(newval.user.length === 0){
                this.flag = false
                }
            else{
                this.flag = true
                this.userlist = newval.user
            }
        },
    },
    methods:{
        formatTime:formatTime,
        init(){
            if(result.collecting.length === 0){
                    this.flag = false
                }
            else{
                this.flag = true
                this.collecting = result.collecting
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.users{
    .user{
        display: flex;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #edeeef;
        .avatar{
            flex: 0 0 auto;
            margin-right: 20px;
            img{
                width: 45px;
                height: 45px;
                border-radius: 50%;
            }
        }
        .info{
            flex: 1 1 auto;
            .nickName{
                font-size: 16px;
                font-weight: 600;
                color: #2E3135;
            }
            .detail{
                color: #8a9aa9;
                font-size: 12px;
            }
        }
        .focus{
            button{
                width: 75px;
                height: 30px;
                color: #37C701;
                background-color: #fff;
                border: 1px solid;
                outline: none;
                border-radius: 3px;
            }
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
}
</style>