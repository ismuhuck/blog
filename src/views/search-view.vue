<template>
  <div class="search">
    <nav class="view-nav">
      <header class="sort-banner">
        <div class="nav-banner">
          <ul class="nav-list">
			<router-link :to="{path:'search',query:{search:searchtext,type:'all'}}" tag="li" class="nav-item"><a>全部</a></router-link>
			<router-link :to="{path:'search',query:{search:searchtext,type:'articles'}}" tag="li" class="nav-item"><a>文章</a></router-link>
			<router-link :to="{path:'search',query:{search:searchtext,type:'user'}}" tag="li" class="nav-item"><a>用户</a></router-link>
			<!-- <router-link to="/search?type=all" tag="li" class="nav-item"><a>全部</a></router-link>
			<router-link to="/search?type=articles" tag="li" class="nav-item"><a>文章</a></router-link>
			<router-link to="/search?type=user" tag="li" class="nav-item"><a>用户</a></router-link> -->
          </ul>
        </div>
      </header>
    </nav>
    <div class="list">
      <div class="result-list">
	  	<router-view :name="nameviews" :list="searchlist"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import formatTime from "../../util/util"
export default {
  computed: {
    ...mapGetters(["searchtext"])
  },
  data() {
    return {
		// search_user:[],
		// search_articles:[],
		searchlist:[],
		nameviews:''
	};
  },
  beforeRouteUpdate(to, from, next) {
	let name = to.query.type
	this.nameviews = name
    next();
  },
  created(){
	  this.init()
  },
  methods: {
	formatTime:formatTime,
    ...mapMutations(["changesearch", "changetype"]),
    init() {
      let query = this.$route.query;
	  let name = query.type;
	  this.nameviews = name
	  
      this.axios.post("search", {
          searchtext: this.searchtext
        })
        .then(res => {
		  const { data: result } = res;
		  this.searchlist = result
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.search {
  margin-bottom: 50px;
  .view-nav {
    height: 3rem /* 48/16 */;
    line-height: 48px;
    .sort-banner {
      width: 1120px;
      margin: 0 auto;
      background-color: #fff;
      .nav-banner {
        .nav-list {
          overflow: hidden;
          .nav-item {
            list-style: none;
            float: left;
            margin-right: 10px;
            padding-right: 10px;
            cursor: pointer;
            a {
              color: rgb(100, 100, 100);
            }
          }
        }
      }
    }
  }
  .list {
    width: 1120px;
    margin: 0 auto;
    margin-top: 10px;
    .result-list {
      margin: 0 300px 0 0;
      background-color: #fff;
    }
  }
}
</style>