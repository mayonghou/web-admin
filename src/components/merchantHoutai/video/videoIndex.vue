<template>
	<!-- 上架的视频 -->
	<div class="videoIndex" id="videoIndex" v-loading="fullscreenLoading" :element-loading-text="loadingText"
	 element-loading-background="rgba(0, 0, 0, 0.7)">
		<div class="video-top">
			<div class="videochaxun"><label>视频查询</label></div>
			<div class="videoList">
				<el-input class="videoInput" placeholder="输入视频标题" v-model="videoInput"></el-input>
				<i style="font-size: 22px;color: #2494D2;margin-left: 20px;margin-top: 5px; margin-right: 20px;" class="el-icon-date"></i>
				<el-date-picker
					prefix-icon="md-date_range"
					v-model="videoTime"
					type="daterange"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="yyyy-MM-dd"
					@change="timeCuo"
				>
				</el-date-picker>
				<el-select class="select-el" v-model="videoStatus" placeholder="视频状态">
					<el-option v-for="item in option" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
				<el-button @click="videoQuery" class="query">查询</el-button>
			</div>
		</div>
		<div class="text-button">
			<el-button class="button-el" @click="addvideo">发布视频</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%;">
			<!-- <el-table-column type="selection" width="" align="center">
			</el-table-column> -->
			<el-table-column prop="title" label="视频标题" align="center" width="180">
			</el-table-column>
			<el-table-column prop="publisher" label="发布人" align="center" width="">
			</el-table-column>
			<el-table-column prop="publisherPhone" label="手机号码" align="center" width="">
			</el-table-column>
			<el-table-column prop="name" label="关联的商品名称" align="center">
			</el-table-column>
			<el-table-column prop="status" label="视频状态" align="center">
			</el-table-column>
			<el-table-column prop="time" label="发布时间" align="center">
			</el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button @click="lookvideo(scope.row)" class="lookvideo">查看详情</el-button>
					<el-button @click="lowerVideo(scope.row)" class="lowerVideo">下架</el-button>
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
		name: 'videoIndex',
		data() {
			return {
				fullscreenLoading: true,
				loadingText: '加载中...',
				videoInput: '',
				videoTime: '',
				page: 1,
				limit: 10,
				counts: this.counts,
				videoStatus: '',
				option: [{
					id: 0,
					name: '不限'
				}, {
					id: 1,
					name: '上线'
				}],
				tableData: [],
				timeStart:'',
				timeEnd: ''
			}
		},
		mounted() {
			this.getVideoList();
		},
		methods: {
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
			// 发布视频
			addvideo() {
				this.$router.push({
					path: './addVideo'
				});
			},
			// 页码
			handleSizeChange(val) {
				this.limit = val;
				this.getVideoList();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getVideoList();
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
			// 下架视频
			lowerVideo(row) {
				this.$confirm('是否确定下架标题为【' + row.title + '】的视频?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						id: row.id,
						newStatus: 3
					};
					const loading = this.$loading({
						lock: true,
						text: '下架中...',
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
			videoQuery() {
				this.page = 1;
				this.getVideoList();
			},
			//查询视频列表
			getVideoList() {
				let data = {
					companyId: localStorage.getItem('loginData'),
					page: this.page,
					limit: this.limit,
					status: this.videoStatus || this.videoStatus != 3,
					timeEnd: this.timeEnd,
					timeStart: this.timeStart,
					titleLike: this.videoInput
				};
				this.$axios.post('admin/company/video/list', data).then((res) => {
					this.fullscreenLoading = false;
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var lisst = [];
							data.list.forEach(function(val, index) {
								lisst[index] = val;
								if(val.productInfo != null){
									lisst[index].name = val.productInfo.name;
								}
								lisst[index].status = val.status != 3 ? '上架' : ''
								let date = new Date(val.publishAtTime);
								let time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
									1) + '-' + date.getDate();
								lisst[index].time = time1;
							})
							this.tableData = lisst;
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
			}
		}
	}
</script>

<style>
	.videoIndex {
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

	.videoList .select-el {
		margin-left: 20px;
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

	.text-button {
		width: 100%;
		height: 50px;
		line-height: 50px;
	}

	.text-button .button-el {
		width: 104px;
		height: 30px;
		font-size: 14px;
		border-radius: 8px;
		color: #fff;
		background-color: #2482D2;
		float: right;
		margin-top: 10px;
		padding: 0;
	}

	.videoIndex .el-table .lookvideo {
		width: 70px;
		height: 30px;
		font-size: 14px;
		background-color: #2450D2;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}

	.el-table .updatevideo {
		width: 70px;
		height: 30px;
		font-size: 14px;
		background-color: #109955;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}

	.el-table .delvideo {
		width: 70px;
		height: 30px;
		font-size: 14px;
		background-color: #FF0000;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}

	.el-table .lowerVideo {
		width: 70px;
		height: 30px;
		font-size: 14px;
		background-color: #FF8D00;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}
</style>
