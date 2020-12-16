<template>
	<div class="membership" id="membership">
		<div class="membershipTop clearfix">
			<div class="top_text"><label>客户查询</label></div>
			<div class="search">
				<el-input v-model="input" placeholder="输入昵称、电话号码"></el-input>
			</div>
			<div class="top_time">
				 <el-select v-model="value" placeholder="请选择">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				<el-button class="button">查询</el-button>
			</div>
		</div>
		<!-- 添加企业 -->
		<div class="add_Del">
			<el-button @click="add_member" class="button add_qiye">添加会员</el-button>
		</div>
		<!-- 表格 -->
		<el-table :data="tableData" style="width: 100%;">
			<el-table-column type="selection" width="">
			</el-table-column>
			<el-table-column prop="date" label="会员id" width="180">
			</el-table-column>
			<el-table-column prop="name" label="会员名称" width="180">
			</el-table-column>
			<el-table-column prop="phone" label="手机号码">
			</el-table-column>
			<el-table-column prop="address" label="绑定企业">
			</el-table-column>
			<el-table-column prop="leixing" label="会员组">
			</el-table-column>
			<el-table-column prop="tiem" label="最后登录时间">
			</el-table-column>
			<el-table-column prop="num" label="登录次数">
			</el-table-column>
			<el-table-column label="操作" width="250" align="center">
				<template slot-scope="scope">
					<el-button @click="update_member(scope.row)" class="tab_gl tab_button">修改</el-button>
					<el-button @click="del_membership(scope.row)" class="tab_del tab_button">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
		 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
		</el-pagination>
	</div>
</template>

<script>
	export default{
		name: 'membership',
		data() {
			return {
				input:'',
				time:'',
				value: '',
				 options: [{
				          value: '选项1',
				          label: '黄金糕'
				        }, {
				          value: '选项2',
				          label: '双皮奶'
				        }, {
				          value: '选项3',
				          label: '蚵仔煎'
				        }, {
				          value: '选项4',
				          label: '龙须面'
				        }, {
				          value: '选项5',
				          label: '北京烤鸭'
				        }],
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					phone: '12345678901',
					address: '5254',
					leixing: 'IT',
					tiem: '2020-9-15',
					num: '2315'
				}, {
					date: '2016-05-02',
					name: '王小虎',
					phone: '12345678901',
					address: ' 1519 ',
					leixing: 'IT',
					tiem: '2020-9-15',
					num: '33333'
				}],
				currentPage1: 5,
				currentPage2: 5,
				currentPage3: 5,
				currentPage4: 4
			}
		},
		methods:{
			// 添加会员按钮
			add_member() {
				this.$router.push({
					path: './addmember'
				}).catch(err => { console.log(err) } )
			},
			update_member() {
				this.$router.push({
					path: './updatemember'
				}).catch(err => { console.log(err) } )
			},
			// 页码
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
		}
	};
</script>

<style>
	.clearfix{
		clear: both;
	}
	.membership{
		width: 1200px;
		margin: 0 auto;
	}
	.membershipTop{
		width: 100%;
		height: 144px;
		background-color: #FAFBFA;
		margin-top: 10px;
		padding-left: 10px;
		line-height: 55px;
	}
	.top_text{
		
	}
	.search{
		width: 200px;
		height: 31px;
	}
	.top_time{
		float: left;
		margin-left: 240px;
		margin-top: -30px;
	}
	.top_time .button{
		width: 151px;
		height: 30px;
		color: #ffffff;
		border-radius: 8px;
		background: #2450D2;
		margin-left: 30px;
	}
	.add_Del{
	}
	.add_Del .button {
		float: right;
		width: 107px;
		height: 30px;
		font-size: 14px;
		color: #fff;
		border-radius: 10px;
		margin-right: 5px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
	
	.add_Del .add_qiye {
		background: #2482D2;
	}
	.el-table{
		margin-top: 20px;
	}
	.pagintion{
		/* padding-top: 30px;
		padding-left: 25%; */
	}
	.tab_button{
		width: 66px;
		height: 22px;
		line-height: 5px;
		color: #fff;
	}
	.el-table .tab_gl{
		background-color: #109955;
	}
	.el-table .tab_del{
		background-color: #FF0000;
	}
</style>
