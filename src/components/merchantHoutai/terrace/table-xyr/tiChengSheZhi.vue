<template>
	<div calss="tiChengSheZhi">
		<div>企业账户余额设置：</div>
		<div style="height: 20px;"></div>
		<el-form :model="moneyList">
			<el-form-item label="设置企业服务费比例:" :label-width="labelwidth">
				<el-input v-model="moneyList.serviceMoney" oninput="value=value.replace(/[^0-9]/g,'')" style="width: 200px;" placeholder="请输入企业服务费比例"></el-input>%
			</el-form-item>
			<el-form-item label="设置企业押金:" :label-width="labelwidth">
				<el-input v-model="moneyList.cashPledge" oninput="value=value.replace(/[^0-9]/g,'')" style="width: 200px;" placeholder="请输入企业押金"></el-input>
			</el-form-item>
			<el-form-item label="设置分账时间为交易完成后:" :label-width="labelwidth">
				<el-select v-model="moneyList.subAccountTime" style="width: 200px;" placeholder="请选择分账时间">
					<el-option v-for="item in options" :key="item.index" :label="item.name" :value="item.index"></el-option>
				</el-select>分账
			</el-form-item>
		</el-form>
		<div style="margin-top: 30px;">代言提成设置：</div>
		<div style="margin-top: 30px;">
			<span>设置企业代言订单扣除比例： </span>
			<el-input v-model="daiyanOrder" style="width:100px;"></el-input>%
			<span>&nbsp;&nbsp;&nbsp; 其中代言企业提成比例： </span>
			<el-input v-model="daiyanRoyalty" oninput="value=value.replace(/[^0-9]/g,'')" style="width:100px;"></el-input>%
			<span>&nbsp;&nbsp;&nbsp; 其中代言客服提成比例： </span>
			<el-input v-model="daiyanService" oninput="value=value.replace(/[^0-9]/g,'')" style="width:100px;"></el-input>%
			<span>&nbsp;&nbsp;&nbsp; 平台提成比例： </span>
			<el-input v-model="terraceTiCheng" oninput="value=value.replace(/[^0-9]/g,'')" style="width:100px;"></el-input>%
		</div>
		<div class="gbaocun">
			<el-button class="baocunBtn" @click="buncunBtn">保存</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		props:['QyId'],
		data(){
			return{
				labelwidth: '220px',
				moneyList:{
					serviceMoney:'', //企业服务费比例
					cashPledge:'',//押金
					subAccountTime:''//分账时间
				},
				daiyanOrder:'',//代言企业订单扣除比例
				daiyanRoyalty:'',//代言企业提成比例
				daiyanService:'',//代言客服提成比例
				terraceTiCheng:'',//平台提成比例
				id:'',
				// 分帐时间
				options:[
					{
						index: 0,
						name:'立即'
					},
					{
						index: 1,
						name:'1天'
					},
					{
						index: 3,
						name:'3天'
					},
					{
						index: 5,
						name:'5天'
					},
					{
						index: 7,
						name:'7天'
					},
					{
						index: 10,
						name:'10天'
					},
					{
						index: 13,
						name:'13天'
					},
					{
						index: 15,
						name:'15天'
					},
					{
						index: 20,
						name:'20天'
					},
					{
						index: 25,
						name:'25天'
					},
					{
						index: 30,
						name:'30天'
					}
				]
			}
		},
		mounted() {
			this.getFinancialSetting();
		},
		methods:{
			// 查询
			getFinancialSetting(){
				this.$axios.get('admin/company/get_financial_setting?companyId='+this.QyId).then((res) => {
					if(res.status == 200){
						let data = res.data;
						if(data.code == 200){
							this.moneyList.serviceMoney = data.data.platformPercentage;
							this.moneyList.cashPledge = data.data.depositReceived / 100;
							this.moneyList.subAccountTime = data.data.profitSharingTime;
							this.daiyanOrder = data.data.endorsementPercentageTotal;
							this.daiyanRoyalty = data.data.endorsementPercentageCompany;
							this.daiyanService = data.data.endorsementPercentageReceptionist;
							this.terraceTiCheng = data.data.endorsementPercentagePlatform;
							this.id = data.data.id;
						}
					}
				});
			},
			// 保存
			buncunBtn(){
				if(this.moneyList.serviceMoney < 0 || this.moneyList.serviceMoney == ''){
					return this.$message({
					    showClose: true,
					    message: '企业服务费比例必须大于等于零且不能为空',
					    type: 'error'
					});
				} else if(this.moneyList.cashPledge < 0 || this.moneyList.cashPledge == '') {
					return this.$message({
					    showClose: true,
					    message: '企业押金必须大于等于零且不能为空',
					    type: 'error'
					});
				} else if(this.moneyList.subAccountTime == '') {
					return this.$message({
					    showClose: true,
					    message: '分账时间不能为空',
					    type: 'error'
					});
				} else if(this.daiyanOrder == '' || this.daiyanOrder < 0 ){
					return this.$message({
					    showClose: true,
					    message: '企业代言订单必须大于零且不能为空',
					    type: 'error'
					});
				}else if(this.daiyanRoyalty == '' || this.daiyanRoyalty < 0 ){
					return this.$message({
					    showClose: true,
					    message: '代言企业提成必须大于零且不能为空',
					    type: 'error'
					});
				} else if(this.daiyanService == '' || this.daiyanService < 0 ){
					return this.$message({
					    showClose: true,
					    message: '代言客服提成比例提成必须大于零且不能为空',
					    type: 'error'
					});
				} else if(this.terraceTiCheng == '' || this.terraceTiCheng < 0 ){
					return this.$message({
					    showClose: true,
					    message: '平台提成比例提成必须大于零且不能为空',
					    type: 'error'
					});
				} else if(parseInt(this.daiyanOrder) != parseInt(this.daiyanRoyalty) + parseInt(this.daiyanService) + parseInt(this.terraceTiCheng)){
					return this.$message({
					    showClose: true,
					    message: '代言企业订单扣除比例是 代言企业与代言客服以及平台提成比例之和',
					    type: 'error'
					});
				} else {
					let datas = {
						companyId: parseInt(this.QyId),
						id:parseInt(this.id),
						endorsementPercentageCompany:parseInt(this.daiyanRoyalty), //代言企业
						endorsementPercentagePlatform:parseInt(this.terraceTiCheng),//代言平台
						endorsementPercentageTotal: parseInt(this.daiyanOrder),//代言企业订单扣除比例
						endorsementPercentageReceptionist: parseInt(this.daiyanService),//代言客服
						depositReceived:parseInt(this.moneyList.cashPledge * 100),//押金
						profitSharingTime:parseInt(this.moneyList.subAccountTime), //分账时间
						platformPercentage:parseInt(this.moneyList.serviceMoney)
					}
					this.$axios.post('admin/company/save_financial_setting', datas).then((res) => {
						if(res.status == 200){
							let data = res.data;
							if(data.code == 200){
								this.$message({
								    showClose: true,
								    message: data.msg,
								    type: 'success'
								});
								this.$router.push({
									path:'./index'
								});
							} else {
								this.$message({
								    showClose: true,
								    message: data.msg,
								    type: 'error'
								});
							}
						}
					});
				}
				
			}
		}
	}
</script>

<style scoped>
	.tiChengSheZhi{
		margin-top: 64px;
	}
	.gbaocun{
		width: 100%;
		text-align: center;
		margin-top: 30px;
	}
	.gbaocun .baocunBtn{
		width: 150px;
		height: 30px;
		background-color: #2450D2;
		padding: 0;
		color: #fff;
	}
</style>
