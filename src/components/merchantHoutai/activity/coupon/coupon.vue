<template>
	<div class="f" id="coupon">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="优惠券活动列表" name="first">
				<couponList></couponList>
			</el-tab-pane>
			<el-tab-pane label="下架的优惠券活动" name="second">
				<lowerCoupon></lowerCoupon>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import couponList from './conponList.vue'
	import lowerCoupon from './lowercoupon.vue'
	export default {
		name: 'coupon',
		components:{
			couponList,
			lowerCoupon
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
		width: 100%;
		box-sizing: border-box;
	}
	.el-tabs--card>.el-tabs__header{
		border: 0px;
	}
	.el-tabs__item.is-top{
		width: 150px;
		height: 50px;
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
