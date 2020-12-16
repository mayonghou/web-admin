<template>
	<div id="companylist" class="companylist">
		<div class="activit-add">
			<el-button @click="activitAdd" class="btn">发布企业活动</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%;">
			<el-table-column prop="order" type="index" label="序号" width="" align="center">
			</el-table-column>
			<el-table-column prop="title" label="活动标题" align="center" width="">
			</el-table-column>
			<el-table-column prop="createByUser" label="发布人" align="center" width="">
			</el-table-column>
			<el-table-column prop="time" label="活动时间" width="180" align="center">
			</el-table-column>
			<el-table-column label="操作" width="250" align="center">
				<template slot-scope="scope">
					<el-button @click="lookdetail(scope.row)" class="lookcpmpay">查看详情</el-button>
					<el-button @click="xiajiaActivitCom(scope.row)" class="xiajiaActivit">下架</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="counts">
		</el-pagination>
	</div>
</template>

<script>
	export default{
		name: 'companylist',
		data() {
			return {
				activitSeach:'',
				time: '',
				startTime: '',
				endTime: '',
				tableData: [],
				page: 1,
				limit: 10,
				counts: this.counts
			}
		},
		mounted() {
			this.getCompanyList();
		},
		methods:{
			// 时间戳
			templateTime(value){
				if(value != null){
					var date = new Date(value[0]);
					var start = date.getTime(date);
					this.startTime = start;
					var date1 = new Date(value[1]);
					var end = date1.getTime(date1);
					this.endTime = end;
				} else {
					this.endTime = '';
					this.startTime= '';
				}
			},
				// 查看详情
			lookdetail(row){
				this.$router.push({
					path: './detailcompany',
					query: {
						data: row
					}
				});
			},
			// 下架活动
			xiajiaActivitCom(row){
				this.$confirm('是否确定将企业活动标题为:【' + row.title + '】下架?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						activityId: row.id,
						activityType: 8,
						newStatus: 2
					};
					const loading = this.$loading({
						lock: true,
						text: '下架中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					this.$axios.put('admin/company/activity/all/update_status', data).then((res) => {
						loading.close();
						if (res.status == 200) {
							var data = res.data;
							if (data.code == 200) {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'success',
								});
								this.getCompanyList();
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
			// 发布按钮
			activitAdd(){
				this.$router.push({
					path: './addcompany'
				});
			},
			// 页码
			handleSizeChange(val) {
				this.limit = val;
				this.getCompanyList();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getCompanyList();
			},
			getCompanyList(){
				let data = {
					companyId: parseInt(localStorage.getItem('loginData')),
					limit: this.limit,
					page: this.page,
					status: 1,
				};
				this.$axios.post('admin/company/activity/company/list', data).then((res) => {
					if(res.status == 200){
						var data = res.data;
						if(data.code == 200){
							var tabList = [];
							var datetime1 = '';
							var datetime2 = '';
							data.list.forEach(function(val, index) {
								tabList[index] = val;
								datetime1 = val.createTime
								var date = new Date(datetime1);
								var time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
									1) + '-' + date.getDate();
								tabList[index].time = time1;
							});
							this.tableData = tabList;
							this.counts = data.total;
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
	}
</script>

<style>
	.companylist{
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
	}
	.activit-top{
		width: 100%;
		height: 114px;
		background-color: #FAFBFA;
		padding-left: 20px;
	}
	.activit-top .activit-label{
		padding-top: 10px;
	}
	.activit-search {
		margin-top: 13px;
	}
	.activit-search .activit-S{
		width: 200px;
	}
	.activit-search .query{
		width: 150px;
		height: 30px;
		background-color: #2450D2;
		color: #FFF;
		padding: 0;
		border-radius: 8px;
		margin-left: 20px;
	}
	.companylist .activit-add{
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: right;
	}
	.activit-add .btn{
		width: 104px;
		height: 30px;
		background-color: #2482D2;
		color: #fff;
		border-radius: 8px;
	}
	
	.el-table .lookcpmpay{
		width: 63px;
		height: 30px;
		font-size: 14px;
		line-height: 30px;
		padding: 0;
		background-color: #2450D2;
		color: #fff;
	}
	.el-table .xiajiaActivit{
		width: 63px;
		height: 30px;
		font-size: 14px;
		line-height: 30px;
		padding: 0;
		background-color: #FF8D00;
		color: #fff;
	}

</style>
