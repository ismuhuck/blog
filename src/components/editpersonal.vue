<template>
    <div class="editPersonal">
        <div class="editLeft">
            <div class="editBox">
                <div class="edit"><router-link to="/edit/editInfo"><i class="icon iconfont icon-tuichu"></i> 个人信息</router-link> </div>
                <div class="edit_ava"><router-link to="/edit/edit_ava"><i class="icon iconfont icon-bi"></i> 修改头像</router-link> </div>
                <div class="editPassword"><router-link to="/edit/edit_password"><i class="icon iconfont icon-bi"></i>修改密码</router-link> </div>
            </div>
        </div>
        <div class="editRight">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .editPersonal{
        width: 1120px;
        margin: 0 auto;
        display: flex;
        .editLeft{
            width: 324px;
            margin-right: 10px;
            .editBox{
                border: 1px solid rgb(225,225,225);
                border-radius: 8px;
                padding:0 20px;
                background-color: #fff;
                div{
                    border-bottom: 1px solid rgb(225,225,225);
                    text-align: center;
                    height: 45px;
                    line-height: 45px;
                    a{
                        i{
                            margin-right: 5px;
                        }
                        color: rgb(100,100,100)
                    }
                }
                div:last-child{
                    border:none;
                }
            }
        }
        .editRight{
            width: 780px;
        }
    }
</style>