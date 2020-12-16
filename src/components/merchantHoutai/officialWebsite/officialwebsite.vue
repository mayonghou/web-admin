<template>
	<!-- 官网管理 -->
	<div class="officialwebsite" id="officialwebsite">
		<div class="officialwebsite-top"><label style="padding-left: 30px;">设置官网展示内容</label></div>
		<el-form :model="setOffWeb" ref="setOffWeb">
			<el-form-item label="主页轮播图：" :label-width="labelwidth" prop="bannerList">
				<label style="color: #a4a4a4; display:block;">(轮播图展示)</label>
				<label>{{this.num || 0}}/5</label>
				<el-upload
					class="avatar-uploader"
					accept="image/*"
					:action="action"
					list-type="picture-card"
					:auto-upload="true"
					:limit="5"
					:on-change="changeHead"
					:on-success="fmSuccess"
					:on-remove="handleRemove"
					ref="uploadfm" multiple
				>
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="关于我们:" :label-width="labelwidth" prop="AboutUs">
				<el-input v-model="setOffWeb.AboutUs" type="textarea" placeholder="输入公司简介" maxlength="300" show-word-limit></el-input>
			</el-form-item>
			<el-form-item label="企业视频:" :label-width="labelwidth" prop="videoListdata">
				<div class="aihdin"  v-for="(item,index) in this.setOffWeb.videoListdata" :key="index">
					<i @click="delVideoDetail(item)" style="font-size: 28px;cursor: pointer; color: #FF0000;margin-left: 33%;" class="el-icon-circle-close"></i>
					<el-form-item prop="videoList">
						<el-upload
						class="avatar-uploader asdsad"
						accept="video/*"
						:action="videoUrls"
						list-type="picture-card"
						:auto-upload="true"
						:on-success="videoSuccess"
						:show-file-list="false"
						ref="uploadfm">
							<video
								ref="videoPlayer"
								width="100%"
								height="100%"
								controls
								controlslist="nodownload"
								v-if="item.videoList"
								:src="item.videoList"
								class="video"
							>
							</video>
							<i v-else class="el-icon-plus"></i>
						</el-upload>
					</el-form-item>
					<el-form-item prop="remark">
						<el-input style="margin-left: 20px;" v-model="item.remark" type="textarea" placeholder="输入视频介绍" maxlength="300" show-word-limit></el-input>
					</el-form-item>
				</div>
				<el-button type="text" @click="addVideos" style="font-size: 28px; margin-left: 20%;" class="el-icon-circle-plus-outline"></el-button>
			</el-form-item>
			<el-form-item label="团队介绍:" :label-width="labelwidth" prop="companySynopsis">
				<el-input v-model="setOffWeb.companySynopsis" type="textarea" placeholder="输入团队介绍" maxlength="200" show-word-limit></el-input>
			</el-form-item>
			<el-form-item label="团队风采:" :label-width="labelwidth" prop="teamsmienUrl">
				<el-upload
					class="avatar-uploader"
					accept="image/*"
					:action="action"
					list-type="picture-card"
					:auto-upload="true"
					:on-success="tdfcSuccess"
					:on-remove="handleRemoveteamsmi"
					ref="uploadfm" multiple>
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>

		</el-form>
		<div class="offWebBtn">
			<el-button @click="baocunBtn" class="bbtn">保存</el-button>
		</div>
	</div>
</template>

<script>
	import citydata from '../../../api/address.json'
	export default {
		name: 'officialwebsite',
		data() {
			return {
				labelwidth: '230px',
				action: localStorage.getItem('actionUrl'),
				videoUrls: localStorage.getItem('videoUrl'),
				setOffWeb: {
					bannerList: '',
					videoListdata: [{
						videoList: '',
						remark: '',
						url: ''
					}],
					teamsmienUrl:'',
					companySynopsis: '',
					AboutUs: '',
					file: {}
				},
				count: 0,
				imgUrl: [],
				num:'',
				bannerUrl:[],
			}
		},
		created() {
			this.addressOptions = citydata;
		},
		mounted() {

		},
		methods: {
			addVideos(){
				this.setOffWeb.videoListdata.push({
					videoList: '',
					remark: '',
					url: ''
				});
			},
			delVideoDetail(item){
				var index = this.setOffWeb.videoListdata.indexOf(item);
				if (index != -1) {
					this.setOffWeb.videoListdata.splice(item, 1);
				}
			},
			changeHead(file, fileList){
				this.num = fileList.length
			},
			handleRemove(file, fileList) {
				this.num = fileList.length
				var banner = [];
				fileList.forEach(function(val,index){
					banner[index] = val.response.data;
				})
				this.bannerUrl = banner;
			},
			// 图片成功回调
			fmSuccess(response, file, fileList) {
				if(response.code == 200){
					this.bannerUrl.push(response.data);
				} else {
					this.$message({
						showClose: true,
						message: '轮播图上传失败',
						type: 'error'
					});
				}
			},
			handleRemoveteamsmi(file, fileList) {
				this.setOffWeb.bannerList = file.url;
				this.num = fileList.length
				var teamsmi = [];
				fileList.forEach(function(val,index){
					teamsmi[index] = val.response.data;
				})
				this.imgUrl = teamsmi;
			},
			// 团队风采图片成功回调
			tdfcSuccess(response, file, fileList) {
				if(response.code == 200){
					this.imgUrl.push(response.data);
				} else {
					this.$message({
						showClose: true,
						message: '团队风采图片上传失败',
						type: 'error'
					});
					this.imgUrl = []
				}
			},
			// 视频成功回调
			videoSuccess(response, file, fileList) {
				if(response.code == 200){
					var List = this.setOffWeb.videoListdata[this.setOffWeb.videoListdata.length-1];
					List.videoList = localStorage.getItem('imgUrl') + response.data;
					List.url = response.data;
				} else {
					this.$message({
						showClose: true,
						message: '视频上传失败',
						type: 'error'
					});
				}
			},
			baocunBtn(){
				this.$confirm('是否确定发布官网展示内容?', '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let loading = this.$loading({
						lock: true,
						text: '发布中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					let dataList = {
						albumPics: this.bannerUrl,
						companyId: parseInt(localStorage.getItem('loginData')),
						remark: this.setOffWeb.companySynopsis,
						showPics: this.imgUrl,
						us: this.setOffWeb.AboutUs,
						videos:this.setOffWeb.videoListdata
					}
					this.$axios.post('api/partner/add/company/remark', dataList).then((res) => {
						loading.close();
						if(res.status == 200){
							let data = res.data;
							if(data.code == 200){
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'success'
								});
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
				})
			},


		}
	}
</script>

<style>
	.officialwebsite {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}
	.officialwebsite-top {
		width: 100%;
		height: 45px;
		background-color: #FAFBFA;
		line-height: 45px;
		margin-top: 20px;
	}

	.el-textarea {
		width: 440px;
	}

	.el-textarea__inner {
		height: 180px;
	}

	.fff {
		float: left;
	}

	.avatar-uploader {
		float: left;
		margin-left: 20px;
	}

	.btnsaa {
		margin-left: 260px;
	}

	.inputs {
		width: 260px;
	}

	.dsdsd {
		margin-left: 20px;
	}

	.offWebBtn .bbtn {
		width: 90px;
		height: 30px;
		padding: 0;
		background: #2482d2;
		color: #fff;
		margin-bottom: 20px;
		margin-left: 30%;
		border-radius: 8px;
	}
	.officialwebsite .el-form-item{
		margin-top: 20px;
	}
	.asdsad .el-upload--picture-card{
		border: 0;
		width: 440px;
		height: 180px;
	}
	.aihdin i{
		margin-top: 20px;
	}
</style>
