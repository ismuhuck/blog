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
    <form action>
      <div class="onloadAta">
        <label for="avatar">请上传图片：</label>
        <input type="file" name="avatar" id="avatar" />
      </div>
    </form>
    <div class="btnBox">
      <button type="submit" class="onloadBtn" @click.prevent="uploadAva">上传头像</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    }
  },
  methods:{
    uploadAva(){
      
    }
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