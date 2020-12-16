<template>
	<div class="discount" id="discount">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="折扣列表" name="first">
				<discountList></discountList>
			</el-tab-pane>
			<el-tab-pane label="下架的折扣活动" name="second">
				<lowerdiscount></lowerdiscount>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import discountList from './discountList.vue'
	import lowerdiscount from './lowerdiscount.vue'
	export default {
		name: 'discount',
		components:{
			discountList,
			lowerdiscount
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
			}
		}
	}
</script>

<style>
	.coupon{
		width: 1200px;
		margin: 0 auto;
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
</style>
