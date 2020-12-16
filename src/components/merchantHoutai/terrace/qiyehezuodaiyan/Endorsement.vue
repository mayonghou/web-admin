<template>
	<div id="Endorsementv" class="renting">
		<div class="renting-top">
			<div class="rent-top">
				<label>产品查询</label>
			</div>
			<div class="reat-search">
				<div class="search">
					<el-input v-model="input" placeholder="输入产品"></el-input>
				</div>
				<i style="font-size: 22px;color: #2494D2;margin-left: 38px;margin-top: 5px; float: left;" class="el-icon-date"></i>
				<div class="time">
					<el-date-picker prefix-icon="md-date_range" v-model="time" type="daterange" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<div class="button"><el-button type="primary" @click="cahnpingcahxun" class="query">查询</el-button></div>
			</div>
		</div>
		<div class="text-button">
			<div class="text"><label>我代言的产品列表</label></div>
			<div class="button">
				<el-button @click="addEndorsemen" type="primary">新增产品代言</el-button>
			</div>
		</div>
		<el-table :data="tableData" style="width: 1200px;margin: 0 auto;">
			<el-table-column type="selection" width="100">
			</el-table-column>
			<el-table-column prop="index" type="index" label="序号" >
			</el-table-column>
			<el-table-column prop="name" label="商品名称" width="">
			</el-table-column>
			<el-table-column prop="viewCount" label="代言人数" width="">
			</el-table-column>
			<el-table-column prop="price" label="商品售价">
			</el-table-column>
			<el-table-column prop="pic" label="商品封面">
				<template slot-scope="scope">
					<img width="80" height="80" :src="scope.row.pic" />
				</template>
			</el-table-column>
			<el-table-column prop="companyName" label="所属企业">
			</el-table-column>
			<el-table-column prop="time" label="创建时间">
			</el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button @click="btn_detail(scope.row)" type="text" class="tab_button">查看数据</el-button>
					<el-button @click="del_relieve(scope.row)" type="text" class="del_button">取消代言</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 页码 -->
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="counts">
		</el-pagination>
		
	</div>
</template>

<script>
	export default {
		name: 'renting',
		data() {
			return {
				input: '',
				time: '',
				tableData:[],
				page: 1,
				limit: 20,
				counts: 0,
			}
		},
		mounted() {
			this.myAdvocacyList();
		},
		methods: {
			//添加产品代言
			addEndorsemen(){
				let id =  localStorage.getItem('loginData');
				this.$router.push({
					path: './addEndorsement',
					query:{
						id: id
					}
				})
			},
			updateRenting(row){
				this.$router.push({
					// path: './updaterenting'
				})
			},
			// 查看数据
			btn_detail(row){
				this.$router.push({
					path: './lookData'
				})
			},
			del_relieve(row){
				this.$confirm("【是否确定取消【 " + row.name + " 】的成员信息】", '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = this.$loading({
						lock: true,
						text: '取消中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					let data = {
						amount: row.price,
						companyId: row.companyId,
						productId: row.productId,
						users: []
					};
					this.$axios.post('admin/company/edit/relevance/product',data).then((res) => {
						loading.close();
						if (res.status == 200) {
							var data = res.data;
							if (data.code == 200) {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'success'
								});
								this.myAdvocacyList();
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
				});
			},
			// 页码
			handleSizeChange(val) {
				this.limit = val;
			},
			handleCurrentChange(val) {
				this.page = val;
			},
			cahnpingcahxun(){
				this.myAdvocacyList();
				this.page = 1;
			},
			// 查询我代言的产品列表
			myAdvocacyList() {
				let beginTime = this.time[0] || 0;
				let endTime = this.time[1] || 0;
				let companyId = localStorage.getItem('loginData');
				let id = this.$route.query.id;
				let data = 'beginTime=' + beginTime + '&endTime=' + endTime + '&companyId=' + companyId + '&flag=' + true +
					'&limit=' + this.limit + '&page=' + this.page + '&name=' + this.input + '&partnerId=' + 2;
				this.$axios.get('admin/company/my/advocacy/list?' + data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var list = [];
							var id = '';
							data.data.forEach(function(val,index){
								list[index] = val.product
								list[index].pic = localStorage.getItem('imgUrl') + val.product.pic;
								list[index].time = val.time;
							});
							console.log(list);
							this.tableData = list;
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
				})
			}
		}
	};
</script>

<style scoped="scoped">
	.renting {
		padding: 20px;
	}
	.renting-top {
		width: 1200px;
		height: 114px;
		margin: 0 auto;
		background-color: #FAFBFA;
		/* padding-top: 10px; */
		padding-left: 20px;
		line-height: 40px;
	}

	.renting-top .rent-top {
		font-size: 14px;
	}
	.reat-search .search {
		width: 220px;
		height: 30px;
		float: left;
	}

	.reat-search .time {
		float: left;
		margin-left: 38px;
	}

	.reat-search .select {
		float: left;
		/* margin-left: 10px; */
	}
	.select .el-select{
		width: 131px;
		margin-left: 10px;
	}
	.reat-search .button{
		float: left;
		width: 150px;
		height: 30px;
		margin-left: 10px;
	}
	.button .el-button{
		width: 150px;
		background-color: #2450D2;
		border-radius: 8px;
	}
	
	.text-button{
		margin-top: 8px;
		margin-bottom: 48px;
	}
	.text-button .button{
		text-align: right;
		padding: 0;
		margin: 0;
	}
	.text-button .button .el-button{
		width: 104px;
		float: right;
	}
	.text{
		float: left;
		font-size: 14px;
		/* padding-top: 10px; */
	}

	.el-table .el_button{
		font-size: 10px;
	}
	
	.renting .pagintion{
		/* margin-left: 25%;
		padding-top: 30px; */
	}
	.tab_button{
		background-color: #FF8D00;
		width: 51px;
		height: 20px;
		color: #fff;
		line-height: 2px;
		font-size: 8px;
		border-radius: 8px;
	}
	.bj_button{
		background-color: #109955;
		width: 51px;
		height: 20px;
		color: #fff;
		line-height: 2px;
		font-size: 8px;
		border-radius: 8px;
	}
	.del_button{
		background-color: #FF0000;
		width: 51px;
		height: 20px;
		color: #fff;
		line-height: 2px;
		font-size: 8px;
		border-radius: 8px;
	}

</style>

