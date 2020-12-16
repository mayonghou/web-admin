<template>
	<!-- 限时抢购详情 -->
	<div class="flashSaleDetail" id='flashSaleDetail'>
		<div class="flashSaleDetail-top"><label style="margin-left: 20px;">限时抢购活动详情</label></div>
		<el-form :model="flashDetail" ref="flashDetail">
			<el-form-item label="活动商品:" label-width="230px">
				<el-button type="text" @click="goodsDetail" class="activityInput">{{this.flashDetail.productName}}</el-button>
			</el-form-item>
			<el-form-item label="发布数量:" label-width="230px">
				<el-input v-model="flashDetail.productNum" readonly class="activityInput"></el-input>
			</el-form-item>
			<el-form-item label="活动标签:" label-width="230px">
				<el-tag effect="plain" type="info" :key="item" v-for="item in this.flashDetail.activityTabs" v-model="flashDetail.activityTabs" class="eltag">
					{{item}}
				</el-tag>
			</el-form-item>
			<el-form-item label="抢购价:" label-width="230px">
				<el-input v-model="flashDetail.activityPrice" readonly class="activityInput"></el-input>
			</el-form-item>
			<el-form-item label="活动时间:" label-width="230px">
				<el-input v-model="flashDetail.time" readonly class="activityInput"></el-input>
			</el-form-item>
			<el-form-item label="每人限购:" label-width="230px">
				<el-input v-model="flashDetail.numLimitation" readonly class="activityInput"></el-input>
			</el-form-item>
		</el-form>
		<div class="detail-btn">
			<el-button @click="returnBtn" class="Btn">返回</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'flashSaleDetail',
		data() {
			return {
				flashDetail: {
					productName: '',
					productNum: '',
					activityTabs: [],
					activityPrice: '',
					time: '',
					numLimitation: '',
					id: ''
				}
			}
		},
		mounted() {
			this.getflashDeta();
		},
		methods: {
			returnBtn(){
				this.$router.push({
					path:'./flashSale'
				});
			},
			goodsDetail(){
				this.$router.push({
					path: './goodsDetail',
					query:{
						id: this.id,
						status: 7
					}
				});
			},
			getflashDeta(){
				var data = this.$route.query.data;
				if(data != undefined){
					this.flashDetail = data;
					this.id = data.productId;
					var dd = [];
					data.activityTabs.split(',').forEach(function(val, index){
						dd[index] = val
					});
					this.flashDetail.activityTabs = dd;
					this.flashDetail.numLimitation = data.numLimitation == 0? '无限制': data.numLimitation;
				}
			}
		}
	}
</script>

<style>
	.flashSaleDetail {
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
	}

	.flashSaleDetail-top {
		width: 100%;
		height: 45px;
		line-height: 45px;
		background: #fafbfa;
		margin-top: 20px;
	}

	.activityInput .el-input__inner {
		border: 0;
	}

	.detail-btn .Btn {
		width: 90px;
		height: 30px;
		background: #2450d2;
		color: #fff;
		margin-left: 20%;
	}
	.eltag{
		margin-left: 10px;
	}
</style>
