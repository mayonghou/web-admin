<template>
	<!-- 下架的秒杀 -->
	<div class="lowerseckill" id="lowerseckill" v-loading="fullscreenLoading" :element-loading-text="loadingText"
	 element-loading-background="rgba(0, 0, 0, 0.7)">
		<div class="video-top">
			<div class="videochaxun"><label>秒杀查询</label></div>
			<div class="videoList">
				<el-input class="videoInput" placeholder="输入活动标题" v-model="videoInput"></el-input>
				<i style="font-size: 22px;color: #2494D2;margin-left: 20px;margin-top: 5px; margin-right: 20px;" class="el-icon-date"></i>
				<el-date-picker prefix-icon="md-date_range" v-model="time" type="daterange" start-placeholder="开始日期"
				 end-placeholder="结束日期" @change="templateTime">
				</el-date-picker>
				<el-button @click="videoquery" class="query">查询</el-button>
			</div>
		</div>
		<div class="text-coupon">
			<el-button @click="delseckillAll" class="delbutton">全部删除</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%;" @selection-change="seckillChange">
			<el-table-column type="selection" align="center">
			</el-table-column>
			<el-table-column type="index" prop="order" label="序号" align="center">
			</el-table-column>
			<el-table-column prop="title" label="活动标题" align="center">
			</el-table-column>
			<el-table-column prop="publisher" label="发布人" align="center">
			</el-table-column>
			<el-table-column prop="countSale" label="已售" align="center">
			</el-table-column>
			<el-table-column prop="activityPrice" label="秒杀价" align="center">
				<template slot-scope="scope">
					<label>{{scope.row.activityPrice}}￥</label>
				</template>
			</el-table-column>
			<el-table-column prop="productName" label="关联的商品" align="center">
			</el-table-column>
			<el-table-column prop="time" label="发布时间" width="170" align="center">
			</el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button @click="chongxinfabu(scope.row)" class="lookvideo">重新发布</el-button>
					<el-button @click="delseckill(scope.row)" class="delcoupon">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="counts">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'lowerseckill',
		data() {
			return {
				fullscreenLoading: false,
				loadingText: '加载中...',
				videoInput: '',
				time: '',
				value: '',
				tableData: [],
				page: 1,
				limit: 20,
				counts: this.counts,
				timeStart: '',
				timeEnd: '',
				seckillId: ''
			}
		},
		mounted() {
			this.getSeckillList();
		},
		methods: {
			seckillChange(val){
				this.seckillId = val;
			},
			delseckillAll(){
				var name = [];
				var id = [];
				this.seckillId.forEach(function(val,index){
					name[index] = val.title;
					id[index] = val.id;
				});
				this.$confirm('是否确定将秒杀活动【' + name + '】-删除?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.seckillId == ''){
						return this.$message({
							showClose: true,
							message: '请选择要删除的秒杀活动',
							type: 'error'
						});
					}else {
						const loading = this.$loading({
							lock: true,
							text: '批量删除中...',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});
						this.$axios.post('admin/company/activity/all/batch_remove?activityType=4', id).then((res) => {
							loading.close();
							if(res.status == 200){
								var data = res.data;
								if(data.code == 200){
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
									this.getSeckillList();
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
					}
				});
			},
			
			chongxinfabu(row) {
				this.$router.push({
					path: './addseckill',
					query: {
						data: row
					}
				});
				this.getSeckillList();
			},
			// 删除
			delseckill(row) {
				this.$confirm('是否确定将秒杀活动:【' + row.title + '】删除?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						activityId: row.id,
						activityType: 4,
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
								this.getSeckillList();
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
				this.getSeckillList();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getSeckillList();
			},
			// 查询按钮
			videoquery() {
				this.page = 1;
				this.getSeckillList();
			},
			//时间戳的转换
			templateTime(value) {
				if(value != null){
					var date = new Date(value[0]);
					var startTime = date.value(date);
					var date1 = new Date(value[1]);
					var endTime = date1.getTime(date1);
					this.timeStart = startTime;
					this.timeEnd = endTime;
				} else {
					this.timeStart = '';
					this.timeEnd = '';
				}
			},
			// 查询下架的秒杀
			getSeckillList() {
				let data = {
					activityTitleLike: this.videoInput,
					companyId: parseInt(localStorage.getItem('loginData')),
					limit: this.limit,
					page: this.page,
					status: 2,
					timeEnd: this.timeEnd,
					timeStart: this.timeStart,
				};
				this.$axios.post('admin/company/activity/flash/list', data).then((res) => {
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
								tabList[index].activityPrice = val.activityPrice / 100;
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
	.lowerseckill {
		box-sizing: border-box;
		width: 100%;
		padding: 20px;
		padding-top: 0;
	}

	.video-top {
		width: 100%;
		height: 110px;
		background-color: #FAFBFA;
		padding-left: 20px;
	}
	.text-coupon{
		width: 100%;
		height: 50px;
		text-align: right;
		line-height: 50px;
	}
	.text-coupon .delbutton{
		width: 104px;
		height: 30px;
		background-color: #FF0000;
		color: #fff;
		padding: 0;
		font-size: 14px;
		border-radius: 8px;
	}
	.videochaxun {
		padding-top: 10px;
	}

	.lowerseckill {
		margin-top: 10px;
	}

	.lowerseckill .videoInput {
		width: 200px;
		height: 30px;
	}

	.lowerseckill .query {
		width: 150px;
		height: 35px;
		border-radius: 8px;
		margin-left: 25px;
		padding: 0;
		font-size: 14px;
		background-color: #2450D2;
		color: #fff;
	}

	.el-table .lookvideo {
		width: 63px;
		height: 30px;
		line-height: 30px;
		border-radius: 8px;
		color: #fff;
		background-color: #2450D2;
		padding: 0;
		font-size: 14px;
	}

	.el-table .updatecoupon {
		width: 63px;
		height: 30px;
		line-height: 30px;
		border-radius: 8px;
		color: #fff;
		background-color: #FF8D00;
		padding: 0;
		font-size: 14px;
	}

	.el-table .delcoupon {
		width: 63px;
		height: 30px;
		line-height: 30px;
		border-radius: 8px;
		color: #fff;
		background-color: #FF0000;
		padding: 0;
		font-size: 14px;
	}
</style>
