<template>
	<!-- 添加优惠券活动 -->
	<div class="addcouponhedong" id="addcouponhedong">
		<div class="coupon-top"><label>填写发布的优惠券活动信息</label></div>
		<el-form :model="addcoupon" :rules="rules" ref="addcoupon">
			<el-form-item label="活动标题:" prop="actTitle" :label-width="labelWidth">
				<el-input class="inputEl" v-model="addcoupon.actTitle" placeholder="例如:全场优惠24元,点击立抢"></el-input>
			</el-form-item>
			<el-form-item label="选择活动优惠券:" prop="selhdcoupon" :label-width="labelWidth">
				<div v-if="addcoupon.selhdcoupon != ''">
					<el-input class="seleLabel" v-model="addcoupon.selhdcoupon"></el-input>
					<el-button class="selectBtn" @click="guanlian">重新关联</el-button>
				</div>
				<el-button @click="guanlian" v-else-if="this.addcoupon.selhdcoupon == ''" class="el-icon-circle-plus-outline couponSel">关联优惠券</el-button>
			</el-form-item>
			<el-form-item label="发布数量:" prop="numbers" :label-width="labelWidth">
				<el-input class="inputEl" v-model.number="addcoupon.numbers" placeholder="例如:该优惠券还有 2222 "></el-input>
				<label class="danwei">张</label>
			</el-form-item>
			<el-form-item label="活动时间:" prop="time" :label-width="labelWidth">
				<el-date-picker prefix-icon="md-date_range" v-model="addcoupon.time" type="daterange" start-placeholder="开始日期"
				 end-placeholder="结束日期" value-format="yyyy-MM-dd" @change="Datefunct">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="领劵限制:" prop="astrictNum" :label-width="labelWidth">
				<el-input class="inputEl" v-model.number="addcoupon.astrictNum" placeholder="每个用户的领劵上限,默认不限"></el-input>
				<label class="danwei">张</label>
			</el-form-item>
		</el-form>
		<div class="addcouponBtn">
			<el-button @click="quxiao" class="buttonr">取消</el-button>
			<el-button @click="addcouponlist" class="buttonr mL">添加</el-button>
		</div>


		<el-dialog title="关联优惠券" :visible.sync="dialogVisible" width="80%">
			<div class="iconEnlorder" @click="enlarge">
				<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
					<i class="iconfont icon-quanping"></i>
				</el-tooltip>
			</div>
			<div class="goodsSeacher">
				<i class="el-icon-search icon"></i>
				<el-input v-model="goodData"></el-input>
				<el-button @click="seacherdata" type="text" class="seacher">搜索</el-button>
			</div>
			<el-table :data="tableData" border style="width: 100%;">
				<el-table-column prop="order" type="index" label="序号" width="100" align="center">
				</el-table-column>
				<el-table-column prop="name" label="优惠券名称" width="" align="center">
				</el-table-column>
				<el-table-column prop="createByUser" label="发布人" align="center">
				</el-table-column>
				<el-table-column prop="shopp" label="关联商品" align="center">
					<template slot-scope="scope">
						<label style="color: #2494D2;">{{scope.row.shopp}}</label>
					</template>
				</el-table-column>
				<el-table-column prop="tab" label="规则" align="center">
				</el-table-column>
				<el-table-column prop="type" label="优惠券类型" align="center">
				</el-table-column>
				<el-table-column prop="countAvailable" label="库存" align="center">
				</el-table-column>
				<el-table-column label="操作" width="250" align="center">
					<template slot-scope="scope">
						<el-button @click="GLgoods(scope.row)" v-show="scope.row.bindabilityStatus == 0 && scope.row.id != shoppId" class="bulebutton" size="small">选择关联</el-button>
						<el-button type="text" style="color: #FF8D00;" v-show="scope.row.id == shoppId" size="small">当前关联</el-button>
						<el-button type="text" style="color: #FF8D00;" v-show="scope.row.bindabilityStatus != 0" size="small">已关联</el-button>
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
		name: 'addcouponhedong',
		data() {
			return {
				labelWidth: '230px',
				tableData: [],
				fullscreen: '',
				page: 1,
				limit: 20,
				counts: 0,
				goodData: '',
				shoppId: '',
				dialogVisible: false,
				addcoupon: {
					id: '',
					actTitle: '',
					selhdcoupon: '',
					numbers: '',
					time: [],
					astrictNum: ''
				},
				rules: {
					actTitle: [{
						required: true,
						message: '请输入活动标题',
						trigger: 'blur'
					}],
					selhdcoupon: [{
						required: true,
						message: '请选择活动优惠券',
						trigger: 'blur'
					}],
					numbers: [
						{ required: true, message: '请输入发布的优惠券数量', trigger: 'blur' },
						{ type: 'number', message: '请输入数字', trigger: 'blur' },
					],
					time: [{
						required: true,
						message: '请选择活动时间',
						trigger: 'blur'
					}],
				},
				times: '',
				times2: ''
			}
		},
		mounted() {
			this.getLowerData();
			this.Datefunct();
		},
		methods: {
			// 关联按钮
			guanlian() {
				this.getconpouListcoupon();
				this.dialogVisible = true;
			},
			// 选择优惠卷关联
			GLgoods(row) {
				this.shoppId = row.id;
				this.addcoupon.selhdcoupon = row.name + ',' + row.tab;
				this.dialogVisible = false;
			},
			// 时间戳转化
			Datefunct(){
				var startTime = this.addcoupon.time[0];
				var d = new Date(startTime);
				let start = d.getTime(d)
				this.times = start;
				var endTime = this.addcoupon.time[1];
				var end = new Date(endTime);
				let endT = end.getTime(end)
				this.times2 = endT;
			},
			// 添加优惠券活动
			addcouponlist() {
				this.$refs.addcoupon.validate((valid) => {
					if (valid) {
						this.$confirm('是否确定添加活动标题为 【' + this.addcoupon.actTitle + '】 的优惠券活动?', '温馨提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							let data = {
								activityTitle: this.addcoupon.actTitle,
								companyId: parseInt(localStorage.getItem('loginData')),
								companyName: localStorage.getItem('companyName'),
								couponId: this.shoppId,
								couponNum: this.addcoupon.numbers,
								endTime: this.times2,
								industryId: parseInt(localStorage.getItem('industryId')),
								numLimitation: parseInt(this.addcoupon.astrictNum),
								startTime: this.times,
							};
							const loading = this.$loading({
								lock: true,
								text: '保存中...',
								spinner: 'el-icon-loading',
								background: 'rgba(0, 0, 0, 0.7)'
							});
							this.$axios.post('admin/company/activity/coupon/publish', data).then((res) => {
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
											path: './coupon'
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
					}
				});
			},
			// 取消
			quxiao() {
				this.$refs.addcoupon.resetFields();
				this.$router.push({
					path: './coupon'
				});
			},
			// 全屏
			enlarge() {},
			handleSizeChange(val) {
				this.limit = val;
				this.getconpouListcoupon();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getconpouListcoupon();
			},

			// 优惠券搜索
			seacherdata() {
				this.getconpouListcoupon();
				this.page = 1;
			},

			// 查询优惠券列表
			getconpouListcoupon() {
				let data = {
					companyId: localStorage.getItem('loginData'),
					limit: this.limit,
					page: this.page,
					couponNameLike: this.goodData,
				};
				this.$axios.post('admin/company/activity/coupon/list_coupon', data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var list = [];
							data.list.forEach(function(val, index) {
								list[index] = val;
								list[index].type = val.type == 1 ? '满减卷' : '代金卷';
								list[index].shopp = val.productId == 0? "全场通用": val.productInfo ==null?'没有商品':val.productInfo.name;
								list[index].picture = localStorage.getItem('imgUrl') + val.picture;
							});
							this.tableData = list;
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
		
			// 从下架的列表拿到的数据
			getLowerData(){
				var data = this.$route.query.data;
				if(data != undefined){
					this.addcoupon.actTitle = data.activityTitle;
					this.addcoupon.selhdcoupon = data.couponName;
					this.addcoupon.numbers = data.couponNum;
					this.addcoupon.astrictNum = data.numLimitation;
					this.shoppId = data.couponId;
					var timea = data.startTime+','+data.endTime;
					this.addcoupon.time = timea.split(',');
				}
			},
		
		}
	}
</script>

<style>
	.addcouponhedong {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
		font-size: 14px;
	}

	.coupon-top {
		width: 100%;
		height: 45px;
		line-height: 45px;
		background-color: #FAFAFA;
		margin-bottom: 20px;
		margin-top: 20px;
		padding-left: 20px;
	}

	.addcouponhedong .inputEl .el-input__inner {
		border: 0;
		border-bottom: 1px solid #C1C1C1;
		border-radius: 0;
		width: 260px;
		text-align: center;
	}

	.seleLabel {
		width: 260px;
		display: block;
		text-align: center;
		float: left;
	}
  .seleLabel .el-input__inner{
    border: 0;
  }
	.addcouponhedong .selectBtn {
		width: 76px;
		height: 21px;
		background-color: #2450D2;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}

	.couponSel {
		width: 200px;
		height: 50px;
		border: 1px solid #2450D2;
		color: #2450D2;
	}

	.couponSel:hover {
		border: 1px solid #2450D2;
		color: #2450D2;
		background-color: #fff;
	}

	.danwei {
		position: absolute;
		left: 310px;
		top: 2px;
	}

	.addcouponhedong .el-date-editor {
		width: 270px;
	}

	.addcouponhedong .addcouponBtn {
		margin-left: 30%;
		margin-top: 100px;
	}

	.addcouponhedong .addcouponBtn .buttonr {
		width: 90px;
		height: 30px;
		border-radius: 8px;
		background-color: #2450D2;
		color: #fff;
	}

	.addcouponhedong .addcouponBtn .buttonr.mL {
		margin-left: 100px;
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
		background-color: #FAFFE0;
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
		margin-top: 7px;
		margin-left: 10px;
		width: 290px;
		height: 30px;
		border: 0px;
	}

	.seacher {
		margin-left: 10px;
	}

	.el-table .bulebutton {
		width: 76px;
		height: 21px;
		padding: 0;
		background-color: #2450D2;
		color: #fff;
		border-radius: 8px;
	}
	.addcouponhedong .el-form-item__label{
		text-align: right;
	}
</style>
