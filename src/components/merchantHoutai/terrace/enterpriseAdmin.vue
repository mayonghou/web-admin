<template>
	<div class="qiyeguanli">
		<div class="qiye_btn">
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="配置管理" name="first">
					<vFunction></vFunction>
				</el-tab-pane>
				<el-tab-pane label="可见行业" name="second">
					<vInfinity></vInfinity>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
	import vFunction from './enterpriseAdmin/function.vue'
	import vInfinity from './enterpriseAdmin/industry.vue'
	export default {
		components:{
			vFunction,
			vInfinity
		},
		data() {
			return {
				activeName: 'first',
				checkboxGroup: [],
				value: '',
				functionData: {
					checkboxExhibition: [],
				},
				industry: {
					checkboxGroup: []
				}
			}
		},
		methods:{
			handleClick(){
				
			}
		}
	};
</script>

<style>
	
</style>
