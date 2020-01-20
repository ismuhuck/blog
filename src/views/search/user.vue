<template>
    <div class="users">
        <!-- 用户列表{{userlist}} -->
        <div class="white" v-if="flag">
            没有相关用户
        </div>
        <div class="user" v-for="(item,index) in userlist" :key="index" v-else>
            <div class="avatar">
                <img :src="item.avatar" alt="">
            </div>
            <div class="info">
                <div class="nickName">{{item.nickName}}</div>
                <div class="detail"><span class="articlescount">32篇文章</span><span class="likeme">25位粉丝</span></div>
            </div>
            <div class="focus">
                <button>关注</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['list'],
    data() {
        return {
            userlist:this.list.user,
            flag:''
        }
    },
    created(){
        if(this.userlist.length === 0){
            this.flag = true
        }
        else{
            this.flag = false
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
}
</style>