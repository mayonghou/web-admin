<template>
	<div id="Endorsementv" class="renting">
		<div class="renting-top">
			<div class="rent-top">
				<label>产品查询</label>
			</div>
			<div class="reat-search">
				<div class="search">
					<el-input v-model="input" placeholder="输入产品"></el-input>
				</div>
				<i style="font-size: 22px;color: #2494D2;margin-left: 38px;margin-top: 5px; float: left;" class="el-icon-date"></i>
				<div class="time">
					<el-date-picker prefix-icon="md-date_range" v-model="time" type="daterange" start-placeholder="开始日期"
					 end-placeholder="结束日期">
					</el-date-picker>
				</div>
				<div class="button"><el-button type="primary" class="query">查询</el-button></div>
			</div>
		</div>
		<div class="text-button">
			<div class="text"><label>被代言的产品列表</label></div>
		</div>
		<el-table :data="tableData" style="width: 1200px;margin: 0 auto;">
			<el-table-column type="selection" width="100">
			</el-table-column>
			<el-table-column prop="index" type="index" label="序号" >
			</el-table-column>
			<el-table-column prop="date" label="商品名称" width="">
			</el-table-column>
			<el-table-column prop="name" label="代言人数" width="">
			</el-table-column>
			<el-table-column prop="phone" label="商品售价">
			</el-table-column>
			<el-table-column prop="address" label="商品封面">
				<template>
				</template>
			</el-table-column>
			<el-table-column prop="address1" label="代言企业">
			</el-table-column>
			<el-table-column prop="tiem" label="创建时间">
			</el-table-column>
			<el-table-column label="操作" width="" align="center">
				<template slot-scope="scope">
					<el-button @click="btn_detail(scope.row)" type="text" class="tab_button">查看数据</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 页码 -->
		<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
		 :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
		</el-pagination>
		
	</div>
</template>

<script>
	export default {
		name: 'renting',
		data() {
			return {
				input: '',
				time: '',
				value: '',
				reatState: '',
				tableData: [],
				options:[{
					value: 1,
					label: '住房'
				},{
					value: 2,
					label: '公寓'
				},
				{
					value: 3,
					label: '写字楼'
				}],
				reatStates: [{
					value: 0,
					label: '上架'
				},{
					value: 1,
					label: '审核中'
				},
				{
					value: 2,
					label: '未通过'
				}],
				page: 1,
				limit: 20,
			}
		},
		mounted() {

		},
		methods: {
			addEndorsement(){
				this.$router.push({
					path: './addEndorsement'
				})
			},
			updateRenting(row){
				this.$router.push({
					// path: './updaterenting'
				})
			},
			btn_detail(row){
				this.$router.push({
					// path: './dateilrenting'
				})
			},
			del_relieve(row){
				
			},
			// 页码
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
			},
			// 查询我代言的产品列表
			AdvocacyList() {
				let beginTime = this.time[0] || 0;
				let endTime = this.time[1] || 0;
				let companyId = localStorage.getItem('loginData');
				let id = this.$route.query.id;
				let data = 'beginTime=' + beginTime + '&endTime=' + endTime + '&companyId=' + companyId + '&flag=' + false +
					'&limit=' + this.limit + '&page=' + this.page + '&name=' + this.input + '&partnerId=' + id;
				this.$axios.get('admin/company/my/advocacy/list?' + data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var list = [];
							data.data.forEach(function(val,index){
								list[index] = val.product
								list[index].pic = localStorage.getItem('imgUrl') + val.product.pic;
								list[index].time = val.time;
							});
							this.tableData = list;
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
				})
			}
		}

	};
</script>

<style scoped="scoped">
	.renting {
		padding: 20px;
	}
	.renting-top {
		width: 1200px;
		height: 114px;
		margin: 0 auto;
		background-color: #FAFBFA;
		/* padding-top: 10px; */
		padding-left: 20px;
		line-height: 40px;
	}

	.renting-top .rent-top {
		font-size: 14px;
	}
	.reat-search .search {
		width: 220px;
		height: 30px;
		float: left;
	}

	.reat-search .time {
		float: left;
		margin-left: 38px;
	}

	.reat-search .select {
		float: left;
		/* margin-left: 10px; */
	}
	.select .el-select{
		width: 131px;
		margin-left: 10px;
	}
	.reat-search .button{
		float: left;
		width: 150px;
		height: 30px;
		margin-left: 10px;
	}
	.button .el-button{
		width: 150px;
		background-color: #2450D2;
		border-radius: 8px;
	}
	
	.text-button{
		margin-top: 8px;
		margin-bottom: 48px;
	}
	.text-button .button{
		text-align: right;
		padding: 0;
		margin: 0;
	}
	.text-button .button .el-button{
		width: 104px;
		float: right;
	}
	.text{
		float: left;
		font-size: 14px;
		/* padding-top: 10px; */
	}

	.el-table .el_button{
		font-size: 10px;
	}
	
	.renting .pagintion{
		/* margin-left: 25%;
		padding-top: 30px; */
	}
	.tab_button{
		background-color: #FF8D00;
		width: 51px;
		height: 20px;
		color: #fff;
		line-height: 2px;
		font-size: 8px;
		border-radius: 8px;
	}
	.bj_button{
		background-color: #109955;
		width: 51px;
		height: 20px;
		color: #fff;
		line-height: 2px;
		font-size: 8px;
		border-radius: 8px;
	}
	.del_button{
		background-color: #FF0000;
		width: 51px;
		height: 20px;
		color: #fff;
		line-height: 2px;
		font-size: 8px;
		border-radius: 8px;
	}

</style>

