<template>
  <div class="register">
    <div class="bgimg"></div>
    <div class="registerBox">
      <h4>注册科技论坛</h4>
      <form name="register" id="registerForm">
        <div class="inputBox">
          <div class="labelBox">
            <label for="email">邮箱：</label>
          </div>
          <input type="email" name="email" id="email" placeholder="请输入邮箱" v-model="formData.email" required/>
        </div>

        <div class="inputBox">
          <div class="labelBox">
            <label for="nickName">昵称：</label>
          </div>
          <input type="text" name="nickName" id="nickName" placeholder="请输入昵称" v-model="formData.nickName" required/>
        </div>

        <div class="inputBox">
          <div class="labelBox">
            <label for="password">密码：</label>
          </div>
          <input type="password" name="password" id="password" placeholder="请输入密码" v-model="formData.password" required/>
        </div>

        <div class="inputBox">
          <div class="labelBox">
            <label for="passwordAga">密码：</label>
          </div>
          <input type="password" name="passwordAga" id="passwordAga" placeholder="请确认密码"  v-model="formData.passwordAga" required/>
        </div>
      </form>
      <div class="btnBox">
        <button @click.prevent ="register" class="btn1" type="submit" form="registerForm">注册</button>
        <button @click="clear" class="btn2">清空</button>
      </div>
      <p><router-link to="/login">已有账号前往登录</router-link> </p>
    </div>
  </div>
</template>
<script>
import 'jquery'
export default {
    data() {
        return {
            formData:{
                email:"",
                nickName:"",
                password:"",
                passwordAga:""
            }
        }
    },
    methods: {
        register:function(){
            // var data = this.formData
            // for (const key in data) {
            //         const element = data[key].trim();
            //         if(element === "") {
            //             alert(key+"不能为空")
            //             return false
            //         } 
            // }
            console.log(this.formData);
            
        },
        clear:function(){
            this.formData.email=this.formData.nickName=this.formData.password=this.formData.passwordAga=""
        }
    },
};
</script>
<style lang="scss" scoped>
.register {
  background-color: transparent;
  height: 80%;
  .bgimg{
    // 此处为了使背景永远在最后方，为此设置了层级 同时也改变了 header和footer的层级 
    // 如果出现层级问题 请注意这里
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 0;
    background-image: url("../assets/bgimg.jpg");
  }
  .registerBox {
    position: relative;
    z-index: 1;
    text-align: center;
    width: 450px;
    position: absolute;
    border: 1px solid rgb(235, 235, 235);
    background-color: #fff;
    border-radius: 8px;
    border-top: 3px solid rgb(198, 55, 50);
    height: 400px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    h4 {
      height: 50px;
      border-bottom: 1px solid rgb(235, 235, 235);
      line-height: 50px;
    }
    .inputBox {
      display: flex;
      justify-content: center;
      margin: 20px 0;
      input {
        width: 350px;
        height: 35px;
        border-radius: 5px;
        border: 1px solid rgb(235, 235, 235);
        font-size: 14px;
      }
      .labelBox {
        height: 35px;
        line-height: 35px;
        color: rgb(198, 55, 50);
      }
    }
    button {
      border: none;
      background-color: rgb(198, 55, 50);
      width: 100px;
      height: 35px;
      border-radius: 5px;
      color: white;
    }
    .btnBox {
        margin-bottom: 20px;
      button.btn1 {
        margin-right: 15px;
      }
      button.btn2 {
        margin-left: 15px;
      }
    }
    p{
        a{
            color: rgb(198, 55, 50)
        }
    }
  }
}
</style>