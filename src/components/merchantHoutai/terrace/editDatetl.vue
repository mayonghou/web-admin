<template>
	<div class="enterprise">
		<div class="add_from">
			<div style="width: 100%; clear: both; margin-top: 30px;">
				<el-button @click="editDetail" class="edit">编辑</el-button>
			</div>
			<el-form ref="addform" :model="addform">
				<div class="add_Top">
					<label>企业信息</label>
					<label class="GS_name" v-model="qyname">{{qyname}}</label>
					<label class="GS_rz">已入驻</label>
					<label class="GS_time" v-model="time">入驻日期: {{time}}</label>
				</div>
				<el-form-item label="企业名称:" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.name" placeholder="请输入" disabled></el-input>
				</el-form-item>
				<el-form-item label="企业简称:" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.remark" placeholder="请输入" disabled></el-input>
				</el-form-item>
				<el-form-item label="社会统一信用代码:" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.code" placeholder="请输入" disabled></el-input>
				</el-form-item>
				<el-form-item label="营业执照:" prop="licenseUrl" :label-width="formLabelWidth">
					<img v-if="addform.licenseUrl" :src="addform.licenseUrl" class="avatar uploadImg">
					<el-button v-if="addform.licenseUrl" type="text" @click="examineZZ">查看大图</el-button>
				</el-form-item>
				<el-form-item label="所属行业:" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.industry" placeholder="请选择" disabled>
					</el-input>
				</el-form-item>
				<el-form-item label="企业类型:" prop="businessType" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.businessType" disabled></el-input>
				</el-form-item>
				<el-form-item label="注册地址:" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.registerAddress" disabled></el-input>
				</el-form-item>
				<el-form-item label="经营地址:" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.address" disabled></el-input>
				</el-form-item>
				<el-form-item label="注册资本:" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.registerMoney" disabled></el-input><label style="margin-left: 20px;">万</label>
				</el-form-item>
				<el-form-item label="成立日期:" prop="registerTime" :label-width="formLabelWidth">
					<el-date-picker prefix-icon="md-date_range" v-model="addform.registerTime" type="date" class="formWidth form"
					 placeholder="选择日期" disabled>
					</el-date-picker>
				</el-form-item>
				<el-form-item label="企业电话:" prop="serverPhone" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.serverPhone" disabled></el-input>
				</el-form-item>
				<el-form-item label="企业背景图:" prop="backgroundImage" :label-width="formLabelWidth">
					<img v-if="addform.backgroundImage" :src="addform.backgroundImage" class="avatar uploadImg">
					<el-button v-if="addform.backgroundImage" type="text" @click="examineBG">查看大图</el-button>
					<label class="text">（企业名片、背景展示用图）</label>
				</el-form-item>
				<el-form-item label="企业logo:" prop="logoUrl" :label-width="formLabelWidth">
					<img v-if="addform.logoUrl" :src="addform.logoUrl" class="avatar uploadImg">
					<el-button type="text" @click="examineqiyeLogo">查看大图</el-button>
					<label class="text">（企业名片、背景展示用图）</label>
				</el-form-item>
				<div class="add_Top">企业法人</div>
				<el-form-item label="法人姓名:" prop="legal" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.legal" disabled></el-input>
				</el-form-item>
				<el-form-item label="身份证号:" prop="identityId" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.identityId" disabled></el-input>
				</el-form-item>
				<el-form-item label="身份证图片:" prop="frontImage" :label-width="formLabelWidth">
					<img v-if="addform.frontImage" :src="addform.frontImage" class="avatar uploadImg">
					<el-button v-if="addform.frontImage" @click="frontImage" type="text">查看大图</el-button>
				</el-form-item>
				<!-- 身份证反面 -->
				<el-form-item label="" prop="backImage" :label-width="formLabelWidth">
					<img v-if="addform.backImage" :src="addform.backImage" class="avatar uploadImg">
					<el-button v-if="addform.backImage" @click="backImage" type="text">查看大图</el-button>
				</el-form-item>
				<div class="add_Top">企业账号信息</div>
				<el-form-item label="账号类型:" prop="bankType" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.bankType" disabled></el-input>
				</el-form-item>
				<el-form-item label="开户银行:" prop="depositBank" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.depositBank" disabled></el-input>
				</el-form-item>
				<el-form-item label="开户网点:" prop="branch" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.branch" disabled></el-input>
				</el-form-item>
				<el-form-item label="收款账号:" prop="bankNumber" :label-width="formLabelWidth">
					<el-input class="formWidth form" v-model="addform.bankNumber" disabled></el-input>
				</el-form-item>
			</el-form>
			<div style="width: 1200px; margin: 0 auto;">
				<el-button @click="returnIndex" v-show="loginData == 0" class="addBut">返回</el-button>
			</div>
			<el-dialog :visible.sync="dialogVisiblebg">
				<img width="100%" height="100%" :src="imageBGUrl" alt="">
			</el-dialog>
			<el-dialog :visible.sync="dialogVisiblezz">
				<img width="100%" height="100%" :src="imageZZUrl" alt="">
			</el-dialog>
			<el-dialog :visible.sync="dialogVisiblogo">
				<img width="100%" height="100%" :src="this.addform.logoUrl" alt="">
			</el-dialog>
			<el-dialog :visible.sync="dialogVisibbackImage">
				<img width="100%" height="100%" :src="this.addform.backImage" alt="">
			</el-dialog>
			<el-dialog :visible.sync="dialogVisibfrontImage">
				<img width="100%" height="100%" :src="this.addform.frontImage" alt="">
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formLabelWidth: '220px',
				qyID: '',
				fileList: '',
				dialogVisiblebg: false,
				dialogVisiblezz: false,
				dialogVisiblogo: false,
				dialogVisibbackImage: false, 
				dialogVisibfrontImage:false,
				qyname: '',
				time: '',
				addform: {
					name: '',
					remark: '',
					code: '',
					licenseUrl: '',
					industry: '',
					businessType: '',
					registerAddress: '',
					address: '',
					registerMoney: '',
					registerTime: '',
					phone: '',
					backgroundImage: '',
					frontImage: '',
					backImage: '',
					legal: '',
					identityId: '',
					papersImage: '',
					serverPhone: '',
					bankType: '',
					depositBank: '',
					branch: '',
					accountname: '',
					bankNumber: '',
					logoUrl: ''
				},
				imageBGUrl: '',
				imageZZUrl: '',
				loginData: '',
				data: '',
			}
		},
		mounted() {
			this.editDatetl();
		},
		methods: {
			editDetail() {
				this.$router.push({
					path: './editEnterprise',
					query: {
						id: this.qyID
					}
				}).catch(err => {
					console.log(err)
				})
			},
			frontImage(){
				this.dialogVisibfrontImage = true;
			},
			backImage(){
				this.dialogVisibbackImage = true;
			},
			// 查看背景大图
			examineBG() {
				this.dialogVisiblebg = true;
				var imageBGUrl = this.addform.backgroundImage;
				this.imageBGUrl = imageBGUrl;
			},
			// 执照
			examineZZ() {
				this.dialogVisiblezz = true;
				var imageZZUrl = this.addform.licenseUrl;
				this.imageZZUrl = imageZZUrl;
			},
			examineqiyeLogo(){
				this.dialogVisiblogo = true;
			},
			returnIndex() {
				this.$router.push({
					path: './index'
				}).catch(err => {
					console.log(err)
				});
			},
			// 查询企业信息
			editDatetl() {
				var loginData = localStorage.getItem('loginData');
				this.loginData = loginData;
				if (loginData == 0) {
					var id = this.$route.query.id;
					this.$axios.get('company/info/' + id).then((res) => {
						if (res.status == 200) {
							var data = res.data;
							if (data.code == 200) {
								this.addform = data.data;
								this.qyname = this.addform.name;
								this.time = this.addform.time;
								this.addform.backgroundImage = localStorage.getItem('imgUrl') + this.addform.backgroundImage;
								this.addform.licenseUrl = localStorage.getItem('imgUrl') + this.addform.licenseUrl;
							} else {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'error'
								});
								this.$router.push({
									path: '/login'
								})
							}
						} else {
							this.$message({
								showClose: true,
								message: data.msg,
								type: 'error'
							});
							this.$router.push({
								path: '/login'
							})
						}
					})
				} else if (loginData == loginData) {
					this.$axios.get('admin/company/info/' + loginData).then((res) => {
						if (res.status == 200) {
							var data = res.data;
							// this.data = data.data;
							if (data.code == 200) {
								this.addform = data.data;
								this.qyname = this.addform.name;
								this.qyID = data.data.id;
								var date = new Date(data.data.time);
								var GS_time = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() +1) + '-' + date.getDate();
								this.time = GS_time;
								if(data.data.backgroundImage != ''){
									this.addform.backgroundImage = localStorage.getItem('imgUrl') + data.data.backgroundImage;
								}
								if(data.data.licenseUrl != ''){
									this.addform.licenseUrl = localStorage.getItem('imgUrl') + data.data.licenseUrl;
								}
								if(data.data.logoUrl != ''){
									this.addform.logoUrl = localStorage.getItem('imgUrl') + data.data.logoUrl;
								}
								if(data.data.frontImage != ''){
									this.addform.frontImage = localStorage.getItem('imgUrl') + data.data.frontImage;
								}
								if(data.data.backImage != ''){
									this.addform.backImage = localStorage.getItem('imgUrl') + data.data.backImage;
								}
								this.addform.bankType = data.data.bankType == 0? '对私' : '对公';
								this.addform.registerMoney = data.data.registerMoney / 1000000;
								switch(data.data.businessType){
									case 0:
										this.addform.businessType = '企业单位';
										break;
									case 1:
										this.addform.businessType = '事业单位';
										break;
									case 2:
										this.addform.businessType = '社会团体';
										break;
									case 3:
										this.addform.businessType = '个体经营';
										break;
									case 4:
										this.addform.businessType = '个体经营';
										break;
								}
								localStorage.setItem('industryId', this.addform.industryId);
								localStorage.setItem('name', this.addform.legal);
								localStorage.setItem('companyName', this.addform.name);
							} else {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'error'
								});
								this.$router.push({
									path: '/login'
								});
							}
						} else {
							this.$message({
								showClose: true,
								message: data.msg,
								type: 'error'
							});
							this.$router.push({
								path: '/login'
							})
						}
					})
				}
			},

			//查询行业
		}
	};
</script>

<style>
	.clear {
		clear: both;
	}

	.add_from .edit {
		float: right;
		width: 70px;
		height: 30px;
		font-size: 14px;
		margin-top: -30px;
		line-height: 5px;
		color: #fff;
		background-color: #109955;
	}

	.datu {
		width: 200px;
		height: 120px;
		border: 1px solid #ccc;
	}

	.datu img {
		width: 100%;
		height: 100%;
	}

	.GS_name {
		margin-left: 50px;
	}

	.GS_rz {
		margin-left: 30%;
		color: #109955;
	}

	.GS_time {
		float: right;
		margin-right: 30px;
		color: #109955;
	}

	.add_Top {
		width: 100%;
		height: 45px;
		background: #FAFBFA;
		margin-top: 30px;
		margin-bottom: 50px;
		line-height: 45px;
		font-size: 14px;
		padding-left: 20px;
	}

	.add_from {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}

	.add_from .el-form-item {
		padding-left: 25%;
		padding-top: 0px;
	}

	.el-input {
		width: 194px;
	}
	.add_from .el-form-item__label{
		text-align: right;
	}
	.formWidth.form .el-input__inner {
		width: 210px;
		border-top: 0px;
		border-left: 0px;
		border-right: 0px;
		border-radius: 0px;
		border-bottom: 0px solid #C1C1C1;
		background: #FFFFFF;
		pointer-events: none;
	}


	.el-form-item__label {
		text-align: left;
	}

	.el-button {
		margin-left: 10px;
	}

	.text {
		font-size: 12px;
		color: #A4A4A4;
	}

	.enterprise .uploadImg {
		width: 250px;
	}

	.addBut {
		width: 90px;
		height: 30px;
		line-height: 15px;
		background: #2482D2;
		color: #fff;
		border-radius: 8px;
		margin-left: 50%;
	}
</style>
