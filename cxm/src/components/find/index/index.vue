<template>
	<div class="find">
			<v-slider :bannerList='bannerList' style="margin: 0.2rem auto;" v-show="findStatus=='1'"></v-slider>
			<!--资讯-->
			<div class="information">
				<ul>
					<li>
						<v-informal :from='from' :zxList='zxList'></v-informal>
					</li>
					<div class="triple" v-show="trFlag">
						<v-loading></v-loading>&nbsp;<span style="font-size:0.34rem;">正在加载...</span>
					</div>
					<div class="cxLoad" v-show="cxLoadFlag" @click="cxLoadClick()">
					加载失败,点击重试
					</div>
				</ul>
			</div>
	</div>
</template>

<script src="./script.js">

</script>

<style scoped lang="scss" src='./style.scss'>
</style>