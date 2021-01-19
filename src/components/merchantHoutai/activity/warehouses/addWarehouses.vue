<template>
	<div class="addActivity" id="addActivityflashSale">
		<div class="addActivity-top"><label>填写发布的清仓处理活动信息</label></div>
		<el-form :model="addActivitydata" :rules="rules" ref="addActivitydata">
			<el-form-item v-for="(item, index) in addActivitydata.activityShopp" :label="'选择活动商品' + (index + 1) + ':'" :key="item.index"
			 :prop="'activityShopp.' + index + '.productId'" :label-width="labelwidth" :rules="{
                    required: true,
                    message: '商品不能为空',
                    trigger: 'blur'
                }">
				<div v-if="item.shoppId != ''">
					<el-input v-model="item.name" readonly class="eeInput"></el-input>
					<el-button @click="shoppingDGda" class="shoppXuanzhe">从新关联</el-button>
					<el-form-item label="清仓价:" :prop="'activityShopp.' + index + '.activityPrice'" label-width="90px" :rules="[
                            {
                                required: true,
                                message: '价格不能为空',
                                trigger: 'blur'
                            },
                            {
                                type: 'number',
                                message: '只能是数字',
                                trigger: 'blur'
                            }
                        ]">
						<el-input v-model.number="item.activityPrice" placeholder="填写清仓价格,不能超过商品售价"></el-input>
					</el-form-item>
					<el-form-item label="发布数量:" :prop="'activityShopp.' + index + '.productNum'" label-width="90px" :rules="[
                            {
                                required: true,
                                message: '发布数量不能为空',
                                trigger: 'blur'
                            },
                            {
                                type: 'number',
                                message: '只能是数字',
                                trigger: 'blur'
                            }
                        ]">
						<el-input v-model.number="item.productNum" placeholder="商品库存"></el-input>
					</el-form-item>
					<el-form-item label="每人限购:" :prop="'activityShopp.' + index + '.numLimitation'" label-width="90px">
						<el-input v-model.number="item.numLimitation" placeholder="没人限购数"></el-input>
					</el-form-item>
					<el-button @click="deleteShopp(item)" type="text" class="delBtn el-icon-remove-outline">删除</el-button>
				</div>
			</el-form-item>
			<el-form-item label="选择商品" prop="sss" :label-width="labelwidth">
				<el-button @click="shoppingDG" class="btoun el-icon-circle-plus-outline">关联商品</el-button>
			</el-form-item>

			<el-form-item label="活动标签:" :label-width="labelwidth">
				<label style="color: #a4a4a4">(默认为当前标签)</label>
				<el-tag :key="item" v-for="item in this.addActivitydata.activityTags" v-model="addActivitydata.activityTags" class="eltag"
				 closable :disable-transitions="false" @close="handleClose(activityTags)">
					{{ item }}
				</el-tag>
				<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
				 @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
				</el-input>
				<el-button v-else class="button-new-tag" type="text" size="small" @click="showInput"><i class="el-icon-circle-plus-outline"></i></el-button>
			</el-form-item>
			<el-form-item label="活动时间:" prop="activityTime" :label-width="labelwidth">
				<el-date-picker prefix-icon="md-date_range" v-model="addActivitydata.activityTime" type="daterange"
				 start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="timestamp">
				</el-date-picker>
			</el-form-item>
		</el-form>
		<div class="addactivityBtn">
			<el-button @click="quxiaofabu" class="buttonr">取消</el-button>
			<el-button @click="addActivit" class="buttonr mL">添加</el-button>
		</div>

		<el-dialog title="关联商品" :visible.sync="dialogVisible" width="80%">
			<div class="iconEnlorder" @click="enlarge">
				<el-tooltip effect="dark" :content="fullscreen ? `取消全屏` : `全屏`" placement="bottom">
					<i class="iconfont icon-quanping"></i>
				</el-tooltip>
			</div>
			<div class="goodsSeacher">
				<el-input v-model="goodData">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
				<el-button @click="seacherdata" type="text" class="seacher">搜索</el-button>
			</div>
			<el-table :data="tableData" style="width: 100%;" border>
				<el-table-column prop="order" label="序号" width="100" align="center"> </el-table-column>
				<el-table-column prop="name" label="商品名称" width="" align="center"> </el-table-column>
				<el-table-column prop="price" label="商品售价" align="center">
					<template slot-scope="scope">
						<label>{{scope.row.price / 100}}￥</label>
					</template>
				</el-table-column>
				<el-table-column prop="picture" label="商品封面" align="center">
					<template slot-scope="scope">
						<img width="80" height="80" :src="scope.row.picture" />
					</template>
				</el-table-column>
				<el-table-column prop="no" label="商品货号" align="center"> </el-table-column>
				<el-table-column prop="time" label="发布时间" align="center"> </el-table-column>
				<el-table-column label="操作" width="250" align="center">
					<template slot-scope="scope">
						<el-button @click="GLgoods(scope.row)" v-if="scope.row.canBind == true && scope.row.id != shoppId " class="shoppXuanzhe"
						 size="small">选择关联</el-button>
						<el-button type="text" style="color: #FF8D00;" v-if="scope.row.id == shoppId" size="small">当前关联</el-button>
						<el-button type="text" style="color: #FF8D00;" v-if="scope.row.canBind == false" size="small">已关联</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
			 :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="counts">
			</el-pagination>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'addActivityflashSale',
		data() {
			return {
				labelwidth: '230px',
				dialogVisible: false,
				fullscreen: '',
				labels: '选择活动商品:',
				goodData: '',
				tableData: [],
				page: 1,
				limit: 10,
				counts: this.counts,
				shoppId: [],
				inputValue: '',
				inputVisible: false,
				clearancePrice: '',
				clearanceNumber: '',
				activityId: '',
				addActivitydata: {
					name: '',
					activityShopp: [],
					activityNumber: '',
					activityTags: ['清仓大甩卖'],
					activityTime: [],
				},
				rules: {
					activityShopp: [{
						required: true,
						message: '请选择商品',
						trigger: 'blur'
					}],
					activityTags: [{
						required: true,
						message: '请添加活动标签',
						trigger: 'blur'
					}],
					activityTime: [{
						required: true,
						message: '请选择活动时间',
						trigger: 'blur'
					}]
				},
				dataAllList:[]
			};
		},
		mounted() {
			this.getLowerData();
			this.timestamp();
		},
		methods: {
			shoppingDGda() {
				this.getActivityAllList();
				this.dialogVisible = true;
			},
			// 关联商品弹框
			shoppingDG() {
				this.getActivityAllList();
				this.dialogVisible = true;
			},
			// 用于商品数组
			deleteShopp(item) {
				var index = this.addActivitydata.activityShopp.indexOf(item);
				this.shoppId = item.productId = '';
				if (index != -1) {
					this.addActivitydata.activityShopp.splice(item, 1);
				}
			},

			// 全屏
			enlarge() {},
			handleSizeChange(val) {
				this.limit = val;
				this.getActivityAllList();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getActivityAllList();
			},
			// 商品搜索
			seacherdata() {
				this.page = 1;
				this.getActivityAllList();
			},
			// // 时间戳
			timestamp() {
				var data1 = new Date(this.addActivitydata.activityTime[0]);
				var start = data1.getTime(data1);
				this.startTime = start;
				var data2 = new Date(this.addActivitydata.activityTime[1]);
				var end = data2.getTime(data2);
				this.endTime = end;
			},
			// 选择商品关联
			GLgoods(row) {
				this.shoppId = row.id;
				this.addActivitydata.activityShopp.push({
					name: row.name,
					productId: row.id,
					productPrice: row.price
				});
				this.dialogVisible = false;
			},
			// 查询商品
			getActivityAllList() {
				let data = {
					companyId: localStorage.getItem('loginData'),
					limit: this.limit,
					page: this.page,
					productNameLike: this.goodData
				};
				this.$axios.post('admin/company/activity/all/list_product', data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var liste = [];
							var times = '';
							data.list.forEach(function(val, index) {
								liste[index] = val;
								liste[index].picture = localStorage.getItem('imgUrl') + val.picture;
								times = val.publishAtTime;
								var date = new Date(times);
								var time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
									1) + '-' + date.getDate() + ' ';
								liste[index].time = time1;
								liste[index].price = val.price;
							});
							this.tableData = liste;
							this.counts = data.total;
						} else {
							this.$message({
								showClose: true,
								message: data.msg,
								type: 'error'
							});
							this.dialogVisible = false;
						}
					} else {
						this.$message({
							showClose: true,
							message: data.msg,
							type: 'error'
						});
						this.dialogVisible = false;
					}
				});
			},

			handleClose(activityTags) {
				this.addActivitydata.activityTags.splice(this.addActivitydata.activityTags.indexOf(activityTags), 1);
			},
			showInput() {
				this.inputVisible = true;
				this.$nextTick((_) => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.addActivitydata.activityTags.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';
			},
			// 取消发布
			quxiaofabu() {
				this.$router.push({
					path: './warehouses'
				});
				this.$refs.addActivitydata.resetFields();
				this.addActivitydata.activityShopp = [];
			},
			// 发布按钮
			addActivit() {
				this.$refs.addActivitydata.validate((valid) => {
					if (valid) {
						this.$confirm('是否确定发布清仓活动?', '温馨提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							let shoppList = [];
							this.addActivitydata.activityShopp.forEach(function(val,index){
								shoppList[index] = val;
								shoppList[index].activityPrice = val.activityPrice * 100;
							});
							let data = {
								prevActivityAllId: this.activityId,
								productLists: shoppList,
								activityTabs: this.addActivitydata.activityTags.join(','),
								startTime: this.startTime,
								endTime: this.endTime,
								companyName: localStorage.getItem('companyName'),
								companyId: parseInt(localStorage.getItem('loginData')),
								industryId: parseInt(localStorage.getItem('industryId')),
							};
							console.log(data);
							const loading = this.$loading({
								lock: true,
								text: '发布中...',
								spinner: 'el-icon-loading',
								background: 'rgba(0, 0, 0, 0.7)'
							});
							this.$axios.post('admin/admin/clearance/publishClearance', data).then((res) => {
								loading.close();
								if (res.status == 200) {
									var data = res.data;
									if (data.code == 200) {
										this.$message({
											showClose: true,
											message: data.msg,
											type: 'success'
										});
										this.$router.push({
											path: './warehouses'
										});
										this.addActivitydata.activityShopp = [];
										this.$refs.addActivitydata.resetFields();
									} else {
										this.$message({
											showClose: true,
											message: data.msg,
											type: 'error'
										});
										let shoppList = [];
										this.addActivitydata.activityShopp.forEach(function(val,index){
											shoppList[index] = val;
											shoppList[index].activityPrice = val.activityPrice / 100;
										});
									}
								} else {
									console.log('ashufh');
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'error'
									});
								}
							});
						});
					}
				});
			},
			// 获取从下架列表拿到的数据
			getLowerData() {
				var data = this.$route.query.data;
				if (data != undefined) {
					this.id = data.id;
					this.addActivitydata.activityTags = data.activityTabs.split(',');
					var date = new Date(data.startTime);
					var time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
						1) + '-' + date.getDate();
					var date1 = new Date(data.endTime);
					var time2 = date1.getFullYear() + '-' + (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() +
						1) + '-' + date1.getDate();
					var time = time1 + ',' + time2;
					this.addActivitydata.activityTime = time.split(',');
					this.activityId = data.id;
					// var dataList = [];
					// data.productDTOList.forEach(function(val, index){
					// 	dataList[index] = val;
					// 	dataList[index].name = val.productName;
					// 	dataList[index].productId = val.productId;
					// 	dataList[index].activityPrice = val.activityPrice / 100;
					// 	dataList[index].numLimitation = val.numLimitation;
					// });
					// this.dataAllList = dataList;
					// this.addActivitydata.activityShopp = dataList;
					var name = '';
					var productId = '';
					var activityPrice = "";
					var numLimitation = '';
					var productNum = '';
					for(let i in data.productDTOList){
						name = data.productDTOList[i].productName;
						productId = data.productDTOList[i].productId;
						activityPrice = data.productDTOList[i].activityPrice;
						numLimitation = data.productDTOList[i].numLimitation;
						productNum = data.productDTOList[i].productNum;
					}
					this.addActivitydata.activityShopp.push({
						name: name,
						productId: productId,
						activityPrice: activityPrice / 100,
						numLimitation: numLimitation,
						productNum: productNum
					});
					console.log(this.addActivitydata.activityShopp);
				}
			}
		}
	};
</script>

<style>
	.addActivity {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}

	.addActivity .addActivity-top {
		padding-left: 20px;
		height: 45px;
		background-color: #fafbfa;
		line-height: 45px;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.addActivity .shoppXuanzhe {
		width: 80px;
		height: 20px;
		padding: 0;
		background-color: #2450d2;
		color: #fff;
		margin-top: 8px;
		border-radius: 8px;
	}

	.addActivity .el-form-item__label {
		text-align: right;
	}

	.addActivity .btoun {
		border: 1px solid #2494d2;
		color: #2494d2;
		width: 200px;
		height: 50px;
	}

	.iconEnlorder {
		position: relative;
	}

	.iconEnlorder .iconfont {
		position: absolute;
		right: 80px;
		top: -64px;
	}

	.goodsSeacher {
		width: 350px;
		height: 45px;
		background-color: #faffe0;
		margin: 0 auto;
		margin-bottom: 25px;
		position: relative;
		line-height: 30px;
	}

	.icon {
		position: absolute;
		z-index: 1;
		top: 17px;
		left: 10px;
	}

	.el-input {
		margin-left: 10px;
		width: 290px;
		height: 30px;
		border: 0px;
	}

	.seacher {
		margin-left: 10px;
	}

	.eltag {
		margin-left: 10px;
	}

	.addActivity .ElinputT .el-input__inner {
		width: 340px;
		border: 0;
		border-bottom: 1px solid #c1c1c1;
		border-radius: 0;
	}

	.zhang {
		position: absolute;
		left: 340px;
		top: 10px;
	}

	/* .addActivity .el-input__inner {
		border: 0;
		border-radius: 0;
		border-bottom: 1px solid #C1C1C1;
	} */

	.addactivityBtn {
		margin-left: 30%;
		margin-top: 100px;
	}

	.addactivityBtn .buttonr {
		width: 90px;
		height: 30px;
		border-radius: 8px;
		background-color: #2450d2;
		color: #fff;
	}

	.addactivityBtn .buttonr.mL {
		margin-left: 100px;
	}

	.shopp .el-input__inner {
		color: #2494d2;
		width: 260px;
		display: block;
		/* text-align: center; */
		border: 0px;
	}

	.delBtn {
		color: #ff0000;
		font-size: 24px;
		margin-left: 200px;
	}

	.eeInput {
		color: #2494d2;
		width: 260px;
	}

	.eeInput .el-input__inner {
		border: 0;
		color: #2494d2;
		width: 260px;
		display: inline-block;
		text-align: center;
	}

</style>
