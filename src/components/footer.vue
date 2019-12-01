<template>
  <div class="footer">
    <div class="footTopBox">
      <div class="box1">
        <h4>
          <img src="../assets/zhan.png" alt class="zhanzhu" />
          关于站长
        </h4>
        <div class="look">
          站长是一名骨灰级的小白玩家
          <div class="lookin">
            站长赠言：生活总是让我们遍体鳞伤但到后来那些受伤的
            地方一定会变成我们最强壮的地方
          </div>
        </div>
      </div>
      <div class="box2">
        <h4>资源推荐</h4>
        <div class="look2">
          <p>《论坛使用指南》</p>
          <p>《文章撰写指南》</p>
        </div>
      </div>
      <div class="box3">
        <h4>赞助商</h4>
        <div class="look3">
          <p>可怜巴巴</p>
        </div>
      </div>
      <div class="box4">
        <h4>其他信息</h4>
        <div class="look4">
          <p>联系站长</p>
          <p>所有社区</p>
        </div>
      </div>
    </div>
    <div class="footer_bottom">
        <p>禁止传播不良信息</p>
        <p>本网站由<a href="">吴玉冰</a>设计和编码
        <img src="../assets/xin.png" alt="" class="xin">
        </p>
    </div>
  </div>
</template>
<script>
// import '../assets/zhan.png'
export default {};
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 300px;
  padding-top: 20px;
  margin-top: 20px;
  background-color: rgb(27, 28, 29);
  .footTopBox {
    width: 1120px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
    border-bottom: 1px solid rgb(55, 55, 55);
    .box1,
    .box2,
    .box3,
    .box4 {
      width: 280px;
      height: 155px;
      padding: 14px;
      text-align: center;
      h4 {
        font-size: 15px;
        color: white;
      }
    }
    .box1,
    .box2,
    .box3 {
      border-right: 1px solid rgb(55, 55, 55);
    }
    .box1 {
      .zhanzhu {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        vertical-align: middle;
      }
      .look {
        text-align: left;
        color: white;
        margin-top: 10px;
      }
    }
    .box2 {
      .look2 {
        p {
          color: rgb(100, 100, 100);
          margin-top: 20px;
        }
      }
    }
    .box3 {
      .look3 {
        p {
          color: rgb(100, 100, 100);
          margin-top: 20px;
        }
      }
    }
    .box4 {
      .look4 {
        p {
          color: rgb(27,161,252);
          margin-top: 20px;
        }
      }
    }
  }
  .footer_bottom{
      width: 300px;
      margin: 0 auto;
      p{
          width: 240px;
          text-align: center;
          color: rgb(100, 100, 100);
          margin-top: 20px;
          a{
              color: rgb(255,220,0);
              text-decoration: none;
          }
          img.xin{
            //   display: inline-block;
              width: 20px;
              height: 20px;
              vertical-align: middle;
          }
      }
  }
}
</style>