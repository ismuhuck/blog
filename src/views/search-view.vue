<template>
  <div class="search">
    <nav class="view-nav">
      <header class="sort-banner">
				<div class="nav-banner">
					<ul class="nav-list">
						<router-link to="/search?search=vue&type=all" tag="li" class="nav-item"><a href="/search?search=vue&type=all">综合</a> </router-link>
						<router-link to="/search/articles" tag="li" class="nav-item"><a href="/search">文章</a> </router-link>
						<router-link to="/search/user" tag="li" class="nav-item"><a href="/search'">用户</a> </router-link>
					</ul>
				</div>
			</header>
    </nav>
		<div class="list">
			<div class="result-list">
				列表
				<router-view></router-view>
			</div>
		</div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			href:'/search?search=vue&type=all'
		}
	},
	methods:{
		navigate(){}
	}
};
</script>
<style lang="scss" scoped>
	.search{
		margin-bottom: 50px;
		.view-nav{
			height: 3rem /* 48/16 */;
			line-height: 48px;
			.sort-banner{
				width: 1120px;
				margin: 0 auto;
				background-color: #fff;
				.nav-banner{
					.nav-list{
						overflow: hidden;
						.nav-item{
							list-style: none;
							float: left;
							margin-right: 10px;
							padding-right: 10px;
							a{
								color: rgb(100,100,100);
							}
						}
					}
				}
			}
		}
		.list{
			width: 1120px;
			margin:0 auto;
			margin-top: 10px;
			.result-list{
				margin: 0 300px 0 0;
				background-color: #fff;
			}
		}
	}
</style>