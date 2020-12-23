<template>
	<!-- 千里马详情 -->
	<div class="swifthorseDetail" id="swifthorseDetail">
		<div class="swDetail">
			<div class="returnBtn">
				<el-button style="font-size: 14px;" type="text">返回列表</el-button>
			</div>
			<div class="swDetail-top-b">
				<div class="banner">
					<el-carousel height="240px">
						<el-carousel-item v-for="(item,index) in this.imgUrl" :key="item.index">
							<img width="100%" height="100%" :src="item" />
						</el-carousel-item>
					</el-carousel>
				</div>
				<div class="personaDdetails">
					<div class="persona">
						<el-avatar :size="65" :src="this.avatar"></el-avatar>
						<div class="personaXinxi">
							<span style="font-size: 30px;font-weight: bolder;">{{this.name}}</span>
							<div class="zhiweijinyang">
								<span>{{this.basicInfo.sidelineTypeName}}</span>
								<span style="margin-left: 15px;">{{this.basicInfo.workExperiences}}经验</span>
							</div>
							<div class="pingfen">
								<span><span style="font-size: 14px; color: #FF8400;">{{this.detailInfo.countOrder}}人</span>找过他</span>
								<el-rate
								 style="margin-left: 10px;"
								  v-model="value"
								  disabled
								  text-color="#ff9900"
								  score-template="{value}">
								</el-rate>	
								<span>按时完成率<span style="color: #409EFF;">{{}}%</span></span>
							</div>
						</div>
					</div>
					<div class="persona-b">
						<i  style="color: #FF8400;" class="el-icon-phone-outline"></i>
						<span>联系方式</span>
						<span style="margin-left: 20px;">{{this.basicInfo.phoneNumber}}</span>
						<i style="cursor: pointer;" @click="" class="el-icon-view"></i>
					</div>
					<div class="price">
						<span class="span">指导价：</span>
						<span class="span" style="color: #FF0000;">{{this.basicInfo.sysRecommendPrice}}￥/张</span>
					</div>
					<div class="price">
						<el-button @click="xiaOrder" class="priceOrder">立即下单</el-button>
					</div>
				</div>
			</div>
		</div>
		<div class="worksData">
			<div class="wordcheck">
				<div class="workdirection">
					<div style="font-size: 20px;">作品方向</div>
					<div class="tag">
						<span v-for="(item,index) in dataspan" :key="index">{{item}}</span>
					</div>
				</div>
				<div class="Self-introduction">
					<div style="font-size: 20px;">个人介绍</div>
					<div class="Self-introduction-img">
						<!-- <img width="206" height="206" src="../../../../assets/img/img.jpg" />
						<img width="206" height="206" src="../../../../assets/img/img.jpg" /> -->
					</div>
					<p class="text">
						{{this.detailInfo.introduction}}
					</p>
				</div>
				<div class="workpane">
					<div style="font-size: 20px;">个人及作品方格</div>
					<ul class="workpaneUL">
						<!-- <li class="workpaneLI" v-for="item in checkData" :key="item.index">
							<span class="shouhangsoujin">{{item.index}}.</span>
							<span>{{item.text}}</span>
						</li> -->
						<li class="workpaneLI">
							<!-- <span class="shouhangsoujin">{{item.index}}.</span> -->
							<span>{{this.detailInfo.styleDescription}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="wordlist">
				<div class="wordlist-top">
					<div class="zuopinji">作品集</div>
					<div class="zuoyoufenye">
						<i class="el-icon-arrow-left"></i>
						<i class="el-icon-arrow-right"></i>
					</div>
				</div>
				<ul class="wordlist-ul">
					<li class="wordlist-li" v-for="item in this.dataworks" :key="item.id">
						<div class="li-left">
							<video class="video" :src="item.video" controls="controls"></video>
							<img class="video" :src="item.video" />
						</div>
						<div class="li-right">
							<div>{{item.name}}</div>
							<div style="font-size: 12px; margin-top: 25px;">{{item.description}}</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	
	
	<el-dialog title="设置订单" :visible.sync="dialogVisibleake" width="50%">
		<div class="iconEnlorder" @click="enlarge">
			<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
				<i class="iconfont icon-quanping"></i>
			</el-tooltip>
		</div>
		<el-form :model="order" :rules="rules" ref="lijifahuo">
			<el-form-item label="输入订单要求:" prop="orderEequire" :label-width="formLabelWidth">
				<el-input class="elInpiut" v-model="order.orderEequire" type="textarea" maxlength="300" show-word-limit></el-input>
			</el-form-item>
			<el-form-item  prop="orderTextList"  label="设置订单内容:" :label-width="formLabelWidth" required>
				  <el-col :span="8">
						<el-form-item type="data"  prop="orderText" >
							<el-select  v-model="order.orderText" style="width: 100px">
								<el-option label="图片" value="0"></el-option>
								<el-option label="视频" value="1"></el-option>
								<el-option label="文档" value="2"></el-option>
							</el-select>
						</el-form-item>
				    </el-col>
				    <el-col :span="8">
						<el-form-item label="数量:" prop="orderNumber" >
							<el-input v-model="order.orderNumber" style="width: 100px;"></el-input>
						</el-form-item>
					 </el-col>
					 <el-col :span="8">
						<el-button type="text" class="delete  el-icon-remove-outline" style="color: #FF0000;">删除</el-button>
					  </el-col>
			</el-form-item>
			<el-form-item :label-width="formLabelWidth">
				<el-button type="text" @click="addclick" class="addorder el-icon-circle-plus-outline"> 添加</el-button>
			</el-form-item>
			<el-form-item label="设置订单时间:"  :label-width="formLabelWidth" required>
				    <el-col :span="8">
						  <el-form-item prop="date1">
							<el-date-picker type="date" placeholder="选择日期" v-model="order.date1" style="width:150px;"></el-date-picker>
						  </el-form-item>
				    </el-col>
				    <el-col class="line" :span="2">-</el-col>
				    <el-col :span="8">
						  <el-form-item prop="date2">
							<el-date-picker type="date" placeholder="选择日期" v-model="order.date2" style="width:150px;"></el-date-picker>
						  </el-form-item>
				    </el-col>
			</el-form-item>
			<el-form-item label="约定成交价格:" prop="orderPrice" :label-width="formLabelWidth">
				<el-input v-model="order.orderPrice" class="inputPrice"></el-input>参考价格仅提供参考，最终价格由你和设计师约定价格
			</el-form-item>
		</el-form>
		<div class="dialog-footer">
			<el-button class="submitOrder">提交订单</el-button>
		</div>
	</el-dialog>
	
	
	
	</div>
</template>

<script>
	export default {
		name: 'swifthorseDetail',
		data() {
			return{
				value:5,
				formLabelWidth: '130px',
				dialogVisibleake: false,
				fullscreen: '',
				dataspan: [],
				order:{
					orderEequire: '',
					orderTextList: [{
						orderText: '',
						orderNumber: '',
					}],
					date1: '',
					date2: '',
					orderPrice: '',
				},
				rules:{
					orderEequire:[
						{required: true, message: '请输入订单内容', trigger: 'blur' }
					],
					orderText:[
						{type: 'data',required: true, message: '请选择订单内容', trigger: 'blur' }
					],
					 date1: [
						{ type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
					],
					date2: [
						{ type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
					],
					orderPrice:[
						{ required: true, message: '请输入约定价格', trigger: 'blur' }
					]
				},
				index: 0,
				imgUrl:[],
				avatarUrl: '',
				name: '',
				basicInfo: {},
				detailInfo: {},
				dataworks: []
			}
		},
		mounted() {
			this.getProfile();
		},
		methods: {
			xiaOrder(){
				this.dialogVisibleake = true;
			},
			enlarge(){
				
			},
			addclick(){
				
			},
			getProfile(){
				let id = this.$route.query.id;
				this.$axios.post('admin/sideline/personal/get_profile/'+id).then((res) => {
					if(res.status == 200){
						let data = res.data;
						if(data.code == 200){
							let dataLists = data.data;
							this.basicInfo = dataLists.basicInfo;
							this.detailInfo = dataLists.detailInfo;
							let dataworks = [];
							var https = /^https:\/\/.+$/;
							dataLists.works.forEach(function(val,index){
								dataworks[index] = val;
								if(https.test(val.content)){
									dataworks[index].video = val.content;
								} else {
									dataworks[index].video = localStorage.getItem('imgUrl') + val.content;
								}
								if(https.test(val.cover)){
									dataworks[index].imgCover = val.cover;
								} else {
									dataworks[index].imgCover = localStorage.getItem('imgUrl') + val.cover;
								}
							});
							this.dataworks = dataworks;
							this.dataspan =dataLists.detailInfo.worksTabs.split(';');
							
							var imgUrls =[];
							if(https.test(dataLists.basicInfo.avatar)){
								this.avatarUrl = dataLists.basicInfo.avatar;
							} else {
								this.avatarUrl = localStorage.getItem('imgUrl') + dataLists.basicInfo.avatar;
							}
							this.dataLists =dataLists.basicInfo.workExperiences;
							this.name = dataLists.basicInfo.userName;
							dataLists.detailInfo.worksPictures.split(';').forEach(function(val,index){
								if(https.test(val)){
									imgUrls[index] =val;
								} else {
									imgUrls[index] = localStorage.getItem('imgUrl') + val;
								}
							});
							this.imgUrl = imgUrls;
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
			}
		}
	}
</script>

<style>
	.swifthorseDetail {
		box-sizing: border-box;
		padding: 20px;
		background-color: #F5F7FC;
	}
	.swDetail {
		width: 100%;
		background-color: #fff;
		padding: 20px;
	}
	.swDetail .returnBtn {
		width: 100%;
		text-align: right;
		margin-top: -20px;
	}
	.swDetail .swDetail-top-b {
		display: flex;
		flex-direction: row;
	}
	.swDetail-top-b .banner {
		width: 30%;
		height: 240px;
	}
	.el-carousel__indicator .el-carousel__button{
		width: 10px;
		height: 10px;
		border-radius: 50%;
		margin-top: 10px;
		background-color: #000000;
	}
	.swDetail-top-b .personaDdetails {
		width: 60%;
		margin-left: 50px;
	}
	.swDetail-top-b .personaDdetails .persona{
		display: flex;
		flex-direction: row;
	}
	.personaDdetails .persona .personaXinxi{
		display: flex;
		flex-direction: column;
		margin-left: 15px;
	}
	.personaXinxi .pingfen{
		display: flex;
		justify-content: space-between;
		color: ##333333;
		font-size: 12px;
	}
	.zhiweijinyang{
		font-size: 22px;
		color: #999999;
	}
	.persona-b{
		margin-top: 20px;
		font-size: 20px;
		margin-left: 88px;
	}
	.persona-b i{
		color: #1FB054;
		margin-right: 10px;
	}
	.price{
		margin-left: 88px;
	}
	.price .span{
		font-size: 20px;
	}
	.price .priceOrder{
		font-size: 16px;
		background-color: #298377;
		color: #fff;
		width: 135px;
		height: 45px;
		border-radius: 4px;
	}
	.worksData{
		display: flex;
		justify-content: space-between;
		margin-top: 30px;
		
	}
	.worksData .wordcheck{
		width: 60%;
		padding: 20px 10px;
		background-color: #FFFFFF;
	}
	.wordcheck .workdirection .tag{
		display: flex;
		flex-direction: row;
	}
	.wordcheck .workdirection .tag span{
		width: 92px;
		height: 30px;
		border: 1px solid #FF8D00;
		text-align: center;
		line-height: 30px;
		color: #FF8D00;
		margin-left: 25px;
		margin-top: 10px;
		border-radius: 4px;
	}
	.Self-introduction-img{
		display: flex;
		align-items:  flex-start;
		margin-top: 10px;
		margin-left: 50px;
	}
	.Self-introduction-img img {
		margin-left: 10px;
	}
	.Self-introduction{
		margin-top: 10px;
	}
	.Self-introduction .text{
		text-indent:25px;
		padding:10px 80px 0 80px;
	}
	.workpane{
		margin-bottom: 50px;
	}
	.workpane .workpaneLI{
		list-style: none;
		font-size: 14px;
		padding:10px 80px 0 80px;
		
	}
	.workpane .workpaneLI .shouhangsoujin{
		text-indent:25px;
	}
	.worksData .wordlist{
		width: 30%;
		background-color: #FFFFFF;
		padding: 10px;
	}
	.wordlist .wordlist-top{
		display: flex;
		justify-content: space-between;
	}
	.zuoyoufenye i{
		width: 24px;
		height: 24px;
		cursor: pointer;
	}
	.wordlist-ul .wordlist-li{
		list-style: none;
		display: flex;
		justify-content: space-between;
		padding: 20px;
		border-bottom: 2px solid #FF8D00;
	}
	.wordlist-ul .wordlist-li:nth-child(3){
		border-bottom:0;
	}
	.li-left{
		width: 40%;
		background-color: #0000FF;
		height: 165px;
	}
	.li-left .video{
		width: 100%;
		height: 100%;
	}
	.li-right{
		width: 60%;
		height: 20px;
		padding: 0 10px 10px 10px;
	}
	.iconEnlorder {
		position: relative;
	}
	.iconEnlorder .iconfont {
		position: absolute;
		top: -65px;
		right: 30px;
	}
	.elInpiut{
		height: 100px;
	}
	.el-textarea__inner{
		height: 100px;
	}
	.delete{
		color: #FF0000;
		font-size: 20px;
	}
	.delete:before{
		color: #FF0000;
	}
	.delete:active{
		color: #FF0000;
	}
	.addorder{
		font-size: 20px;
	}
	.inputPrice{
		width: 150px;
	}
	.dialog-footer{
		width: 100%;
		text-align: center;
	}
	.dialog-footer .submitOrder{
		width: 100px;
		height: 30px;
		background-color: #FF8D00;
		color: #fff;
		margin: 0 auto;
	}
</style>
