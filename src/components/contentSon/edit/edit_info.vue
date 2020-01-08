<template>
  <div class="edit_info">
    <h4>
      <i class="icon iconfont icon-bi"></i> 修改个人信息
    </h4>
    <el-form :model="update" ref="update_form" :rules="updateRule" label-width="0" class="updateForm">
      <el-form-item prop="nickName">
        <el-input v-model="update.nickName" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="update.email" type="email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="address">
        <el-input v-model="update.address" type="text" placeholder="家庭地址"></el-input>
      </el-form-item>
      <el-form-item prop="qq">
        <el-input v-model="update.qq" type="text" placeholder="QQ号"></el-input>
      </el-form-item>
      <el-form-item prop="company">
        <el-input v-model="update.company" type="text" placeholder="公司地址"></el-input>
      </el-form-item>
      <textarea name="qianming" id="qianming" cols="30" rows="10" v-model="update.qianming" placeholder="个人签名"></textarea>
      <el-form-item class="btns">
        <el-button  @click="updateInfo" id="updateBtn">确认修改</el-button>
        <!-- <el-button type="primary" @click="setupdate">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      update: {
        email: "",
        nickName: "",
        qq: "",
        address: "",
        company: "",
        qianming: ""
      },
      updateRule: {
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "昵称长度在 2 到 10 个字符",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        qq:[
           { required: true, message: "qq不能为空", trigger: "blur" },
          {min:6,max:10,message:"qq长度应为6-10位",trigger:"blur"},
          {type:'number',message:"qq必须为数字类型",trigger:['blue','change']}
        ] 
      }
    };
  },
  methods: {
    updateInfo() {
      this.$refs.update_form.validate(valid => {
        if (valid) {
          this.axios({
            method: "post",
            url: "info",
            data: {
              email: this.update.email,
              nickName: this.update.nickName,
              address: this.update.address,
              company: this.update.company,
              qq: this.update.qq,
              qianming: this.update.qianming
            }
          })
            .then(res => {
              const { data: result } = res;
              console.log(result);
              if (result.code === 1) {
                return this.$message.error("修改失败，请重试");
              }
              if (result.code === 2) {
                return this.$message.warning("该邮箱已经存在，请重新输入邮箱");
              }
              if (result.code === 3) {
                return this.$message.warning("昵称已存在，请重新输入昵称");
              }
              this.$message.success("修改成功");
            })
            .catch(err => {
              console.log(err);
            });
        }else{
          this.$message.error('表单信息输入有误，请重新输入')
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.edit_info {
  width: 100%;
  background-color: #fff;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 8px;
  padding: 20px;
  color: rgb(100, 100, 100);
  .updateForm{
    padding: 0 250px 0 0; 
  }
  h4 {
    font-size: 16px;
    padding: 5px 20px;
    border-bottom: 1px solid rgb(235, 235, 235);
    padding-bottom: 20px;
  }
  .labelBox {
    label {
      font-size: 15px;
    }
  }
  input {
    width: 450px;
    height: 35px;
    border-radius: 5px;
    border: 1px solid rgb(235, 235, 235);
  }
  textarea {
    width: 450px;
    border-radius: 5px;
    border: 1px solid rgb(235, 235, 235);
  }
  #updateBtn {
    color: rgb(27,161,252);
  }
  #updateBtn:hover{
    color: rgb(207, 71, 66);
    background-color: #fff;
    border: 1px solid rgb(207, 71, 66);
  }
}
</style>