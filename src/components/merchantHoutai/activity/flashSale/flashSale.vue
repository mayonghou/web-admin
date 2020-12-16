<template>
	<div class="warehouses" id="flashSale">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="限时抢购活动列表" name="first">
				<flashSaleList></flashSaleList>
			</el-tab-pane>
			<el-tab-pane label="下架的限时抢购活动" name="second">
				<lowerflashSale></lowerflashSale> 
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import flashSaleList from './flashSaleList.vue'
	import lowerflashSale from './lowerflashSale.vue'
	export default {
		name: 'flashSale',
		components:{
			flashSaleList,
			lowerflashSale
		},
		data() {
			return {
				activeName: 'first'
			}
		},
		mounted() {

		},
		methods: {
			handleClick(tab, event) {
				// console.log(tab, event);
			}
		}
	}
</script>

<style>
	.warehouses{
		width: 100%;
		box-sizing: border-box;
	}
	.el-tabs--card>.el-tabs__header{
		border: 0px;
	}
	.el-tabs__item.is-top{
		width: 150px;
		height: 50px;
		/* border: 0; */
		border: 1px solid #0000FF;
		text-align: center;
		line-height: 50px;
		color: #0000FF;
	}
	.el-tabs__item.is-top.is-active{
		background-color: #0000FF;
		color: #fff;
	}
	.el-tabs__nav-wrap::after{
		background-color: #fff;
	}
	.el-tabs__active-bar{
		background-color: #0000FF;
	}
	.el-tabs__nav-scroll{
		background-color: #fff;
	}
</style>
