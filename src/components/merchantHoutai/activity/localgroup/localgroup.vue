<template>
	<div class="localgroup" id="localgroup">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="同城团购列表" name="first">
				<localgroupList></localgroupList>
			</el-tab-pane>
			<el-tab-pane label="下架的同城团购" name="second">
				<lowerlocalgroup></lowerlocalgroup>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import localgroupList from './localgroupList.vue'
	import lowerlocalgroup from './lowerlocalgroup.vue'
	export default {
		name: 'localgroup',
		components:{
			localgroupList,
			lowerlocalgroup
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
	.localgroup{
		box-sizing: border-box;
		width: 100%;
		padding: 20px;
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
