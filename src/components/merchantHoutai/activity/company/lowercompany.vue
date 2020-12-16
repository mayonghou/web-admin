<template>
	<div id="activityList" class="activityList">
		<div class="activit-add">
			<el-button @click="deleteAll" class="deleteAll">全部删除</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%;" @selection-change="changeSelectons">
			<el-table-column type="selection" align="center">
			</el-table-column>
			<el-table-column type="index" prop="order" label="序号" align="center">
			</el-table-column>
			<el-table-column prop="title" label="活动标题" align="center">
			</el-table-column>
			<el-table-column prop="createByUser" label="发布人" align="center">
			</el-table-column>
			<el-table-column prop="time" label="发布时间" align="center">
			</el-table-column>
			<el-table-column label="操作" width="250" align="center">
				<template slot-scope="scope">
					<el-button @click="cxfabu(scope.row)" class="delconpany">重新发布</el-button>
					<el-button @click="delActivit(scope.row)" class="updatecoupon">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="counts">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				activitSeach: '',
				time: '',
				startTime: '',
				endTime: '',
				tableData: [],
				page: 1,
				limit: 10,
				counts: this.counts,
				changeID: []
			}
		},

		mounted() {
			this.getCompanyList();
		},
		methods: {
			changeSelectons(val) {
				this.changeID = val;
			},
			deleteAll() {
				var name = [];
				var id = [];
				this.changeID.forEach(function(val, index) {
					name[index] = val.title;
					id[index] = val.id;
				});
				if (this.changeID == '') {
					return this.$message({
						showClose: true,
						message: '请选择要删除的动态',
						type: 'error'
					});
				} else {
					this.$confirm('是否确定将企业动态【' + name + '】-删除?', '温馨提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						const loading = this.$loading({
							lock: true,
							text: '批量删除中...',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});
						this.$axios.post('admin/company/activity/all/batch_remove?activityType=8', id).then((res) => {
							loading.close();
							if (res.status == 200) {
								var data = res.data;
								if (data.code == 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
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
				}
			},
			// 重新发布
			cxfabu(row) {
				this.$router.push({
					path: './addcompany',
					query: {
						data: row
					}
				});
			},
			// 删除
			delActivit(row) {
				this.$confirm('是否确定将企业活动标题为:【' + row.title + '】删除?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						activityId: row.id,
						activityType: 8,
						newStatus: 3
					};
					const loading = this.$loading({
						lock: true,
						text: '删除中...',
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
			// 页码
			handleSizeChange(val) {
				this.limit = val;
				this.getCompanyList();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getCompanyList();
			},
			getCompanyList() {
				let data = {
					companyId: parseInt(localStorage.getItem('loginData')),
					limit: this.limit,
					page: this.page,
					status: 2,
				};
				this.$axios.post('admin/company/activity/company/list', data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var tabList = [];
							var datetime1 = '';
							var datetime2 = '';
							data.list.forEach(function(val, index) {
								tabList[index] = val;
								datetime1 = val.createTime
								var date = new Date(datetime1);
								var time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
									1) + '-' + date.getDate() + ' '; //+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
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
	.activityList {
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
	}

	.activityList .activit-add {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: right;
	}

	.el-table .delconpany {
		width: 104px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		background-color: #109955;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}

	.activit-add .deleteAll {
		width: 104px;
		height: 30px;
		background-color: #FF0000;
		color: #fff;
		padding: 0;
		font-size: 14px;
		border-radius: 8px;
	}

	.el-table .updatecoupon {
		width: 63px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		background-color: #FF0000;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}
</style>
