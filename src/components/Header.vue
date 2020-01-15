<template>
  <div class="header">
    <div class="headerbox">
      <div class="search-box">
        <input type="text" placeholder="搜索内容">
        <i class="icon iconfont icon-bianji"></i>
      </div>
      <div class="logo">
        <!-- <img src="../assets/logo.jpg" alt="logo" /> -->
      </div>
      <div class="loginBox">
        <div class="login" v-if="!userToken">
          <span> 
            <!-- <router-link to="/login">登录</router-link> -->
            <a @click.prevent="login_dialog=true">登录</a>
          </span>
          <span>|</span>
          <span>
            <!-- <router-link to="/register">注册</router-link> -->
            <a @click="register_dialog = true">注册</a>
          </span>
        </div>
        <!-- 注册弹出框 -->
        <el-dialog title="注册" width="450px" :visible.sync="register_dialog">
          <el-form  :model="registerForm" ref="register_form" :rules="registerRule" label-width="0" class="loginForm">
              <el-form-item prop="nickName">
                <el-input v-model="registerForm.nickName" prefix-icon="iconfont icon-yonghu" placeholder="请输入昵称"></el-input>
              </el-form-item> 
              <el-form-item prop="email">
                <el-input v-model="registerForm.email" prefix-icon="iconfont icon-youxiang" type="email" placeholder="请输入邮箱"></el-input>
              </el-form-item> 
              <el-form-item prop="password">
                <el-input v-model="registerForm.password" prefix-icon="iconfont icon-mima" type="password" placeholder="请输入密码"></el-input>
              </el-form-item> 
              <el-form-item prop="checkPass">
                <el-input v-model="registerForm.checkPass" prefix-icon="iconfont icon-mima" type="password" placeholder="请确认密码"></el-input>
              </el-form-item> 
              <el-form-item class="btns">
                  <el-button type="primary" @click="register">注册</el-button>
                  <el-button type="primary" @click="setregisterForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 登录弹出框 -->
        <el-dialog title="登录" width="450px" :visible.sync="login_dialog">
            <el-form  :model="loginForm" ref="login_form" :rules="loginRule" label-width="0" class="loginForm">
              <el-form-item prop="email">
                <el-input v-model="loginForm.email" prefix-icon="iconfont icon-youxiang" type="email" placeholder="请输入邮箱"></el-input>
              </el-form-item> 
              <el-form-item prop="password">
                <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima" type="password" placeholder="请输入密码"></el-input>
              </el-form-item> 
              <el-form-item class="btns">
                  <el-button type="primary" @click="submitForm">登录</el-button>
                  <el-button type="primary" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 用户登录之后的个人信息区域 -->
        <div class="loginTrue" v-if="userToken" @mouseenter="showDropdown" @mouseleave="hideDropdown">
          <a href>
            <img :src="userInfo.avatar" alt />
            <span :style="{opacity:isopacity}">{{ userInfo.nickName }}</span>
          </a>
          <div class="dropdown" v-if="dropdown">
            <div class="myBlog">
              <i class="icon iconfont icon-bokeyuan"></i>
              <span>
                <router-link to="/personal">我的论坛</router-link>
              </span>
            </div>
            <div class="editInfo">
              <i class="icon iconfont icon-bianji"></i>
              <span>
                <router-link to="/edit">编辑资料</router-link>
              </span>
            </div>
            <div class="exit">
              <i class="icon iconfont icon-tuichu"></i>
              <span>
                <a @click.prevent="exitLogin">退出</a> 
              </span>
            </div>
          </div>
        </div>
      </div>
      <ul class="tabNav">
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/forum/default">技术社区</router-link>
        </li>
        <li>
          <router-link to="/editor">编辑</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
// import { log } from 'util';
export default {
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPass !== '') {
            this.$refs.register_form.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
        // 表单数据对象
      registerForm: {
        email: "",
        nickName: "",
        password: "",
        checkPass: ""
      },
      loginForm:{
          email:"",
          password:"",
      },
    //  表单验证规则对象
      registerRule:{
         nickName: [
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 10, message: '昵称长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          email:[
           { required: true, message: '请输入邮箱地址', trigger: 'blur' },
           { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
            password: [
            { validator: validatePass, trigger: 'blur' },
             { min: 6, max: 16, message: '密码长度为6-16位字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' },
             { min: 6, max: 16, message: '密码长度为6-16位字符', trigger: 'blur' }
          ]
      },
      loginRule:{
          email:[
           { required: true, message: '请输入邮箱地址', trigger: 'blur' },
           { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
             { min: 6, max: 16, message: '密码长度为6-16位字符', trigger: 'blur' }
          ],
      },
      userToken: "",
      // isLogin: false,
      dropdown: false,
      isopacity: "0.5",
      register_dialog:false,
      login_dialog:false,
      userInfo:{
        nickName:'',
        avatar:''
      }
    };
  },
  methods: {
    // ...mapMutations(["changeLogin"]),
    // 登录请求
    submitForm() {
      let _this = this;
      this.$refs.login_form.validate(valid => {
        if (valid) {
          this.axios({
            method: "post",
            url: "login",
            data: {
              email: this.loginForm.email,
              password: this.loginForm.password
            },
          }).then(res => {
            // 解构出data对象  并赋值给result
            const {data:result} = res
            if(result.code===0){
            let userToken =''
            userToken = "Bearer " + res.data.token;
            localStorage.setItem('Authorization',userToken)
            // _this.changeLogin({ Authorization: this.userToken });
            // _this.isLogin = true
            this.getToken(this)
            this.$message.success('登录成功')
            this.login_dialog=false
            }
            else{
              this.$message.error('邮箱或密码错误，登录失败');
            }
            
          }).catch(error => {
            this.$message.error('邮箱或密码错误，登录失败');
            console.log(error.response.data);
            
          })
        } else {
          this.$message.error('信息输入有误');
          return false;
        }
      });
    },
    // 注册请求
    register(){
        // let _this = this;
      this.$refs.register_form.validate(valid => {
        if (valid) {
          this.axios({
            method: "post",
            url: "register",
            data: {
              email: this.registerForm.email,
              nickName:this.registerForm.nickName,
              password: this.registerForm.password
            },
          }).then(res => {
            // _this.userToken = "Bearer" + res.data.token;
            // // console.log(this.userToken); //获取到的token
            // _this.changeLogin({ Authorization: this.userToken });
            // _this.isLogin = true
            const {data:result} = res
            if(result.code===2){
                this.$message.error('该邮箱已经注册！请登录');
            }
            else if(result.code===3){
                this.$message.error('昵称已存在，请更换昵称')
            }
            else{
                this.$message.success('注册成功')
                this.register_dialog=false
            }
          }).catch(error => {
            console.log(error)
          })
        } else {
          this.$message.error('请正确填写表单数据')
          return false;
        }
      });
    },
    resetForm() {
        this.$refs.login_form.resetFields()
    //   this.$refs[formName].resetFields();
    },
    setregisterForm(){
        this.$refs.register_form.resetFields()
    },
    showDropdown() {
      this.dropdown = true;
      this.isopacity = "1";
    },
    hideDropdown() {
      this.dropdown = false;
      this.isopacity = "0.5";
    },
          // 获取用户信息
    getToken(_this){
      let token = localStorage.getItem('Authorization')
      if(token){
        _this.userToken = token
        _this.axios({
          method: "get",
          url: "getUser",
        }).then(res =>{
          const {data:result} = res
          _this.userInfo.nickName = result.user.nickName
          _this.userInfo.avatar = result.user.avatar
        })
        .catch(err =>{
          console.log(err)
        })
      }else{
        _this.userToken = token
      }
    },
    // 退出登录
    exitLogin(){
      localStorage.removeItem('Authorization')
      var _this = this
      _this.getToken(_this)
    }
  },
  created(){
    var _this = this
    _this.getToken(_this)
  }
};
</script>
<style lang="scss" scoped>
#app{
  filter: blur(15px);
   -webkit-filter:blur(15px)
}
body {
  .header {
    position: relative;
    // z-index: 1;
    width: 100%;
    background-image: linear-gradient(rgb(207, 71, 66), rgb(198, 55, 50));
    .headerbox {
      margin: 0 auto;
      width: 1120px;
      height: 50px;
      line-height: 40px;
      a {
        color: white;
        text-decoration: none;
        cursor: pointer;
      }
      ul {
        float: right;
        margin-right: 50px;
        li {
          list-style: none;
          float: left;
          padding: 5px 10px;
        }
      }
      .search-box{
        line-height: 50px;
        float: left;
        position: relative;
        input{
          height: 30px;
          width: 250px;
          border: none;
          outline: none;
          border-radius: 5px;
          color: rgb(75,75,75);
          background: rgb(245,245,245);
          padding: 5px 10px;
          font-size: 14px;
        }
        i{
          position: absolute;
          right: 10px;
          color: rgb(198, 55, 50);
          cursor:pointer;
        }
      }
      .logo { 
        float: left;
        margin-top: 10px;
        img {
          width: 30px;
        }
      }
      .loginBox {
        line-height: 50px;
        float: right;
        .el-button {
          color: white;
        }
        span {
          padding: 5px 5px;
        }
        .loginForm{
          padding: 0 20px;
          .btns{
            display: flex;
            justify-content: flex-end;
          }
        }
      }
      .loginTrue {
        position: relative;
        a {
          img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
          }
        }
        .dropdown {
          border: 1px solid rgb(198, 55, 50);
          border-radius: 8px;
          position: absolute;
          z-index: 1;
          width: 145px;
          background-color: #fff;
          padding: 20px;
          // position: relative;
          div {
            i {
              margin-right: 5px;
            }
            span {
              a {
                color: rgb(100, 100, 100);
              }
            }
          }
        }
      }
      .tabNav{
        li{
          a{
            color: #fff;
            opacity: 0.6;
          }
          a.router-link-exact-active{
            opacity: 1;
          }
        }
      }
    }
  }
  .modal-content {
    width: 400px;
    height: 430px;
    top: 168px;
    .el-form-item__label {
      width: 50px;
    }
  }
  .el-dialog {
    width: 400px;
    height: 370px;
  }
}
</style>
