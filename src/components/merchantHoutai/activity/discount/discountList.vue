<template>
	<!-- 上架的折扣 -->
	<div class="seckillList" id="discountList" v-loading="fullscreenLoading" :element-loading-text="loadingText"
	 element-loading-background="rgba(0, 0, 0, 0.7)">
		<div class="video-top">
			<div class="videochaxun"><label>折扣专区活动查询</label></div>
			<div class="seckillList-top">
				<el-input class="videoInput" placeholder="输入活动关键字" v-model="input"></el-input>
				<i style="font-size: 22px;color: #2494D2;margin-left: 20px;margin-top: 5px; margin-right: 20px;" class="el-icon-date"></i>
				<el-date-picker
					prefix-icon="md-date_range"
					v-model="time"
					type="daterange"
					start-placeholder="开始日期"
					end-placeholder="结束日期" 
					value-format="yyyy-MM-dd"
					@change="templateTime"
				>
				</el-date-picker>
				<el-button @click="couponquery" class="query">查询</el-button>
			</div>
		</div>
		<div class="text-coupon">
			<el-button @click="issueActivity" class="couponbutton">发布折扣</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%;">
			<el-table-column type="index" prop="order" label="序号" width="" align="center">
			</el-table-column>
			<el-table-column prop="activityTitle" label="活动标题" align="center" width="">
			</el-table-column>
			<el-table-column prop="publishUser" label="发布人" align="center" width="">
			</el-table-column>
			<el-table-column prop="discount" label="折扣" align="center" width="">
			</el-table-column>
			<el-table-column prop="countSale" label="已售" align="center" width="">
			</el-table-column>
			<el-table-column prop="activityPrice" label="折扣价" align="center" width="">
				<template slot-scope="scpoe">
					<label>{{scpoe.row.activityPrice}}￥</label>
				</template>
			</el-table-column>
			<el-table-column prop="productName" label="关联的商品" align="center">
			</el-table-column>
			<el-table-column prop="time" label="活动时间" width="200" align="center">
			</el-table-column>
			<el-table-column label="操作" width="250" align="center">
				<template slot-scope="scope">
					<el-button @click="lookdetail(scope.row)" class="lookdiscount">查看详情</el-button>
					<el-button @click="xiajiadiscount(scope.row)" class="updatediscount">下架</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[10, 20, 30, 40]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="counts">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'discountList',
		data() {
			return {
				fullscreenLoading: false,
				loadingText: '加载中...',
				time: '',
				videoStatus: '',
				input: '',
				page: 1,
				limit: 20,
				counts: this.counts,
				type: '',
				startTime: '',
				endTime: '',
				tableData: [],
				option: [{
					id: 0,
					name: '普通动态'
				}, {
					id: 1,
					name: '官方动态',
				}],
				timeStart: '',
				timeEnd: ''
			}
		},
		mounted() {
			this.templateTime();
			this.getDiscountLists();
		},
		methods: {
			// 查看详情
			lookdetail(row) {
				this.$router.push({
					path: './detaildiscount',
					query: {
						id: row.id,
					}
				})
			},
			// 下架
			xiajiadiscount(row) {
				this.$confirm('是否确定将折扣活动:【' + row.activityTitle + '】下架?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						activityId: row.id,
						activityType: 0,
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
								this.getDiscountLists();
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
			issueActivity() {
				this.$router.push({
					path: './adddiscount'
				});
			},
			// 页码
			handleSizeChange(val) {
				this.limit = val;
				this.getDiscountLists();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getDiscountLists();
			},
			// 查询按钮
			couponquery() {
				this.page = 1;
				this.getDiscountLists();
			},
			// 时间戳转换
			templateTime(value) {
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
			// 查询折扣
			getDiscountLists() {
				let data = {
					companyId: parseInt(localStorage.getItem('loginData')),
					activityTitleLike: this.input,
					limit: this.limit,
					page: this.page,
					status: 1,
					timeStart: this.timeStart || 0,
					timeEnd: this.timeEnd || 0,
				};
				this.$axios.post('admin/admin/discount/getDiscountList', data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var tabList = [];
							var datetime1 = '';
							var datetime2 = '';
							data.data.forEach(function(val, index) {
								tabList[index] = val;
								datetime1 = val.startTime
								datetime2 = val.endTime;
								var date = new Date(datetime1);
								var time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
									1) + '-' + date.getDate() + ' '; //+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

								var date1 = new Date(datetime2);
								var time2 = date1.getFullYear() + '-' + (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() +
									1) + '-' + date1.getDate(); // + ' ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
								tabList[index].time = time1 + " ---- " + time2;
								tabList[index].activityPrice = val.activityPrice / 100;
								tabList[index].discount = val.discount;
							});
							this.tableData = tabList;
							this.counts = tabList.length;
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
	.seckillList {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}

	.video-top {
		width: 100%;
		height: auto;
		background-color: #FAFBFA;
		padding-left: 20px;
	}
	.seckillList .videoInput {
		width: 200px;
		height: 30px;
	}

	.seckillList .query {
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

	.el-table .lookdiscount {
		width: 70px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		border-radius: 8px;
		color: #fff;
		background-color: #2450D2;
		padding: 0;
	}

	.el-table .updatediscount {
		width: 70px;
		height: 30px;
		font-size: 14px;
		border-radius: 8px;
		color: #fff;
		background-color: #FF8D00;
		padding: 0;
		line-height: 30px;
		font-size: 14px;
	}

	.text-coupon {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: right;
	}

	.seckillList .couponbutton {
		width: 104px;
		height: 30px;
		background-color: #2450D2;
		color: #fff;
		padding: 0;
		border-radius: 8px;
		line-height: 30px;
		font-size: 14px;
	}

	.seckillList .el-date-picker {
		border: 1px solid #C1C1C1;
	}
</style>
