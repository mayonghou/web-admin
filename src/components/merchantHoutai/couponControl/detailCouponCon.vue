<template>
	<div class="detailcouponhedong" id="detailcouponhedong" v-loading="fullscreenLoading" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.7)">
		<div class="coupon-top"><label>优惠券活动信息</label></div>
		<el-form :model="detailcoupon" ref="detailcoupon">
			<el-form-item label="优惠券名称:" prop="name" :label-width="labelWidth">
				<label class="" v-model="detailcoupon.name">{{detailcoupon.name}}</label>
			</el-form-item>
			<el-form-item label="可使用的商品:" prop="useType" :label-width="labelWidth">
				<label class="" v-model="detailcoupon.useType">{{detailcoupon.useType == 1?'全场通用':'指定商品'}}</label>
				<el-button style="margin-left: 20px; font-size: 14px;" type="text" v-show="detailcoupon.productId != ''" @click="routershopp">{{detailcoupon.selhdcoupon}}</el-button>
			</el-form-item>
			<el-form-item label="规格:" prop="tab" :label-width="labelWidth">
				<label class="" v-model="detailcoupon.tab">{{detailcoupon.tab}}</label>
			</el-form-item>
			<el-form-item label="有效期" prop="expiration" :label-width="labelWidth">
				<label class="" v-model="detailcoupon.expiration">{{detailcoupon.expiration}}天</label>
			</el-form-item>
			<el-form-item label="发行数量:" prop="count" :label-width="labelWidth">
				<label class="" v-model="detailcoupon.count">{{detailcoupon.count}}张</label>
			</el-form-item>
			<el-form-item label="库存:" prop="countLeft" :label-width="labelWidth">
				<label class="" v-model="detailcoupon.countLeft">{{detailcoupon.countLeft}}张</label>
			</el-form-item>
			<el-form-item label="发布人:" prop="createByUser" :label-width="labelWidth">
				<label class="" v-model="detailcoupon.createByUser">{{detailcoupon.createByUser}}</label>
			</el-form-item>
			<el-form-item label="关联活动:" prop="bindabilityStatus" :label-width="labelWidth">
				<label class="" v-model="detailcoupon.bindabilityStatus">{{detailcoupon.bindabilityStatus == 0? '无限制': detailcoupon.bindabilityStatus}}</label>
			</el-form-item>
		</el-form>
		<div class="addcouponBtn">
			<el-button @click="returncou" class="buttonr mL">返回</el-button>
		</div>
		
	</div>
</template>

<script>
	export default{
		name: 'detailcouponhedong',
		data(){
			return{
				fullscreenLoading: true,
				loadingText: '加载中...',
				labelWidth: '230px',
				detailcoupon:{
					name: '',
					useType: '',
					count:'',
					time: [],
					createByUser:'',
					tab: '',
					youxiaoqi:'',
					bindabilityStatus: '',
					countLeft: '',
					productId: '',
					productInf: ''
				},
			}
		},
		mounted() {
			this.getconpouList();
		},
		methods:{
			
			// 查询详情
			getconpouList(){
				let id = this.$route.query.id;
				this.$axios.get('admin/company/coupon/select/' + id).then((res) => {
					this.fullscreenLoading = false;
					if(res.status == 200){
						var data = res.data;
						console.log(data);
						if(data.code == 200){
							this.detailcoupon = data.data;
							this.status == data.data.couponStatus;
							if(data.data.productInfo){
								this.detailcoupon.selhdcoupon = data.data.productInfo.name;
							}
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
							message: res.data.msg,
							type: 'error'
						});
					}
				});
			
			},
			routershopp(){
				this.$router.push({
					path: './goodsDetail',
					query: {
						id: this.detailcoupon.productId,
						status: 6
					},
				});
			},
			returncou(){
				this.$router.push({
					path: './couponConList',
				});
			}
		}
	}
</script>

<style>
	.detailcouponhedong{
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}
	.coupon-top{
		width: 100%;
		heihgt: 45px;
		line-height: 45px;
		background-color: #FAFAFA;
		margin-bottom: 20px;
		margin-top: 20px;
		padding-left: 20px;
	}
	.detailcouponhedong .el-form-item__label{
		text-align: right;
	}
	.inputEl {
		text-align: center;
	}
	.inputEl .el-input__inner{
		border: 0;
		border-bottom: 1px solid #C1C1C1;
		border-radius: 0;
		width: 340px;
		text-align: center;
	}
	.el-form-item__label {
		text-align: right;
	}
	.seleLabel{
		width: 200px;
		display: block;
		text-align: center;
		float: left;
	}
	.couponhedong .selectBtn{
		width: 76px;
		height: 21px;
		background-color: #2450D2;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}
	.couponSel{
		width: 200px;
		height: 50px;
		border: 1px solid #2450D2;
		color: #2450D2;
	}
	.couponSel:hover{
		border: 1px solid #2450D2;
		color: #2450D2;
		background-color: #fff;
	}
	.danwei{
		position: absolute;
		left: 310px;
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
	 .addcouponBtn .buttonr{
		width: 90px;
		height: 30px;
		border-radius: 8px;
		background-color: #2450D2;
		color: #fff;
	}
</style>
