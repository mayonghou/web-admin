<template>
	<div class="addDynamic" id="editArticDynamic">
		<div class="addDynamic-top"><label>填写发布的文章动态信息</label></div>
		<el-form :model="editforData" :rules="rules" ref="editforData">
			<el-form-item label="动态标题:" prop="dynamicTitle" :label-width="labelwidth">
				<el-input v-model="editforData.dynamicTitle" class="elinput" placeholder="请输入动态标题"></el-input>
			</el-form-item>
			<el-form-item label="封面:" prop="dynamicImg" :label-width="labelwidth">
				<el-upload class="avatar-uploader" :action="action" accept="image/*" list-type="picture-card" :on-change="changeUpload"
				 :auto-upload="true" :on-success="fmSuccess" :show-file-list="false" ref="upload">
					<img width="100%" height="100%" v-if="editforData.dynamicImg" :src="editforData.dynamicImg" />
					<i v-show="editforData.dynamicImg == ''" class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="文章详情:" prop="dynamicDetail" :label-width="labelwidth">
				<el-upload :with-credentials='true' multiple class="quill-upload" :action="action" style="display: none;width:0"
				 :show-file-list="false" accept="image/*" :on-success="success" :before-upload="beforeAvatarUpload">
					<i class="el-icon-upload"></i>
				</el-upload>
				<quill-editor ref="myQuillEditor" class="quill-editor" :content='content' v-model="editforData.dynamicDetail" :options="editorOption"></quill-editor>
			</el-form-item>
		</el-form>
		<div class="btn-bell">
			<el-button @click="editArticDynamic" class="btn">发布</el-button>
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
	} from 'vue-quill-editor';
	export default {
		name: 'editArticDynamic',
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
				labelwidth: '230px',
				content: ``,
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
				fileList: [],
				editforData: {
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
					dynamicTitle: [{
						required: true,
						message: '动态标题不能为空',
						trigger: 'blur'
					}]
				},
				imgUrl: [],
				id: '',
				dynamicImgUrl: ''
			};
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
		mounted() {
			this.getEditData();
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
				this.editforData.dynamicImg = file.url;
				this.editforData.file = file;
				this.imgUrl = fileList;
			},
			fmSuccess(response, file, fileList) {
				if (response.code == 200) {
					this.dynamicImgUrl = response.data;
				}
			},
			removeUpload(file, fileList) {
				this.imgUrl = fileList;
			},
			// 富文本事件
			onEditorBlur() {},
			onEditorFocus() {
				//获得焦点事件
			},
			onEditorChange() {
				//内容改变事件
			},

			// 编辑提交
			editArticDynamic() {
				this.$refs.editforData.validate((valid) => {
					if (valid) {
						this.$confirm('是否确定编辑【' + this.editforData.dynamicTitle + '】文章动态?', '温馨提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							const loading = this.$loading({
								lock: true,
								text: '编辑中...',
								spinner: 'el-icon-loading',
								background: 'rgba(0, 0, 0, 0.7)'
							});
							let data = {
								title: this.editforData.dynamicTitle,
								details: this.editforData.dynamicDetail,
								type: 1,
								url: this.dynamicImgUrl,
								id: this.id
							}
							this.$axios.post('admin/admin/company/editDynamic', data).then((res) => {
								loading.close();
								if (res.status == 200) {
									var data = res.data;
									if (data.code == 200) {
										this.$message({
											showClose: true,
											message: data.msg,
											type: 'success'
										});
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
			},

			// 列表页的编辑数据
			getEditData() {
				var data = this.$route.query.data;
				console.log(data);
				this.editforData.dynamicDetail = data.details;
				console.log(this.editforData.dynamicDetail);
				var aaas = /^(https):\/\/.+$/;
				if (aaas.test(data.url) == true) {
					this.editforData.dynamicImg = data.url;
					this.dynamicImgUrl = data.url.substring(data.url.lastIndexOf('/image'))
				} else {
					this.dynamicImgUrl = data.url;
					this.editforData.dynamicImg = localStorage.getItem('imgUrl') + data.url;
				}
				this.editforData.dynamicTitle = data.title;
				this.id = data.id;
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

	.quill-editor {
		width: 950px;
	}
	.quill-editor img{
		width: 100px;
	}
</style>
