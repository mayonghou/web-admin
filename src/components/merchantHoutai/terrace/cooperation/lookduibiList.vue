<template>
	<div class="lookduibiList" id="lookduibiList">
		<!-- <div class="hezuoshuju">与万疆锋火科技有限公司合作数据</div> -->
		<div class="hezuoshuju">与{{this.companyName}}合作数据</div>
		<div class="data-body">
			<div class="hinge-pointer">
				<div class="hinge-top">关键指针</div>
				<div class="table">
					<div class="table-list">
						<div>浏览量</div>
						<div class="fontSize">{{this.viewCount}}</div>
					</div>
					<div class="table-list">
						<div>购买用户</div>
						<div class="fontSize">{{this.userCount}}</div>
					</div>
					<div class="table-list">
						<div>总销售额</div>
						<div class="fontSize">{{this.totalSales}}</div>
					</div>
					<div class="table-list">
						<div>订单量</div>
						<div class="fontSize">{{this.orderCount}}</div>
					</div>
				</div>
			</div>
			
			<div class="hengxiangcount">
				<div class="shppingCount">
					<h1 style="color: #264A77;">代言企业销售额 TOP10商品</h1>
					<div id="myChart" :style="{width: '100%', height: '500px',}"></div>
				</div>
				<div class="companyCount">
					<h1 style="color: #264A77;">双方企业代言数据对比</h1>
					<div class="companyduibi">
						<div id="mycompanyduibi" :style="{width: '55%', height: '500px',}"></div>
						<div id="duifangcompanyduibi" :style="{width: '49%', height: '500px',}"></div>
					</div>
				</div>
			</div>
			<div class="look">
				<el-button @click="lookOrderlist" class="lookOrder">查看订单</el-button>
			</div>
		</div>
		<el-dialog
			title="关联优惠券"
			:visible.sync="dialogVisible"
			width="80%"
		>
			<div class="dialog-top">
				<div class="search">
					<el-input class="searchInput" v-model="orderSn" placeholder="请输入订单编号">
						<i slot="prefix" class="el-input__icon el-icon-search"></i>
					</el-input>
					<el-button @click="seachBen" class="btn" type="text">搜索</el-button>
				</div>
			</div>
			<el-table :data="tableData" border style="width: 100%;background: #F5F9F1;">
				<el-table-column type="index" label="序号" align="center">
				</el-table-column>
				<el-table-column prop="orderSn" label="订单编号" align="center">
				</el-table-column>
				<el-table-column prop="userName" label="客户名" align="center">
				</el-table-column>
				<el-table-column prop="payAmount" label="订单金额" align="center">
					<template slot-scope="scope">
						<label>￥{{scope.row.payAmount / 100 }}</label>
					</template>
				</el-table-column>
				<el-table-column prop="sourceUserName" label="来源客服" align="center">
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center">
				</el-table-column>
				<el-table-column label="操作" width="100" align="center">
					<template slot-scope="scope">
						<el-button @click="lookDateil(scope.row)" class="tab_oragel">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				class="pagintion"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="page"
				:page-size="limit"
				layout="total, sizes, prev, pager, next, jumper"
				:total="counts"
				:page-sizes="[10, 20, 30, 40]"
			>
			</el-pagination> 
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'lookduibiList',
		components: {},
		data() {
			return {
				dialogVisible: false,
				page: 1,
				limit: 10,
				counts: this.counts,
				tableData: [],
				orderSn: '',
				orderCount: '',
				totalSales: '',
				userCount: '',
				viewCount: '',
				companyName: '',
				tp10Label: [],
				tp10Value: []
			}
			
		},
		mounted() {
			this.queryCompanyData();
			this.drawLine();
			this.companyDuuibi();
			this.duifabngcompanyDuuibi();
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({
					title: {
						text: '',
					},
					tooltip: {},
					xAxis: {
						type: 'value',
						show: true,
						axisLine:{
							show: true,
						},
						splitLine:{
							show: false
						},
						axisTick: {
						    show:false //轴坐标点消失
						},
					},
					yAxis: {
						// type: 'category',
						axisLine:{
							show: false, //轴 线
						},
						splitLine:{
							show: false, // 轴
						},
						axisTick: {
						    show:false //坐标点消失
						},
						// data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子","衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
						data: this.tp10Label
					},
					series: [{
						name: '销量',
						color: '#0095D8',
						type: 'bar',
						barWidth : 10,
						 itemStyle: {
							normal: {
							    barBorderRadius: 7
							}
						},
						// data: [5, 20, 36, 10, 10, 20,30,40,50,60,90,70,]
						data: this.tp10Value
					}],
				});
			},
			companyDuuibi(){
				// 基于准备好的dom，初始化echarts实例
				let companyDatas = this.$echarts.init(document.getElementById('mycompanyduibi'))
				// 绘制图表
				companyDatas.setOption({
					title: {
						text: '我公司',
					},
					tooltip: {},
					xAxis: {
						show: false,
					},
					yAxis: [
					{
						position:'right',
						show: true, // 轴线 的显示隐藏
						axisLine:{
							show: false, //轴 线
						},
						splitLine:{
							show: false, // 图内 轴线 消失
						},
						axisTick: {
						    show:false //坐标点消失
						},
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子","衬衫"]
					}],
					grid: {
						bottom:0,
						right: 0,
					    containLabel: true
					},
					series: [{
						name: '',
						color: '#0095D8',
						type: 'bar',
						barWidth : 10,
						itemStyle: {
							normal: {
							    barBorderRadius: 7,
							}
						},
						data: [-5, -20, -36, -10, -10, -20,-30]
					}],
					
				});
			},
			duifabngcompanyDuuibi(){
				// 基于准备好的dom，初始化echarts实例
				let duifangcompanyDatas = this.$echarts.init(document.getElementById('duifangcompanyduibi'))
				// 绘制图表
				duifangcompanyDatas.setOption({
					title: {
						text: '对方公司',
						right: 0,
					},
					tooltip: {},
					xAxis: {
						show: false,
					},
					grid: {  
					    left: '-7%',  
						bottom:0,
					    containLabel: true
					},
					yAxis: [
					{
						show: false, // 轴线 的显示隐藏
						axisLine:{
							show: false, //轴 线
						},
						splitLine:{
							show: false, // 图内 轴线 消失
						},
						axisTick: {
						    show:false //坐标点消失
						},
						data: ["衬衫", "", "雪纺", "裤子", "高跟", "袜子","衬衫"]
					}],
					series: [{
						name: '',
						color: '#4D6FB7',
						type: 'bar',
						barWidth : 10,
						itemStyle: {
							normal: {
							    barBorderRadius: 7,
							}
						},
						data: [5, 20, 36, 10, 10, 20,30]
					}],
					
				});
			},
			
			lookOrderlist(){
				this.dialogVisible = true;
				this.getOrder();
			},
			getOrder(){
				var data = {
				  "limit": this.limit,
				  "page": this.page,
				  "partnerCompanyId": parseInt(this.$route.query.id),
				}
				this.$axios.post('admin/company/adminQueryProductOrder', data).then((res) => {
					if(res.status == 200){
						var data = res.data;
						if(data.code == 200){
							this.tableData = data.data.dataList;
							this.counts = data.data.totalCount;
						} else {
							this.$message({
								showClose: true,
								message: data.msg,
								type: 'error'
							});
						}
					} else {
						this.$message({
							showClose: true,
							message: data.msg,
							type: 'error'
						});
					}
				});
			},
			lookDateil(row){
				this.$router.push({
					path: './orderDetail',
					query: {
						id: row.orderId,
						data: row
					}
				});
				this.dialogVisible = false;
			},
			handleSizeChange(val){
				this.limit = val;
				this.getOrder();
			},
			handleCurrentChange(val){
				this.page = val;
				this.getOrder();
			},
			seachBen(){
				this.page = 1;
				this.getOrder();
			},
			queryCompanyData(){
				var id = this.$route.query.id
				this.$axios.get('admin/company/queryCompanyData?partnerCompanyId='+id).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var ddd = data.data.currentCompany;
							this.companyName = localStorage.getItem('companyName');
							this.orderCount = ddd.orderCount;
							this.totalSales = ddd.totalSales;
							this.userCount = ddd.userCount;
							this.viewCount = ddd.viewCount;
							console.log(ddd);
						} else {
							this.$message({
								showClose: true,
								message: data.msg,
								type: 'error'
							});
						}
					} else {
						this.$message({
							showClose: true,
							message: data.msg,
							type: 'error'
						});
					}
				});
			}
		},

	};
</script>

<style>
	.lookduibiList{
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}
	.hezuoshuju{
		font-size: 14px;
		font-weight: bold;
	}
	.data-body{
		width: 100%;
		padding: 20px 50px;
		height: auto;
		background-color: #FAFBFA;
	}
	.hinge-pointer .hinge-top{
		width: 100%;
		height: 40px;
		line-height: 40px;
		padding-left: 20px;
		font-size: 16px;
		font-weight: normal;
		background-color: #2F24D2;
		color: #fff;
	}
	.table{
		display: flex;
		justify-content: space-between;
	}
	.table .table-list{
		width: 25%;
		height: 125px;
		border: 1px solid #c1c1c1;
		padding: 25px;
	}
	.table .table-list:nth-child(1){
		border-right: 0;
	}
	.table .table-list:nth-child(2){
		border-right: 0;
	}
	.table .table-list:nth-child(3){
		border-right: 0;
	}
	.table-list .fontSize{
		font-size: 30px;
		font-weight: normal;
	}
	.datacomparison{
		display: flex;
		justify-content: space-between;
		margin-top: 80px;
	}
	.datacomparison .data{
		width: 50%;
	}
	.datacomparison .data .datatitle{
		color: #264A77;
		font-size: 18px;
		font-weight: bold;
	}
	.shopping {
		padding: 10px;
	}
	.shopping .shoppingText{
		line-height: 30px;
	}
	.shoppNameDD{
		display: inline-block;
		width: 20%;
	}
	.shoppprogress{
		width: 60%;
		display: inline-block;
	}
	.shoppprogress .el-progress-bar__inner{
		background-color: #0095D8;
	}
	.shoppHengxiang{
		width: 100%;
		display: flex;
		justify-content: space-between;
		border-bottom:2px solid #BBBBBB;
	}
	.comparisonTwo .daiyanData{
		text-align: center;
	}
	.company-text{
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}
	.company-text span{
		color: #264A77;
		font-weight: normal;
		font-size: 14px;
	}
	
	.comparisonTwo .companycompar{
		display: flex;
		justify-content: space-between;
	}
	.companyLeft{
		width: 40%;
	}
	.display{
		display: inline-block;
	}
	.display.shuliang{
		width: 20%;
	}
	.display .pro .el-progress-bar__inner{
		position: absolute;
		left: 100px;
		top: 0;
	}
	.display.changdu{
		width: 80%;
	}
	.companyCenter{
		width: 10%;
		font-size: 12px;
		color: #101010;
	}
	.companyRight{
		width: 40%;
	}
	.right-text{
		display: inline-block;
	}
	.right-text.progressR{
		width: 80%;
	}
	.right-text.shuzhiR{
		width: 20%;
	}
	.el-progress-bar__outer{
		background-color: #FAFBFA;
	}
	.look{
		width: 100%;
		text-align: center;
	}
	.look .lookOrder{
		width: 90px;
		height: 30px;
		border-radius: 8px;
		color: #fff;
		background-color: #2F24D2;
		padding: 0;
	}
	
	.dialog-top{
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
	}
	.dialog-top .search{
		width: 380px;
		height: 45px;
		line-height: 45px;
		background-color: #FAFFE0;
		text-align: center;
	}
	.searchInput{
		width: 85%;
	}
	.search .btn{
		color: #010101;
		font-size: 14px;
		display: inline-block;
		margin-left: 10px;
	}
	.hengxiangcount{
		display: flex;
		justify-content: space-between;
		padding-top: 30px;
	}
	.hengxiangcount .shppingCount{
		width: 50%;
	}
	.hengxiangcount .companyCount{
		width: 50%;
		text-align: center;
	}
	.companyCount .companyduibi{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.lookduibiList .el-table__row .tab_oragel{
		width: 70px;
		height: 30px;
		font-size: 14px;
		padding: 0;
		background-color: #2450D2;
		color: #FFFFFF;
	}

</style>
