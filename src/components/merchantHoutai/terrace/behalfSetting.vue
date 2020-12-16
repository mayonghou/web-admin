<template>
	<!-- 产品代言设置 -->
	<div class="behalfSetting" id="behalfSetting">
		<div class="BS-top"><label>设置企业可使用的功能：</label></div>
		<el-form :model="addBSetting" :rules="rules" ref="addBSetting">
			<el-form-item label="企业名称:" prop="value" :show-all-levels="false" :label-width="labelWidth">
				<el-select v-model="addBSetting.value" placeholder="请选择企业名称">
					<el-option v-for="(item,index) in hezuoqiye" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="选择代言的商品:" prop="goods" :show-all-levels="false" :label-width="labelWidth">
				<div class="guanlian" v-if="this.shoppId != 0">
					<label class="shoppName fl" v-model="addBSetting.shoppName">{{shoppName}}</label>
					<el-button class="elButton fr" @click="relationGoods">从新关联</el-button>
				</div>
				<div style="color: red; width: 210px; text-align: center;" v-if="this.shoppId!=0">
					<el-button @click="detele" class="el-icon-remove-outline" style="color: red; font-size: 14px;" type="text">删除此产品</el-button>
				</div>
				<el-button v-model="goods" @click="relationGoods" class="goods el-icon-circle-plus-outline">关联商品</el-button>
			</el-form-item>
			<el-form-item label="选择代言人:" prop="people" :show-all-levels="false" :label-width="labelWidth">
				<el-switch v-model="value1" active-color="#13ce66">
				</el-switch>
				<label>选择成员</label>
				<div>
					<el-select v-model="addBSetting.people" multiple v-if="this.value1 != false" placeholder="请选择代言人">
						<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
						</el-option>
					</el-select>
					</el-select>
				</div>
			</el-form-item>
		</el-form>
		<div class="button">
			<el-button @click="quxiaodiayan">取消</el-button>
			<el-button @click="addDaiyan">新增代言</el-button>
		</div>
		<el-dialog title="关联商品" :visible.sync="dialogVisible" width="80%">
			<div class="goodsSeacher">
				<i class="el-icon-search icon"></i>
				<el-input v-model="goodData"></el-input>
				<el-button @click="seacherdata" type="text" class="seacher">搜索</el-button>
			</div>
			<el-table :data="tableData" style="width: 1200px; margin: 0 auto;">
				<el-table-column type="selection" width="">
				</el-table-column>
				<el-table-column type="index" label="序号" width="100">
				</el-table-column>
				<el-table-column prop="name" label="商品名称" width="">
				</el-table-column>
				<el-table-column prop="price" label="商品售价">
				</el-table-column>
				<el-table-column prop="picture" label="商品封面">
					<template slot-scope="scope">
						<img width="80" height="80" :src="scope.row.picture" /><!-- :src="scope.row.C_FMURL" -->
					</template>
				</el-table-column>
				<el-table-column prop="no" label="商品货号">
				</el-table-column>
				<el-table-column prop="publishAtTime" label="发布时间">
				</el-table-column>
				<el-table-column label="操作" width="250" align="center">
					<template slot-scope="scope">
						<el-button @click="GLgoods(scope.row)" type="text" v-if="scope.row.id != shoppId " class="bulebutton" size="small">选择关联</el-button>
						<el-button type="text" v-if="scope.row.id == shoppId " style="color: #FF8D00;" size="small">当前关联</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
			 :page-sizes="[10, 20, 30, 40]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="counts">
			</el-pagination>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'behalfSetting',
		data() {
			return {
				labelWidth: '180px',
				dialogVisible: false,
				value1: true,
				goodData: '',
				shoppName: '',
				shoppId: '',
				value: '',
				goods: '',
				hezuoqiye: [],
				options: [],
				addBSetting: {
					value: [],
					goods: '',
					people: []
				},
				rules: {
					value: [{
						required: true,
						message: '请选择职位',
						trigger: 'blur'
					}],
					goods: [{
						required: true,
						message: '请选择关联的商品',
						trigger: 'blur'
					}],
					people: [{
						required: true,
						message: '请选择代言人',
						trigger: 'blur'
					}],
				},
				tableData: [],
				page: 1,
				limit: 20,
				counts: 0,
				daiyanprice: ''
			}
		},
		mounted() {
			this.getpositions();
			this.getTeams();
		},
		methods: {
			// 取消代言
			quxiaodiayan() {
				this.shoppName = '';
				this.shoppId = '';
				this.$router.push({
					path: './qiyedaiyanList'
				});
			},
			// 新增代言
			addDaiyan() {
				this.$confirm("【是否确定新添【 " + this.shoppName + " 】的代言信息】", '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = this.$loading({
						lock: true,
						text: '保存中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					let data = {
						amount: this.daiyanprice,
						companyId: this.$route.query.id,
						productId: this.shoppId,
						users: this.addBSetting.people
					};
					this.$axios.post('admin/company/edit/relevance/product', data).then((res) => {
						loading.close();
						if (res.status == 200) {
							var data = res.data;
							if (data.code == 200) {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'success'
								});
								this.shoppName = '';
								this.shoppId = '';
								this.addBSetting.people = '';
								this.addBSetting.value = '';
								this.$router.push({
									path: './qiyedaiyanList'
								});

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
			// 关联商品
			relationGoods() {
				this.dialogVisible = true;
				this.postAllProduct();
			},
			// 搜索按钮
			seacherdata() {
				this.postAllProduct();
				this.page = 1;
			},
			// 查询商品
			postAllProduct() {
				var data = {
					companyId: localStorage.getItem('loginData'),
					limit: this.limit,
					page: this.page,
					productNameLike: this.goodData
				};
				this.$axios.post('admin/company/activity/all/list_product', data).then((res) => {
					console.log(res);
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var list = [];
							data.list.forEach(function(val, index) {
								list[index] = val;
								list[index].picture = localStorage.getItem('imgUrl') + val.picture;
							})
							this.tableData = list;
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
			handleSizeChange(val) {
				this.limit = val;
			},
			handleCurrentChange(val) {
				this.page = val;
			},
			// 选择商品关联
			GLgoods(row) {
				this.shoppName = row.name;
				this.daiyanprice = row.price;
				this.shoppId = row.id;
				this.dialogVisible = false;
			},
			// 删除此产品
			detele() {
				this.shoppName = '';
				this.shoppId = '';
			},
			// 查询代言人员
			getTeams() {
				let data = '?companyId=' + localStorage.getItem('loginData') + '&page=' + this.page;
				this.$axios.get('admin/company/teams' + data).then((res) => {
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
			// 查询企业
			getpositions() {
				this.$axios.get('admin/company/partner/service/' + localStorage.getItem('loginData')).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {

							let list = [];
							data.data.forEach(function(val, index) {
								list[index] = val;
								list[index].id = val.company.id;
							});
							this.hezuoqiye = list;
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
				})
			},
		}
	}
</script>

<style scoped="scoped">
	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	.guanlian {
		width: 260px;
		position: relative;
	}

	.elButton {
		position: absolute;
		top: 5px;
		/* margin-left: 220px; */
		width: 76px;
		height: 21px;
		font-size: 8px;
		color: #fff;
		background-color: #0000FF;
		border-radius: 8px;
		padding: 0;
	}

	.behalfSetting {
		padding-left: 50px;
	}

	.BS-top {
		font-size: 14px;
	}

	.goods {
		width: 200px;
		height: 50px;
		border: 1px solid #2494D2;
		color: #2494D2;
		font-size: 14px;
	}

	.el-switch {
		margin-left: 300px;
	}

	.shoppName {
		width: 210px;
		overflow: hidden;
	}

	.button {
		margin-top: 20px;
		margin-left: 260px;
	}

	.button .el-button {
		width: 150px;
		height: 30px;
		border-radius: 8px;
		color: #fff;
		background-color: #2450D2;
		margin-right: 20px;

	}

	.goodsSeacher {
		width: 375px;
		height: 45px;
		background-color: #FAFFE0;
		margin: 0 auto;
		margin-bottom: 25px;
		position: relative;
		line-height: 30px;
	}

	.el-input {
		margin-top: 7px;
		margin-left: 10px;
		width: 290px;
		height: 30px;
		border: 0px;
	}

	.goodsSeacher .el-input__inner {
		border: 0px;
	}

	.icon {
		position: absolute;
		z-index: 1;
		top: 17px;
		left: 11px;
	}

	.seacher {
		margin-left: 25px;
		color: #000000;
	}

	.behalfSetting .pagintion {
		/* margin-left: 25%; */
	}

	.behalfSetting .el-dialog .el-dialog__header {
		background-color: #F5F9F1;
	}

	.bulebutton {
		width: 76px;
		height: 21px;
		background-color: #2450D2;
		border-radius: 8px;
		color: #fff;
		line-height: 0;
	}
</style>
