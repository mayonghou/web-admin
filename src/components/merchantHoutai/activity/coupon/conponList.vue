<template>
	<!-- 上架的优惠券 -->
	<div class="conponList" id="conponList" v-loading="fullscreenLoading" :element-loading-text="loadingText"
	 element-loading-background="rgba(0, 0, 0, 0.7)">
		<div class="video-top">
			<div class="videochaxun"><label>优惠券活动查询</label></div>
			<div class="conponList-top">
				<el-input class="videoInput" placeholder="输入活动关键字" v-model="input"></el-input>
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
				<el-button @click="couponquery" class="query">查询</el-button>
			</div>
		</div>
		<div class="text-coupon">
			<el-button @click="issueActivity" class="couponbutton">发布优惠卷活动</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%;">
			<el-table-column type="index" prop="order" label="序号" width="" align="center">
			</el-table-column>
			<el-table-column prop="activityTitle" label="活动标题" align="center" width="">
			</el-table-column>
			<el-table-column prop="publisher" label="发布人" align="center" width="">
			</el-table-column>
			<el-table-column prop="countReceived" label="已领取" align="center" width="">
			</el-table-column>
			<el-table-column prop="countUsed" label="已使用" align="center" width="">
			</el-table-column>
			<el-table-column prop="couponName" label="关联的优惠券" align="center">
			</el-table-column>
			<el-table-column prop="time" label="活动时间" width="200" align="center">
			</el-table-column>
			<el-table-column label="操作" width="250" align="center">
				<template slot-scope="scope">
					<el-button @click="lookdetail(scope.row)" class="lookvideo">查看详情</el-button>
					<el-button @click="xiajiajuan(scope.row)" class="updatecoupon">下架</el-button>
					<!-- <el-button @click="delyouhuihd(scope.row)" class="delcoupon">删除</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[5, 10, 20, 30]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="counts">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'conponList',
		data() {
			return {
				fullscreenLoading: true,
				loadingText: '加载中...',
				time: '',
				videoStatus: '',
				input: '',
				page: 1,
				limit: 20,
				counts: this.counts,
				option: [{
					id: 0,
					name: '普通动态'
				}, {
					id: 1,
					name: '官方动态'
				}],
				tableData: [],
				timeStart: '',
				timeEnd: ''
			}
		},
		mounted() {
			this.getconpouList();
		},
		methods: {
			// 查看详情
			lookdetail(row) {
				
				this.$router.push({
					path: './detailCoupon',
					query: {
						data: row
					}
				})
			},
			// 删除
			delyouhuihd(row) {
				this.$confirm('是否确定将优惠券活动:【' + row.activityTitle + '】删除?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						activityId: row.id,
						activityType: 1,
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
								this.getconpouList();
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
			// 下架优惠券活动
			xiajiajuan(row) {
				this.$confirm('是否确定将优惠券活动:【' + row.activityTitle + '】下架?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						activityId: row.id,
						activityType: 1,
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
								this.getconpouList();
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
			// 发布优惠卷
			issueActivity() {
				this.$router.push({
					path: './addcoupon'
				});
			},
			// 页码
			handleSizeChange(val) {
				this.limit = val;
				this.getconpouList();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getconpouList();
			},
			// 查询按钮
			couponquery() {
				this.page = 1;
				this.getconpouList();
				this.fullscreenLoading = true;
			},
			timeCuo(value){
				if(value != null){
					var date = new Date(value[0]);
					var startTime = date.getTime(date);
					var date1 = new Date(value[1]);
					var endTime = date1.getTime(date1);
					this.timeStart = startTime;
					this.timeEnd = endTime;
				} else {
					this.timeStart = '';
					this.timeEnd = '';
				}
			},
			// 查询优惠券活动列表
			getconpouList() {
				let data = {
					companyId: localStorage.getItem('loginData'),
					limit: this.limit,
					page: this.page,
					activityTitleLike: this.input,
					timeEnd: this.timeStart,
					timeStart: this.timeEnd,
					status: 1,
				};
				this.$axios.post('admin/company/activity/coupon/list', data).then((res) => {
					this.fullscreenLoading = false;
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var tabList = [];
							var datetime1 = '';
							var datetime2 = '';
							data.list.forEach(function(val, index) {
								tabList[index] = val;
								datetime1 = val.startTime
								datetime2 = val.endTime;
								var date = new Date(datetime1);
								var time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
									1) + '-' + date.getDate();
								var date1 = new Date(datetime2);
								var time2 = date1.getFullYear() + '-' + (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() +
									1) + '-' + date1.getDate(); 
								tabList[index].time = time1 + " ---- " + time2;
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
	.conponList {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}

	.video-top {
		width: 100%;
		height: 110px;
		background-color: #FAFBFA;
		padding-left: 20px;
	}

	.videochaxun {
		padding-top: 10px;
	}

	.conponList-top {
		margin-top: 10px;
	}

	.conponList .videoInput {
		width: 200px;
		height: 30px;
	}

	.conponList .query {
		width: 150px;
		height: 30px;
		border-radius: 8px;
		margin-left: 20px;
		padding: 0;
		background-color: #2450D2;
		color: #fff;
	}

	.select-el {
		margin-left: 20px;
	}

	.conponList .el-table .lookvideo {
		width: 70px;
		height: 30px;
		font-size: 14px;
		border-radius: 8px;
		color: #fff;
		background-color: #2450D2;
		padding: 0;
	}

	.conponList .el-table .updatecoupon {
		width: 70px;
		height: 30px;
		font-size: 14px;
		border-radius: 8px;
		color: #fff;
		background-color: #FF8D00;
		padding: 0;
	}

	.el-table .delcoupon {
		width: 70px;
		height: 30px;
		font-size: 14px;
		border-radius: 8px;
		color: #fff;
		background-color: #FF0000;
		padding: 0;
	}

	.text-coupon {
		width: 100%;
		height: 50px;
		text-align: right;
		line-height: 50px;
	}

	.conponList .couponbutton {
		width: 104px;
		height: 30px;
		font-size: 14px;
		background-color: #2450D2;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}
	.conponList .el-date-editor{
		border: 1px solid #C1C1C1;
	}
</style>
