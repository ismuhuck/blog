<template>
  <div class="edit_ata">
    <h4>
      <i class="icon iconfont icon-bi"></i> 修改头像
    </h4>
    <div class="warning">
      <p>
        <i class="icon iconfont icon-jubao">请注意</i>
      </p>
      <p>请上传正常的人物头像，真人或卡通皆可。</p>
      <p>上传闪烁、奇异、违法、色情头像，情节严重者将会被禁言处理。</p>
    </div>
    <div class="avataText">
      点击下方原始头像上传新头像
    </div>
    <el-upload
  class="avatar-uploader"
  action="http://localhost:5000/api/uploadAva"
  :headers="token"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  name="avatar"
  >
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </div>
</template>
<script>
export default {
   data() {
      return {
        imageUrl: '',
        token:{
          Authorization:localStorage.getItem('Authorization')
        }
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        // console.log(res)
        if(res.code === 0){
          this.$message.success('头像上传成功')
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    mounted(){
      this.axios({
        method:'get',
        url:'getUser'
      })
      .then(res => {
        const {data:result} = res
        this.imageUrl = result.user.avatar
        // console.log(result) 
      })
      .catch(err => {
        console.log(err)
      })
    }
};
</script>
<style lang="scss" scoped>
.edit_ata {
  width: 100%;
  background-color: #fff;
  border: 1px solid rgb(235, 235, 235);
  border-radius: 8px;
  padding: 20px;
  color: rgb(100, 100, 100);
  .avataText {
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    margin-top: 20px;
  }
  h4 {
    font-size: 16px;
    padding: 5px 20px;
    border-bottom: 1px solid rgb(235, 235, 235);
    padding-bottom: 20px;
  }
  .warning {
    font-size: 14px;
    padding: 10px 20px;
    border: 1px solid rgb(198, 55, 50);
    border-radius: 8px;
    background-color: rgb(255, 250, 240);
  }
  div.onloadAta {
    margin-top: 20px;
    padding: 20px 0;
    border: 1px solid rgb(235, 235, 235);
    border-radius: 8px;
    #avatar{
        
    }
  }
  .btnBox{
      margin-top: 20px;
      .onloadBtn {
      width: 100px;
      height: 35px;
      border: none;
      border-radius: 5px;
      background-color: rgb(198, 55, 50);
      color: white;
    }
  }
}
</style>