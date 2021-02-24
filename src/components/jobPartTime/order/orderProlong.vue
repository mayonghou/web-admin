<template>
	<!-- 兼职端申请延长时间 -->
	<div class="orderProlong" id="orderProlong">
		<div class="orderProlong-top">
			<div class="top-body">申请延长时间</div>
			<el-form :model="orderProlongTime" :rules="rules" ref="orderProlongTime" style="margin-top: 20px;">
				<el-form-item label="选择申请时长:" porp="time" :label-width="labelwidth">
					<el-select v-model="orderProlongTime.time" placeholder="请选择延长时间">
						<el-option label="1" value="1"></el-option>
					</el-select> 天
				</el-form-item>
				<el-form-item label-width="20%" class="forItem">
					<el-button class="btnAnNiu" @click="quXiaobtn">取消</el-button>
					<el-button class="btnAnNiu">提交申请</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default{
		name:'orderProlong',
		data(){
			return {
				labelwidth: '20%',
				orderProlongTime:{
					time:''
				},
				rules:{
					time:[
						{ required: true, message: '请选择申请时间', trigger: 'blur' }
					]
				}
			}
		},
		mounted() {
			this.heightBody();
		},
		methods:{
			heightBody(){
				let bodyHeight = document.body.clientHeight;
				let orderProlong = document.getElementById('orderProlong');
				orderProlong.style.height = bodyHeight - 70;
			},
			quXiaobtn(){
				this.$router.push({
					path:'./myOrder'
				});
			}
		}
	}
</script>

<style>
	.orderProlong{
		width: 100%;
		box-sizing: border-box;
		height: 100%;
		background-color: #F5F7FC;
	}
	.orderProlong-top{
		height: 100%;
		width: 80%;
		margin:0 auto;
		padding-top: 3%;
	}
	.top-body{
		height: 45px;
		width: 100%;
		background-color: #FAFBFA;
		display: flex;
		align-items: center;
		font-size: 16px;
		font-weight: bold;
		padding-left: 20px;
	}
	.forItem .btnAnNiu{
		width: 140px;
		height: 40px;
		background-color: #2F24D2;
		color: #fff;
	}
</style>
