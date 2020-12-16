<template>
	<div class="detailcouponhedong" id="detailcouponhedong" v-loading="fullscreenLoading" :element-loading-text="loadingText"
	 element-loading-background="rgba(0, 0, 0, 0.7)">
		<div class="coupon-top"><label>优惠券活动信息</label></div>
		<el-form :model="detailcoupon" ref="detailcoupon">
			<el-form-item label="活动标题:" prop="actTitle" :label-width="labelWidth">
				<label class="seleLabel" v-model="detailcoupon.actTitle">{{detailcoupon.actTitle}}</label>
			</el-form-item>
			<el-form-item label="选择活动优惠券:" prop="selhdcoupon" :label-width="labelWidth">
				<el-button @click="couponDetail" type="text" class="seleLabel" v-model="detailcoupon.selhdcoupon">{{detailcoupon.selhdcoupon}}</el-button>
			</el-form-item>
			<el-form-item label="发布数量:" prop="number" :label-width="labelWidth">
				<label class="seleLabel" v-model="detailcoupon.number">{{detailcoupon.number}}</label>
				<label>张</label>
			</el-form-item>
			<el-form-item label="活动时间:" prop="time" :label-width="labelWidth">
				<label class="seleLabel" v-model="detailcoupon.time">{{detailcoupon.time}}</label>
			</el-form-item>
			<el-form-item label="领劵限制:" prop="astrictNum" :label-width="labelWidth">
				<label class="seleLabel" v-model="detailcoupon.astrictNum">{{detailcoupon.astrictNum}}</label>
				<label>张</label>
			</el-form-item>
		</el-form>
		<div class="addcouponBtn">
			<el-button @click="detacou" class="buttonr mL">返回</el-button>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'detailcouponhedong',
		data() {
			return {
				labelWidth: '230px',
				fullscreenLoading: false,
				loadingText: '加载中...',
				detailcoupon: {
					actTitle: '',
					selhdcoupon: '',
					number: '',
					time: '',
					astrictNum: ''
				},
				couponId: ''
			}
		},
		mounted() {
			this.getconpoudetail();
		},
		methods: {
			couponDetail() {
				this.$router.push({
					path: './detailCouponCon',
					query: {
						id: this.couponId,
						status: 2
					}
				});
			},
			// 返回
			detacou() {
				this.$router.push({
					path: './coupon'
				});
			},
			// 查询优惠券列表
			getconpoudetail() {
				var data = this.$route.query.data;
				this.couponId = data.couponId;
				
				var date = new Date(data.startTime);
				var time1 = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +
					1) + '-' + date.getDate() + ' '; //+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

				var date1 = new Date(data.endTime);
				var time2 = date1.getFullYear() + '-' + (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() +
					1) + '-' + date1.getDate(); // + ' ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
				this.detailcoupon.actTitle = data.activityTitle;
				this.detailcoupon.selhdcoupon = data.couponName;
				this.detailcoupon.number = data.couponNum;
				this.detailcoupon.time = time1 + " ---- " + time2;;
				this.detailcoupon.astrictNum = data.numLimitation;
			},
		}
	}
</script>

<style>
	.detailcouponhedong {
		width: 1200px;
		margin: 0 auto;
	}

	.coupon-top {
		width: 100%;
		heihgt: 45px;
		line-height: 45px;
		background-color: #FAFAFA;
		margin-bottom: 20px;
		margin-top: 20px;
		padding-left: 20px;
	}

	.inputEl {
		text-align: center;
	}

	.inputEl .el-input__inner {
		border: 0;
		border-bottom: 1px solid #C1C1C1;
		border-radius: 0;
		width: 340px;
		text-align: center;
	}

	.seleLabel {
		/* width: 260px; */
		display: block;
		text-align: center;
		float: left;
		font-size: 14px;
	}

	.couponhedong .selectBtn {
		width: 76px;
		height: 21px;
		background-color: #2450D2;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}

	.detailcouponhedong .el-form-item__label {
		text-align: right;
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
		/* left: 310px; */
		top: 2px;
	}

	.el-date-editor {
		border: 0;
		border-radius: 0;
		border-bottom: 1px solid #ccc;
	}

	.addcouponBtn {
		margin-left: 30%;
		margin-top: 100px;
	}

	.addcouponBtn .buttonr {
		width: 90px;
		height: 30px;
		border-radius: 8px;
		background-color: #2450D2;
		color: #fff;
	}
</style>
