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
			<div class="datacomparison">
				<div class="data">
					<div class="datatitle">代言企业销售额 TOP10商品</div>
					<div class="shopping">
						<div class="shoppingText">
							<span class="shoppNameDD">三只松鼠</span>
							<span class="shoppprogress">
								<el-progress class="pro" :percentage="50" :show-text="false"></el-progress>
							</span>
						</div>
						<div class="shoppingText">
							<span class="shoppNameDD"></span>
							<span class="shoppprogress">
								<div class="shoppHengxiang">
									<span>0万</span>
									<span>50万</span>
									<span>100万及以上</span>
								</div>
							</span>
						</div>
					</div>
				</div>
				<div class="data comparisonTwo">
					<div class="datatitle daiyanData">双方企业代言数据对比</div>
					<div class="company-text">
						<span>我公司</span>
						<span>对方公司</span>
					</div>
					<div class="companycompar">
						<div class="companyLeft">
							<div style="width: 100%;">
								<span class="display shuliang">1000</span>
								<span class="display changdu">
									<el-progress class="pro" color="#00A8B3" :percentage="50" :show-text="false"></el-progress>
								</span>
							</div>
						</div>
						<div class="companyCenter" style="">购买用户</div>
						<div class="companyRight">
							<div style="width: 100%;">
								<span class="right-text progressR">
									<el-progress class="pro" color="#4D6FB7" :percentage="50" :show-text="false"></el-progress>
								</span>
								<span class="right-text shuzhiR">1000</span>
							</div>
						</div>
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
			width="60%"
		>
			<div class="dialog-top">
				<div class="search">
					<el-input class="searchInput" v-model="orderSn" placeholder="请输入订单编号">
						<i slot="prefix" class="el-input__icon el-icon-search"></i>
					</el-input>
					<el-button class="btn" type="text">搜索</el-button>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%; margin: 0 auto; background: #F5F9F1;">
				<el-table-column type="index" label="序号" align="center">
				</el-table-column>
				<el-table-column prop="" label="订单编号" align="center">
				</el-table-column>
				<el-table-column prop="" label="客户名" align="center">
				</el-table-column>
				<el-table-column prop="" label="订单金额" align="center">
					<template slot-scope="scope">
						<label>{{scope.row.aa / 100 }}</label>
					</template>
				</el-table-column>
				<el-table-column prop="time" label="来源客户" align="center">
				</el-table-column>
				<el-table-column prop="time" label="创建时间" align="center">
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
				counts: this.counts || 1,
				tableData: [],
				orderSn: '',
				
				orderCount: '',
				totalSales: '',
				userCount: '',
				viewCount: '',
				companyName: ''
			}
		},
		mounted() {
			this.queryCompanyData();
		},
		methods: {
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
							this.tableData = data.dataList;
							console.log(data);
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
						id: row.id
					}
				});
			},
			handleSizeChange(val){
				this.limit = val;
				this.getOrder();
			},
			handleCurrentChange(val){
				this.page = val;
				this.getOrder();
			},
			queryCompanyData(){
				var id = this.$route.query.id
				this.$axios.get('admin/company/queryCompanyData?partnerCompanyId='+id).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var ddd = data.data.partnerCompany;
							this.companyName = localStorage.getItem('companyName');
							this.orderCount = ddd.orderCount;
							this.totalSales = ddd.totalSales;
							this.userCount = ddd.userCount;
							this.viewCount = ddd.viewCount;
							console.log(this.orderCount);
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
	}
	.searchInput{
		width: 90%;
	}
	.search .btn{
		color: #010101;
		font-size: 14px;
		display: inline-block;
	}




</style>
