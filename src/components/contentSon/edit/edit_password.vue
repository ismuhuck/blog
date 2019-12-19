<template>
  <div class="editpassword">
    <h4>
      <i class="icon iconfont icon-bi"></i> 修改密码
    </h4>
    <div class="updataPwd">
      <form action>
        <div class="pwdlabel">
          <label for="oldPwd">原始密码</label>
        </div>
        <input type="text" name="oldPwd" id="oldPwd" />
        <div class="newlabel">
          <label for="newPwd">新密码</label>
        </div>
        <input type="text" name="newPwd" id="newPwd" />
      </form>
      <div class="pwdBtn">
        <button type="submit">应用修改</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
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
    input {
      width: 450px;
      height: 35px;
      border: 1px solid rgb(235, 235, 235);
      border-radius: 8px;
    }
    .pwdBtn {
      margin: 20px 0;
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
}
</style>