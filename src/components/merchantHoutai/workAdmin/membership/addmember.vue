<template>
	<div class="addmember">
		<div class="add_Top">添加会员</div>
		<el-form :model="addmem" ref="addmem">
			<el-form-item label="头像:" prop="imageUrl" :label-width="formLabelWidth" :inline-message="true">
				<el-upload class="avatar-uploader formWidth" modal="false" :action="action" :limit='1' list-type="picture-card"
				 :on-change="changeUpload" :auto-upload="false" :on-success="headSuccess" :on-remove="removeUpload" ref="upload"
				 multiple>
					<i class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<el-button type="text formWidth">重新上传</el-button>
			</el-form-item>
			<el-form-item label="手机号码:" prop="phoneumber" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="addmem.phonemember" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item label="会员名:" prop="WeChat" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="addmem.memberName" placeholder="请输入微信"></el-input>
			</el-form-item>
			<el-form-item label="登录密码:" prop="password" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" type="password" v-model="addmem.password" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="重复密码:" prop="passwordf" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" type="password" v-model="addmem.passwordf" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="真实姓名:" prop="position" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="addmem.name" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="性别:" prop="radio" :label-width="formLabelWidth" :inline-message="true">
				<el-radio class="" v-model="addmem.radio" label="1">男</el-radio>
				<el-radio class="" v-model="addmem.radio" label="0">女</el-radio>
				<el-radio class="" v-model="addmem.radio" label="2">不公开</el-radio>
			</el-form-item>
			<el-form-item label="所在地区:" prop="address" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="addmem.address" placeholder="请输入地址"></el-input>
			</el-form-item>
			<el-form-item label="QQ:" prop="qq" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="addmem.qq" placeholder="请输入地址"></el-input>
			</el-form-item>
			<el-form-item label="微信:" prop="weChat" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="addmem.weChat" placeholder="请输入地址"></el-input>
			</el-form-item>
			<el-form-item label="邮件:" prop="mail" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="addmem.mail" placeholder="请输入地址"></el-input>
			</el-form-item>
			<el-form-item label="绑定企业:" prop="enterprise" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth borderO" v-model="addmem.enterprise" placeholder="请输入地址" disabled></el-input>
			</el-form-item>
		</el-form> 
		<div class="addmemBut"><el-button>添加会员</el-button></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formLabelWidth: '220px',
				action: localStorage.getItem('actionUrl'),
				addmem: {
					imageUrl: '',
					phoneumber: '',
					memberName: '',
					password: '',
					passwordf: '',
					name: '',
					radio: '',
					address: '',
					qq: '',
					weChat: '',
					mail: '',
					enterprise:''
				}
			}
		},
		methods: {
			// 删除图片
			removeUpload() {
			
			},
			// 图片改变时
			changeUpload() {},
			// 图片上传成功的回掉
			headSuccess() {
			
			},
		}
	}
</script>

<style>
	.addmember {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}
	.addmemBut{
		margin-left: 50%;
	}
	.addmemBut .el-button{
		width: 153px;
		height: 33px;
		background: #2450D2;
		color: #FFFFFF;
		border-radius: 8px;
	}
	.add_Top {
		width: 100%;
		margin-top: 20px;
		height: 45px;
		line-height: 45px;
		background-color: #FAFBFA;
		padding-left: 20px;
	}
	.el-form{
		margin-top: 30px;
	}
	 .el-form-item {
		padding-left: 25%;
		padding-top: 0px;
	}
	
	.el-input {
		width: 194px;
	}
	
	.formWidth .el-input__inner {
		width: 194px;
		border-top: 0px;
		border-left: 0px;
		border-right: 0px;
		border-radius: 0px;
		border-bottom: 1px solid #C1C1C1;
	}
	.borderO.formWidth .el-input__inner{
		border-bottom: 0px solid #C1C1C1;
		pointer-events: none;
	}
	
	.el-form-item__label {
		text-align: left;
	}
</style>
