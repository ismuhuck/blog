<template>
  <div>
    <!-- {{ msg }} -->

    <div class="editBlog">
      <div class="reference">
        <h4>请编写您的博文</h4>
        <p>TinyMCE简介：TinyMCE是一款易用、且功能强大的所见即所得的富文本编辑器。并有多语言支持,支持word
            文档的复制粘贴并保留其格式，并以html标签的字符串形式保存在数据库中。</p>
      </div>
      <tinymce-editor ref="editor" v-model="content" :disabled="disabled" @onClick="onClick"></tinymce-editor>
      <div class="btnBox">
        <button @click="clear" class="btn">清空内容</button>
        <button class="btn" @click="createArticle">发布文章</button>
        <button @click="disabled = true" class="btn">禁用</button>
        <button @click="disabled = false" class="btn">启用</button>
      </div>
    </div>
  </div>
</template>

<script>
import TinymceEditor from "./tinymce-editor";
export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      content: "Welcome to Use Tinymce Editor",
      disabled: false
    };
  },
  methods: {
    // 鼠标单击的事件
    onClick() {
      //   console.log("Element clicked");
      //   console.log(e);
      //   console.log(editor);
    },
    // 清空内容
    clear() {
      // console.log( this.$refs.editor);
      this.$refs.editor.clear();
    },
    createArticle(){
      var token = localStorage.getItem('Authorization')
      if(!token){
        return this.$message.warning('您还没登录，请登录后发表');
      }
      this.axios({
        method:'post',
        url:'createArticle',
        data:{
          content:this.content
        },
        // headers:{
        //   Authorization:token
        // }
      }).then(res => {
        const {data:result} = res
        if(result.code===0){
          return this.$message.success('发表成功');
        }
        else{
          this.$message.error('发表失败')
        }
      })
    }
  }
};
</script>
<style lang="scss" scoped>
.editBlog {
  width: 860px;
  margin: 0 auto;
  .reference {
    h4 {
      border: 1px solid rgb(185, 185, 185);
      text-align: center;
      padding: 20px 0;
      font-size: 16px;
      font-weight: 600;
      border-top: 4px solid rgb(198, 55, 50);
      border-radius: 8px;
    }
    p {
      padding: 10px 80px;
    }
  }
  .btnBox {
      margin-top: 20px;
      margin-left: 250px;
    .btn {
      border: 1px solid rgb(198, 55, 50);
      margin-right: 20px;
    }
  }
}
</style>