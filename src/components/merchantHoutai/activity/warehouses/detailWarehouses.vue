<template>
	<!-- 清仓详情 -->
	<div class="detailWarehourese" id="detailWarehourese">
		<div class="detail-top"><label style="margin-left: 20px">清仓出来活动详情</label></div>
		<el-form :model="detailWarehou">
			<el-form-item label="活动商品:" label-width="130px">
				<div class="warehou" v-for="item in this.detailWarehou.activityShopp" :key="item.index">
					<div class="warehou-a">
						<span style="color: #2494D2;">{{item.productName}}</span>
					</div>
					<div class="warehou-a">
						<span style="font-weight: bold; margin-left: 10px;">清仓价：</span>
						<span>{{item.activityPrice / 100}}元</span>
					</div>
					<div class="warehou-a">
						<span style="font-weight: bold; margin-left: 5px;">清仓价：</span>
						<span>{{item.productNum}}件</span>
						<span>（剩余{{item.countLeft}}件）</span>
					</div>
					<div class="warehou-a">
						<span style="font-weight: bold; margin-left: 10px;">每人限购：</span>
						<span>{{item.numLimitation == 0?'无限':item.numLimitation}}</span>
					</div>
				</div>
			</el-form-item>
			<el-form-item label="活动标签:" label-width="130px">
				<el-tag :key="item" effect="plain" type="info" v-for="item in this.detailWarehou.tdynamicTags" v-model="detailWarehou.tdynamicTags" class="eltag">
					{{ item }}
				</el-tag>
			</el-form-item>
			<el-form-item label="活动时间:" label-width="130px">
				<el-date-picker v-model="detailWarehou.time" type="monthrange" readonly prefix-icon="md-date_range" range-separator="-"
				 :clearable="clearable" start-placeholder="开始月份" end-placeholder="结束月份">
				</el-date-picker>
			</el-form-item>
		</el-form>
		<div class="detailBtn">
			<el-button @click="retrunBtn" class="dBTN">返回</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'detailWarehourese',
		data() {
			return {
				clearable: false,
				detailWarehou: {
					activityShopp: [],
					tdynamicTags: [],
					time: [],
					activityLimit: ''
				}
			};
		},
		mounted() {
			this.getDatadetail();
		},
		methods: {
			retrunBtn() {
				this.$router.push({
					path: './warehouses'
				});
			},
			getDatadetail() {
				var data = this.$route.query.data;
				console.log(data);
				if(data != undefined){
					this.detailWarehou.activityShopp = data.productDTOList;
					var dddd= [];
					data.activityTabs.split(',').forEach(function(val,index){
						dddd[index] = val;
					});
					this.detailWarehou.tdynamicTags = dddd;
					this.detailWarehou.time = data.time.split('----');
					
				}
			}
		}
	};
</script>

<style>
	.detailWarehourese {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}

	.detail-top {
		width: 100%;
		height: 45px;
		line-height: 45px;
		background: #fafbfa;
		margin-bottom: 20px;
	}

	.detailWarehourese .shoppNamwe {
		display: inline-block;
		width: 350px;
		color: #2494d2;
		margin-left: 20px;
	}

	.qingcprice {
		display: inline-block;
		margin-left: 30px;
	}

	.price {
		display: inline-block;
		margin-left: 50px;
	}

	.el-tag {
		margin-left: 15px;
	}

	.detailWarehourese .el-date-editor {
		border: 0;
	}

	.tiMeInput .el-input__inner {
		border: 0;
	}

	.detailBtn .dBTN {
		width: 90px;
		height: 30px;
		background: #2482d2;
		color: #fff;
		padding: 0;
		margin-left: 35%;
	}
	.warehou{
		display: flex;
		justify-content: space-around;
		width: 60%;
	}
	.warehou-a{
	}
</style>
