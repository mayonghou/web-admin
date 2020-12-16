<template>
	<div id="member" class="member">
		<!-- 名片头部查询 -->
		<div class="terracr_top">
			<div class="top_text"><label>名片查询</label></div>
			<div class="top_search clear">
				<el-input class="search" v-model="inputName" placeholder="输入姓名"></el-input>
				<i style="font-size: 22px;color: #2494D2;margin-left: 38px; padding-right: 38px;" class="el-icon-date"></i>
				<el-date-picker
					prefix-icon="md-date_range"
					v-model="time"
					type="daterange"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					value-format="yyyy-MM-dd"
					@change="timeCuo"
				>
				</el-date-picker>
				<el-button @click="QueryMember" class="querybutton">查询</el-button>
			</div>
		</div>
		<!-- 删除和管理成员、添加成员-->
		<div class="add_Del">
			<label v-model="companyName">{{companyName}}</label>
			<el-button @click="addMember" class="button add_qiye">添加成员名片</el-button>
			<el-button @click="Manageositions" class="button qiyeGL">管理职位</el-button>
			<el-button @click="del_All" class="tab_del button">全部删除</el-button>
		</div>
		<!-- 表格 -->
		<el-table :data="tableData" style="width: 100%;" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="80" align="center">
			</el-table-column>
			<el-table-column prop="name" label="姓名" align="center">
			</el-table-column>
			<el-table-column prop="rank" label="职位" align="center">
			</el-table-column>
			<el-table-column prop="phoneNumber" label="电话号码" align="center">
			</el-table-column>
			<el-table-column prop="gender" label="性别" align="center">
			</el-table-column>
			<el-table-column prop="time" label="添加时间" align="center">
			</el-table-column>
			<el-table-column label="操作" width="400" align="center">
				<template slot-scope="scope">
					<el-button @click="setupStaff(scope.row)" v-if="scope.row.service == false" class="kefubutton">设为客服</el-button>
					<el-button @click="quxiaokufu(scope.row)" v-if="scope.row.service == true" class="kefufalse">取消客服</el-button>
					<el-button @click="btn_Kinguser(scope.row)"  class="sq_button">授权管理</el-button>
					<el-button @click="btn_business(scope.row)"  class="tab_button">交换名片</el-button>
					<el-button @click="btn_member(scope.row)"  class="bj_button">修改</el-button>
					<el-button @click="del_member(scope.row)"  class="del_button">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 页码 -->
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[10, 20, 30, 40]" :page-size="limit" layout="total, sizes, prev, pager, next, jumper" :total="counts">
		</el-pagination>

		<!-- 添加成员弹框 -->
		<el-dialog title="添加成员名片" :visible.sync="dialogFormVisible" @close="closeup">
			<div class="iconE" @click="enlarge">
				<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
					<i class="iconfont icon-quanping"></i>
				</el-tooltip>
			</div>
			<el-form :model="addform" :rules="rules" ref="addform">
				<el-form-item label="头像:" prop="imageUrl" :label-width="formLabelWidth" :inline-message="true">
					<el-upload
						class="avatar-uploader"
						:action="action"
						list-type="picture-card"
						:on-change="changeUpload"
						:auto-upload="false"
						:show-file-list="false"
						:on-success="headSuccess"
						ref="upload">
						<img width="100%" height="100%" v-if="addform.imageUrl" :src="addform.imageUrl" />
						<i v-show="addform.imageUrl == ''" class="el-icon-plus addimg avatar-uploader-icon"></i>
					</el-upload>
					<el-button @click="chongxi" type="text">重新上传</el-button>
				</el-form-item>
				<el-form-item label="姓名:" prop="membername" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="addform.membername" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="手机号:" prop="phoneumber" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="addform.phoneumber" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="微信:" prop="WeChat" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="addform.WeChat" placeholder="请输入微信"></el-input>
				</el-form-item>
				<el-form-item label="邮箱:" prop="mailbox" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="addform.mailbox" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item label="职位:" prop="position" :label-width="formLabelWidth" :inline-message="true">
					<el-select class="formWidth" v-model="addform.position" placeholder="请选择职位">
						<el-option v-for="(item, i) in positionsList" :key="i" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="性别:" prop="radio" :label-width="formLabelWidth" :inline-message="true">
					<el-radio class="radio" v-model="addform.radio" label="男">男</el-radio>
					<el-radio v-model="addform.radio" label="女">女</el-radio>
					<el-radio v-model="addform.radio" label="保密">保密</el-radio>
				</el-form-item>
			</el-form>
			<div class="dialogs">
				<el-button @click="addMem">保存</el-button>
			</div>
		</el-dialog>

		<!-- 修改成员弹框 -->
		<el-dialog title="修改成员名片" width="60%" :visible.sync="dialogFormUpdate" @close="closeup">
			<div class="iconE" @click="enlarge">
				<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
					<i class="iconfont icon-quanping"></i>
				</el-tooltip>
			</div>
			<el-form :model="updateform" :rules="uprules" ref="updateform">
				<el-form-item label="头像:" prop="imageUrl" :label-width="formLabelWidth" :inline-message="true">
					<el-upload
						class="avatar-uploader"
						:action="action"
						list-type="picture-card"
						:on-change="changeUpload"
						:auto-upload="false"
						:on-success="updateHeadSuccess"
						:show-file-list="false"
						ref="uploadupdata">
						<img width="100%" height="100%" v-if="updateform.imageUrl" :src="updateform.imageUrl" />
						<i v-show="updateform.imageUrl == ''" class="el-icon-plus updateimg avatar-uploader-icon"></i>
					</el-upload>
					<el-button type="text" @click="afresh">重新上传</el-button>
				</el-form-item>
				<el-form-item label="姓名:" prop="membername" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="updateform.membername" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="手机号:" prop="phoneumber" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="updateform.phoneumber" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="微信:" prop="WeChat" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="updateform.WeChat" placeholder="请输入微信"></el-input>
				</el-form-item>
				<el-form-item label="邮箱:" prop="mailbox" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="updateform.mailbox" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item label="职位:" prop="position" :label-width="formLabelWidth" :inline-message="true">
					<el-select class="formWidth" v-model="updateform.position" placeholder="请选择职位">
						<el-option v-for="(item, val) in positionsList" :value="item.id" :key="val" :label="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="性别:" prop="radio" :label-width="formLabelWidth" :inline-message="true">
					<el-radio class="radio" v-model="updateform.radio" label="男">男</el-radio>
					<el-radio v-model="updateform.radio" label="女">女</el-radio>
					<el-radio v-model="updateform.radio" label="保密">保密</el-radio>
				</el-form-item>
			</el-form>

			<div class="dialogs">
				<el-button @click="updateMember">保存</el-button>
			</div>
		</el-dialog>

		<!-- 交换名片 -->
		<el-dialog title="修改成员名片" width="60%" :visible.sync="dialogFormExchange">
			<div class="iconE" @click="enlarge">
				<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
					<i class="iconfont icon-quanping"></i>
				</el-tooltip>
			</div>
			<el-form :model="exchangeform" :rules="uprules" ref="exchangeform">
				<el-form-item label="头像:" prop="imageUrl" :label-width="formLabelWidth" :inline-message="true">
					<el-upload
						class="avatar-uploader"
						:action="action"
						list-type="picture-card"
						:auto-upload="false"
						:on-change="changeUpload"
						:show-file-list="false"
						:on-success="exchangeSuccess"
						ref="uploaddsad">
						<img width="100%" height="100%" v-if="exchangeform.imageUrl" :src="exchangeform.imageUrl"/>
						<i v-show="exchangeform.imageUrl == ''" class="el-icon-plus exchangeimg avatar-uploader-icon"></i>
					</el-upload>
					<el-button type="text" @click="exchange">重新上传</el-button>
				</el-form-item>
				<el-form-item label="姓名:" prop="membername" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="exchangeform.membername" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="手机号:" prop="phoneumber" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="exchangeform.phoneumber" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="微信:" prop="WeChat" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="exchangeform.WeChat" placeholder="请输入微信"></el-input>
				</el-form-item>
				<el-form-item label="邮箱:" prop="mailbox" :label-width="formLabelWidth" :inline-message="true">
					<el-input class="formWidth" v-model="exchangeform.mailbox" placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item label="职位:" prop="position" :label-width="formLabelWidth" :inline-message="true">
					<el-select class="formWidth" v-model="exchangeform.position" placeholder="请选择职位">
						<el-option v-for="(item,index) in positionsList" :value="item.id" :key="index" :label="item.name"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="性别:" prop="radio" :label-width="formLabelWidth" :inline-message="true">
					<el-radio class="radio" v-model="exchangeform.radio" label="男">男</el-radio>
					<el-radio v-model="exchangeform.radio" label="女">女</el-radio>
					<el-radio v-model="exchangeform.radio" label="保密">保密</el-radio>
				</el-form-item>
			</el-form>
			<div class="dialogs">
				<el-button @click="exchangeBut">保存</el-button>
			</div>
		</el-dialog>
		<!-- 授权管理 -->
		<el-dialog title="修改成员名片" :visible.sync="dialogFormKinguser" width="60%">
			<div class="iconE" @click="enlarge">
				<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
					<i class="iconfont icon-quanping"></i>
				</el-tooltip>
			</div>
			<div class="el-checkbox-lists">
				<el-checkbox-group v-model="checkList">
					<el-checkbox  v-for="item in AlldictionList" :key="item.id" border :label="item.id">{{item.name}}</el-checkbox>
				</el-checkbox-group>
			</div>
			<div class="dialogs">
				<el-button @click="permissionsSave">保存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import bus from '../../common/bus';
	export default {
		name: 'member',
		data() {
			// 手机号验证
			const validatePhone = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入手机号"));
				} else {
					if (!/^1[3456789]\d{9}$/.test(value)) {
					callback(new Error("手机号格式不正确"));
					return false;
					} else {
					callback();
					}
				}
			}; 
			// 验证
			const validateEmil = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入邮箱"));
				} else {
					if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)) {
					callback(new Error("邮箱格式不正确"));
					return false;
					} else {
					callback();
					}
				}
			};
			return {
				inputName: '',
				time: '',
				qiyeID: '',
				action: localStorage.getItem('actionUrl'),
				page: 1,
				counts: this.counts,
				limit: 10,
				fullscreen: '',
				formLabelWidth: '40%',
				dialogFormVisible: false,
				dialogFormUpdate: false,
				dialogFormExchange: false,
				dialogFormKinguser: false,
				tableData: [],
				companyName: '',
				addform: {
					imageUrl: '',
					membername: '',
					phoneumber: '',
					WeChat: '',
					mailbox: '',
					position: '',
					radio: '',
					file: {}
				},
				updateform: {
					imageUrl: '',
					membername: '',
					phoneumber: '',
					WeChat: '',
					mailbox: '',
					position: '',
					radio: '',
					file: {}
				},
				exchangeform: {
					imageUrl: '',
					membername: '',
					phoneumber: '',
					WeChat: '',
					mailbox: '',
					position: '',
					radio: '',
					file: {}
				},
				rules: {
					imageUrl: [{
						required: true,
						message: '图片不能为空',
						trigger: 'blur'
					}],
					membername: [{
						required: true,
						message: '名称不能为空',
						trigger: 'blur'
					}],
					phoneumber: [
						{required: true, validator: validatePhone, trigger: "blur" },
						{ required: true, message: '电话不能为空', trigger: 'blur' },
						{min: 11, max: 11, message: '电话号码有11位',trigger: "blur" },
						{ type:'number', message: '电话只能是数字',trigger: "blur" }
					],
					WeChat: [{
						required: true,
						message: '微信号不能为空',
						trigger: 'blur'
					}],
					mailbox: [
						{ required: true, message: '邮箱不能为空', trigger: 'blur' },
						{required: true, validator: validateEmil, trigger: "blur" },
					],
					position: [{
						required: true,
						message: '职位不能为空',
						trigger: 'blur'
					}],
					radio: [{
						required: true,
						message: '性别不能为空',
						trigger: 'blur'
					}]
				},
				uprules: {
					imageUrl: [{
						required: true,
						message: '图片不能为空',
						trigger: 'blur'
					}],
					membername: [{
						required: true,
						message: '名称不能为空',
						trigger: 'blur'
					}],
					phoneumber: [
						{required: true, validator: validatePhone, trigger: "change" },
						{ required: true, message: '电话不能为空', trigger: 'blur'},
						{min: 11, max: 11, message: '电话号码有11位',trigger: "blur"}
					],
					WeChat: [{
						required: true,
						message: '微信号不能为空',
						trigger: 'blur'
					}],
					mailbox: [
						{ required: true, message: '邮箱不能为空', trigger: 'blur' },
						{required: true, validator: validateEmil, trigger: "blur" },
					],
					position: [{
						required: true,
						message: '职位不能为空',
						trigger: 'blur'
					}],
					radio: [{
						required: true,
						message: '性别不能为空',
						trigger: 'blur'
					}],
				},
				companyIds: '',
				companyId: '',
				positionsList: [],
				loading: false,
				Updatename: '',
				// userId: '',
				fileList: [],
				formExchange: [],
				imgList: [],
				// 根据成员id查的权限
				authorization: [],
				// 权限编码
				AlldictionList: [],
				listId: [],
				listName: [],
				userid: '',
				name: '',
				timeStart: '',
				timeEnd: '',
				checkList: [],
				imgdataUrl: '',
				imgdaUrl: ''
			}

		},
		mounted() {
			this.obtain();
			this.getTeams();
			this.getPositions();
		},
		methods: {
			chongxi(){
				document.querySelector('.addimg').click();
			},
			afresh(){
				document.querySelector('.updateimg').click();
			},
			exchange(){
				document.querySelector('.exchangeimg').click();
				console.log(document.querySelector('.exchangeimg'));
			},
			quxiaokufu(row){
				this.$confirm("是否确定将取消 成员【 " + row.name + "】 的客服", '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = this.$loading({
						lock: true,
						text: '取消中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					this.$axios.get('admin/company/setup/staff?flag='+ false +'&userId='+ row.id).then((res) => {
						loading.close();
						if (res.status == 200) {
							var data = res.data;
							if (res.status == 200) {
								var data = res.data;
								if (data.code == 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
									this.getTeams();
								} else if (data.code != 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'error'
									});
								}
							} else {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'error'
								});
							}
						}
					});
				});
			},
			setupStaff(row){
				this.$confirm("是否确定将成员【 " + row.name + "】 设置为客服", '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = this.$loading({
						lock: true,
						text: '设置中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					this.$axios.get('admin/company/setup/staff?flag='+ true +'&userId='+ row.id).then((res) => {
						loading.close();
						if (res.status == 200) {
							var data = res.data;
							if (res.status == 200) {
								var data = res.data;
								if (data.code == 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
									this.getTeams();
								} else if (data.code != 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'error'
									});
								}
							} else {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'error'
								});
							}
						}
					});
				});
			},
			timeCuo(value) {
				if(value != null){
					var date = new Date(value[0]);
					var startTime = date.getTime(date);
					var date1 = new Date(value[1]);
					var endTime = date1.getTime(date1);
					this.timeStart = startTime;
					this.timeEnd = endTime;
				} else if(value == null){
					this.timeStart = '';
					this.timeEnd = '';
				}
			},
			closeup() {
				this.fileList = [];
				this.formExchange = [];
			},
			// 头像改变调用函数
			changeUpload(file, fileList) {
				var url = window.URL.createObjectURL(file.raw);
				// 上传图片
				this.addform.imageUrl = url;
				this.addform.file = file;
				// 修改图片
				this.updateform.imageUrl = url;
				this.updateform.file = file;
				
				this.exchangeform.imageUrl = url;
				this.exchangeform.file = file;
			},
			// 图片删除
			removeUpload(file, fileList) {
				this.imgList = fileList;
			},
			// 职位管理按钮
			Manageositions() {
				this.$router.push({
					path: './ManagePositions',
					query: {
						companyId: this.companyIds,
						companyName: this.companyName
					}
				}).catch(err => {
					console.log(err)
				});
			},
			// 添加头像上传成功回调的函数
			headSuccess(response, file, filelist) {
				if (response.code == 200) {
					let adddata = {
						avatar: response.data, //头像地址
						companyId: this.qyID, //企业id
						email: this.addform.mailbox, //邮箱
						gender: this.addform.radio, //性别
						name: this.addform.membername, //姓名
						phoneNumber: this.addform.phoneumber, //手机号
						rankId: this.addform.position, //职位
						wxNumber: this.addform.WeChat // 微信号
					};
					this.$axios.post('admin/company/add/card', adddata).then((res) => {
						this.loading.close();
						if (res.status == 200) {
							var data = res.data;
							if (res.status == 200) {
								var data = res.data;
								if (data.code == 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
									this.dialogFormVisible = false;
									this.getTeams();
								} else if (data.code != 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'error'
									});
								}
							} else {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'error'
								});
							}
						}
					});
				}

			},
			// 添加成员按钮
			addMember() {
				this.dialogFormVisible = true;
			},
			// 添加 保存
			addMem() {
				this.$refs.addform.validate((valid) => {
					if (valid) {
						this.$confirm("是否确定添加姓名为【 " + this.addform.membername + "】 的成员", '温馨提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							this.loading = this.$loading({
								lock: true,
								text: '添加中...',
								spinner: 'el-icon-loading',
								background: 'rgba(0, 0, 0, 0.7)'
							});
							this.$refs.upload.submit();
							this.timer = setInterval(() => {
								this.$refs.addform.resetFields();
								this.$refs.upload.clearFiles();
							}, 4000)
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});

			},

			// 修改成员弹框
			btn_member(row) {
				this.updateform.imageUrl = localStorage.getItem('imgUrl') + row.avatar;
				this.imgdataUrl = row.avatar;
				this.updateform.membername = row.name;
				this.Updatename = row.name;
				this.updateform.phoneumber = row.phoneNumber;
				this.updateform.WeChat = row.wxNumber;
				this.updateform.mailbox = row.email;
				this.updateform.position = row.rankId;
				this.updateform.radio = row.gender;
				this.userId = row.id;
				this.dialogFormUpdate = true;
			},
			// 修改图片上传成功之后的回调
			updateHeadSuccess(response, file, filelist) {
				if (response.code == 200) {
					this.imgdataUrl = response.data;
				}
			},
			// 修改保存
			updateMember() {
				this.$refs.uploadupdata.submit();
				this.$refs.updateform.validate((valid) => {
					if (valid) {
						this.$confirm("是否确定修改成员【" + this.updateform.membername + "】的信息", '温馨提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							const loading = this.$loading({
								lock: true,
								text: '修改中...',
								spinner: 'el-icon-loading',
								background: 'rgba(0, 0, 0, 0.7)'
							});
							let updateDate = {
								avatar: this.imgdataUrl,
								email: this.updateform.mailbox,
								gender: this.updateform.radio,
								name: this.updateform.membername,
								rankId: this.updateform.position,
								userId: this.userId,
								wxNumber: this.updateform.WeChat
							};
							this.$axios.post('admin/company/edit/card', updateDate).then((res) => {
								loading.close();
								if (res.status == 200) {
									var data = res.data;
									if (res.status == 200) {
										var data = res.data;
										if (data.code == 200) {
											this.$message({
												showClose: true,
												message: data.msg,
												type: 'success'
											});
											this.dialogFormUpdate = false;
											this.getTeams();
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
											message: data.msg,
											type: 'error'
										});
									}
								}
							});
						})
					}
				});
			},

			// 交换名片弹框
			btn_business(row) {
				this.exchangeform.imageUrl = localStorage.getItem('imgUrl') + row.avatar;
				this.imgdaUrl = row.avatar;
				this.exchangeform.membername = row.name;
				this.exchangeformname = row.name;
				this.exchangeform.phoneumber = row.phoneNumber;
				this.exchangeform.WeChat = row.wxNumber;
				this.exchangeform.mailbox = row.email;
				this.exchangeform.position = row.rankId;
				this.exchangeform.radio = row.gender;
				this.userId = row.id;
				this.dialogFormExchange = true;
				this.avatar = row.avatar;
			},
			// 交换图片上传成功的回调
			exchangeSuccess(response, file, filelist) {
				if (response.code == 200) {
					this.imgdaUrl = response.data;
				}
			},
			// 交换保存
			exchangeBut() {
				this.$refs.uploaddsad.submit();
				this.$refs.exchangeform.validate((valid) => {
					if(valid){
						this.$confirm("【是否确定修改成员" + this.exchangeform.membername + "的信息】", '温馨提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							const loading = this.$loading({
								lock: true,
								text: '修改中...',
								spinner: 'el-icon-loading',
								background: 'rgba(0, 0, 0, 0.7)'
							});
							let exchangeDate = {
								avatar: this.imgdaUrl,
								email: this.exchangeform.mailbox,
								gender: this.exchangeform.radio,
								name: this.exchangeform.membername,
								rankId: this.exchangeform.position,
								userId: this.userId,
								wxNumber: this.exchangeform.WeChat
							};
							this.$axios.post('admin/company/edit/card', exchangeDate).then((res) => {
								loading.close();
								if (res.status == 200) {
									var data = res.data;
									if (res.status == 200) {
										var data = res.data;
										if (data.code == 200) {
											this.$message({
												showClose: true,
												message: data.msg,
												type: 'success'
											});
											this.dialogFormExchange = false;
											this.getTeams();
										} else if (data.code != 200) {
											this.$message({
												showClose: true,
												message: data.msg,
												type: 'error'
											});
										}
									} else {
										this.$message({
											showClose: true,
											message: data.msg,
											type: 'error'
										});
									}
								}
							});
						})
					}
				});
			},

			// 授权保存
			permissionsSave() {
				this.$confirm("是否确定修改成员【 " + this.name + " 】的授权信息", '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let loading = this.$loading({
						lock: true,
						text: '修改中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					this.$axios.get('admin/company/authorization/element?sn=' + this.checkList + '&userId=' + this.userid).then((res) => {
						loading.close();
						if (res.status == 200) {
							var data = res.data;
							if (res.status == 200) {
								var data = res.data;
								if (data.code == 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
									this.dialogFormKinguser = false;
									this.getTeams();
								} else if (data.code != 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'error'
									});
								}
							} else {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'error'
								});
							}
						}
					});
				});
			},
			// 授权图标
			getIcons() {

			},
			// 当授权管理的id等于编码数组中的编码时就选中
			// 授权管理 弹框
			btn_Kinguser(row) {
				const _this = this
				_this.name = row.name;
				_this.AlldictionList = [];
				_this.dialogFormKinguser = true;
				_this.userid = row.id;
				_this.getElementSn();
				_this.$axios.get('admin/company/element/sn/' + row.companyId).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (res.status == 200) {
							var data = res.data;
							if (data.code == 200) {
								this.AlldictionList = data.data
							} else if (data.code != 200) {
								_this.$message({
									showClose: true,
									message: data.msg,
									type: 'error'
								});
							}
						} else {
							_this.$message({
								showClose: true,
								message: data.msg,
								type: 'error'
							});
						}
					}
				});
			},
			getElementSn() {
				this.$axios.get('admin/company/find/element/' + this.userid).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (res.status == 200) {
							var data = res.data;
							if (data.code == 200) {
								this.checkList = data.data;
							} else if (data.code != 200) {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'error'
								});
							}
						} else {
							this.$message({
								showClose: true,
								message: data.msg,
								type: 'error'
							});
						}
					}
				});
			},


			// 删除单个
			del_member(row) {
				this.$confirm("【是否确定删除" + row.name + "的成员信息】", '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = this.$loading({
						lock: true,
						text: '删除中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					this.$axios.get('admin/company/delete/card/?userIds=' + row.id).then((res) => {
						loading.close();
						if (res.status == 200) {
							var data = res.data;
							if (res.status == 200) {
								var data = res.data;
								if (data.code == 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
									this.getTeams();
								} else if (data.code != 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'error'
									});
								}
							} else {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'error'
								});
							}
						}
					});
				});
			},

			// 拿到复选框的id
			handleSelectionChange(val) {
				var listId = [];
				var listName = [];
				val.forEach(function(list, i) {
					listId[i] = list.id;
					listName[i] = list.name;
				});
				this.listName = listName;
				this.listId = listId;
				this.list = val;
			},
			// 删除所有钮
			del_All() {
				this.$confirm("【是否确定删除 " + this.listName + " 的成员信息】", '温馨提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const loading = this.$loading({
						lock: true,
						text: '删除中...',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					});
					let id = this.listId;
					this.$axios.get('admin/company/delete/card/?userIds=' + id).then((res) => {
						loading.close();
						if (res.status == 200) {
							var data = res.data;
							if (res.status == 200) {
								var data = res.data;
								if (data.code == 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
									this.getTeams();
								} else if (data.code != 200) {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'error'
									});
								}
							} else {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'error'
								});
							}
						}
					});
				});
			},
			// 页码
			handleSizeChange(val) {
				this.limit = val;
				this.getTeams();
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getTeams();
			},
			// 全屏事件
			enlarge() {

			},
			obtain() {
				let beginTime = this.time[0] || 0;
				let endTime = this.time[1] || 0;
				this.beginTime = beginTime;
				this.endTime = endTime;
				let qyID = localStorage.getItem('loginData');
				this.qyID = qyID;
			},
			QueryMember() {
				this.getTeams();
				this.page = 1;
			},
			
			// 查询接口
			getTeams() {
				var data = '?page=' + this.page + '&beginTime=' + this.timeStart + '&endTime=' +
					this.timeEnd + '&name=' + this.inputName + '&companyId=' + this.qyID + '&limit=' + this.limit;
				this.$axios.get('admin/company/teams' + data).then(res => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var dataList = [];
							var companyName = '';
							var companyIds = '';
							data.data.forEach(function(val, index){
								dataList[index] = val;
								var date = new Date(val.time);
								var time = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
								    '-' + date.getDate();
								dataList[index].time = time;
								companyName = val.companyName;
								companyIds = val.companyId;
							});
							this.tableData = dataList;
							 this.companyName = companyName;
							 this.companyIds = companyIds;
						} else {
							this.$message({
								showClose: true,
								message: "未知错误",
								type: 'error'
							});
						}
					} else {
						this.$message({
							showClose: true,
							message: '未知错误',
							type: 'error'
						});
					}
				});
			},
			//职位接口
			getPositions() {
				this.qiyeName = this.$route.query.companyName;
				var id = this.$route.query.companyId;
				var data = '?page=' + this.page + '&companyId=' + this.qyID + '&limit=' + this.limit;
				this.$axios.get('admin/company/positions' + data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							this.positionsList = data.data;
							this.counts = this.positionsList.length;
						} else if (data.code == 401) {
							this.$message({
								showClose: true,
								message: data.msg,
								type: 'error'
							});
						}
					} else {
						this.$message({
							showClose: true,
							message: data.msg,
							type: 'error'
						});
					}
				});
			}
		}
	};
</script>


<style>
	.after {
		border: 1px solid #0000FF;
		color: #0000FF;
	}

	.before {
		border: 1px solid #EEEEEE;
		cursor: pointer;
	}

	.el-checkbox-lists {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		justify-items: center;
		align-items: center;
		justify-content: center;
	}

	.el-checkbox-tab {
		width: 25%;
	}

	.tab {
		display: flex;
		justify-items: center;
		align-items: center;
		width: 60%;
		height: 35px;
		margin: 10px 10px;
		margin-bottom: 10px;
		border-radius: 5px;
		font-size: 14px;
	}

	.img-tab {
		margin-right: 5px;
	}


	.uploadImg {
		width: 100%;
		height: 100%;
	}

	.el-checkboxLists {
		margin: 0 auto;
		padding-left: 20px;
		clear: both;
		display: flex;
		flex-wrap: wrap;
	}

	.el-checkboxLists i {
		padding-right: 10px;
	}

	.el-checkboxLists .el-checkbox__inner {
		top: 0;
	}


	.el-checkbox.is-bordered+.el-checkbox.is-bordered {
		margin-left: 0px;
	}

	.el-checkbox-group {
		float: left;
		margin-left: 20px;
	}

	.el-checkboxLists .el-checkbox {
		float: left;
		margin-right: 30px;
		width: 120px;
		height: 30px;
	}

	.el-checkbox {
		margin-top: 20px;
	}

	.dialogs {
		width: 100%;
		clear: both;
		margin: 0 auto;
		text-align: center;
		margin-bottom: 10px;
	}

	.member .dialogs .el-button {
		width: 151px;
		height: 30px;
		line-height: 15px;
		background-color: #2450D2;
		border-radius: 8px;
		margin-left: 0;
		color: #fff;
		/* margin-left: 40%; */
		margin-top: 20px;
	}

	.el-form {
		width: 100%;
	}

	.iconE {
		position: relative;
		cursor: pointer;
	}

	.iconE .iconfont {
		position: absolute;
		top: -63px;
		right: 40px;
		font-size: 14px;
		color: #909399;
	}

	.formWidth {
		width: 250px;
	}

	.formWidth .el-input {
		width: 100%;
		border: 0px;
		border-radius: 0px;
		/* border-bottom: 1px solid #C1C1C1; */
	}
	.el-select.formWidth .el-input {
		width: 100%;
	}
	.formWidth .el-form-item__label {
		text-align: right;
	}

	.formWidth.el-input input {
		border: 0px;
		border-bottom: 1px solid #C1C1C1;
		border-radius: 0px;
	}

	.clear {
		clear: both;
	}

	.member {
		width: 100%;
		box-sizing: border-box;
		padding: 10px;
	}

	.terracr_top {
		width: 100%;
		height: 114px;
		margin: 0 auto;
		margin-bottom: 20px;
		background-color: #FAFBFA;
	}

	.top_text {
		padding: 10px 20px;
		font-size: 14px;
	}

	.top_search {
		padding: 10px 20px;
		font-size: 12px;
		margin-top: -8px;
	}

	.top_search .search {
		width: 200px;
		height: 30px;
		color: #A4A4A4;
	}

	.member .querybutton {
		width: 151px;
		height: 30px;
		background-color: #2450D2;
		color: #FFFFFF;
		border-radius: 8px;
	}

	.add_Del {
		width: 100%;
		height: 50px;
		line-height: 50px;
		font-size: 14px;
	}

	.add_Del .button {
		width: 107px;
		height: 30px;
		font-size: 14px;
		color: #fff;
		border-radius: 10px;
		float: right;
		margin-right: 5px;
	}

	.add_Del .add_qiye {
		background: #2482D2;
	}

	.add_Del .qiyeGL {
		background: #FF8D00;
	}

	.add_Del .tab_del {
		background: #FF0000;
	}

	.el-table .tab_button {
		width: 66px;
		height: 30px;
		font-size: 14px;
		line-height: 5px;
		text-align: center;
		color: #FFFFFF;
		border-radius: 10px;
		background: #FF8D00;
		padding: 0;
	}

	.el-table .sq_button {
		width: 66px;
		height: 30px;
		font-size: 14px;
		line-height: 5px;
		text-align: center;
		color: #FFFFFF;
		border-radius: 10px;
		background: #2450D2;
		padding: 0;
	}

	.el-table .bj_button {
		width: 66px;
		height: 30px;
		font-size: 14px;
		line-height: 5px;
		text-align: center;
		color: #FFFFFF;
		border-radius: 10px;
		background: #109955;
		padding: 0;
	}

	.formWidth.el-input input {
		border: 0px;
		border-bottom: 1px solid #C1C1C1;
	}

	.el-table .del_button {
		width: 66px;
		height: 30px;
		font-size: 14px;
		line-height: 5px;
		text-align: center;
		color: #FFFFFF;
		border-radius: 10px;
		background: #FF0000;
		padding: 0;
	}
	.el-table .kefubutton{
		width: 66px;
		height: 30px;
		line-height: 5px;
		font-size: 14px;
		text-align: center;
		color: #FFFFFF;
		border-radius: 10px;
		background: #42A7FF;
		padding: 0;
	}
	.el-checkbox-group{
		width: 100%;
	}
	.el-checkbox-group .el-checkbox__input .el-checkbox .el-checkbox__inner{
		top: 0;
	}
	.el-checkbox-group .el-checkbox__input {
		margin-left: 8px;
		margin-top: 3px;
		float: right;
	}
	.el-table .kefufalse{
		width: 66px;
		height: 30px;
		font-size: 14px;
		line-height: 5px;
		text-align: center;
		color: #FFFFFF;
		border-radius: 10px;
		background: #979497;
		padding: 0;
	}
	.member .el-dialog__body .el-form-item__label{
		text-align: right;
	}
</style>
