<template>
	<div class="lookDetailData" id="lookDetailData">
		<div class="order-top">
			<label class="order">订单详情</label>
			<label class="orderstatus" v-model="statusName">订单状态：{{statusName}}</label>
		</div>
		<div class="orderTabel">
			<div class="tabel-top clearfix">
				<div class="jbxx fl">基本信息：</div>
				<el-button class="returnOrd" @click="returnOrder">返回</el-button>
			</div>
			<ul class="detailUl">
				<li class="detailli width">
					<div class="detail">订单编号</div>
					<div class="detail active" v-model="orderSn">{{orderSn}}</div>
				</li>
				<li class="detailli width">
					<div class="detail">客户名</div>
					<div class="detail active" v-model="userName">{{userName}}</div>
				</li>
				<li class="detailli width">
					<div class="detail width">订单金额</div>
					<div class="detail active" v-model="payAmount">￥{{payAmount}}</div>
				</li>
				<li class="detailli width">
					<div class="detail ">客户名</div>
					<div class="detail active" v-model="userName">{{userName}}</div>
				</li>
				<li class="detailli width">
					<div class="detail width">订单类型</div>
					<div class="detail active"v-model="orderType">{{orderType==1?'活动订单':'正常订单'}}</div>
				</li>
			</ul>
			<ul class="detailUl">
				<li class="detailli width">
					<div class="detail">支付方式</div>
					<div class="detail active" v-model="payTypeName">{{payTypeName}}</div>
				</li>
				<li class="detailli width">
					<div class="detail">订单状态</div>
					<div class="detail active" v-model="status">{{status}}</div>
				</li>
				<li class="detailli width">
					<div class="detail">创建时间</div>
					<div class="detail active" v-model="createTime">{{createTime}}</div>
				</li>
				<li class="detailli width">
					<div class="detail">发货单号</div>
					<div class="detail active" v-model="deliverySn">{{deliverySn}}</div>
				</li>
				<li class="detailli width">
					<div class="detail">活动信息</div>
					<div class="detail active"v-model="promotionInfo">{{promotionInfo}}</div>
				</li>
			</ul>

			<div class="tabel-top xx clearfix">
				<div class="shxx fl">收货信息：</div>
			</div>
			<ul class="detailUl">
				<li class="detailli shouhuo">
					<div class="detail">收货人</div>
					<div class="detail active" v-model="receiverName">{{receiverName}}</div>
				</li>
				<li class="detailli shouhuo">
					<div class="detail">手机号</div>
					<div class="detail active" v-model="receiverPhone">{{receiverPhone}}</div>
				</li>
				<li class="detailli shouhuo">
					<div class="detail">收货地址</div>
					<div class="detail active" v-model="receiverDetailAddress">{{receiverDetailAddress}}</div>
				</li>
			</ul>
			<div></div>
			<div class="tabel-top jj clearfix">
				<div class="shxx fl">商品信息：</div>
			</div>
			<el-table :data="tablelist" style="width: 100%">
				<el-table-column type="index" label="序号">
				</el-table-column>
				<el-table-column prop="productPic" label="商品图片">
					<template slot-scope="scope">
						<img width="80" height="80" :src="scope.row.productPic" />
					</template>
				</el-table-column>
				<el-table-column prop="productName" label="商品名称">
				</el-table-column>
				<el-table-column prop="promotionName" label="关联活动">
				</el-table-column>
				<el-table-column prop="price" label="原价">
					<template slot-scope="scope">
						<label>￥{{scope.row.price / 100}}</label>
					</template>
				</el-table-column>
				<el-table-column prop="realAmount" label="活动价">
				</el-table-column>
				<el-table-column prop="productAttr" label="属性">
				</el-table-column>
				<el-table-column prop="productQuantity" label="数量">
				</el-table-column>
				<el-table-column prop="subTotal" label="小计">
				</el-table-column>
			</el-table>
			<el-divider></el-divider>
			<div class="heji fr">
				<label>合计：</label>
				<label class="red" v-model="countPrice">￥ {{countPrice}}</label>
			</div>
			<div class="tabel-top jj clearfix">
				<div class="shxx fl">特殊物品：</div>
			</div>
			<ul class="detailUl">
				<li class="detailli shouhuo">
					<div class="detail">商品名</div>
					<div class="detail active" v-model="name">{{name}}</div>
				</li>
				<li class="detailli shouhuo">
					<div class="detail">价格</div>
					<div class="detail active" v-model="tsprice">￥{{tsprice}}</div>
				</li>
				<li class="detailli shouhuo">
					<div class="detail">所属代言企业</div>
					<div class="detail active" v-model="companyName">{{companyName}}</div>
				</li>
			</ul>
			<div class="tabel-top jj clearfix">
				<div class="jbxx fl">费用信息：</div>
			</div>
			<ul class="detailUl">
				<li class="detailli shouhuo">
					<div class="detail">商品合计</div>
					<div class="detail active" v-model="shoppCount">￥{{shoppCount}}</div>
				</li>
				<li class="detailli shouhuo">
					<div class="detail">配送费</div>
					<div class="detail active" v-model="peisongfei">￥{{peisongfei}}</div>
				</li>
				<li class="detailli shouhuo">
					<div class="detail">优惠券</div>
					<div class="detail active" v-model="youhuijuan">-￥{{youhuijuan}}</div>
				</li>
			</ul>
			<ul class="detailUl">
				<li class="detailli shouhuo">
					<div class="detail">活动优惠</div>
					<div class="detail active" v-model="hedongyouhui">-￥{{hedongyouhui}}</div>
				</li>
				<li class="detailli shouhuo">
					<div class="detail">订单总金额</div>
					<div class="detail red active" v-model="orderCountmeney">￥{{orderCountmeney}}</div>
				</li>
				<li class="detailli shouhuo">
					<div class="detail">应付款金额</div>
					<div class="detail red active" v-model="yingfumenay">￥{{yingfumenay}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'lookDetailData',
		data() {
			return {
				statusName:'',
				
				orderSn:'',
				payAmount:'',
				orderType: '',
				userName: '',
				payTypeName:'',
				status: '',
				createTime: '',
				deliverySn: '',
				promotionInfo: '',
				receiverName: '',
				receiverPhone: '',
				receiverDetailAddress: '',
				
				countPrice:'',
				
				companyName:'',
				name: '',
				tsprice:'',
				
				tablelist:[],
				
				// 费用信息
				shoppCount: '',
				peisongfei: '',
				youhuijuan: '',
				hedongyouhui: '',
				orderCountmeney: '',
				yingfumenay: ''
			}
		},
		mounted() {
			this.getAdminQueryOrderInfo();
		},
		methods: {
			returnOrder() {
				this.$router.push({
					path: './order'
				});
			},
			getAdminQueryOrderInfo(){
				let orderId = this.$route.query.id;
				let userName = this.$route.query.name;
				let payTypeName = this.$route.query.payTypeName;
				let statusName = this.$route.query.statusName;
				this.$axios.get('admin/order/adminQueryOrderInfo?orderId=' + orderId).then((res) => {
					if(res.status == 200){
						var data = res.data;
						if (data.code == 200) {
							let tableListData = data.data.orderInfo;
							this.orderSn = tableListData.orderSn;
							this.payAmount = tableListData.payAmount;
							this.orderType = tableListData.orderType;
							this.payType = tableListData.payType;
							this.status = tableListData.status;
							this.createTime = tableListData.createTime;
							this.deliverySn = tableListData.deliverySn;
							this.promotionInfo = tableListData.promotionInfo;
							this.receiverName = tableListData.receiverName;
							this.receiverPhone = tableListData.receiverPhone;
							this.receiverDetailAddress = tableListData.receiverDetailAddress;
							this.userName = userName;
							this.payTypeName = payTypeName;
							this.statusName = statusName;
							var list = [];
							var subTotal = '';
							var youhuijuan = '';
							data.data.productList.forEach(function(val, index){
								list[index] = val;
								list[index].productPic = localStorage.getItem('imgUrl') + val.productPic;
								subTotal = val.subTotal;
								youhuijuan = val.realAmount;
								console.log(val);
							});
							this.tablelist = list;
							this.countPrice = subTotal;
							this.youhuijuan = youhuijuan;
							this.hedongyouhui = youhuijuan;
							this.shoppCount = this.countPrice;
							
							let teshushangping = data.data.specialProduct;
							this.name = teshushangping.name;
							this.tsprice = teshushangping.price;
							this.companyName = teshushangping.companyName;
							
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
				})
			},
			
		}
	}
</script>

<style>
	.detailUl .detailli{
		list-style: none;
		border: 1px solid #c1c1c1;
		border-right: 0;
		float: left;
	}
	.detailUl .detailli:nth-child(5){
		border-right: 1px solid #c1c1c1;
	}
	.detailli.width{
		width: 218px;
		height: 80px;
	}
	.detailli.shouhuo{
		width: 360px;
		height: 80px;
	}
	.detailli.shouhuo:nth-child(3){
		border-right: 1px solid #c1c1c1;
	}
	.detail{
		width: 100%;
		height: 38px;
		background-color: #F1FAFD;
		text-align: center;
		line-height: 38px;
	}
	.detail.active{
		border-top: 1px solid #c1c1c1;
		background-color: #ffffff;
		font-size: 10px;
	}
	.clearfix:after {
		clear: both;
		content: '';
		display: block;
	}

	.fl {
		float: left;
	}
	.fr {
		float: right;
	}
	.lookDetailData {
		width: 100%;
		box-sizing: border-box;
	}

	.orderstatus {
		float: right;
		color: #FF8D00;
	}

	.orderTabel {
		width: 100%;
		margin: 0 auto;
		margin-top: 20px;
	}

	.orderTabel .tabel-top {
		margin-top: 15px;
		margin-bottom: 10px;
	}
	.orderTabel .tabel-top.xx {
		margin-top: 200px;
		margin-bottom: 10px;
	}
	.orderTabel .tabel-top.jj {
		margin-top: 100px;
		margin-bottom: 10px;
	}
	.orderTabel .tabel-top .returnOrd {
		float: right;
		width: 94px;
		height: 30px;
		background: #2450D2;
		color: #fff;
		border-radius: 8px;
	}

	.el-table--border:nth-child(1) {
		margin-top: 20px;
	}

	.cell {
		text-align: center;
	}

	.shxx {
		margin-top: 20px;
	}
	.heji{
		margin-top: -20px;
		font-size: 14px;
	}
	.red{
		color: #FF0000;
	}
</style>
