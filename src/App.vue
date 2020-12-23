<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		mounted() {
			var url = 'http://192.168.0.200:7070/api/expand/upload/image';
			// let url = 'https://sm.chengdecanyin.com/api/expand/upload/image';
			localStorage.setItem('actionUrl', url);
			// 图片地址
			let imgurl = "https://wjfh.oss-cn-beijing.aliyuncs.com"
			localStorage.setItem('imgUrl', imgurl);
			
			let video = 'http://192.168.0.200:7070/api/expand/upload/video';
			// let video = 'https://sm.chengdecanyin.com/api/expand/upload/video';
			localStorage.setItem('videoUrl', video);
		},
	}
</script>

<style>
	@import "./assets/css/main.css";
	@import "./assets/css/color-dark.css";
	/*深色主题*/
	@import "./assets/css/theme-green/fonts/font/iconfont.css";
	
	/* @import "./assets/css/theme-green/color-green.css"; 浅绿色主题 */
	
</style>

