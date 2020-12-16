<template>
	<div class="qiyedaiyanList" id="qiyedaiyanList">
		<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
			<el-tab-pane label="我代言的产品列表" name="first">
				<Endorsement></Endorsement>
			</el-tab-pane>
			<el-tab-pane label="被代言的产品列表" name="two">
				<beidaiyandeList></beidaiyandeList>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import Endorsement from './Endorsement.vue'
	import beidaiyandeList from './beidaiyandeList.vue'
	export default {
		name: 'qiyedaiyanList',
		components:{
			Endorsement,
			beidaiyandeList
		},
		data(){
			return{
				activeName:'first'
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
	.qiyedaiyanList{
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
