<template>
	<!-- 上架的视频 -->
	<div class="lowervideo" id="lowervideo" v-loading="fullscreenLoading" :element-loading-text="loadingText"
	 element-loading-background="rgba(0, 0, 0, 0.7)">
		<div class="video-top">
			<div class="videochaxun"><label>视频查询</label></div>
			<div class="videoList">
				<el-input class="videoInput" placeholder="输入视频标题" v-model="videoInput"></el-input>
				<i style="font-size: 22px;color: #2494D2;margin-left: 20px;margin-top: 5px; margin-right: 20px;" class="el-icon-date"></i>
				<el-date-picker
					prefix-icon="md-date_range"
					v-model="time"
					type="daterange"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="yyyy-MM-dd"
					@change="timeCuo"
				>
				</el-date-picker>
				<el-button @click="videoquery" class="query">查询</el-button>
			</div>
		</div>
		<div class="text-button">
			<el-button @click="delbutton" class="delbutton">全部删除</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%;" @selection-change="selectionChange">
			<el-table-column type="selection" width="" align="center">
			</el-table-column>
			<el-table-column prop="title" label="视频标题" align="center" width="180">
			</el-table-column>
			<el-table-column prop="publisher" label="发布人" align="center" width="">
			</el-table-column>
			<el-table-column prop="publisher" label="手机号码" align="center" width="">
			</el-table-column>
			<el-table-column prop="name" label="关联的商品名称" align="center">
			</el-table-column>
			<el-table-column prop="status" label="视频状态" align="center">
			</el-table-column>
			<el-table-column prop="time" label="发布时间" align="center">
			</el-table-column>
			<el-table-column label="操作" width="280" align="center">
				<template slot-scope="scope">
					<el-button @click="lookvideo(scope.row)" class="lookvideo">查看详情</el-button>
					<el-button @click="shangVideo(scope.row)" class="updatevideo">上架</el-button>
					<el-button @click="delVideo(scope.row)" class="delvideo">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default {
		name: 'lowervideo',
		data() {
			return {
				fullscreenLoading: true,
				loadingText: '加载中...',
				videoInput: '',
				time: '',
				value: '',
				option: [{
					id: 0,
					name: '不限'
				}, {
					id: 1,
					name: '上线'
				}],
				tableData: [],
				timeStart: '',
				timeEnd: '',
				dataselect: []
			}
		},
		mounted() {
			this.getVideoList();
		},
		methods: {
			selectionChange(val){
				this.dataselect = val;
			},
			delbutton(){
				var name = [];
				var id = [];
				this.dataselect.forEach(function(val,index){
					name[index] = val.title;
					id[index] = val.id;
				});
				if(this.dataselect == ''){
					return this.$message({
						showClose: true,
						message: '请选择要删除的视频',
						type: 'error'
					});
				}else {
					this.$confirm('是否确定将标题为视频【' + name + '】-删除?', '温馨提示', {
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
						var idList = {
							idList: id
						}
						this.$axios.post('admin/company/video/batch_remove', id).then((res) => {
							loading.close();
							if(res.status == 200){
								var data = res.data;
								if(data.code == 200){
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
								this.getVideoList();
								}else {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'error'
									});
								}
							}else {
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
			timeCuo(value) {
				if(value != null){
					var date = new Date(value[0]);
					var startTime = date.getTime(date);
					var date1 = new Date(value[1]);
					var endTime = date1.getTime(date1);
					this.timeStart = startTime;
					this.timeEnd = endTime;
				} else if(value == null){
					this.timeStart = '';
					this.timeEnd = '';
				}
			},
			// 查看详情
			lookvideo(row) {
				this.$router.push({
					path: './detailVideo',
					query: {
						data: row
					}
				})
			},
			// 上架
			shangVideo(row) {
				this.$confirm('是否确定上架标题为【' + row.title + '】的视频?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						id: row.id,
						newStatus: 2
					};
					const loading = this.$loading({
						lock: true,
						text: '上架中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					this.$axios.post('admin/company/video/update_status', data).then((res) => {
						loading.close();
						if (res.status == 200) {
							var data = res.data;
							if (data.code == 200) {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'success'
								});
								this.getVideoList();
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
			// 删除
			delVideo(row) {
				this.$confirm('是否确定删除标题为【' + row.title + '】的视频?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						id: row.id,
						newStatus: 4
					};
					const loading = this.$loading({
						lock: true,
						text: '删除中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					this.$axios.post('admin/company/video/update_status', data).then((res) => {
						loading.close();
						if (res.status == 200) {
							var data = res.data;
							if (data.code == 200) {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'success'
								});
								this.getVideoList();
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
			// 查询按钮
			videoquery() {
				this.getVideoList();
				this.page = 1;
			},
			getVideoList() {
				let data = {
					companyId: localStorage.getItem('loginData'),
					limit: this.limit,
					page: this.page,
					status: 3,
					timeEnd: this.time[1],
					timeStart: this.time[0],
					titleLike: this.videoInput
				}
				this.$axios.post('admin/company/video/list', data).then((res) => {
					this.fullscreenLoading = false;
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							this.tableData = data.list;
							var lisst = [];
							data.list.forEach(function(val, index) {
								lisst[index] = val;
								lisst[index].name = val.productInfo.name;
								lisst[index].status = val.status == 3 ? '下架' : '';
								var date = new Date(val.publishAtTime);
								var time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
									1) + '-' + date.getDate();
								lisst[index].time = time1;
							})
							this.tableData = lisst;
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
	.lowervideo {
		width: 100%;
		box-sizing: border-box;
	}

	.video-top {
		width: 100%;
		height: 110px;
		margin-top: 20px;
		background-color: #FAFBFA;
		padding-left: 20px;
	}
	.text-button {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: right;
	}
	.text-button .delbutton{
		width: 100px;
		height: 30px;
		padding: 0;
		color: #fff;
		background-color: #FF0000;
		border-radius: 8px;
	}

	.videochaxun {
		padding-top: 10px;
	}

	.videoList {
		margin-top: 10px;
	}

	.videoList .videoInput {
		width: 200px;
		height: 30px;
	}

	.videoList .query {
		width: 150px;
		height: 30px;
		font-size: 14px;
		border-radius: 8px;
		margin-left: 20px;
		padding: 0;
		background-color: #2450D2;
		color: #fff;
	}

	.el-table .updatevideo {
		width: 70px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		background-color: #109955;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}

	.el-table .delvideo {
		width: 70px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		background-color: #FF0000;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}

	.el-table .lookvideo {
		width: 70px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		background-color: #2450D2;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}
</style>
