<template>
	<!-- 商机管理 -->
	<div class="business" id="business" v-loading="fullscreenLoading" :element-loading-text="loadingText"
	 element-loading-background="rgba(0, 0, 0, 0.7)">
		<div class="searc-top">
			<div class="seach-label"><label>商机查询</label></div>
			<el-input v-model="busInput" class="el-imput" placeholder="请输入项目名称"></el-input>
			<i style="font-size: 22px;color: #2494D2;margin-left: 38px;margin-top: 5px;" class="el-icon-date"></i>
			<el-date-picker
				style="margin-left: 38px;"
				prefix-icon="md-date_range"
				v-model="time"
				type="daterange"
				start-placeholder="开始日期"
				end-placeholder="结束日期"
				value-format="yyyy-MM-dd"
				 @change="timeCuo">
			</el-date-picker>
			<el-select style="margin-left: 38px;" v-model="busleixing" placeholder="全部类型" clearable>
				<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
				</el-option>
			</el-select>
			<el-button @click="chaxunbus" class="busBut">查询</el-button>
		</div>
		<div class="add">
			<el-button @click="addbusiness" class="but">发布商机</el-button>
			<el-button @click="delAllbusiness" class="delAll">全部删除</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%" @selection-change="seleectChange">
			<el-table-column type="selection" width="50" align="center">
			</el-table-column>
			<el-table-column type="index" label="序号" width="" align="center">
			</el-table-column>
			<el-table-column prop="title" label="项目名称" align="center">
			</el-table-column>
			<el-table-column prop="username" label="发布人" align="center">
			</el-table-column>
			<el-table-column prop="phone" label="手机号码" align="center">
			</el-table-column>
			<el-table-column prop="address" label="地区" align="center">
			</el-table-column>
			<el-table-column prop="type" label="商机类型" align="center">
			</el-table-column>
			<el-table-column prop="createTime" label="发布时间" align="center">
			</el-table-column>
			<el-table-column label="操作" width="280" align="center">
				<template slot-scope="scope">
					<el-button @click="btn_detail(scope.row)" class="tab_button">查看详情</el-button>
					<el-button @click="chakanwuliu(scope.row)" class="bj_button">编辑</el-button>
					<el-button @click="del_bus(scope.row)" class="del_button">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 页码 -->
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="counts">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		name: 'business',
		data() {
			return {
				busInput: '',
				time: '',
				busleixing: '',
				fullscreenLoading: true,
				loadingText: '加载中...',
				options: [],
				tableData: [],
				page: 1,
				limit: 10,
				counts: this.counts,
				timeStart: '',
				timeEnd: '',
				businessId: ''
			}
		},
		mounted() {
			this.getqueryAllChanceType();
			this.postChanceList();
		},
		methods: {
			seleectChange(val){
				this.businessId = val;
			},
			//全部删除按钮
			delAllbusiness(){
				var name = [];
				var id = [];
				this.businessId.forEach(function(val,index){
					name[index] = val.title;
					id[index] = val.id;
				});
				this.$confirm('是否确定将商机【' + name + '】-删除?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.idData == ''){
						return this.$message({
							showClose: true,
							message: '请选择要删除的商机',
							type: 'error'
						});
					}else {
						const loading = this.$loading({
							lock: true,
							text: '批量删除中...',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});
						this.$axios.get('admin/chance/chanceBatchDelete?chanceIds=' + id).then((res) => {
							loading.close();
							if(res.status == 200){
								var data = res.data;
								if(data.code == 200){
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
									this.postChanceList();
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
			// 时间戳转换
			timeCuo(value) {
				if (value != null) {
					var date = new Date(value[0]);
					var startTime = date.getTime(date);
					var date1 = new Date(value[1]);
					var endTime = date1.getTime(date1);
					this.timeStart = startTime;
					this.timeEnd = endTime;
				} else if (value == null) {
					this.timeStart = '';
					this.timeEnd = '';
				}
			},
			// 页码
			handleSizeChange(val) {
				this.limit = val;
				this.postChanceList();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.postChanceList();
			},
			addbusiness() {
				this.$router.push({
					path: './addbusiness'
				});
			},
			// 查看详情
			btn_detail(row) {
				this.$router.push({
					path: './lookbusiness',
					query: {
						id: row.id
					}
				});
			},
			// 删除
			del_bus(row) {
				this.$confirm('是否确定删除项目为 【' + row.title + '】 的商机?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = this.$loading({
						lock: true,
						text: '删除中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					this.$axios.get('admin/chance/chanceDelete?chanceId=' + row.id).then((res) => {
						loading.close();
						if (res.status == 200) {
							var data = res.data;
							if (data.code == 200) {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'success'
								});
								this.postChanceList();
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
			// 编辑
			chakanwuliu(row) {
				this.$router.push({
					path: './editbusiness',
					query: {
						id: row.id
					}
				});
			},
			chaxunbus() {
				this.postChanceList();
				this.page = 1;
			},
			// 查询商机类型
			getqueryAllChanceType() {
				this.$axios.get('api/chance/queryAllChanceType').then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							this.options = data.data;
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
			// 查询列表
			postChanceList() {
				let data = {
					endTime: this.timeStart,
					startTime: this.timeEnd,
					limit: this.limit,
					page: this.page,
					name: this.busInput,
					type: this.busleixing
				}
				this.$axios.post('admin/chance/chanceList', data).then((res) => {
					this.fullscreenLoading = false;
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							this.tableData = data.data.dataList;
							this.counts = data.data.totalCount;
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

<style scoped="scoped">
	.business {
		box-sizing: border-box;
		width: 100%;
		padding: 20px;
	}

	.searc-top {
		width: 100%;
		margin-top: 20px;
		height: 114px;
		background-color: #FAFBFA;
		padding-left: 30px;
	}

	.seach-label {
		padding-top: 10px;
		margin-bottom: 10px;
	}

	.seach-input {
		width: 200px;
		height: 30px;
		float: left;
		margin-left: 20px;
	}

	.searc-top .busBut {
		width: 150px;
		height: 30px;
		font-size: 14px;
		background-color: #2450D2;
		color: #fff;
		border-radius: 8px;
		margin-left: 20px;
	}

	.add {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: right;
	}

	.add .but {
		width: 104px;
		height: 30px;
		font-size: 14px;
		background-color: #2482D2;
		color: #fff;
		padding: 0;
	}
	.add .delAll{
		width: 100px;
		height: 30px;
		font-size: 14px;
		background-color: #FF0000;
		color: #fff;
		padding: 0;
	}

	.el-table .tab_button {
		width: 70px;
		height: 30px;
		font-size: 14px;
		padding: 0;
		font-size: 8px;
		color: #fff;
		border-radius: 8px;
		background-color: #2450D2;
	}

	.el-table .bj_button {
		width: 70px;
		height: 30px;
		font-size: 14px;
		padding: 0;
		color: #fff;
		font-size: 8px;
		border-radius: 8px;
		background-color: #109955;
	}

	.el-imput {
		width: 200px;
	}

	.el-table .del_button {
		width: 70px;
		height: 30px;
		font-size: 14px;
		padding: 0;
		color: #fff;
		font-size: 8px;
		border-radius: 8px;
		background-color: #FF0000;
	}
</style>
