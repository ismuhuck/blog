<template>
  <div class="editpassword">
    <h4>
      <i class="icon iconfont icon-bi"></i> 修改密码
    </h4>
    <div class="updataPwd">
      <el-form :model="updatePass" ref="updatePass_form" :rules="updatePassRule" label-width="0" class="updatePassForm">
        <el-form-item prop="password">
          <el-input v-model="updatePass.password" prefix-icon="iconfont icon-mima" type="password" placeholder="请输入原始密码"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input v-model="updatePass.newPassword" prefix-icon="iconfont icon-mima" type="password" placeholder="请确认新密码"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button @click="updatePassword" id="updateBtn">确认修改</el-button>
          <!-- <el-button type="primary" @click="setupdate">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      updatePass:{
        password:'',
        newPassword:''
      },
      updatePassRule:{
          password: [
            { required: true, message: '请输入原始密码', trigger: 'blur' },
            { min: 6, max: 16, message: '密码长度为6-16位字符', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 16, message: '密码长度为6-16位字符', trigger: 'blur' }
          ]
      }
    }
  },
  methods:{
    updatePassword(){
      this.$refs.updatePass_form.validate(valid => {
        if (valid) {
          this.axios({
            method: "post",
            url: "updatePass",
            data: {
              password:this.updatePass.password,
              newPassword:this.updatePass.newPassword
            }
          })
            .then(res => {
              const { data: result } = res;
			  console.log(result)
			  if(result.code ===4){
				 return this.$message.error('原始密码错误')
			  }
			  if(result.code === 5){
				  return this.$message.error('新密码与原始密码相同')
			  }
			  this.$message.success('密码修改成功')
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
.editpassword {
  width: 100%;
  background-color: #fff;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 8px;
  padding: 20px;
  color: rgb(100, 100, 100);
  h4 {
    font-size: 16px;
    padding: 5px 20px;
    border-bottom: 1px solid rgb(235, 235, 235);
    padding-bottom: 20px;
  }
  .updataPwd {  
    .updatePassForm{
      padding: 0 350px 0 0; 
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
}
</style>