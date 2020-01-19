<template>
  <div class="search-box">
    <input type="text" placeholder="搜索内容" v-model="searchText" />
    <i @click="search" class="icon iconfont icon-bianji"></i>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
	computed: {
    ...mapGetters(["type"])
  },
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    search() {
			if(this.searchText.trim() === ""){
				this.searchText=""
				return false
			}
      this.axios.post("search", {
          data: {
            searchText: this.searchText
          }
        })
        .then(res => {
          const { data: result } = res;
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
			this.$router.push({path:'/search',query:{search:this.searchText,type:this.type}})
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