<template>
  <div class="header">
    <div class="headerbox">
      <div class="logo">
        <img src="../assets/logo.jpg" alt="logo" />
      </div>
      <div class="loginBox">
        <div class="login" v-if="!isLogin">
          <span>
            <router-link to="/login">登录</router-link>
          </span>
          <span>|</span>
          <span>
            <router-link to="/register">注册</router-link>
          </span>
        </div>
        <div
          class="loginTrue"
          v-if="isLogin"
          @mouseenter="showDropdown"
          @mouseleave="hideDropdown"
        >
          <a href>
            <img src="../assets/ata.jpg" alt />
            <span :style="{opacity:isopacity}">{{ nickName }}</span>
          </a>
          <div class="dropdown" v-if="dropdown">
            <div class="myBlog">
              <i class="icon iconfont icon-bokeyuan"></i>
              <span>
                <router-link to>我的论坛</router-link>
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
                <router-link to>退出</router-link>
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
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        nickName: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      userToken: "",
      isLogin: false,
      dropdown: false,
      nickName: "muhuck",
      isopacity: "0.5"
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    submitForm(formName) {
      // console.log(formName);
      
      let _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(valid);
          this.axios({
            method: "post",
            url: "http://localhost:5000/api/login",
            data: {
              email: this.ruleForm.email,
              password: this.ruleForm.pass
            },
            headers: {
              Anthorization: ""
            }
          }).then(res => {
            _this.userToken = "Bearer" + res.data.token;
            // console.log(this.userToken); //获取到的token
            _this.changeLogin({ Authorization: this.userToken });
            _this.isLogin = true
            this.$router.push("/");
            // $('#exampleModal2').modal('hide')
            // alert("登陆成功");
          }).catch(error => {
            console.log(error.response.data);
            
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showDropdown() {
      this.dropdown = true;
      this.isopacity = "1";
    },
    hideDropdown() {
      this.dropdown = false;
      this.isopacity = "0.5";
    }
  }
};
</script>
<style lang="scss" scoped>
body {
  .header {
    position: relative;
    z-index: 1;
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
          width: 145px;
          background-color: #fff;
          padding: 20px;
          // top: 60px;
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
