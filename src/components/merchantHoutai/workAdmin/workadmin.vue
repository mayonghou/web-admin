<template>
	<div id="workadmin" class="workadmin">
		<!-- 头部企业查询 -->
		<div class="terracr_top">
			<div class="top_text"><label>企业查询</label></div>
			<div class="top_search clear">
				<div class="search">
					<el-input v-model="inputName" placeholder="输入企业、法人名称"></el-input>
				</div>
				<div class="top_time">
					<i style="font-size: 22px;color: #2494D2;padding-right: 38px;" class="el-icon-date"></i>
					<el-date-picker prefix-icon="md-date_range" v-model="time" type="daterange" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
					<el-button type="primary" class="button">查询</el-button>
				</div>
			</div>
		</div>
		<!-- 表格 -->
		<el-table :data="tableData" style="width: 1200px;margin: 0 auto;">
			<el-table-column prop="date" label="企业名称" width="180">
			</el-table-column>
			<el-table-column prop="name" label="法人姓名">
			</el-table-column>
			<el-table-column prop="phone" label="手机号码">
			</el-table-column>
			<el-table-column prop="phone" label="团队成员">
			</el-table-column>
			<el-table-column prop="address" label="所属行业">
			</el-table-column>
			<el-table-column prop="leixing" label="企业类型">
			</el-table-column>
			<el-table-column prop="tiem" label="入驻时间">
			</el-table-column>
			<el-table-column label="操作" width="250" align="center">
				<template slot-scope="scope">
					<el-button @click="adminMenber(scope.row)" type="text" class="tab_gl tab_button" size="small">管理</el-button>
					<el-button @click="del_enterprise(scope.row)" type="text" class="tab_del tab_button" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
		 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
		</el-pagination>
	</div>
</template>

<script>
	// import bus from '../common/bus';
	export default {
		name: 'workadmin',
		data() {
			return {
				inputName: "",
				time: "",
				qyID: '',
				limit: 10,
				page: 1,
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
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4,
				beginTime:'',
				endTime: ''
			}

		},
		mounted() {
			this.obtain();
			this.getTeams();
		},
		methods: {
			// 管理成员
			adminMenber(row) {
				this.$router.push({
					path: './member'
				}).catch(err => { console.log(err) });
			},
			// 页码
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			obtain(){
				let beginTime = this.time[0] || 0;
				let endTime = this.time[1] || 0;
				this.beginTime = beginTime;
				this.endTime = endTime;
				let qyID = localStorage.getItem('qyid');
				console.log(qyID)
				this.qyID = qyID;
			},
			// 团队查询
			getTeams() {
				var data = '?page=' + this.page + '&beginTime=' + this.beginTime+ '&endTime=' +
					 this.endTime + '&name=' + this.inputName + '&companyId='+ this.qyID + '&limit=' + this.limit;
				this.$axios.get('admin/company/teams' + data).then(res => {
					console.log(res)
					// this.fullscreenLoading = false;
					// if (res.status == 200) {
					// 	var data = res.data;
					// 	if (data.code == 200) {
					// 		this.listData = data.data;
					// 	} else if (data.code == 1005) {
					// 		this.$router.replace('/login');
					// 	} else {
					// 		this.$message({
					// 			showClose: true,
					// 			message: "未知错误",
					// 			type: 'error'
					// 		});
					// 	}
					// } else {
					// 	this.$message({
					// 		showClose: true,
					// 		message: '未知错误，请联系客服',
					// 		type: 'error'
					// 	});
					// }
				});
			}
			
			

		}
	};
</script>


<style scoped>
	.clear {
		clear: both;
	}

	.workadmin {
		padding: 10px;
	}

	.terracr_top {
		width: 1200px;
		height: 114px;
		margin: 0 auto;
		margin-bottom: 20px;
		background-color: #FAFBFA;
	}

	.top_text {
		padding: 10px 20px;
		font-size: 14px;
	}

	.top_search {
		padding: 10px 20px;
		font-size: 12px;
		margin-top: -8px;
	}

	.top_search .search {
		width: 200px;
		height: 30px;
		float: left;
		color: #A4A4A4;
	}

	.workadmin .top_time {
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
		float: right;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.add_Del .button {
		width: 107px;
		height: 30px;
		font-size: 14px;
		color: #fff;
		border-radius: 10px;
	}

	.add_Del .add_qiye {
		background: #2482D2;
	}

	.tab_gl {
		background: #109955;
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

	.workadmin .pagintion {
		/* padding-top: 30px;
		padding-left: 25%; */
	}
</style>
