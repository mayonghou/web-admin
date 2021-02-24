<template>
	<div class="orderDispose" id="orderDispose">
		<ul class="orderUl">
			<div class="retuenZhuye">
				<el-button type="text" @click="returnHomePage">返回主页</el-button>
			</div>
			<li class="orderLi">
				<el-card class="elCard-li">
				<div>订单编号：44643548961563789645746</div>
				<div class="orderMessage">
					<div class="personageMessage">
						<div class="avatar">
							<img class="img" src="../../../assets/nan.png" />
							<img class="img" src="../../../assets/nv.png" />
							<el-avatar :size="80" :src="avatarUrl"></el-avatar>
						</div>
						<div class="avatarMessage">
							<p style="font-size: 20px;">高成立</p>
							<p style="margin-left: 30%; margin-top: -10px;">管理员</p>
							<p style="font-size: 16px;">贵州万疆烽火科技有限公司</p>
							<p class="" style="font-size: 16px;">
								<span>成交价：</span>
								<span style="color: #FF0000;">300/￥</span>
							</p>
						</div>
					</div>
					<div class="orderRequire">
						<div>订单要求：</div>
						<p style="text-indent: 30px;">sadjksajdoisajdiosjhoidjhsaoihui</p>
					</div>
					<div class="orderText">
						<div class="ordertitle">订单内容及数量：</div>
						<div class="renwuNumber">
							<div class="renwuList">
								<div>图片任务：</div>
								<div style="color: #FF8D00;">共10张</div>
							</div>
							<div class="renwuList">
								<div>视频任务：</div>
								<div style="color: #FF8D00;">共10张</div>
							</div>
							<div class="renwuList">
								<div>文档任务：</div>
								<div style="color: #FF8D00;">共10张</div>
							</div>
						</div>
					</div>
				</div>
				<div class="renwuDeadline">
					<span>任务期限：</span>
					<span>2020.02.03 24:00 —— 2020.03.20 24:00</span>
					<span style="color: #FF8D00; margin-left: 10px;">剩余30天,请尽快完成任务</span>
				</div>
				<div class="orderCreateTime">
					<span>订单创建时间：</span>
					<span>2020.02.03 24:00</span>
				</div>
				<div class="anniuBtn">
					<el-button class="elBTn">知道了</el-button>
				</div>
				</el-card>
			</li>
			<li class="orderLi">
				<el-card>
				<div>订单编号：44643548961563789645746</div>
				<div class="orderMessage">
					<div class="personageMessage">
						<div class="avatar">
							<img class="img" src="../../../assets/nan.png" />
							<img class="img" src="../../../assets/nv.png" />
							<el-avatar :size="80" :src="avatarUrl"></el-avatar>
						</div>
						<div class="avatarMessage">
							<p style="font-size: 20px;">高成立</p>
							<p style="margin-left: 30%; margin-top: -10px;">管理员</p>
							<p style="font-size: 16px;">贵州万疆烽火科技有限公司</p>
							<p class="" style="font-size: 16px;">
								<span>成交价：</span>
								<span style="color: #FF0000;">300/￥</span>
							</p>
						</div>
					</div>
					<div class="orderRequire">
						<div>订单要求：</div>
						<p style="text-indent: 30px;">sadjksajdoisajdiosjhoidjhsaoihui</p>
					</div>
					<div class="orderText">
						<div class="ordertitle">订单内容及数量：</div>
						<div class="renwuNumber">
							<div class="renwuList">
								<div>图片任务：</div>
								<div style="color: #FF8D00;">共10张</div>
							</div>
							<div class="renwuList">
								<div>视频任务：</div>
								<div style="color: #FF8D00;">共10张</div>
							</div>
							<div class="renwuList">
								<div>文档任务：</div>
								<div style="color: #FF8D00;">共10张</div>
							</div>
						</div>
					</div>
				</div>
				<div class="renwuDeadline">
					<span>任务期限：</span>
					<span>2020.02.03 24:00 —— 2020.03.20 24:00</span>
					<span style="color: #FF8D00; margin-left: 10px;">剩余30天,请尽快完成任务</span>
				</div>
				<div class="orderCreateTime">
					<span>订单创建时间：</span>
					<span>2020.02.03 24:00</span>
				</div>
				<div class="anniuBtn">
					<el-button class="elBTn yichuli">已处理</el-button>
					<span style="height: 30px;">请在“进行中的订单”中上传任务作品</span>
				</div>
				</el-card>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				avatarUrl:require('../../../assets/logo.png'),
			}
		},
		mounted() {
			
		},
		methods:{
			// 返回主页
			returnHomePage(){
				this.$router.push({
					path:'./partTimer'
				});
			}
		}
	}
</script>

<style scoped>
	.orderDispose{
		box-sizing: border-box;
		background-color: #F5F7FC;
		padding: 20px;
	}
	.orderUl .orderLi{
		list-style: none;
		width: 95%;
		margin: 0 auto;
		/* height: 300px; */
		margin-top: 20px;
	}
	.orderUl .orderLi:hover{
		 box-shadow: 0 0 10px #080808;
	}
	.orderLi .orderMessage{
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		align-items: center;
	}
/* 	.orderMessage .dOrmessage{
		width: 30%;
		height: 150px;
	} */
	.orderMessage .personageMessage{
		display: flex;
		justify-content: space-between;
		/* padding: 20px; */
		padding-top: 10px;
		width: 20%;
		height: 150px;
		
	}
	.orderMessage .personageMessage .avatar{
		position: relative;
		width: 35%;
	}
	.orderMessage .personageMessage .avatar .img{
		position: absolute;
		top: 0;
		left: 60px;
	}
	.orderMessage .personageMessage .avatarMessage{
		width: 65%;
		border-right: 1px solid #FF8D00;
	}
	.orderMessage .orderRequire{
		width: 50%;
		height: 150px;
		padding: 20px;
	}
	.orderMessage .orderText{
		width: 30%;
		height: 150px;
		padding: 10px;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.orderText .ordertitle{
		width: 25%;
	}
	.orderMessage .orderText .renwuNumber{
		display: flex;
		width: 75%;
		flex-direction: column;
		box-sizing: border-box;
	}
	.orderText .renwuNumber .renwuList{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 10px;
	}
	.orderText .renwuNumber .renwuList:nth-child(1){
		margin-top: 0;
	}
	.orderLi .renwuDeadline{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 10px;
	}
	.orderLi .orderCreateTime{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: 10px;
	}
	.orderLi .anniuBtn{
		width: 100%;
		text-align: center;
	}
	.anniuBtn .elBTn{
		width: 127px;
		height: 30px;
		background-color: #2F24D2;
		color: #fff;
		padding: 0;
	}
	.anniuBtn .elBTn.yichuli{
		background-color: #979497;
	}
	.retuenZhuye{
		width: 100%;
		text-align: right;
	}
	.elCard-li{
		width: 100%;
	}
</style>
