<template>
	<div class="addmember">
		<div class="add_Top">修改会员</div>
		<el-form :model="updatemem" ref="updatemem">
			<el-form-item label="头像:" prop="imageUrl" :label-width="formLabelWidth" :inline-message="true">
				<el-upload class="avatar-uploader formWidth" modal="false" :action="action" :limit='1' list-type="picture-card"
				 :on-change="changeUpload" :auto-upload="false" :on-success="headSuccess" :on-remove="removeUpload" ref="upload"
				 multiple>
					<i class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<el-button type="text formWidth">重新上传</el-button>
			</el-form-item>
			<el-form-item label="手机号码:" prop="phoneumber" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="updatemem.phonemember" placeholder="请输入手机号"></el-input>
			</el-form-item>
			<el-form-item label="昵称:" prop="WeChat" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="updatemem.memberName" placeholder="请输入微信"></el-input>
			</el-form-item>
			<el-form-item label="登录密码:" prop="password" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" type="password" v-model="updatemem.password" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="重复密码:" prop="passwordf" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" type="password" v-model="updatemem.passwordf" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="真实姓名:" prop="position" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="updatemem.position" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="性别:" prop="radio" :label-width="formLabelWidth" :inline-message="true">
				<el-radio class="formWidth" v-model="updatemem.radio" label="1">男</el-radio>
				<el-radio v-model="updatemem.radio" label="0">女</el-radio>
				<el-radio v-model="updatemem.radio" label="2">不公开</el-radio>
			</el-form-item>
			<el-form-item label="所在地区:" prop="address" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="updatemem.address" placeholder="请输入地址"></el-input>
			</el-form-item>
			<el-form-item label="QQ:" prop="qq" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="updatemem.qq" placeholder="请输入地址"></el-input>
			</el-form-item>
			<el-form-item label="微信:" prop="weChat" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="updatemem.weChat" placeholder="请输入地址"></el-input>
			</el-form-item>
			<el-form-item label="邮件:" prop="mail" :label-width="formLabelWidth" :inline-message="true">
				<el-input class="formWidth" v-model="updatemem.mail" placeholder="请输入地址"></el-input>
			</el-form-item>
		</el-form> 
		<div class="add_Top">绑定企业<span>万江烽火有限公司</span></div>
		<div class="update-memb">
			<el-button>取消</el-button>
			<el-button>保存</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formLabelWidth: '220px',
				action:'',
				updatemem: {
					imageUrl: '',
					phoneumber: '',
					memberName: '',
					password: '',
					passwordf: '',
					radio: '',
					address: '',
					qq: '',
					weChat: '',
					mail: '',
					position:'',
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
@import 'updatemember.css';
</style>
