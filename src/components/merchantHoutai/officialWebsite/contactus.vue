<template>
	<!-- 联系我们 -->
	<div class="contactus" id="contactus">
		<div class="contactus-top"><label style="margin-left: 20px;">设置官网展示内容</label></div>
		<el-form :model="contact" ref="contact" :rules="rules">
			<div class="contactdiv">联系我们:</div>
			<el-form-item label="电话:" label-width="230px" prop="phone">
				<el-input v-model.number="contact.phone" maxlength="11" class="eliinpt" placeholder="输入电话号码"></el-input>
			</el-form-item>
			<el-form-item label="地址:" label-width="230px" prop="address">
				<el-cascader v-model="contact.address" :options="addressOptions" @change="handleChange" placeholder="请选择"></el-cascader>
				<el-input v-model="contact.detailaddress" class="eliinpt dsajdnjs" placeholder="请输入详细地址"></el-input>
			</el-form-item>
			<el-form-item label="邮箱:" prop="meail" label-width="230px">
				<el-input v-model="contact.meail" class="eliinpt" placeholder="请输入"></el-input>
			</el-form-item>
		</el-form>
		<div class="product">
			<el-button @click="baocunBtn" class="baocun">保存</el-button>
		</div>
	</div>
</template>

<script>
	import citydata from '../../../api/address.json'
	export default {
		name: 'contactus',
		data() {
			const validatePhone = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入手机号"));
				} else {
					if (!/^1[3456789]\d{9}$/.test(value)) {
						callback(new Error("手机号格式不正确"));
					} else {
						callback();
					}
				}
			};
			const validatemil = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入邮箱"));
				} else {
					if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)) {
						callback(new Error("邮箱格式不正确"));
					} else {
						callback();
					}
				}
			};
			return {
				addressOptions: [],
				contact: {
					phone: '',
					address: '',
					detailaddress: '',
					meail: ''
				},
				rules: {
					phone: [{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							type: 'number',
							message: '只能是数字',
							trigger: 'change'
						},
						{
							validator: validatePhone,
							trigger: "blur"
						},
					],
					address: [{
						required: true,
						message: '请选择地址',
						trigger: 'blur'
					}],
					meail:[
						{ required: true, message: '请选择地址', trigger: 'blur' },
						{validator: validatemil, trigger: "blur" },
					]
				},
				province: '',
				city: '',
				region: ''
			}
		},
		created() {
			this.addressOptions = citydata;
		},
		mounted() {},
		methods: {
			handleChange(value) {
				if(value.length == 2){
					this.province = '';
					this.city = value[0];
					this.region = value[1];
				} else {
					this.province = value[0];
					this.city = value[1];
					this.region = value[2];
				}
			},
			baocunBtn(){
				this.$confirm('是否确定添加企业历程', '温馨提示', {
				    confirmButtonText: '确定',
				    cancelButtonText: '取消',
				    type: 'warning'
				}).then(() => {
					let datalist = {
						province: this.province,
						city: this.city,
						region: this.region,
						address: this.contact.detailaddress,
						email: this.contact.meail,
						phone: this.contact.phone,
						companyId: parseInt(localStorage.getItem('loginData'))
					};
					const loading = this.$loading({
						lock: true,
						text: '发布中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					this.$axios.post('api/partner/add/company/contact', datalist).then((res) => {
						loading.close();
						if(res.status == 200){
							var data = res.data;
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
								message: res.data.msg,
								type: 'error'
							});
						}
						
					});
				}).catch(err=>{});
			},
		}
	}
</script>

<style>
	.contactus {
		width: 100%;
		box-sizing: border-box;
	}

	.contactus-top {
		width: 100%;
		height: 45px;
		line-height: 45px;
		background: #fafbfa;
		margin-top: 20px;
	}

	.contactdiv {
		margin-top: 30px;
		margin-left: 100px;
	}

	.eliinpt {
		width: 220px;
	}

	.eliinpt.dsajdnjs {
		margin-left: 20px;
	}

	.product .baocun {
		width: 90px;
		height: 30px;
		background: #2482d2;
		color: #fff;
		padding: 0;
		margin-left: 30%;
	}

	.el-form-item__label {
		text-align: right;
	}
</style>
