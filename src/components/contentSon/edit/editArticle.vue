<template>
  <div>
    <!-- {{ msg }} -->

    <div class="editBlog">
      <div class="blogTitle">
        <div class="label">
          <label for="blogTitle">您的文章标题：</label>
        </div>
        <input type="text" v-model="blogTitle" id="blogTitle" name="blogTitle">
      </div>
      <div class="blogContent">
        您的主题部分：
      </div>
      <tinymce-editor ref="editor" v-model="content" :disabled="disabled" @onClick="onClick"></tinymce-editor>
      <div class="btnBox">
        <button @click="clear" class="btn">清空内容</button>
        <button class="btn" @click="createArticle">确认修改</button>
        <button @click="disabled = true" class="btn">禁用</button>
        <button @click="disabled = false" class="btn">启用</button>
      </div>
    </div>
  </div>
</template>

<script>
import TinymceEditor from "../../tinymce-editor";
export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      content: "",
      disabled: false,
      blogTitle:''
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
      let status = localStorage.getItem('statusCode')
      if(status != 0){
        return this.$message.error('因为近期发表了不当言论，你已被禁言')
      }
      if(this.content.trim()==='' || this.blogTitle.trim()===''){
        return this.$message.warning('文章或标题不能为空')
      }
      this.axios({
        method:'post',
        url:'editArticle',
        data:{
          id:this.$route.params.articleId,
          blogTitle:this.blogTitle,
          content:this.content
        },
        // headers:{
        //   Authorization:token
        // }
      }).then(res => {
        const {data:result} = res
        console.log(result)
        if(result.code===0){
         this.$router.push({ path: '/personal'})
         return this.$message.success('修改成功');
        }
        else{
          this.$message.error('修改失败')
        }
      })
    },
    getArticle(){
        this.axios({
        method:'get',
        url:'thiseditArticle',
        params:{
            id:this.$route.params.articleId
        }
      }).then(res => {
        const {data:result} = res
        this.blogTitle = result.title
        this.content = result.content 
      })
      .catch(err => {
          console.log(err)
      })
    }
  },
  created(){
      this.getArticle()
  }
};
</script>
<style lang="scss" scoped>
.editBlog {
  width: 860px;
  margin: 0 auto;
  .blogTitle{
    label{
      font-weight: 600;
    }
    #blogTitle{
      height: 35px;
      width: 100%;
      outline: none;
      border: 1px solid rgb(185, 185, 185);
      border-radius: 4px;
      padding: 0 20px;
    }
    #blogTitle:focus{
      border: 1px rgb(198, 55, 50) solid;
      // outline: 1px orange solid;
    }
  }
  .blogContent{
    font-weight: 600;
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