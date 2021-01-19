<template>
	<div id="terraceIndex" class="positions">
		<!-- 删除和添加职位 -->
		<div class="add_Del">
			<label class="qiyeName">{{this.qiyeName}}职位名称</label>
			<el-button @click="add_position" class="button add_qiye">添加职位</el-button>
			<el-button @click="del_positionAll" class="button tab_del">全部删除</el-button>
		</div>
		<!-- 表格 -->
		<el-table :data="tableData" border style="100%;" @selection-change="postionChange">
			<el-table-column type="selection" align="center">
			</el-table-column>
			<el-table-column prop="index" type="index" label="序号" align="center">
			</el-table-column>
			<el-table-column prop="name" label="职位名称" align="center">
			</el-table-column>
			<el-table-column label="操作" width="" align="center">
				<template slot-scope="scope">
					<el-button @click="edit_position(scope.row)" class="tab_bj tab_button">修改</el-button>
					<el-button @click="del_position(scope.row)" class="tab_del tab_button">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- <el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="counts">
		</el-pagination>
 -->
		<!-- 添加职位 -->
		<el-dialog title="添加职位" :visible.sync="dialogVisible">
			<div class="iconEnlarge" @click="enlarge">
				<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
					<i class="iconfont icon-quanping"></i>
				</el-tooltip>
			</div>
			<el-form :model="Addform" :rules="rules" ref="Addform">
				<el-form-item label="职位名称:" prop="positionNamea" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="Addform.positionNamea" placeholder="请输入职位名称"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer">
				<el-button @click="addPosition">保存</el-button>
			</div>
		</el-dialog>
		<!-- 修改职位 -->
		<el-dialog title="修改职位" :visible.sync="dialogVisibleUpdate">
			<div class="iconEnlarge" @click="enlarge">
				<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
					<i class="iconfont icon-quanping"></i>
				</el-tooltip>
			</div>
			<el-form :model="updataform" :rules="rules" ref="updataform">
				<el-form-item label="职位名称:" prop="positionNamea" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="updataform.positionNamea" placeholder="请输入职位名称"></el-input>
				</el-form-item>
			</el-form>
			<div class="dialog-footer">
				<el-button @click="updataPositions">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'terraceIndex',
		data() {
			return {
				input: '',
				time: '',
				qiyeID: '',
				fullscreen: '',
				formLabelWidth: '280px',
				dialogVisible: false,
				dialogVisibleUpdate: false,
				tableData: [],
				counts: this.counts,
				page: 1,
				limit: 100,
				qiyeName: '',
				Addform: {
					positionNamea: ''
				},
				updataform: {
					id: '',
					positionNamea: ''
				},
				rules: {
					positionNamea: [{
						required: true,
						message: '请输入职位名称',
						trigger: 'blur'
					}]
				},
				postionid: []
			}

		},
		mounted() {
			this.getPositions();
		},
		methods: {
			postionChange(val){
				this.postionid = val;
				console.log(val);
			},
			del_positionAll(){
				var name = [];
				var id = [];
				this.postionid.forEach(function(val,index){
					name[index] = val.name;
					id[index] = val.id;
				});
				this.$confirm('是否确定将职位【' + name + '】-删除?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if(this.postionid == ''){
						return this.$message({
							showClose: true,
							message: '请选择要删除的职位',
							type: 'error'
						});
					}else {
						const loading = this.$loading({
							lock: true,
							text: '批量删除中...',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});
						this.$axios.post('admin/company/activity/all/batch_remove?activityType=2', id).then((res) => {
							loading.close();
							if(res.status == 200){
								var data = res.data;
								if(data.code == 200){
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
									this.getClearanceList();
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
			
			
			// 添加职位按钮
			add_position() {
				this.dialogVisible = true;
			},
			// 职位添加保存
			addPosition() {
				this.$refs.Addform.validate((valid) => {
					// 企业id
					let id = this.$route.query.companyId;
					this.$axios.get('admin/company/edit/position?companyId=' + id + '&id=' + 0+ '&name=' + this.Addform.positionNamea).then(
						(res) => {
							if (res.status == 200) {
								var data = res.data;
								if (data.code == 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
									this.dialogVisible = false;
									this.getPositions();
								} else if (data.code == 401) {
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
			// 修改弹框
			edit_position(row) {
				this.updataform.id = row.id;
				this.updataform.positionNamea = row.name;
				this.dialogVisibleUpdate = true;
			},
			// 修改保存
			updataPositions() {
				this.$refs.updataform.validate((valid) => {
					// 企业id
					let companyId = this.$route.query.companyId;
					this.$axios.get('admin/company/edit/position?companyId=' + companyId + '&id=' + this.updataform.id + '&name=' + this.updataform
						.positionNamea).then((res) => {
						if (res.status == 200) {
							var data = res.data;
							if (res.status == 200) {
								var data = res.data;
								if (data.code == 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
									this.dialogVisibleUpdate = false;
									this.getPositions();
								} else if (data.code != 200) {
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
						}
					});
				});
			},
			del_position(row) {
				let companyId = this.$route.query.companyId;
				this.$axios.get('admin/company/delete/position?companyId=' + companyId + '&id=' + row.id).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (res.status == 200) {
							var data = res.data;
							if (data.code == 200) {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'success'
								});
								this.dialogVisibleUpdate = false;
								this.getPositions();
							} else if (data.code != 200) {
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
					}
				});
			},
			// 管理
			admin(row) {},
			edit_enterprise(row) {},
			// 页码
			handleSizeChange(val) {
				this.limit = val;
			},
			handleCurrentChange(val) {
				this.page = val;
			},
			// 全屏事件
			enlarge() {

			},
			getPositions() {
				this.qiyeName = this.$route.query.companyName;
				var id = this.$route.query.companyId;
				var data = '?page=' + this.page + '&companyId=' + id + '&limit=' + this.limit;
				this.$axios.get('admin/company/positions' + data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							this.tableData = data.data;
						} else if (data.code == 401) {
							this.$message({
								showClose: true,
								message: "未授权",
								type: 'error'
							});
						}
					} else {
						this.$message({
							showClose: true,
							message: "错误",
							type: 'error'
						});
					}
				});
			}

		}
	};
</script>


<style>
	.dialog-footer {
		width: 100%;
		text-align: center;
		box-sizing: border-box;
	}

	.dialog-footer .el-button {
		width: 151px;
		height: 30px;
		line-height: 15px;
		background-color: #2450D2;
		border-radius: 8px;
		color: #fff;
	}

	.el-form {
		text-align: left;
		width: 100%;
	}

	.el-form .formWidth {
		/* padding-left: 80px; */
	}

	.iconEnlarge {
		position: relative;
		cursor: pointer;
		color: #000000;
	}

	.iconEnlarge .iconfont {
		position: absolute;
		top: -63px;
		right: 40px;
		font-size: 14px;
		color: #909399;
		z-index: 1;
	}

	.formWidth .el-input__inner {
		width: 194px;
		border-top: 0px;
		border-left: 0px;
		border-right: 0px;
		border-radius: 0px;
		border-bottom: 1px solid #C1C1C1;
	}

	.clear {
		clear: both;
	}

	.positions {
		box-sizing: border-box;
		width: 100%;
		padding: 20px;
	}

	.terracr_top {
		width: 100%;
		height: 114px;
		margin: 0 auto;
		background-color: #FAFBFA;
	}

	.top_text {
		padding: 10px 20px;
		font-size: 14px;
	}

	.top_search {
		padding: 10px 20px;
		font-size: 12px;
	}

	.top_search .search {
		width: 200px;
		height: 30px;
		float: left;
		color: #A4A4A4;
	}

	.top_time {
		float: left;
		margin-left: 20px;
	}

	.top_time .button {
		width: 151px;
		height: 30px;
		background-color: #2450D2;
		margin-left: 0px;
		border-radius: 8px;
	}

	.positions .add_Del {
		width: 100%;
	}

	.add_Del .button {
		float: right;
		width: 107px;
		height: 30px;
		font-size: 14px;
		color: #fff;
		border-radius: 10px;
		margin-right: 5px;
	}

	.add_Del .add_qiye {
		background: #2482D2;
	}

	.add_Del .tab_del {
		background: #FF0000;
	}

	.el-table .tab_del {
		background: #FF0000;
	}

	.positions .el-table .tab_bj {
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

	.pagintion {
		/* padding-top: 30px;
		padding-left: 25%; */
	}
</style>
