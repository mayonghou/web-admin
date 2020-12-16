<template>
	<!-- 财务管理列表 -->
	<div class="financeNum" id="moneyNumber">
		<div class="caiwu-top">
			<div class="jiluchaxun">
				<label style="display: block;">记录查询</label>
				<div class="search-tinajian">
					<i style="font-size: 22px;color: #2494D2;margin-left: 38px;margin-top: 5px; margin-right: 38px;" class="el-icon-date"></i>
					<el-date-picker prefix-icon="md-date_range" v-model="time" type="daterange" start-placeholder="开始日期"
					 end-placeholder="结束日期" value-format="yyyy-MM-dd">
					</el-date-picker>
					<el-button class="chaxunbtn">查询</el-button>
				</div>
			</div>
		</div>
		<div style="height: 30px;"></div>
		<el-table :data="tableData" style="width: 1200px;margin: 0 auto;">
			<el-table-column type="index" prop="" label="序号" align="center" width="80">
			</el-table-column>
			<el-table-column prop="" label="提现金额" align="center">
			</el-table-column>
			<el-table-column prop="" label="体现状态" align="center">
			</el-table-column>
			<el-table-column prop="" label="申请时间" align="center">
			</el-table-column>
			<el-table-column prop="" label="处理时间" align="center">
			</el-table-column>
		</el-table>
		<!-- 页码 -->
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[10, 20, 30, 40]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="counts">
		</el-pagination>
		
		
	</div>
</template>

<script>
	export default{
		name: 'moneyNumber',
		data() {
			return {
				time: '',
				tableData:[],
				page: 1,
				limit: 20,
				counts: 0,
			}
		},
		mounted() {
			
		},
		methods:{
			// 页面
			handleCurrentChange(val){
				this.page = val;
			},
			handleSizeChange(val){
				this.limit = val;
			},
		}
	}
</script>

<style>
	.financeNum{
		width: 1200px;
		margin: 0 auto;
	}
	.financeNum .caiwu-top{
		width: 100%;
		height: 110px;
		background-color: #FAFFE0;
		margin-top: 20px;
		padding-top: 20px;
	}
	.account{
		width: 100%;
		height: 120px;
		background-color: #F1FAFD;
		text-align: center;
	}
	.el-input{
		width: 200px;
	}
	.tixianRecord{
		float: right;
		margin-right: 10px;
	}
	.account-num{
		text-align: center;
		width: 200px;
		margin: 0 auto;
	}
	.shoppyee{
		font-size: 18px;
		color: #101010;
		padding-top: 10px;
	}
	.number{
		font-size: 14px;
		color: #FF8D00;
		line-height: 58px;
	}
	.account .tixian{
		width: 95px;
		heihgt: 80px;
		color: #fff;
		padding: 0;
		background-color: #2450D2;
		border-radius: 8px;
	}
	.iconEqan{
		position: relative;
	}
	.iconEqan .el-tooltip{
		position: absolute;
		right: 40px;
		top: -64px;
	}
	.baocunfinance .finbtn{
		width: 151px;
		height: 30px;
		background: #2450D2;
		color: #FFFFFF;
		margin-left: 40%;
		border-radius: 8px;
		margin-top: 30px;
	}
	.account-xinxi{
		
	}
	.account-xinxi .tixian-xinxi{
		margin-left: 124px;
	}
	.account-xinxi .jibenxinxi{
		margin-left: 200px;
		
	}
	.bank{
		margin-top: 20px;
	}
	.bank .bank-name{
		font-size: 14px;
		font-weight: bold;
	}
	.bank .bank-text{
		margin-left: 100px;
	}
	.jiluchaxun{
		padding-left: 20px;
		margin-top: 10px;
	}
	.search-tinajian{
		margin-top: 10px;
	}
	.search-tinajian .chaxunbtn{
		width: 150px;
		height: 30px;
		background: #2450D2;
		color: #FFFFFF;
		margin-left: 40px;
		border-radius: 8px;
	}
</style>
