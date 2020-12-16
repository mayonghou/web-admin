<template>
	<!-- 数据中心 -->
	<div class="datacenter" id="datacenter">
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="行业数据" name="first">
				<industryData></industryData>
			</el-tab-pane>
		    <el-tab-pane label="我的数据" name="second">
				<myData></myData>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import industrydata from './industrydata/industrydata.vue'
	import myData from './myData/shoppingMall.vue'
	export default{
		name: 'datecenter',
		components:{
			industryData: industrydata,
			myData: myData
		},
		data(){
			return {
				activeName: 'first',
			}
		},
		mounted() {
			
		},
		methods:{
			handleClick(tab, event) {
				console.log(tab, event);
			}
		}
	}
</script>

<style>
	.datacenter .el-tabs__header{
		background-color: #F5F9F1;
		height: 52px;
		line-height: 52px;
		font-size: 14px;
		margin: 0;
	}
	
	.datacenter .el-tabs__item{
		width: 100%;
		height: 52px;
		line-height: 52px;
		text-align: center;
		background-color: #fff;
		border: 1px solid #0000FF;
		color: #0000FF;
	}
	.datacenter .el-tabs__active-bar.is-top::after{
		width: 0;
		height: 0;
	}
	.datacenter .el-tabs__item.is-active{
		background-color: #2F24D2;
		color: #fff;
		border: 1px solid #0000FF;
	}
	.datacenter .el-tabs__nav-wrap::after{
		background-color: #fff;
	}
	.datacenter .el-tabs__active-bar{
		background-color: #0000FF;
	}
</style>
