<template>
	<div class="addrenting" id="daterenting"  v-loading="fullscreenLoading" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.7)">
		<el-form :model="rentFormdate" ref="rentFormdate" label-width="100px" class="demo-ruleForm">
			<div class="addrent">房源信息详情</div>
			<el-form-item label="封面:" prop="imageUrl" :label-width="labelWidth">
				<img width="100" height="100" v-model="rentFormdate.imageUrl" :src="this.rentFormdate.imageUrl" />
			</el-form-item>
			<el-form-item label="上传的视频:" prop="videoUrl" :label-width="labelWidth">
				<video ref="videoPlayer" width="400" height="200" controls controlslist="nodownload" @play="toPlays"
				 @timeupdate="updateTime" @pause="toPause" v-if="this.rentFormdate.videoUrl" :src="this.rentFormdate.videoUrl" class="video">
				</video>
			</el-form-item>
			<el-form-item label="房源标题名称:" prop="houseTitle" :label-width="labelWidth">
				<label class="input" v-model="rentFormdate.houseTitle">{{rentFormdate.houseTitle}}</label>
			</el-form-item>
			<el-form-item label="房源图片:" prop="houseImgUrl" :label-width="labelWidth">
				<div v-model="rentFormdate.houseImgUrl" v-for="(item, index) in this.rentFormdate.houseImgUrl" :key="index">
					<img width="100" height="100" class="img" :src="item" />
				</div>
			</el-form-item>
			<el-form-item label="房屋介绍:" prop="houseIntroduce" :label-width="labelWidth">
				<label class="textarea" :show-word-limit="true" maxlength="200" type="textarea" v-model="rentFormdate.houseIntroduce"
				>{{rentFormdate.houseIntroduce}}</label>
			</el-form-item>
			<el-form-item label="房屋亮点:" prop="dynamicTags" :label-width="labelWidth">
				<el-tag type='info'  effect="plain" :key="index" v-for="(item, index) in this.rentFormdate.dynamicTags" v-model="rentFormdate.dynamicTags">
					{{item}}
				</el-tag>
			</el-form-item>
			<div class="addrent">基础信息</div>
			<el-form-item label="房屋类型:" prop="houseType" :label-width="labelWidth">
				<label class="textarea" v-model="rentFormdate.houseIntroduce">{{rentFormdate.houseIntroduce}}</label>
			</el-form-item>
			<el-form-item label="出租方式:" prop="houselease" :label-width="labelWidth">
				<label v-model="rentFormdate.houselease">{{rentFormdate.houselease}}</label>
			</el-form-item>
			<el-form-item label="小区名称:" prop="village" :label-width="labelWidth">
				<label v-model="rentFormdate.village">{{rentFormdate.village}}</label>
			</el-form-item>
			<el-form-item label="小区地址:" prop="villageaddress" :label-width="labelWidth">
				<label v-model="rentFormdate.villageaddress">{{rentFormdate.villageaddress}}</label>
			</el-form-item>
			<el-form-item label="建筑面积:" prop="villagearea" :label-width="labelWidth">
				<label v-model="rentFormdate.villagearea">{{rentFormdate.villagearea}}</label>
			</el-form-item>
			<el-form-item label="房屋户型:" prop="houselayout" :label-width="labelWidth">
				<label v-model="rentFormdate.houselayout">{{rentFormdate.houselayout}}</label>
			</el-form-item>
			<el-form-item label="朝向:" prop="houseorientation" :label-width="labelWidth">
				<label v-model="rentFormdate.houseorientation">{{rentFormdate.houseorientation}}</label>
			</el-form-item>
			<el-form-item label="楼层:" prop="houseNum" :label-width="labelWidth">
				<label v-model="rentFormdate.houseNum">{{rentFormdate.houseNum}}</label>
			</el-form-item>
			<el-form-item label="租金详情:" prop="rentPrice" :label-width="labelWidth">
				<label v-model="rentFormdate.rentPrice">{{rentFormdate.rentPrice}}</label>
			</el-form-item>
			<el-form-item label="租金方式:" prop="method" :label-width="labelWidth">
				<label v-model="rentFormdate.method">{{rentFormdate.method}}</label>
			</el-form-item>
			<el-form-item label="房屋配置:" prop="housedeploy" :label-width="labelWidth">
				<div class="" v-model="rentFormdate.housedeploy" v-for="(item, index) in this.rentFormdate.housedeploy" :key="item.id">
					<el-button class="buttonList">{{item.dispose}}</el-button>
				</div>
			</el-form-item>
		</el-form>
		<div class="formbutton">
			<el-button @click="returnRent" type="primary">返回</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'daterenting',
		data() {
			return {
				labelWidth: '220px',
				fullscreenLoading: false,
				loadingText: '加载中...',
				rentFormdate: {
					imageUrl: '',
					videoUrl: '',
					houseTitle: '',
					houseImgUrl: '',
					houseIntroduce: '',
					houseType: '',
					houselease: '',
					village: '',
					villageaddress: '',
					villagearea: '',
					houselayout: '',
					houseNum: '',
					houseorientation: '',
					dynamicTags: [],
					villageaddresstext: '',
					rentPrice: '',
					method: '',
					housedeploy: [],
				},
				inputVisible: false,
				imgList: [],
				imgUrl: [],
				fmImgUrl: '', // 封面的
				videoUrlD: '',
				loading: false,
			}
		},
		mounted() {
			
		},
		created() {
			this.getRentingDetail();
		},
		methods: {
			// 视频播放
			toPlays(e){
			},
			// 视频暂停
			toPause(e){
			},
			// 时间
			updateTime(e){
			},
			// 返回
			returnRent(){
				var status = this.$route.query.status;
				if(status == '上架'){
					this.$router.push({
						path: './renting'
					})
				} else if(status == '下架') {
					this.$router.push({
						path: './lowerRenting'
					})
				}
			},
			// 查询详情
			getRentingDetail(){
				var id = this.$route.query.id;
				this.$axios.get('admin/renting/manage/select/' + id).then((res) => {
					this.fullscreenLoading = false;
					if(res.status == 200){
						var data = res.data;
						if(data.code == 200){
							var dataList = data.data;
							var aaas = /^(https):\/\/.+$/;
							if(aaas.test(dataList.mainImage)){
								this.rentFormdate.imageUrl = dataList.mainImage;
							} else {
								this.rentFormdate.imageUrl = localStorage.getItem('imgUrl') + dataList.mainImage;
							}
							if(dataList.houseVideo){
								if(aaas.test(dataList.houseVideo)){
									this.rentFormdate.videoUrl = dataList.houseVideo;
								} else {
									this.rentFormdate.videoUrl = localStorage.getItem('imgUrl') + dataList.houseVideo;
								}
							}
							this.rentFormdate.houseTitle = dataList.houseTitle;
							var list = [];
							dataList.imageJson.split(',').forEach(function(val, index){
								if(aaas.test(val)){
									list[index] = val;
								} else {
									list[index] = localStorage.getItem('imgUrl') + val;
								}
 							});
							this.rentFormdate.houseImgUrl = list;
							this.rentFormdate.houseIntroduce = dataList.introduce;
							var jieshao = [];
							dataList.highlights.split(',').forEach(function(val, index){
								jieshao[index] = val;
								
							});
							this.rentFormdate.dynamicTags = jieshao;
							this.rentFormdate.houseIntroduce = dataList.typeName;
							this.rentFormdate.houselease = dataList.let;
							this.rentFormdate.village = dataList.villageName;
							this.rentFormdate.villageaddress = dataList.province + dataList.city + dataList.region + dataList.address;
							this.rentFormdate.villagearea = dataList.area + '㎡';
							this.rentFormdate.houselayout = dataList.layout;
							this.rentFormdate.houseorientation = dataList.houseOrientation;
							this.rentFormdate.houseNum = dataList.houseFloor+ '层';
							this.rentFormdate.rentPrice = dataList.price /100 + '元/月';
							this.rentFormdate.method = dataList.rent;
							this.rentFormdate.housedeploy = dataList.disposeId;
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
	.addrenting {
		width: 100%;
		box-sizing: border-box;
	}

	.addrent {
		width: 100%;
		height: 45px;
		background: #FAFBFA;
		margin-top: 20px;
		line-height: 45px;
		padding-left: 20px;
		font-size: 14px;
	}
	.img{
		float: left;
		margin-left: 10px;
	}
	.addrenting .el-form-item {
		margin-top: 30px;
		margin-left: 50px;
	}

	/* .addrenting .el-form-item .el-input {
		width: 200px;
		border: 0px;
		margin-left: 10px;
	}
 */
	.addrenting .el-input .el-input__inner {
		border: 0px;
		border-radius: 0;
		border-bottom: 1px solid #E7E1CD;
	}

	.el-textarea textarea {
		width: 613px;
		height: 186px;
	}

	.addrenting .el-form-item .el-select .el-input {
		width: 194px;
		margin-left: 10px;
	}

	.el-input__count {
		margin-right: 320px;
	}

	.formbutton {
		width: 100%;
	}

	.formbutton .el-button {
		width: 90px;
		height: 30px;
		margin-left: 35%;
	}
	.addrenting .buttonList{
		float: left;
		margin-left: 10px;
		background-color: #fff;
		color: #000;
	}
	.el-tag{
		margin-left: 10px;
	}
	.addrenting .el-form-item__label{
		text-align: right;
	}
</style>
