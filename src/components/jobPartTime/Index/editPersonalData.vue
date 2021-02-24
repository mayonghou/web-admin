<template>
	<div class="editPersonalData" id="editPersonalData">
		<div class="edit-top">
			<h2>编辑个人资料</h2>
			<el-button class="quxiaoEdit" @click="cancelEdit">取消编辑</el-button>
		</div>
		<div class="stepsttext">
			<el-steps :space="200" :active="active" simple>
			  <el-step title="个人资料"></el-step>
			  <el-step title="作品资料"></el-step>
			</el-steps>
		</div>
		<div class="elFormtxt">
			<el-form :model="personalData" :rules="rules" ref="personalData">
				<div v-if="active==0" class="formss">
					<el-form-item label="头像:" prop="photoImgUrl" :label-width="labelwidth">
						<el-upload
						  :action="action"
						  list-type="picture-card"
						  :on-success="avatarSuccess"
						  :auto-upload="true"
						  accept="image/*"
						  :show-file-list="false"
						>
						  <img width="100%" height="100%" v-if="personalData.photoImgUrl" :src="personalData.photoImgUrl" />
						  <i v-else class="el-icon-plus"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="姓名:" prop="name" :label-width="labelwidth">
						<el-input v-model="personalData.name" placeholder="请输入姓名" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="手机号:" prop="phone" :label-width="labelwidth">
						<el-input v-model="personalData.phone" placeholder="请输入手机号" style="width: 400px;"></el-input>
					</el-form-item>
					<el-form-item label="性别:" prop="sex" :label-width="labelwidth">
						<el-select v-model="personalData.sex" placeholder="请选择" style="width: 400px;">
							<el-option label="男" value="0"></el-option>
							<el-option label="女" value="1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="选择行业:" prop="industyName" :label-width="labelwidth">
						<el-select v-model="personalData.industyName" placeholder="请选择行业" style="width: 400px;">
							<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="选择工作经验:" prop="workExperience" :label-width="labelwidth">
						<el-select v-model="personalData.workExperience" placeholder="请选择工作经验" style="width: 400px;">
							<el-option v-for="item in optionsWork" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="个人地址:" prop="address" :label-width="labelwidth">
						<el-cascader
							v-model="personalData.address"
							:options="optionsAddresss"
						>
						</el-cascader>
						<span>详细地址：</span>
						<el-input v-model="personalData.detailAddress" placeholder="请输入详细地址" style="width: 200px;"></el-input>
					</el-form-item>
					<el-form-item label-width="50%">
						<el-button class="xiayibu" @click="xiayibu">下一步</el-button>
					</el-form-item>
				</div>
				<div v-if="active == 1">
					<el-form-item label="代表作品轮播图:" prop="behalfBanner" :label-width="labelwidth">
						<span style="color: #A4A4A4;">(轮播图展示)</span>
						<el-upload
						  :action="action"
						  list-type="picture-card"
						  :on-success="bannerSuccess"
						  :on-remove="bannerRemove"
						  :auto-upload="true"
						  :limit="5"
						  accept="image/*"
						  multiple
						>
						  <i class="el-icon-plus"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="作品方向:" prop="WorkDirection" :label-width="labelwidth">
						<el-tag
						  :key="tag"
						  v-for="tag in personalData.WorkDirection"
						  closable
						  :disable-transitions="false"
						  @close="handleClose(tag)">
						  {{tag}}
						</el-tag>
						<el-input
						  class="input-new-tag"
						  v-if="inputVisible"
						  v-model="inputValue"
						  ref="saveTagInput"
						  style="width: 200px;"
						  size="small"
						  @keyup.enter.native="handleInputConfirm"
						  @blur="handleInputConfirm"
						>
						</el-input>
						<el-button v-else class="button-new-tag addWorkDirection" size="small" @click="showInput">+ 添加作品方向</el-button>
					</el-form-item>
					<el-form-item label="个人介绍:" prop="SelfIntroduction" :label-width="labelwidth">
						<el-upload
						    :with-credentials="true"
						    multiple
						    class="quill-upload"
						    :action="action"
						    style="display: none;width:0;"
						    :show-file-list="false"
						    accept="image/*"
						    :on-success="success"
						    :before-upload="beforeAvatarUpload"
						>
						    <i class="el-icon-upload"></i>
						</el-upload>
						<quill-editor
						    ref="myQuillEditor"
						    :content="content"
						    v-model="personalData.SelfIntroduction"
						    :options="editorOption"
						></quill-editor>
					</el-form-item>
					<el-form-item label="个人及作品风格:" prop="styleOfWorks" :label-width="labelwidth">
						<el-input v-model="personalData.styleOfWorks" type="textarea" show-word-limit maxlength="200" placeholder="请输入你和你的作品风格特点" style="width: 90%;"></el-input>
					</el-form-item>
					<el-form-item label-width="50%">
						<el-button class="shangyibu" @click="shangyibu">上一步</el-button>
						<el-button class="shangyibu" @click="editBaocun">保存</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import addressJson from '../../../api/address.json';
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import { quillEditor, Quill } from 'vue-quill-editor';
	export default{
		name:'editPersonalData',
		data(){
			const toolbarOptions = [
			    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
			    ['blockquote', 'code-block'],
			
			    [{ header: 1 }, { header: 2 }], // custom button values
			    [{ list: 'ordered' }, { list: 'bullet' }],
			    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
			    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
			    [{ direction: 'rtl' }], // text direction
			
			    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
			    [{ header: [1, 2, 3, 4, 5, 6, false] }],
			
			    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
			    [{ font: [] }],
			    [{ align: [] }],
			    ['image'],
			    ['clean'] // remove formatting button
			];
			return{
				active: 0,
				optionsAddresss:addressJson,
				action:localStorage.getItem('actionUrl'),
				labelwidth:'40%',
				inputVisible: false,
				inputValue: '',
				options:[{
					id:0,
					name:'餐饮'
				}],
				optionsWork:[],
				content:"",
				editorOption: {
				    placeholder: '请输入内容',
				    modules: {
				        toolbar: {
				            container: toolbarOptions,
				            handlers: {
				                // 重写点击组件上的图片按钮要执行的代码
				                image: function (value) {
				                    document.querySelector('.quill-upload .el-icon-upload').click();
				                }
				            }
				        }
				    }
				},
				personalData:{
					photoImgUrl:'',
					name:'',
					phone:'',
					sex:'',
					industyName:'',
					workExperience:'',
					address:'',
					detailAddress:'',
					behalfBanner:[], //轮播图
					WorkDirection:[],// 作品方向
					SelfIntroduction:'',// 自我介绍
					styleOfWorks:'',//个人及个人作品风格
				},
				rules:{
					name:[
						{ required: true, message: '请输入姓名', trigger: 'blur' },
					],
					phone:[
						{ required: true, message: '请输入手机号', trigger: 'blur' },
					],
					sex:[
						{ required: true, message: '请选择性别', trigger: 'blur' },
					],
					industyName:[
						{ required: true, message: '请选择行业', trigger: 'blur' },
					],
					workExperience:[
						{ required: true, message: '请选择工作经验', trigger: 'blur' },
					],
					address:[
						{ required: true, message: '请选择个人地址', trigger: 'blur' },
					],
					behalfBanner:[
						{ required: true, message: '请选择个人代表作品', trigger: 'blur' },
					],
					WorkDirection:[
						{ required: true, message: '请添加作品方向', trigger: 'blur' },
					],
					SelfIntroduction:[
						{ required: true, message: '请添加个人介绍', trigger: 'blur' },
					],
					styleOfWorks:[
						{ required: true, message: '请输入你和你的作品风格特点', trigger: 'blur' },
					]
				}
			}
		},
		watch: {
		    serviceUrl(val) {
		        this.serviceUrl = val;
		    },
		    getHeader(val) {
		        this.getHeader = val;
		    },
		    editorData(val) {
		        this.$emit('getEditorData', this.editorData);
		    },
		    content(val) {
		        this.content = val;
		    }
		},
		mounted() {
			
		},
		methods:{
			beforeAvatarUpload(file) {
			    this.$emit('beforeAvatarUpload', file);
			},
			success(res, file, fileList) {
			    // res为图片服务器返回的数据
			    // 获取富文本组件实例
			    let quill = this.$refs.myQuillEditor.quill;
			    // 如果上传成功
			    if (res.code == 200) {
			        // 获取光标所在位置
			        const pos = quill.selection.savedRange.index; //这个得注意下，网上很多都是不对的
			        // 插入图片到光标位置
			        quill.insertEmbed(pos, 'image', localStorage.getItem('imgUrl') + res.data);
			        // 调整光标到最后
			        quill.setSelection(length + 1);
			    } else {
			        this.$message({
			            showClose: true,
			            message: '详情图片上传失败',
			            type: 'error'
			        });
			    }
			    // loading动画消失
			    this.quillUpdateImg = false;
			},
			handleClose(tag) {
			    this.personalData.WorkDirection.splice(this.personalData.WorkDirection.indexOf(tag), 1);
			},
			
			showInput() {
			   this.inputVisible = true;
			   this.$nextTick(_ => {
			     this.$refs.saveTagInput.$refs.input.focus();
			   });
			},
			
			handleInputConfirm() {
			   let inputValue = this.inputValue;
			   if (inputValue) {
			     this.personalData.WorkDirection.push(inputValue);
			   }
			   this.inputVisible = false;
			   this.inputValue = '';
			},
			// 头像上传成功函数
			avatarSuccess(res, file){
				if(res.code == 200){
					this.personalData.photoImgUrl = localStorage.getItem('imgUrl') + res.data;
				}
			},
			// 下一步
			xiayibu(){
				this.active += 1;
			},
			// 上一步
			shangyibu(){
				this.active -= 1;
			},
			// 作品轮播图
			bannerSuccess(res,file,fileList){
				if(res.code == 200){
					this.personalData.behalfBanner.push(res.data);
				}
				
			},
			// 轮播图删除
			bannerRemove(file, fileList){
				
			},
			// 保存按钮
			editBaocun(){
				console.log(this.personalData.behalfBanner);
			},
			// 取消编辑
			cancelEdit(){
				this.$router.push({
					path:'./partTimer'
				});
			}
		}
	}
</script>

<style>
	.editPersonalData{
		box-sizing: border-box;
	}
	.edit-top{
		width: 90%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 45px;
		margin: 0 auto;
		background-color: #FAFBFA;
		padding: 0 10px;
	}
	.quxiaoEdit{
		height: 30px;
		padding: 0 5px;
		background-color: #3A9DF4;
		color: #fff;
	}
	.stepsttext{
		width:30%;
		margin: 0 auto;
		margin-top: 20px;
	}
	.elFormtxt{
		margin-top: 20px;
	}
	.formss .xiayibu{
		width: 135px;
		height:40px;
		background-color: #2F24D2;
		color: #fff;
		padding: 0;
	}
	.elFormtxt .addWorkDirection{
		margin-left: 10px;
	}
	.elFormtxt .ql-container{
		width: 90%;
	}
	.elFormtxt .ql-toolbar{
		width: 90%;
	}
	.elFormtxt .el-textarea__inner{
		height: 260px;
	}
	.elFormtxt .shangyibu{
		width: 135px;
		height:35px;
		background-color: #2F24D2;
		color: #fff;
		padding: 0;
	}
</style>