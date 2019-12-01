<template>
  <div class="edit_info">
    <h4>
      <i class="icon iconfont icon-bi"></i> 修改个人信息
    </h4>
    <form action name="formInfo">
      <div class="labelBox">
        <label for="nickName">用户名：</label>
      </div>
      <input type="text" id="nickName" name="nickName" />
      <div class="labelBox">
        <label for="email">邮箱：</label>
      </div>
      <input type="email" id="email" name="email" />
      <div class="labelBox">
        <label for="city">所在地：</label>
      </div>
      <input type="text" id="city" name="city" />
      <div class="labelBox">
        <label for="gongsi">公司名：</label>
      </div>
      <input type="text" id="gongsi" name="gongsi" />
      <div class="labelBox">
        <label for="qq">qq账号：</label>
      </div>
      <input type="text" id="qq" name="qq" />
      <div class="labelBox">
        <label for="qianming">个性签名：</label>
      </div>
      <textarea name="qianming" id="qianming" cols="30" rows="10"></textarea>
      <div class="buttonBox">
        <button type="submit">应用修改</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.edit_info {
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
  .buttonBox {
    margin:20px 0;
    button {
      border: none;
      background-color: rgb(198, 55, 50);
      width: 100px;
      height: 35px;
      border-radius: 5px;
      color: white;
    }
  }
}
</style>