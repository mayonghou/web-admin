<template>
	<div id="cooperationGl" class="cooperationGl">
		<!-- 头部企业查询 -->
		<div class="terracr_top">
			<div class="top_text"><label>企业查询</label></div>
			<div class="top_search clear">
				<div class="search">
					<el-input v-model="input" placeholder="输入企业、法人名称"></el-input>
				</div>
				<div class="top_time">
					<i style="font-size: 22px;color: #2494D2;padding-right: 38px;" class="el-icon-date"></i>
					<el-date-picker prefix-icon="md-date_range" value-format="yyyy-MM-dd" v-model="time" type="daterange" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
					<el-button type="primary" @click="queryBut" class="button">查询</el-button>
				</div>

			</div>
		</div>
		<!-- 删除和添加企业 -->
		<div class="add_Del">
		</div>
		<!-- 表格 -->
		<el-table :data="tableData" style="width: 1200px; margin: 0 auto;">
			<el-table-column type="selection" width="">
			</el-table-column>
			<el-table-column prop="date" label="企业名称" width="180">
			</el-table-column>
			<el-table-column prop="name" label="法人姓名" width="180">
			</el-table-column>
			<el-table-column prop="phone" label="手机号码">
			</el-table-column>
			<el-table-column prop="address" label="所属行业">
			</el-table-column>
			<el-table-column prop="leixing" label="企业类型">
			</el-table-column>
			<el-table-column prop="tiem" label="入驻时间">
			</el-table-column>
			<el-table-column label="操作" width="250" align="center">
				<template slot-scope="scope">
					<el-button @click="edit_admin(scope.row)" type="text" class="tab_bj tab_button" size="small">管理</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'cooperationGl',
		data() {
			return {
				input: '',
				time: '',
				qiyeID: '',
				page: 1,
				limit: 20,
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					phone: '12345678901',
					address: '上海市普陀区金沙江路 1519 弄',
					leixing: 'IT',
					tiem: '2020-9-15'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					phone: '12345678901',
					address: '上海市普陀区金沙江路 1519 弄',
					leixing: 'IT',
					tiem: '2020-9-15'
				}],
				beginTime: '',
				endTime: ''
			}

		},
		mounted() {
			this.obtain();
			this.getCooperList();
		},
		methods: {

			edit_admin(row) {
				this.$router.push({
					path: './cooperationList'
				}).catch(err => {
					console.log(err)
				});
			},
			// 页码
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			// 查询按钮
			queryBut(){
				this.getCooperList();
				this.page = 1;
			},
			obtain() {
				let beginTime = this.time[0] || 0;
				let endTime = this.time[1] || 0;
				this.beginTime = beginTime;
				this.endTime = endTime;
				let qyID = localStorage.getItem('loginData');
				this.qyID = qyID;
			},
			// 查询合作列表
			getCooperList(){
				var data = "?beginTime=" + this.beginTime + "&endTime=" + this.endTime + "&companyId=" + localStorage.getItem('loginData') + "&page=" +
				 this.page + "&limit=" + this.limit + "&name=" + this.input;
				 console.log(data);
				this.$axios.get('admin/company/teamwork/list' + data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							this.tableData1 = data.data;
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


		}
	};
</script>


<style scoped>
	.clear {
		clear: both;
	}

	.cooperationGl {
		padding: 10px;
	}

	.terracr_top {
		width: 1200px;
		height: 114px;
		margin: 0 auto;
		background-color: #FAFBFA;
	}

	.top_text {
		padding: 10px 20px;
		font-size: 14px;
	}

	.top_search {
		padding: 10px 20px;
		font-size: 12px;
		margin-top: -10px;
	}

	.top_search .search {
		width: 200px;
		height: 30px;
		float: left;
		color: #A4A4A4;
	}

	.cooperationGl .top_time {
		float: left;
		margin-left: 38px;
		margin-top: 0px;
	}

	.top_time .button {
		width: 151px;
		height: 30px;
		background-color: #2450D2;
		margin-left: 50px;
		border-radius: 8px;
	}

	.add_Del {
		width: 1200px;
		margin: 0 auto;
		margin-top: 10px;
		margin-bottom: 50px;
	}

	.add_Del .button {
		float: right;
		width: 107px;
		height: 30px;
		font-size: 14px;
		color: #fff;
		border-radius: 10px;
		margin-right: 5px;
	}

	.add_Del .add_qiye {
		background: #2482D2;
	}

	.tab_gl {
		background: #FF8D00;
	}

	.tab_del {
		background: #FF0000;
	}

	.tab_bj {
		background: #109955;
	}

	.tab_button {
		width: 66px;
		height: 22px;
		font-size: 14px;
		line-height: 5px;
		text-align: center;
		color: #FFFFFF;
		border-radius: 10px;
	}

	.cooperationGl .pagintion {
		/* padding-top: 30px;
		padding-left: 25%; */
	}
</style>
