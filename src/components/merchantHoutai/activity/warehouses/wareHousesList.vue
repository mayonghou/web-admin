<template>
	<div id="activityList" class="activityList">
		<div class="activit-top">
			<div class="activit-label"><label>清仓处理活动查询</label></div>
			<div class="activit-search">
				<el-date-picker v-model="time" type="daterange" start-placeholder="开始日期"
				 end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="templateTime">
				</el-date-picker>
				<el-button @click="activitQuery" class="query">查询</el-button>
			</div>
		</div>
		<div class="activit-add">
			<el-button @click="activitAdd" class="btn">发布清仓活动</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%;">
			<el-table-column type="index" prop="order" label="序号" width="" align="center"> </el-table-column>
			<el-table-column prop="publishTime" label="发布时间" align="center" width=""> </el-table-column>
			<el-table-column prop="publishUser" label="发布人" align="center" width=""> </el-table-column>
			<el-table-column prop="number" label="关联的商品" align="center">
				<template slot-scope="scope">
					<el-button @click="qingchangShopp(scope.row)" type="text" style="color: #2494d2">{{ scope.row.number }}个</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="time" label="活动时间" align="center"> </el-table-column>
			<el-table-column label="操作" width="250" align="center">
				<template slot-scope="scope">
					<el-button @click="lookdetaildaa(scope.row)" class="lookvideo">查看详情</el-button>
					<el-button @click="xiajiaActivit(scope.row)" class="xiajiaActivit">下架</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="counts">
		</el-pagination>

		<el-dialog title="清仓商品列表" :visible.sync="dialogVisiblewarehoousees" width="80%">
			<div class="iconEnlorder" @click="enlarge">
				<el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
					<i class="iconfont icon-quanping"></i>
				</el-tooltip>
			</div>
			<el-table :data="shoppData" border style="width: 100%;">
				<el-table-column type="index" label="序号" align="center"></el-table-column>
				<el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
				<el-table-column prop="countSale" label="已售" align="center"></el-table-column>
				<el-table-column prop="activityPrice" label="清仓价" align="center">
					<template slot-scope="scope">
						<label>{{scope.row.activityPrice / 100}}￥</label>
					</template>
				</el-table-column>
				<el-table-column prop="productPrice" label="原价" align="center">
					<template slot-scope="scope">
						<label>{{scope.row.productPrice / 100}}￥</label>
					</template>
				</el-table-column>
				<el-table-column prop="productPicture" label="商品封面" align="center">
					<template slot-scope="scope">
						<img width="80" height="80" :src="scope.row.productPicture" />
					</template>
				</el-table-column>
				<el-table-column prop="countLeft" label="活动库存" align="center"></el-table-column>
			</el-table>
			<el-pagination class="pagintion" @size-change="hashoppndleSizeChange" @current-change="shopphandleCurrentChange"
			 :current-page="shopppage" :page-sizes="[10, 20,30,40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper"
			 :total="shoppcounts">
			</el-pagination>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				dialogVisiblewarehoousees: false,
				shoppData: [],
				activitSeach: '',
				fullscreen: '',
				goodData: '',
				time: '',
				startTime: '',
				endTime: '',
				tableData: [],
				shoppcounts: this.shoppcounts,
				shopppage: 1,
				shoppLimit: 10,
				page: 1,
				limit: 10,
				counts: this.counts
			};
		},
		mounted() {
			this.getClearanceList();
		},
		methods: {
			// 时间戳
			templateTime() {
				var date = new Date(this.time[0]);
				var start = date.getTime(date);
				this.startTime = start;
				var date1 = new Date(this.time[1]);
				var end = date1.getTime(date1);
				this.endTime = end;
			},
			// 全屏
			enlarge() {},
			// 搜索
			seacherdata() {

			},
			// 清仓商品
			qingchangShopp(row) {
				var shoppList = [];
				var aaas = /^(https):\/\/.+$/;
				row.productDTOList.forEach(function(val, index) {
					shoppList[index] = val;
					if(aaas.test(val.productPicture) == true){
						shoppList[index].productPicture =  val.productPicture;
					} else {
					shoppList[index].productPicture = localStorage.getItem('imgUrl') + val.productPicture;
					}
				});
				this.shoppData = shoppList;
				this.shoppcounts = row.productDTOList.length;
				this.dialogVisiblewarehoousees = true;
			},
			shopphandleCurrentChange(val) {
				this.shopppage = val;
			},
			hashoppndleSizeChange(val) {
				this.shoppLimit = val;
			},
			// 活动查询
			activitQuery() {
				this.page = 1;
				this.getClearanceList();
			},
			// 查看详情
			lookdetaildaa(row) {
				this.$router.push({
					path: './detailWarehouses',
					query: {
						data: row
					}
				});
			},
			// 下架活动
			xiajiaActivit(row) {
				this.$confirm('是否确定将【' + row.publishUser + '】发布的清仓处理活动下架?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						activityId: row.id,
						activityType: 2,
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
									type: 'success'
								});
								this.getClearanceList();
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
			activitAdd() {
				this.$router.push({
					path: './addWarehouses'
				});
			},
			// 页码
			handleSizeChange(val) {
				this.limit = val;
				this.getClearanceList();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getClearanceList();
			},
			getClearanceList() {
				let data = {
					activityTitleLike: this.activitSeach,
					companyId: parseInt(localStorage.getItem('loginData')),
					limit: this.limit,
					page: this.page,
					status: 1,
					timeStart: this.startTime || 0,
					timeEnd: this.timeEnd || 0
				};
				this.$axios.post('admin/admin/clearance/getClearanceList', data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var tabList = [];
							var datetime1 = '';
							var datetime2 = '';
							data.data.forEach(function(val, index) {
								tabList[index] = val;
								var pishTime = new Date(val.publishTime);
								var republishT =
									pishTime.getFullYear() +
									'-' +
									(pishTime.getMonth() + 1 < 10 ? '0' + (pishTime.getMonth() + 1) : pishTime.getMonth() + 1) +
									'-' +
									pishTime.getDate() +
									' ' +
									pishTime.getHours() +
									':' +
									pishTime.getMinutes();
								tabList[index].publishTime = republishT;
								var date = new Date(val.startTime);
								var time1 =
									date.getFullYear() +
									'-' +
									(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
									'-' +
									date.getDate() +
									' '; //+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

								var date1 = new Date(val.endTime);
								var time2 =
									date1.getFullYear() +
									'-' +
									(date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) +
									'-' +
									date1.getDate(); // + ' ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
								tabList[index].time = time1 + ' ---- ' + time2;
								tabList[index].number = val.productDTOList.length;
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
			}
		}
	};
</script>

<style>
	.activityList {
		box-sizing: border-box;
		width: 100%;
		padding: 20px;
	}

	.activit-top {
		width: 100%;
		height: 114px;
		background-color: #fafbfa;
		padding-left: 20px;
	}

	.activit-top .activit-label {
		padding-top: 10px;
	}

	.activit-search .activit-S {
		width: 200px;
	}

	.activit-search .query {
		width: 150px;
		height: 30px;
		background-color: #2450d2;
		color: #fff;
		padding: 0;
		border-radius: 8px;
		margin-left: 20px;
	}

	.activityList .activit-add {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: right;
	}

	.activit-add .btn {
		width: 104px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		padding: 0;
		background-color: #2482d2;
		color: #fff;
		border-radius: 8px;
	}

	.activityList .el-table .lookvideo {
		width: 70px;
		height: 30px;
		line-height: 30px;
		padding: 0;
		background-color: #2450d2;
		color: #fff;
		line-height: 30px;
		font-size: 14px;
	}

	.activityList .el-table .xiajiaActivit {
		width: 70px;
		height: 30px;
		line-height: 30px;
		font-size: 14px;
		padding: 0;
		background-color: #ff8d00;
		color: #fff;
		border-radius: 8px;
	}

	.iconEnlorder {
		position: relative;
	}

	.seacher {
		margin-left: 10px;
	}

	.iconEnlorder .iconfont {
		position: absolute;
		right: 80px;
		top: -64px;
	}
</style>
