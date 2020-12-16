<template>
	<div class="addEnterprise" id="addEnterprise">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="产品代言设置" name="first">
				<behalfSetting></behalfSetting>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import behalfSetting from './behalfSetting.vue'
	export default {
		name: 'addEnterprise',
		components:{
			behalfSetting
		},
		data() {
			return {
				activeName: 'first'
			}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	}
</script>

<style>
	.addEnterprise{
		width: 1200px;
		margin: 0 auto;
	}
	.el-tabs__nav-scroll{
		margin-top: 10px;
		background-color: #F5F9F1;
		width: 100%;
	}
	.el-tabs__item.is-top{
		background-color: #FFFFFF;
		color: #000000;
	}
	.el-tabs__item.is-top.is-active{
		background-color: #2450D2;
		color: #ffffff;
	}
	
</style>
