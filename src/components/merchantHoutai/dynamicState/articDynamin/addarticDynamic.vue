<template>
	<div class="addDynamic" id="addDynamicartic">
		<div class="addDynamic-top"><label style="margin-left: 20px">填写发布的文章动态信息</label></div>
		<el-form :model="addforData" :rules="rules" ref="addforData">
			<el-form-item label="动态标题:" prop="dynamicTitle" :label-width="labelwidth">
				<el-input v-model="addforData.dynamicTitle" class="elinput" placeholder="请输入动态标题"></el-input>
			</el-form-item>
			<el-form-item label="封面:" prop="dynamicImg" :label-width="labelwidth">
				<el-upload
					class="avatar-uploader"
					:action="action"
					accept="image/*"
					list-type="picture-card"
					:on-change="changeUpload"
					:auto-upload="true"
					:on-success="fmSuccess"
					:show-file-list="false"
					ref="upload">
					<img width="100%" height="100%" v-if="addforData.dynamicImg" :src="addforData.dynamicImg" />
					<i v-show="addforData.dynamicImg == ''" class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="文章详情:" prop="dynamicDetail" :label-width="labelwidth">
				<el-upload
					:with-credentials='true'
					multiple
					class="quill-upload"
					:action="action"
					style="display: none;width:0"
					:show-file-list="false"
					accept="image/*"
					:on-success="success"
					:before-upload="beforeAvatarUpload">
					<i class="el-icon-upload"></i>
				</el-upload>
				<quill-editor
				ref="myQuillEditor"
				:content='content'
				v-model="addforData.dynamicDetail"
				:options="editorOption"></quill-editor>
			</el-form-item>
		</el-form>
		<div class="btn-bell">
			<el-button @click="addarticDynamic" class="btn">发布</el-button>
		</div>
	</div>
</template>

<script>
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import {
		quillEditor,
		Quill
	} from 'vue-quill-editor'
	export default {
		name: 'addDynamicartic',
		data() {
			const toolbarOptions = [
				['bold', 'italic', 'underline', 'strike'], // toggled buttons
				['blockquote', 'code-block'],

				[{
					header: 1
				}, {
					header: 2
				}], // custom button values
				[{
					list: 'ordered'
				}, {
					list: 'bullet'
				}],
				[{
					script: 'sub'
				}, {
					script: 'super'
				}], // superscript/subscript
				[{
					indent: '-1'
				}, {
					indent: '+1'
				}], // outdent/indent
				[{
					direction: 'rtl'
				}], // text direction

				[{
					size: ['small', false, 'large', 'huge']
				}], // custom dropdown
				[{
					header: [1, 2, 3, 4, 5, 6, false]
				}],

				[{
					color: []
				}, {
					background: []
				}], // dropdown with defaults from theme
				[{
					font: []
				}],
				[{
					align: []
				}],
				['image'],
				['clean'] // remove formatting button
			]
			return {
				content:``,
				labelwidth: '230px',
				editorOption: {
					placeholder: '请输入内容',
					modules: {
						toolbar: {
							container: toolbarOptions,
							handlers: {
								// 重写点击组件上的图片按钮要执行的代码
								'image': function(value) {
									document.querySelector('.quill-upload .el-icon-upload').click()
								}
							}
						}
					}
				},
				action: localStorage.getItem('actionUrl'),
				addforData: {
					dynamicTitle: '',
					dynamicImg: '',
					dynamicDetail: '',
					file: {}
				},
				rules: {
					dynamicDetail: [{
						required: true,
						message: '动态详情不能为空',
						trigger: 'blur'
					}],
					dynamicImg: [{
						required: true,
						message: '封面图片不能为空',
						trigger: 'blur'
					}],
					dynamicTitle: [{
						required: true,
						message: '动态标题不能为空',
						trigger: 'blur'
					}]
				},
				imgUrl: [],
				imgUrlData:''
			};
		},
		mounted() {
			
		},
		watch: {
			serviceUrl(val) {
				this.serviceUrl = val
			},
			getHeader(val) {
				this.getHeader = val
			},
			editorData(val) {
				this.$emit('getEditorData', this.editorData)
			},
			content(val) {
				this.content = val
			}
		},
		methods: {
			beforeAvatarUpload(file) {
				this.$emit('beforeAvatarUpload', file)
			},
			success(res, file, fileList) {
				// res为图片服务器返回的数据
				// 获取富文本组件实例
				let quill = this.$refs.myQuillEditor.quill
				// 如果上传成功
				if (res.code == 200) {
					// 获取光标所在位置
					const pos = quill.selection.savedRange.index //这个得注意下，网上很多都是不对的
					// 插入图片到光标位置
					quill.insertEmbed(pos, 'image', localStorage.getItem('imgUrl') + res.data)
					// 调整光标到最后
					quill.setSelection(length + 1)
				}
				// loading动画消失
				this.quillUpdateImg = false
			},
			changeUpload(file, fileList) {
				this.addforData.dynamicImg = file.url;
				this.addforData.file = file;
				this.imgUrl = fileList;
				this.addforData.file = file;
			},
			removeUpload(file, fileList) {
				this.imgUrl = fileList;
			},
			fmSuccess(response, file, fileList) {
				if (response.code == 200) {
					this.imgUrlData = response.data;
					console.log(this.imgUrlData);
				} else {
					return this.$message({
						showClose: true,
						message: '图片上传失败',
						type: 'error'
					});
				}
			},

			// 富文本事件
			onEditorBlur() {},
			onEditorFocus() {
				//获得焦点事件
			},
			onEditorChange() {
				//内容改变事件
			},
			addarticDynamic() {
				this.$refs.addforData.validate((valid) => {
					if (valid) {
						this.$confirm('是否确定发布【' + this.addforData.dynamicTitle + '】文章动态?', '温馨提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							const loading = this.$loading({
								lock: true,
								text: '发布中...',
								spinner: 'el-icon-loading',
								background: 'rgba(0, 0, 0, 0.7)'
							});
							let data = {
								title: this.addforData.dynamicTitle,
								details: this.addforData.dynamicDetail,
								type: 1,
								url: this.imgUrlData,
							}
							this.$axios.post('admin/admin/company/insertDynamic', data).then((res) => {
								loading.close();
								if (res.status == 200) {
									var data = res.data;
									if (data.code == 200) {
										this.$message({
											showClose: true,
											message: data.msg,
											type: 'success'
										});
										console.log(this.$router.currentRoute);
										this.$refs.addforData.resetFields();
										this.$router.push({
											path: './articleDynamic'
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
							});
						});
					}
				});
			}
		}
	};
</script>

<style>
	.addDynamic {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}

	.addDynamic-top {
		width: 100%;
		height: 45px;
		background-color: #FAFBFA;
		margin-bottom: 30px;
		line-height: 45px;
	}

	.addDynamic .el-form-item__label {
		text-align: right;
	}

	.textarea {
		width: 750px;
	}

	.el-textarea__inner {
		height: 250px;
	}

	.btn-bell {
		width: 100%;
		text-align: center;
	}

	.btn-bell .btn {
		width: 90px;
		height: 30px;
		background-color: #2450D2;
		color: #fff;
		padding: 0;
	}

	.elinput .el-input__inner {
		width: 250px;
		border: 0;
		border-radius: 0;
		border-bottom: 1px solid #c1c1c1;
	}

	.quill-editor.editor {
		width: 820px;
	}
	.ql-container img{
		width: 200px;
	}
	.addDynamic .quill-editor{
		width: 70%;
	}
</style>
