<template>
  <div class="search-box">
    <input type="text" placeholder="搜索内容" v-model="searchtext" />
    <i @click="search" class="icon iconfont icon-sousuo"></i>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex"
export default {
	computed: {
    ...mapGetters(["type"]),
    // 因为v-model是双向绑定数据，所以使用它时应该设置set
    searchtext:{
      get(){
        return this.$store.state.searchtext
      },
      set(newval){
        this.changesearch(newval)
      }
    }
  },
  data() {
    return { };
  },
  methods: {
    ...mapMutations(['changesearch']),
    search() {
			if(this.searchtext.trim() === ""){
				this.searchtext=""
				return false
			}
			this.$router.push({path:'/search',query:{search:this.searchtext,type:this.type}})
    }
  },
  
};
</script>
<style lang="scss" scoped>
.search-box {
  line-height: 50px;
  float: left;
  position: relative;
  input {
    height: 30px;
    width: 250px;
    border: none;
    outline: none;
    border-radius: 5px;
    color: rgb(75, 75, 75);
    background: rgb(245, 245, 245);
    padding: 5px 10px;
    font-size: 14px;
  }
  i {
    position: absolute;
    right: 10px;
    color: rgb(198, 55, 50);
    cursor: pointer;
  }
}
</style>