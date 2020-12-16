<template>
	<!-- 编辑产品案例 -->
	<div class="aupdateProductCase" id="aupdateProductCase">
		<div class="product-top">
			<label style="margin-left: 30px;">编辑产品案例信息</label>
		</div>
		<el-form :model="uopdateproduct" :rules="rules" ref="uopdateproduct">
			<el-form-item label="主页轮播图:" prop="image" label-width="230px">
				<img width="148px" height="148px" v-if="this.ShowNone == true" :src="this.uopdateproduct.image" />
				<video
					ref="videoPlayer"
					width="400"
					height="200"
					controls
					controlslist="nodownload"
					v-if="this.ShowNone == false"
					:src="this.uopdateproduct.image"
					class="video"
				>
				</video>
				<el-button type="text" @click="axifsxupload">重新上传</el-button>
			</el-form-item>
			<el-form-item label="产品描述:" prop="title" label-width="230px">
				<el-input v-model="uopdateproduct.title" type="textarea"  maxlength="100" show-word-limit class="input" placeholder="输入产品案例"></el-input>
			</el-form-item>
		</el-form>
		<div class="product">
			<el-button @click="baocunproductCase" class="baocun">保存</el-button>
		</div>
		
		
		<el-dialog
		  title="选择图片或者视频"
		  :visible.sync="dialogVisible"
		>
		<div >
			<div class="imgURl">图片</div>
			<el-upload
				class="avatar-uploader"
				:action="action"
				list-type="picture-card"
				accept="image/*"
				:on-change="changeUpload"
				:auto-upload="true"
				:show-file-list="false"
				:on-success="fmSuccess"
				ref="uploadimg">
				<img width="100%" height="100%" v-if="imgUrl" :src="imgUrl" />
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</div>
		<div>
			<div class="imgURl">视频</div>
			<el-upload
				class="avatar-uploader"
				:action="viderU"
				list-type="picture-card"
				:on-change="changeUpload"
				:auto-upload="true"
				accept="video/*"
				:show-file-list="false"
				:on-success="videoSuccess"
				ref="uploadimg">
				<video
					ref="videoPlayer"
					width="300"
					height="148"
					controls
					controlslist="nodownload"
					:src="this.videoUrlss"
					class="video"
					v-if="this.videoUrlss != ''"
				>
				</video>
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'aupdateProductCase',
		data() {
			return {
				action: localStorage.getItem('actionUrl'),
				viderU: localStorage.getItem('videoUrl'),
				uopdateproduct: {
					title: '',
					image: '',

				},
				rules: {
					title: [{
						required: true,
						message: '请输入案例标题',
						trigger: 'blur'
					}],
					image: [{
						required: true,
						message: '请选择图片',
						trigger: 'blur'
					}]
				},
				ShowNone: false,
				imgUrl: '',
				videoUrlss: '',
				dialogVisible: false,
				serverId: ''
			}
		},
		mounted() {
			this.getUpdateData();
		},
		methods: {
			getUpdateData(){
				let data = this.$route.query.data;
				if(data != undefined){
					this.uopdateproduct = data;
					this.serverId = data.serverId;
					const aaas = /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/;
					if(aaas.test(data.image) == true){
						this.uopdateproduct.image = data.image;
						this.ShowNone = true;
					} else {
						this.uopdateproduct.image = data.image;
						this.ShowNone = false;
					}
				}
			},
			axifsxupload(){
				this.dialogVisible = true;
			},
			changeUpload(file, fileLsit) {
				const aaas = /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/
				if(aaas.test(file.name)){
					this.imgUrl = file.url;
					this.videoUrlss = '';
				} else {
					this.videoUrlss = file.url;
					this.imgUrl = '';
				}
				this.uopdateproduct.file = file;
				this.loading = true;
			},
			fmSuccess(response, file, fileLsit) {
				if(response.code == 200){
					this.uopdateproduct.image = localStorage.getItem('imgUrl') + response.data;
					this.ShowNone = true;
					this.dialogVisible = false;
				} else if(response.code == 500){
					this.$message({
						showClose: true,
						message: "图片上传失败",
						type: 'error'
					});
					this.imgUrl = '';
				} else {
					this.$message({
						showClose: true,
						message: "图片上传失败",
						type: 'error'
					});
					this.imgUrl = '';
				}
			},
					
			videoSuccess(response, file, fileLsit){
				if(response.code == 200){
					this.uopdateproduct.image = localStorage.getItem('imgUrl') + response.data;
					this.ShowNone = false;
					this.dialogVisible = false;
				} else {
					this.$message({
						showClose: true,
						message: "视频上传失败",
						type: 'error'
					});
					this.videoUrlss = '';
				}
			},
			baocunproductCase(){
				this.$refs.uopdateproduct.validate((valid) => {
					if(valid){
						this.$confirm('是否确定修改产品案例【 ' + this.uopdateproduct.title +'】', '温馨提示', {
						    confirmButtonText: '确定',
						    cancelButtonText: '取消',
						    type: 'warning'
						}).then(() => {
							const loading = this.$loading({
								lock: true,
								text: '修改中 ...',
								spinner: 'el-icon-loading',
								background: 'rgba(0, 0, 0, 0.7)'
							});
							let datalist ={
								companyId: parseInt(localStorage.getItem('loginData')),
								image: this.uopdateproduct.image,
								title: this.uopdateproduct.title,
								serverId: this.serverId
							}
							this.$axios.post('api/partner/add/company/server', datalist).then((res) => {
								loading.close();
								if(res.status == 200){
									var data = res.data;
									if(data.code == 200){
										this.$message({
											showClose: true,
											message: data.msg,
											type: 'success'
										});
										this.$router.push({
											path: './productCase'
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
										message: res.data.msg,
										type: 'error'
									});
								}
							})
							
						});
					}
				});
			}
		}

	}
</script>

<style>
	.aupdateProductCase {
		width: 100%;
		box-sizing: border-box;
	}

	.product-top {
		width: 100%;
		height: 45px;
		background: #fafbfa;
		margin-top: 20px;
		line-height: 45px;
		margin-bottom: 20px;
	}

	.aupdateProductCase .input {
		width: 440px;
		height: 100px;
	}
	.aupdateProductCase .el-textarea__inner {
		height: 100px;
	}
	.aupdateProductCase .input {
		height: 100px;
	}
	.product .baocun {
		width: 90px;
		height: 30px;
		background: #2482D2;
		color: #fff;
		padding: 0;
		margin-left: 30%;
	}
	.aupdateProductCase .el-dialog__body{
		display: flex;
		justify-content: space-around;
	}
	.imgUrl{
		width: 148px;
		text-align: center;
	}
</style>
