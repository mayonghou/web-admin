<template>
	<div class="addjobVacancy" id="updateJobVacancy">
		<div class="addjob-top">填写发布的职位信息</div>
		<el-form :model="addjob" :rules="rules" ref="addjob">
			<el-form-item label="所属行业:" prop="industry" :label-width="labelwidth">
				<el-select v-model="addjob.industry" placeholder="请选择">
					<el-option v-for="(item,index) in optionIndus" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="职位名称:" prop="positionJob" :label-width="labelwidth">
				<el-select v-model="addjob.positionJob" placeholder="请选择">
					<el-option v-for="(item,index) in optionpos" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="岗位薪资:" prop="pay" :label-width="labelwidth">
				<label style="color: #A4A4A4; margin-right: 10px;">(月薪)</label>
				<el-select v-model="addjob.pay" placeholder="请选择">
					<el-option v-for="(item,index) in optionpay" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="职业类型:" prop="positiontype" :label-width="labelwidth">
				<el-select v-model="addjob.positiontype" placeholder="请选择">
					<el-option v-for="(item,index) in optiontype" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="福利待遇:" prop="benefits" :label-width="labelwidth">
				<el-checkbox-group v-model="addjob.benefits">
					<el-checkbox label="五险一金"></el-checkbox>
					<el-checkbox label="包住"></el-checkbox>
					<el-checkbox label="包吃"></el-checkbox>
					<el-checkbox label="年底双薪"></el-checkbox>
					<el-checkbox label="周末双休"></el-checkbox>
					<el-checkbox label="交通补助"></el-checkbox><br />
					<el-checkbox label="加班补助"></el-checkbox>
					<el-checkbox label="饭补"></el-checkbox>
					<el-checkbox label="话补"></el-checkbox>
					<el-checkbox label="房补"></el-checkbox>
					<el-checkbox label="节假日福利"></el-checkbox>
					<el-checkbox label="团建旅游"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="学历要求:" prop="education" :label-width="labelwidth">
				<el-select v-model="addjob.education" placeholder="请选择">
					<el-option v-for="(item,index) in educationList" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="工作年限:" prop="ageLimit" :label-width="labelwidth">
				<el-select v-model="addjob.ageLimit" placeholder="请选择">
					<el-option v-for="(item,index) in educationList" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="工作地址:" prop="address" :label-width="labelwidth">
				<el-cascader v-model="addjob.address" :options="addressOptions" @change="handleChange" placeholder="请选择"></el-cascader>
				<el-input class="elselect" v-model="addjob.detailaddress" placeholder="输入详细地址"></el-input>
			</el-form-item>
			<el-form-item label="联系电话:" prop="phone" :label-width="labelwidth">
				<el-input class="phonedada" v-model="addjob.phone" placeholder="输入联系电话"></el-input>
			</el-form-item>
			<el-form-item label="岗位描述:" prop="postdescribe" :label-width="labelwidth">
				<el-input class="textarea" type="textarea" placeholder="输入岗位描述" v-model="addjob.postdescribe" maxlength="800" show-word-limit>
				</el-input>
			</el-form-item>
			<el-form-item label="团队介绍:" prop="teamIntroduction" :label-width="labelwidth">
				<el-input class="textarea" type="textarea" placeholder="输入岗位描述" v-model="addjob.teamIntroduction" maxlength="500" show-word-limit>
				</el-input>
			</el-form-item>
		</el-form>
		<el-button class="fabuss">发布</el-button>
	</div>
</template>

<script>
	import citydata from '../../../api/address.json'
	export default {
		name: 'updateJobVacancy',
		data() {
			return {
				labelwidth: '220px',
				addressOptions: {},
				// 所属行业
				optionIndus: [{
					id: 1,
					name: 'it'
				}],
				// 职位名称
				optionpos: [{
					id: 1,
					name: 'web'
				}],
				// 岗位薪资
				optionpay: [{
					id: 1,
					name: '4000'
				}],
				// 职业类型
				optiontype: [{
					id: 1,
					name: 'it'
				}],
				educationList: [{
					id: 1,
					name: '博士',
				}, {
					id: 2,
					name: '硕士',
				}, {
					id: 3,
					name: '研究生'
				}, {
					id: 4,
					name: '本科'
				}, {
					id: 5,
					name: '专科'
				}, {
					id: 6,
					name: '高中'
				}, {
					id: 7,
					name: '初中'
				}],
				addjob: {
					industry: '',
					positionJob: '',
					pay: '',
					positiontype: '',
					benefits: [],
					education: '',
					ageLimit: '',
					address: '',
					detailaddress: '', //详细地址
					phone: '',
					postdescribe: '',
					teamIntroduction: ''
				},
				rules: {
					industry: {
						required: true,
						message: '请选择行业',
						trigger: 'blur'
					},
					positionJob: {
						required: true,
						message: '请选择职位',
						trigger: 'blur'
					},
					pay: {
						required: true,
						message: '请选择薪资',
						trigger: 'blur'
					},
					positiontype: {
						required: true,
						message: '请选择职业类型',
						trigger: 'blur'
					},
					benefits: {
						required: true,
						message: '请选择福利待遇',
						trigger: 'blur'
					},
					education: {
						required: true,
						message: '请选择学历',
						trigger: 'blur'
					},
					ageLimit: {
						required: true,
						message: '请选择年限',
						trigger: 'blur'
					},
					address: {
						required: true,
						message: '请选择地址',
						trigger: 'blur'
					},
					phone: {
						required: true,
						message: '请输入联系电话',
						trigger: 'blur'
					},
					postdescribe: {
						required: true,
						message: '请输入岗位描述',
						trigger: 'blur'
					},
					teamIntroduction: {
						required: true,
						message: '请输入团队介绍',
						trigger: 'blur'
					}

				}
			}
		},
		created() {
			this.addressOptions = citydata;
		},
		mounted() {

		},
		methods: {
			handleChange(value) {
				console.log(value);
			}
		}
	}
</script>

<style>
	.addjobVacancy {
		width: 100%;
		box-sizing: border-box;
		margin: 0 auto;
	}

	.addjob-top {
		width: 100%;
		height: 45px;
		background-color: #FAFBFA;
		line-height: 45px;
		padding-left: 20px;
		margin-top: 20px;
	}

	.el-form-item__content {
		position: relative;
	}

	.elselect {
		position: absolute;
		top: 0;
		left: 220px;
	}

	.elselect .el-input__inner {
		width: 194px;
		margin-left: 10px;
		border: 0;
		border-radius: 0;
		border-bottom: 1px solid #C1C1C1;
	}
	.textarea{
		width: 613px;
	}
	.el-textarea__inner{
		height: 190px;
	}
	.addjobVacancy .fabuss{
		width: 90px;
		height: 30px;
		padding: 0;
		background-color: #2482D2;
		color: #fff;
		margin-left: 50%;
	}
	.phonedada .el-input__inner {
		width: 203px;
		margin-left: 10px;
		border: 0;
		border-radius: 0;
		border-bottom: 1px solid #C1C1C1;
	}
</style>
