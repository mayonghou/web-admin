<template>
	<div class="addrenting" id="updaterenting" v-loading="fullscreenLoading" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.7)">
		<el-form :model="rentFormupdate" :rules="rules" ref="rentFormupdate" label-width="100px" class="demo-ruleForm">
			<div class="addrent">修改房源信息</div>
			<el-form-item label="封面:" prop="imageUrl" :label-width="labelWidth">
				<el-upload :action="action" list-type="picture-card" :auto-upload="false" :limit="1" :on-preview="handlePictureCardPreview"
				 :on-remove="handleRemove">
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="上传的视频:" prop="videoUrl" :label-width="labelWidth">
				<el-upload :action="uploadUrl" accept='video/*' list-type="picture-card"
				 :auto-upload="false" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
					<i class="el-icon-circle-plus-outline"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="房源标题名称:" prop="houseTitle" :label-width="labelWidth">
				<el-input class="input" v-model="rentForm.houseTitle" placeholder="例如：云岩区三桥中坝路天骄北苑，包物业，拧包入驻"></el-input>
			</el-form-item>
			<el-form-item label="房源图片:" prop="houseImgUrl" :label-width="labelWidth">
				<el-upload class="avatar-uploader" :action="action" list-type="picture-card" :auto-upload="false" :on-preview="handlePictureCardPreview"
				 :on-change="changeUpload" :on-success="Success" :on-remove="handleRemove" ref="upload" multiple>
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="房屋介绍:" prop="houseIntroduce" :label-width="labelWidth">
				<el-input class="textarea" :show-word-limit="true" maxlength="200" type="textarea" v-model="rentForm.houseIntroduce"
				 placeholder="请输入房屋介绍 ... "></el-input>
			</el-form-item>
			<el-form-item label="房屋亮点:" prop="inputValue" :label-width="labelWidth">
				<el-tag :key="index" v-for="(item, index) in dynamicTags" closable :disable-transitions="false" @close="handleClose(index)">
					{{item.tag}}
				</el-tag>
				<el-input class="input-new-tag" v-if="inputVisible" v-model="rentForm.inputValue" ref="saveTagInput" size="small"
				 @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
				</el-input>
				<el-button v-else class="button-new-tag" size="small" @click="showInput">新增亮点</el-button>
			</el-form-item>
			<div class="addrent">基础信息</div>
			<el-form-item label="房屋类型:" prop="houseType" :label-width="labelWidth">
				<el-select v-model="rentForm.houseType" placeholder="请选择房屋类型">
					<el-option label="住房" value="0"></el-option>
					<el-option label="写字楼" value="1"></el-option>
					<el-option label="厂房" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="出租方式:" prop="houselease" :label-width="labelWidth">
				<el-select v-model="rentForm.houselease" placeholder="请选择房屋类型">
					<el-option label="住房" value="0"></el-option>
					<el-option label="写字楼" value="1"></el-option>
					<el-option label="厂房" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="小区名称:" prop="village" :label-width="labelWidth">
				<el-input class="village" v-model="rentForm.village" placeholder="例如：云岩区三桥中坝路天骄北苑，包物业，拧包入驻"></el-input>
			</el-form-item>
			<el-form-item label="小区地址:" prop="villageaddress" :label-width="labelWidth">
				<el-select v-model="rentForm.villageaddress" placeholder="请选择房屋类型">
					<el-option label="住房" value="0"></el-option>
					<el-option label="写字楼" value="1"></el-option>
					<el-option label="厂房" value="2"></el-option>
				</el-select>
				<el-input class="input" v-model="rentForm.villageaddresstext" placeholder="请输入详细地址"></el-input>
			</el-form-item>
			<el-form-item label="建筑面积:" prop="villagearea" :label-width="labelWidth">
				<el-input class="input" v-model="rentForm.villagearea" placeholder=""></el-input>㎡
			</el-form-item>
			<el-form-item label="房屋户型:" prop="houselayout" :label-width="labelWidth">
				<el-select v-model="rentForm.houselayout" placeholder="请选择房屋类型">
					<el-option label="住房" value="0"></el-option>
					<el-option label="写字楼" value="1"></el-option>
					<el-option label="厂房" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="朝向:" prop="houseorientation" :label-width="labelWidth">
				<el-select v-model="rentForm.houseorientation" placeholder="请选择房屋类型">
					<el-option label="住房" value="0"></el-option>
					<el-option label="写字楼" value="1"></el-option>
					<el-option label="厂房" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="楼层:" prop="houseNum" :label-width="labelWidth">
				<el-input class="input" v-model="rentForm.houseNum" placeholder="请输入楼层"></el-input>层
			</el-form-item>
		</el-form>
		<div class="formbutton">
			<el-button type="primary">发布</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'updaterenting',
		data() {
			return {
				action: localStorage.getItem('actionUrl'),
				uploadUrl: localStorage.getItem('videoUrl'),
				labelWidth: '220px',
				fullscreenLoading: false,
				loadingText: '加载中...',
				rentForm: {
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
					inputValue:''

				},
				imageUrl: '',
				rules: {
					imageUrl: {
						required: true,
						message: '请选择封面图片',
						trigger: 'blur'
					},
					videoUrl: {
						required: true,
						message: '请选择视频',
						trigger: 'blur'
					},
					houseTitle: {
						required: true,
						message: '请输入房源标题',
						trigger: 'blur'
					},
					houseImgUrl: {
						required: true,
						message: '请输入房源图片',
						trigger: 'blur'
					},
					houseIntroduce: {
						required: true,
						message: '请输入房屋介绍',
						trigger: 'blur'
					},
					houseType: {
						required: true,
						message: '请选择房屋类型',
						trigger: 'blur'
					},
					village: {
						required: true,
						message: '请输入小区名称',
						trigger: 'blur'
					},
					houselease: {
						required: true,
						message: '请选择出租方式',
						trigger: 'blur'
					},
					villageaddress: {
						required: true,
						message: '请选择小区地址',
						trigger: 'blur'
					},
					villagearea: {
						required: true,
						message: '请输入建筑面积',
						trigger: 'blur'
					},
					houselayout: {
						required: true,
						message: '请选择户型',
						trigger: 'blur'
					},
					houseorientation: {
						required: true,
						message: '请选择朝向',
						trigger: 'blur'
					},
					inputValue: {
						required: true,
						message: '',
						trigger: 'blur'
					},
					
				},
				dynamicTags: [],
				inputVisible: false,
				inputValue:''
			}
		},
		mounted() {

		},
		methods: {
			handleRemove(file, fileList) {
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			beforeUploadVideo(file) {
				const isLt10M = file.size / 1024 / 1024 < 10;
				if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) == -1) {
					this.$message.error('请上传正确的视频格式');
					return false;
				}
				if (!isLt10M) {
					this.$message.error('上传视频大小不能超过10MB哦!');
					return false;
				}
			},
			uploadVideoProcess(event, file, fileList) {
				this.videoFlag = true;
				this.videoUploadPercent = file.percentage.toFixed(0);
			},
			changeUpload(file, fileList) {
			},
			Success(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			handleClose(index) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(index), 1);
			},

			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},

			handleInputConfirm() {
				let inputValue = this.rentForm.inputValue;
				let indexList = this.dynamicTags.length;
				
				let a = indexList+1;
				if (inputValue) {
					this.dynamicTags.push({
						index: a,
						tag: inputValue
					});
				}
				this.inputVisible = false;
				this.inputValue = '';
			}
		}
	}
</script>

<style>
	.addrenting {
		width: 1200px;
		margin: 0 auto;
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

	.addrenting .el-form-item {
		margin-top: 30px;
		margin-left: 50px;
	}

/* 	.addrenting .el-form-item .el-input {
		width: 200px;
		border: 0px;
		margin-left: 10px;
		/* border-bottom: 1px solid #E7E1CD; 
	} */

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

	.el-tag+.el-tag {
		margin-left: 10px;
	}

	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}
</style>
