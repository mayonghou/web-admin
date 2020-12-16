<!-- 代言我的产品列表 -->
<template>
	<div class="AdvocacyMyShpping" id="AdvocacyMyShpping">
		<div class="header_Top">
			<div class="top_text"><label>产品查询</label></div>
			<div class="top_search">
				<div class="search">
					<el-input v-model="shopping" placeholder="输入商品"></el-input>
				</div>
				<i style="font-size: 22px;color: #2494D2;margin-left: 30px; padding-right: 38px;padding-top: 5px; float: left;"
				 class="el-icon-date"></i>
				<div class="sear_time">
					<el-date-picker prefix-icon="md-date_range" v-model="time" type="daterange" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
					<el-button @click="chanpinCX" class="button">查询</el-button>
				</div>
			</div>
		</div>
		<div class="label-button">
			<div class="label">
				<label>代言我的产品列表</label>
			</div>
			<div class="tab-button">
			</div>
		</div>
		<el-table :data="tableData" style="width: 100%; margin: 0 auto;">
			<el-table-column type="selection" width="100">
			</el-table-column>
			<el-table-column prop="index" type="index" label="序号">
			</el-table-column>
			<el-table-column prop="date" label="商品名称">
			</el-table-column>
			<el-table-column prop="name" label="代言人数">
			</el-table-column>
			<el-table-column prop="phone" label="商品售价">
			</el-table-column>
			<el-table-column prop="address" label="商品封面">
				<template slot-scope="scope">
					<img width="80" :src="scope.row" />
				</template>
			</el-table-column>
			<el-table-column prop="tiem" label="创建时间">
			</el-table-column>
			<el-table-column label="操作" width="180" align="center">
				<template slot-scope="scope">
					<el-button @click="lookData(scope.row)" class="tab_oragel button">查看数据</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="counts">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'AdvocacyMyShpping',
		data() {
			return {
				shopping: '',
				valueDialog: '',
				time: '',
				valueNum: '1',
				fullscreen: '',
				counts: 0,
				page: 1,
				limit: 20,
				showClose: false,
				tableData: [],
			}
		},
		mounted() {
			this.AdvocacyList();
		},
		methods: {

			// 页码
			handleSizeChange(val) {
				this.limit = val;
			},
			handleCurrentChange(val) {
				this.page = val;
			},
			lookData(row) {
				this.$router.push({
					path: './lookData',
					query: {
						id: row.productId
					}
				});
			},
			chanpinCX() {
				this.AdvocacyList();
				this.page = 1;
			},
			// 查询代言我的产品列表
			AdvocacyList() {
				let beginTime = this.time[0] || 0;
				let endTime = this.time[1] || 0;
				let companyId = localStorage.getItem('loginData');
				let id = this.$route.query.id;
				let data = 'beginTime=' + beginTime + '&endTime=' + endTime + '&companyId=' + companyId + '&flag=' + false +
					'&limit=' + this.limit + '&page=' + this.page + '&name=' + this.shopping + '&partnerId=' + id;
				this.$axios.get('admin/company/my/advocacy/list?' + data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							this.tableData = data.data;
							console.log(this.tableData);
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
			},
		}
	};
</script>

<style>
	.AdvocacyMyShpping {
		width: 1200px;
		margin: 0 auto;
	}

	.header_Top {
		width: 100%;
		height: 114px;
		background-color: #FAFBFA;
		margin-top: 20px;
		padding: 10px 20px;
	}

	.top_search {
		line-height: 31px;
		margin-top: 10px;
	}

	.top_search .search {
		width: 200px;
		height: 31px;
		float: left;
	}

	.top_search .sear_time {
		float: left;
	}

	.sear_time .button {
		width: 151px;
		height: 30px;
		background: #2450D2;
		color: #ffffff;
		font-size: 10px;
		border-radius: 8px;
		margin-left: 39px;
	}

	.label-button {
		width: 100%;
		height: 51px;
		line-height: 50px;
		background-color: #FFFFFF;
	}

	.label-button .label {
		float: left;
		font-size: 14px;
	}

	.label-button .tab-button {
		float: right;
	}

	.tab-button .button {
		width: 104px;
		height: 30px;
		margin-left: 15px;
		background: #2482D2;
		color: #fff;
	}


	.el-badge__content.is-fixed {
		top: 10px;
	}

	.el-table .button {
		width: 66px;
		height: 22px;
		color: #fff;
		padding: 0px;
		font-size: 12px;
	}

	.el-table .tab_oragel {
		background: #FF8D00;
	}

	.el-table .tab_green {
		background: #109955;
	}

	.el-table .tab_red {
		background: #FF0000;
	}

	/* 	.AdvocacyMyShpping .el-pagination {
		padding-top: 20px;
		padding-left: 25%;
		background-color: #ffffff;
	} */
</style>
