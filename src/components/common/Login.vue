<template>
	<div class="login-wrap">
		<div class="ms-login">
			<div class="ms-title">商盟平台管理系统V1.0</div>
			<el-form :model="param" ref="login" label-width="0px" class="ms-content">
				<el-form-item prop="username">
					<el-input v-model="param.username" placeholder="请输入管理员账号">
						<el-button slot="prepend" icon="el-icon-s-custom"></el-button>
					</el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input type="password" placeholder="请输入密码" v-model="param.password" @keyup.enter.native="submitForm()">
						<el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
					</el-input>
				</el-form-item>
				<div class="login-btn">
					<el-button type="primary" @click="submitForm">登录</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				param: {
					username: '',
					password: '',
				}
			};
		},
		methods: {
			submitForm() {
				let _this = this;
				 _this.logining = true;
				this.$refs.login.validate(valid => {
					if (_this.param.username == '') {
						_this.$message({
							showClose: true,
							message: '请输入登录账号',
							type: 'warning'
						});
					} else if (_this.param.password == '') {
						_this.$message({
							showClose: true,
							message: '请输入登录密码',
							type: 'warning'
						});
					} else {
						const loading = this.$loading({
							lock: true,
							text: '加载中...',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});
						_this.$axios.get('admin/system/login?account=' + _this.param.username + '&password=' + _this.param.password)
							.then(function(res) {
								loading.close();
								console.log(res);
								if (res.status == 200) {
									var data = res.data;
									if (data.code == 200) {
										localStorage.setItem('loginData', data.data.companyId);
										localStorage.setItem('sjid', data.data.id);
										localStorage.setItem('token', data.data.token);
										localStorage.setItem('ms_username', _this.param.username);
										if (data.data.companyId == 0) {
											_this.$router.push('/index');
											_this.$message.success('登录成功');
										} else {
											_this.$router.push('/indexshouye');
											_this.$message.success('登录成功');
										}
										
									}
									if (data.code != 200) {
										_this.$message.error(data.msg);
										return false;
									}
								}
							})
					}
				});
			},
		},
	};
</script>

<style scoped>
	.login-wrap {
		position: relative;
		width: 100%;
		height: 100%;
		/* background-image: url(../../assets/img/login-bg.jpg); */
		background-size: 100%;
		background: -webkit-linear-gradient(#09BBFE,#5A42EC); /* Safari 5.1 - 6 */
		background: -o-linear-gradient(#09BBFE,#5A42EC); /* Opera 11.1 - 12*/
		background: -moz-linear-gradient(#09BBFE,#5A42EC); /* Firefox 3.6 - 15*/
		background: linear-gradient(#09BBFE,#5A42EC); /* 标准的语法 */
	}

	.ms-title {
		width: 100%;
		line-height: 50px;
		text-align: center;
		font-size: 20px;
		color: #000;
		border-bottom: 1px solid #ddd;
	}

	.ms-login {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 350px;
		margin: -190px 0 0 -175px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.3);
		overflow: hidden;
	}

	.ms-content {
		padding: 30px 30px;
	}

	.login-btn .el-button {
		width: 290px;
		margin: 0 auto;
		text-align: center;
	}

	.login-btn .el-button button {
		width: 100%;
		height: 36px;
		margin-bottom: 10px;
	}

	.login-tips {
		font-size: 12px;
		line-height: 30px;
		color: #fff;
	}

	.el-input {
		width: 290px;
		margin: 0 auto;
	}
</style>
