<template>
  <div id="app">
    <Header></Header>
    <div class="top"></div>
    <router-view />
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "./components/Header";
import Footer from "./components/footer"
export default {
  components: {
    Header,
    Footer
  }
};
</script>
<style lang="scss">
@import url('./assets/css/iconfont.css');
* {
  margin: 0;
  padding: 0;
}
body{
  background-color: rgb(245,245,245);
  .top{
    width: 1120px;
    height: 20px;
  }
}
</style>
