<template>
  <div class="personal">
    <div class="perLeft">
      <div class="personInfo">
        <div class="infoHeader">
          <div class="nick">
            <p>
              <a href>{{user.nickName}}</a>
            </p>
            <p>{{user.qianming}}</p>
          </div>
          <div class="ata">
            <a href>
              <img :src="user.avatar" alt />
            </a>
          </div>
        </div>
        <div class="infoBody">
          <div class="infiLabel">
            <div class="label">文章</div>
            <div class="value">{{tanzhu.allarticles}}</div>
          </div>
          <div class="infiLabel">
            <div class="label">粉丝</div>
            <div class="value">{{tanzhu.likemeNum}}</div>
          </div>
          <div class="infiLabel">
            <div class="label">喜欢</div>
            <div class="value">{{tanzhu.focusNum}}</div>
          </div>
          <div class="infiLabel">
            <div class="label">收藏</div>
            <div class="value">{{tanzhu.shoucang}}</div>
          </div>
        </div>
        <div class="footer">
          <button class="Btn btn1" @click="focus">关注</button>
          <button class="Btn btn2">私信</button>
        </div>
      </div>
    </div>
    <div class="perRight"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        nickName: "",
        avatar: "",
        qianming: ""
      },
      token: localStorage.getItem("Authorization"),
      tanzhu: {
        allarticles: 0,
        likemeNum: 0,
        focusNum: 0,
        shoucang: 0
      }
    };
  },
  methods: {
      focus(){
          
      }
  },
  created() {
    console.log(this.$route.params.userId);
  }
};
</script>
<style lang="scss" scoped>
.personal {
  display: flex;
  width: 1120px;
  margin: 0 auto;
  .perLeft {
    width: 320px;
    .personInfo {
      color: rgb(100, 100, 100);
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      border-top: 3px solid rgb(198, 55, 50);
      .infoHeader {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border-bottom: 1px solid rgb(235, 235, 235);
        padding-bottom: 20px;
        .nick {
          p {
            margin-bottom: 5px;
            a {
              color: rgb(100, 100, 100);
            }
          }
        }
        .ata {
          a {
            img {
              width: 55px;
              height: 55px;
              border-radius: 50%;
            }
          }
        }
      }
      .infoBody {
        display: flex;
        justify-content: space-between;
        padding: 20px 10px;
        border-bottom: 1px solid rgb(235, 235, 235);
      }
      .footer {
        padding: 20px 10px;
        display: flex;
        justify-content: center;
        .Btn {
          border: 1px solid rgb(198, 55, 50);
          background-color: white;
          width: 50%;
          padding: 5px 0;
        }
        .btn1 {
          border-right: none;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        .btn2 {
          border-bottom-right-radius: 3px;
          border-top-right-radius: 3px;
        }
      }
    }
  }
  .perRight {
    margin-left: 10px;
  }
}
</style>