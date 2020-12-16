<template>
	<div class="seckill" id="seckill">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="秒杀列表" name="first">
				<seckillList></seckillList>
			</el-tab-pane>
			<el-tab-pane label="下架的秒杀活动" name="second">
				<lowerseckill></lowerseckill>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import seckillList from './seckillList.vue'
	import lowerseckill from './lowerseckill.vue'
	export default {
		name: 'seckill',
		components:{
			seckillList,
			lowerseckill
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
