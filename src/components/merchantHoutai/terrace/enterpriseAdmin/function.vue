<template>
	<div id="qiyeguanli">
		<div class="qiyeGn">
			<label>设置企业可使用的功能：</label>
		</div>
		<div class="indexShow clear">
			<div class="show_index fl"><label>首页展示:</label></div>
			<el-checkbox-group v-model="checkboxIndex" size="small">
				<el-checkbox label="视频" border></el-checkbox>
				<el-checkbox label="优惠卷" border></el-checkbox>
				<el-checkbox label="折扣专区" border></el-checkbox>
				<el-checkbox label="清仓处理" border></el-checkbox>
				<el-checkbox label="抽奖" border></el-checkbox>
				<el-checkbox label="秒杀" border></el-checkbox>
				<el-checkbox label="同城团购" border></el-checkbox>
				<el-checkbox label="限时抢购" border></el-checkbox>
			</el-checkbox-group>
		</div>
		<div class="workbench clear">
			<div class="workbenchGL"><label>工作台业务管理:</label></div>
			<el-checkbox-group v-model="workbenchGL" size="small">
				<el-checkbox label="商品管理" border></el-checkbox>
				<el-checkbox label="视频管理" border></el-checkbox>
				<el-checkbox label="动态管理" border></el-checkbox>
				<el-checkbox label="招聘管理" border></el-checkbox>
				<el-checkbox label="商机管理" border></el-checkbox>
				<el-checkbox label="租房管理" border></el-checkbox>
				<el-checkbox label="优惠券管理" border></el-checkbox>
			</el-checkbox-group>
		</div>
		<div class="activity clear">
			<div class="activityGL"><label>活动管理:</label></div>
			<el-checkbox-group v-model="activityGL" size="small">
				<el-checkbox label="优惠卷活动" border></el-checkbox>
				<el-checkbox label="折扣专区" border></el-checkbox>
				<el-checkbox label="清仓处理" border></el-checkbox>
				<el-checkbox label="抽奖" border></el-checkbox>
				<el-checkbox label="秒杀" border></el-checkbox>
				<el-checkbox label="同城团购" border></el-checkbox>
				<el-checkbox label="限时抢购" border></el-checkbox>
				<el-checkbox label="企业活动" border></el-checkbox>
			</el-checkbox-group>
		</div>
		<div class="massage clear">
			<div class="massageGL"><label>工作台信息管理:</label></div>
			<el-checkbox-group v-model="workbenchmassagehGL" size="small">
				<el-checkbox label="订单管理" border></el-checkbox>
				<el-checkbox label="官网管理" border></el-checkbox>
				<el-checkbox label="企业信息" border></el-checkbox>
				<el-checkbox label="团队管理" border></el-checkbox>
				<el-checkbox label="授权管理" border></el-checkbox>
				<el-checkbox label="数据中心" border></el-checkbox>
				<el-checkbox label="名片管理" border></el-checkbox>
				<el-checkbox label="产品代言" border></el-checkbox>
			</el-checkbox-group>
		</div>
		<div class="businessCard clear">
			<div class="businessCardGL fl"><label>名片:</label></div>
			<el-checkbox-group v-model="businessCard" size="small">
				<el-checkbox label="名片" border></el-checkbox>
			</el-checkbox-group>
		</div>
		<div class="businessCard clear">
			<div class="businessCardGL fl"><label>动态:</label></div>
			<el-checkbox-group v-model="businessCard" size="small">
				<el-checkbox label="动态" border></el-checkbox>
			</el-checkbox-group>
		</div>
		<div class="businessCard clear">
			<div class="businessCardGL fl"><label>官网:</label></div>
			<el-checkbox-group v-model="businessCard" size="small">
				<el-checkbox label="官网" border></el-checkbox>
			</el-checkbox-group>
		</div>
		<div class="Renting clear">
			<div class="RentingGL fl"><label>商机:</label></div>
			<el-checkbox-group v-model="workbenchGL" size="small">
				<el-checkbox label="商机" border></el-checkbox>
			</el-checkbox-group>
		</div>
		<div class="Renting clear">
			<div class="RentingGL fl"><label>租房:</label></div>
			<el-checkbox-group v-model="workbenchGL" size="small">
				<el-checkbox label="租房" border></el-checkbox>
			</el-checkbox-group>
		</div>
		<div class="Renting clear">
			<div class="RentingGL fl"><label>招聘:</label></div>
			<el-checkbox-group v-model="workbenchGL" size="small">
				<el-checkbox label="招聘" border></el-checkbox>
			</el-checkbox-group>
		</div>
		<div class="baocun"><el-button class="baocunbut">保存</el-button></div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				checkboxIndex: [],
				workbenchGL:[],
				activityGL:[],
				workbenchmassagehGL:[],
				businessCard:[]
			}
		},
	};
</script>

<style>
	.clear {
		clear: both;
	}
	
	.fl {
		float: left;
	}
	
	.fr {
		float: right;
	}
	.qiyeGn{
		margin-top: 40px;
	}
	.indexShow{
		margin-top: 10px;
	}

	.el-checkbox{
		margin-left: 20px;
	}
	.indexShow .el-checkbox-group{
		margin-left: 10px;
		margin-right: 0px;
		float: left;
		margin-top: -25px;
	}
	.el-checkbox-group .el-checkbox.is-checked{
		margin-top: 10px;
	}
	.workbench{
		margin-top: 90px;
	}
	.workbench .workbenchGL{
		margin-top: 10px;
		margin-left: 60px;
	}
	.workbench .el-checkbox-group{
		margin-top: 0px;
		margin-left: 150px;
	}
	.massage{
		margin-top: 30px;
	}
	.massage .massageGL{
		margin-top: 8px;
		margin-left: 60px;
	}
	.massage .el-checkbox-group{
		margin-top: 0px;
		margin-left: 150px;
	}
	.activity{
		margin-left: 150px;
	}
	.activity .el-checkbox-group{
		margin-top: -5px;
		margin-left: 0px;
	}
	.activity .activityGL{
		margin-top: 10px;
	}
	.businessCard {
		margin-left: 150px;
	}
	.businessCard .businessCardGL{
		margin-top: 21px;
	}
	.businessCard .el-checkbox-group{
		float: left;
		margin-top: 18px;
		margin-left: 10px;
	}
	.businessCard .el-checkbox-group .is-checked{
		margin-top: 0px;
	}
	.Renting{
		margin-top: 30px;
		margin-left: 120px;
	}
	.Renting .RentingGL{
		margin-top: 21px;
	}
	.Renting .el-checkbox-group{
		float: left;
		margin-top: 18px;
		margin-left: 10px;
	}
	.Renting .el-checkbox-group .is-checked{
		margin-top: 0px;
	}
	.baocun{
		margin-top: 120px;
		margin-left: 50%;
	}
	.baocunbut{
		width: 151px;
		height: 30px;
		border-radius: 8px;
		color: #ffffff;
		background-color: #2450D2;
		/* border: 1px solid #2450D2;
		cursor: pointer; */
	}
</style>
