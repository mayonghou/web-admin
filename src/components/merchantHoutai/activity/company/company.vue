<template>
	<div class="warehouses" id="raffleLottery">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="企业活动列表" name="first">
				<companyList></companyList>
			</el-tab-pane>
			<el-tab-pane label="下架的企业" name="second">
				<lowercompany></lowercompany> 
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import companyList from './companyList.vue'
	import lowercompany from './lowercompany.vue'
	export default {
		name: 'raffleLottery',
		components:{
			companyList,
			lowercompany
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
		padding: 20px;
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
