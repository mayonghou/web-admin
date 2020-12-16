<template>
	<div class="detaildiscount" id="detaildiscount" v-loading="fullscreenLoading" :element-loading-text="loadingText"
	 element-loading-background="rgba(0, 0, 0, 0.7)">
		<div class="coupon-top"><label style="margin-left: 50px;">折扣活动信息</label></div>
		<el-form :model="detaildiscount" ref="detaildiscount">
			<el-form-item label="活动标题:" :label-width="labelWidth">
				<el-input v-model="detaildiscount.activityTitle" readonly class="activity"></el-input>
			</el-form-item>
			<el-form-item label="活动商品:" :label-width="labelWidth">
				<el-button type="text" @click="goodDetail" v-model="detaildiscount.activityshopp">{{detaildiscount.activityshopp}}</el-button>
			</el-form-item>
			<el-form-item label="发布数量:" :label-width="labelWidth">
				<el-input v-model="detaildiscount.number" readonly class="activity"></el-input>
			</el-form-item>
			<el-form-item label="活动标签:" :label-width="labelWidth">
				<el-tag :key="item" v-for="item in this.detaildiscount.tdynamicTags" v-model="detaildiscount.tdynamicTags" class="eltag">
					{{item}}
				</el-tag>
			</el-form-item>
			<el-form-item label="折扣:" :label-width="labelWidth">
				<label v-model="detaildiscount.zhekou" readonly class="activity">{{detaildiscount.zhekou}}</label>
				<label style="margin-left: 200px;">折扣价：{{this.zheprice}}元</label>
			</el-form-item>
			<el-form-item label="活动时间:" :label-width="labelWidth">
				<el-input v-model="detaildiscount.Times" readonly class="activity"></el-input>
			</el-form-item>
			<el-form-item label="每人限购:" :label-width="labelWidth">
				<el-input v-model="detaildiscount.activityNum" readonly class="activity"></el-input>
			</el-form-item>
		</el-form>
		<div class="addcouponBtn">
			<el-button @click="returnBtn" class="buttonr mL">返回</el-button>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'detaildiscount',
		data() {
			return {
				labelWidth: '230px',
				fullscreenLoading: true,
				loadingText: '加载中...',
				detaildiscount: {
					activityTitle: '',
					activityshopp: '',
					number: '',
					tdynamicTags: [],
					zhekou: '',
					Times: '',
					activityNum: '',
				},
				zheprice: '',
				id: '',
			}
		},
		mounted() {
			this.getDiscount();
		},
		methods: {
			returnBtn() {
				this.$router.push({
					path: './discount'
				});
			},
			goodDetail() {
				this.$router.push({
					path: './goodsDetail',
					query: {
						id: this.id,
						status: 5
					}
				});
			},
			getDiscount() {
				var id = this.$route.query.id;
				this.$axios.get('admin/admin/discount/select/' + id).then((res) => {
					this.fullscreenLoading = false;
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							this.id = data.data.id;
							this.detaildiscount.activityTitle = data.data.activityTitle;
							this.detaildiscount.activityshopp = data.data.productName;
							this.detaildiscount.number = data.data.productNum;
							this.detaildiscount.tdynamicTags = data.data.activityTabs.split(',');
							this.detaildiscount.zhekou = data.data.discount;
							this.zheprice = data.data.activityPrice / 100;  
							var date = new Date(data.data.startTime);
							var date1 = new Date(data.data.endTime);
							var time = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
								1) + '-' + date.getDate();
							var time1 = date1.getFullYear() + '-' + (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() +
								1) + '-' + date1.getDate();
							this.detaildiscount.Times = time + '------' + time1;
							this.detaildiscount.activityNum = data.data.numLimitation == 0 ? '无限制' : data.data.numLimitation;
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
		},

	}
</script>

<style>
	.detaildiscount {
		width: 1200px;
		margin: 0 auto;
	}

	.coupon-top {
		width: 100%;
		height: 45px;
		background-color: #FAFBFA;
		margin-top: 20px;
		line-height: 45px;
		margin-bottom: 20px;
	}

	.activity .el-input__inner {
		border: 0;
	}

	.detaildiscount .el-form-item__label {
		text-align: right;
	}

	.addcouponBtn {
		margin-left: 30%;
	}

	.eltag {
		margin-left: 10px;
	}
	.el-form-item__content{
		line-height: 32px;
	}
	.addcouponBtn .buttonr {
		width: 90px;
		height: 30px;
		background-color: #2482D2;
		color: #fff;
		border-radius: 8px;
		padding: 0;
	}
</style>
