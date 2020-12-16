<template>
	<div class="lookData" id="lookData">
		<div class="" style=""><label>代言产品凤瑞扫地家用机器人的数据</label></div>
		<div class="bodyData">
			<!-- 关键指标 -->
			<div class="gjzb clearfix">
				<div class="gjzb-top">关键指标</div>
				<div class="gjzb-list">
					<div style="font-size: 13px;">浏览量</div>
					<div style="font-size: 44px;" v-for="(item, index) in tableDataList" :key="index">{{item.viewCount}}</div>
				</div>
				<div class="gjzb-list">
					<div style="font-size: 13px;">购买用户</div>
					<div style="font-size: 44px;" v-for="(item, index) in tableDataList" :key="index">{{item.userCount}}</div>
				</div>
				<div class="gjzb-list">
					<div style="font-size: 13px;">总销售额</div>
					<div style="font-size: 44px;" v-for="(item, index) in tableDataList" :key="index">{{item.totalSales}}</div>
				</div>
				<div class="gjzb-list">
					<div style="font-size: 13px;">订单量</div>
					<div style="font-size: 44px;" v-for="(item, index) in tableDataList" :key="index">{{item.orderCount}}</div>
				</div>
			</div>
			<!-- 统计 -->
			<div class="echartsData">
				<div class="count-top clearfix">
					<div class="xse fl"><label>销售额</label></div>
					<div class="times fr">
						<el-date-picker v-model="time" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
						</el-date-picker>
					</div>
					<div class="zj7t fr"><label>最近7天</label></div>
					<div class="xseTime fr">
						<span @click="Yesterday" class="button">昨天</span>
						<span @click="Taday" class="button">今天</span>
					</div>
				</div>
				<el-divider></el-divider>
				<div class="schartData">
					<div id="myChart" style="margin-top: -50px;" :style="{width: '100%', height: '380px'}"></div>
				</div>
			</div>
			<div class="lookOrder">
				<el-button @click="lookOrderData" class="button">查看订单</el-button>
			</div>
		</div>
		<el-dialog title="关联优惠券" :visible.sync="dialogVisible" width="90%">
			<div class="iconE" @click="enlarge">
				<el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
					<i class="iconfont icon-quanping"></i>
				</el-tooltip>
			</div>
			<div class="searchOrder">
				<el-input v-model="searchOrder">
					<i slot="prefix" class="el-input__icon el-icon-search"></i>
				</el-input>
				<el-button type="text" @click="searchData" style="font-size: 14px; margin-left: 14px; color: #000000;">搜索</el-button>
			</div>
			<el-table :data="tableData" style="width: 100%; margin: 0 auto;">
				<el-table-column prop="index" type="index" label="序号">
				</el-table-column>
				<el-table-column prop="orderSn" label="订单编号" width="200">
				</el-table-column>
				<el-table-column prop="userName" label="客户名">
				</el-table-column>
				<el-table-column prop="payAmount" label="订单金额">
				</el-table-column>
				<el-table-column prop="payTypeName" label="支付方式">
				</el-table-column>
				<el-table-column prop="status" label="支付状态">
				</el-table-column>
				<el-table-column prop="pickupMethodName" label="订单类型">
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间">
				</el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button @click="lookDeatailData(scope.row)" class="tab_oragel">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination class="pagintion" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
			 :page-sizes="[10, 20, 30, 40]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="counts">
			</el-pagination>
		</el-dialog>
	</div>
</template>

<script>
	import echarts from 'echarts'
	export default {
		name: 'lookData',
		components: {},
		data() {
			return {
				dialogVisible: false,
				fullscreen: false,
				searchOrder: '',
				tableDataList: [],
				tableData: [],
				counts: this.counts,
				page: 1,
				currentPage:'',
				limit: 20,
				activeName: '',
				time: '',
				taday: '',
				yesterday: '',
				tubiaoList:[]
			}
		},
		mounted() {
			this.getTime();
			this.showEcharts();
			this.getQueryCompanyData();
			this.postQueryCompanyProductData();
		},
		methods: {
			showEcharts() {
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({
					legend: {
						selectedMode: true, //可点击
						data: ['销售额', '销售额'],
						bottom: 0
					},
					grid: {
						left: 100
					},
					xAxis: [{
							type: 'category',
							data: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00',
								'22:00'
							],
							splitLine: { //不显示分割线
								show: false
							}
						}

					],
					yAxis: [{
							type: 'value',
							name: '销售额',
							splitLine: { //显示分割线
								show: true
							}
						},
						{
							type: 'value',
							name: '销售额',
							//	                        axisLabel: {
							//	                            formatter: '{value} °C'
							//	                        },
							splitLine: {
								show: true
							}
						}
					],
					series: [{
							name: '销售额',
							type: 'bar',
							//data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
							data: this.tubiaoList,
							itemStyle: {
								color: '#AEAEB2',
							}
						},
						{
							name: '销售额',
							type: 'line',
							yAxisIndex: 1, //索引从0开始
							// data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
							data: this.tubiaoList,
							itemStyle: {
								// color: 'rgba(91, 245, 204, 1)'
								color: '#34C758'
							}
						}
					]
				});
				//建议加上以下这一行代码，不加，当浏览器窗口缩小时，echarts显示不全。
				window.addEventListener('resize', function() {
					myChart.resize()
				});
			},
			// 页码
			handleSizeChange(val) {
				this.limit = val;
			},
			handleCurrentChange(val) {
				this.page = val;
			},
			// 查看表单
			lookOrderData() {
				this.dialogVisible = true;
				this.postadminQueryProductOrder();
			},
			// 查看定单
			postadminQueryProductOrder() {
				var data = {
					limit: this.limit,
					page: this.page,
					productId: this.$route.query.id,
				};
				this.$axios.post('admin/company/adminQueryProductOrder', data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							this.currentPage = data.data.currentPage;
							this.counts = data.data.totalPage
							this.tableData = data.data.dataList;
							// this.tableData.payAmount = data.data.dataList.payAmount/100;
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
				});
			},
			// 搜索
			searchData(){
				var data = {
					limit: this.limit,
					orderSn: this.searchOrder,
					page: this.page
				}
				this.$axios.post('admin/order/adminQueryOrderList', data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							this.tableData = data.data;
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
			},
			// 全屏
			enlarge() {},
			// 查看详情
			lookDeatailData(row) {
				this.dialogVisible = false;
				this.$router.push({
					path: './lookDetail',
					query: {
						id: row.orderId,
						name: row.userName,
						payTypeName: row.payTypeName
					},
				});
			},
			// 昨天
			Yesterday(){
				this.getTime();
				this.postQueryCompanyProductData();
			},
			// 今天时间
			Taday(){
				var myDate = new Date();
				myDate.setTime(myDate.getTime());
				// 当前日期
				var year = myDate.getFullYear();
				var month = myDate.getMonth() + 1;
				var day = myDate.getDate();
				var hour = myDate.getHours();//得到小时
				var minu = myDate.getMinutes();//得到分钟
				var sec = myDate.getSeconds();//得到秒
				if (month < 10) month = "0" + month;
				if (day < 10) day = "0" + day;
				if (hour < 10) hour = "0" + hour;
				if (minu < 10) minu = "0" + minu;
				if (sec < 10) sec = "0" + sec;
				this.taday = year + "-" + month+ "-" + day + ' ' + hour + ':' + minu +':' + sec;
				// 昨天日期
				var DateTime = new Date();
				DateTime.setTime(DateTime.getTime()-24*60*60*1000);
				var year1 = DateTime.getFullYear();
				var month1 = DateTime.getMonth() + 1;
				var day1 = DateTime.getDate();
				var hour1 = DateTime.getHours();//得到小时
				var minu1 = DateTime.getMinutes();//得到分钟
				var sec1 = DateTime.getSeconds();//得到秒
				if (month1 < 10) month1 = "0" + month1;
				if (day1 < 10) day1 = "0" + day1;
				if (hour1 < 10) hour1 = "0" + hour1;
				if (minu1 < 10) minu1 = "0" + minu1;
				if (sec1 < 10) sec1 = "0" + sec1;
				this.yesterday = year1 + "-" + month1 + "-" + day1 + ' ' + '00' + ':' + '00' +':' + '00';
				this.postQueryCompanyProductData();
			},
			// 获取时间
			getTime() {
				var myDate = new Date();
				myDate.setTime(myDate.getTime());
				// 当前日期
				var year = myDate.getFullYear();
				var month = myDate.getMonth() + 1;
				var day = myDate.getDate();
				var hour = myDate.getHours();//得到小时
				var minu = myDate.getMinutes();//得到分钟
				var sec = myDate.getSeconds();//得到秒
				if (month < 10) month = "0" + month;
				if (day < 10) day = "0" + day;
				if (hour < 10) hour = "0" + hour;
				if (minu < 10) minu = "0" + minu;
				if (sec < 10) sec = "0" + sec;
				this.taday = year + "-" + month+ "-" + day + ' ' + '00' + ':' + '00' +':' + '00';
				// 昨天日期
				var DateTime = new Date();
				DateTime.setTime((DateTime.getTime()-24*60*60*1000));
				var year1 = DateTime.getFullYear();
				var month1 = DateTime.getMonth() + 1;
				var day1 = DateTime.getDate();
				var hour1 = DateTime.getHours();//得到小时
				var minu1 = DateTime.getMinutes();//得到分钟
				var sec1 = DateTime.getSeconds();//得到秒
				if (month1 < 10) month1 = "0" + month1;
				if (day1 < 10) day1 = "0" + day1;
				if (hour1 < 10) hour1 = "0" + hour1;
				if (minu1 < 10) minu1 = "0" + minu1;
				if (sec1 < 10) sec1 = "0" + sec1;
				this.yesterday = year1 + "-" + month1 + "-" + day1 + ' ' + '01' + ':' + '00' +':' + '00';
			},
			
			//时间插件获取时间
			gettimes() {
				var time = this.time;
				console.log(time);
			},
			// 图表数据
			postQueryCompanyProductData() {
				let companyId = localStorage.getItem('loginData');
				let productId = this.$route.query.id;
				console.log(this.yesterday+ '====='+ this.taday);
				let data = '?companyId=' + companyId + '&startTime=' + this.yesterday + '&endTime=' +this.taday + '&productId=' + productId;
				this.$axios.post('admin/company/queryCompanyProductData' + data).then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							this.tubiaoList = data.data.totalSales;
							console.log(this.tubiaoList);
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
			},
			getQueryCompanyData() {
				this.$axios.get('admin/company/queryCompanyData').then((res) => {
					if (res.status == 200) {
						var data = res.data;
						if (data.code == 200) {
							var tableDataList = [];
							data.data.forEach(function(val, index) {
								tableDataList[index] = val.currentCompany;
							})
							this.tableDataList = tableDataList;
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
		},

	};
</script>

<style scoped>
	.echarts {}

	.clearfix:after {
		clear: both;
		content: '';
		display: block;
	}

	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	.lookData {
		width: 1200px;
		margin: 0 auto;
	}

	.bodyData {
		background-color: #FAFBFA;
		padding: 20px;
	}

	.gjzb {
		width: 1109px;
		margin: 0 auto;
		clear: both;
	}

	.gjzb .gjzb-top {
		width: 100%;
		height: 41px;
		background-color: #0000FF;
		color: #fff;
		font-size: 16px;
		line-height: 40px;
	}

	.gjzb .gjzb-list {
		width: 216px;
		height: 133px;
		border: 1px solid #EEEEEE;
		border-top: 0px;
		float: left;
		padding: 27px 30px;
	}

	.gjzb .gjzb-list:nth-child(1) {
		border-right: 0px;
	}

	.gjzb .gjzb-list:nth-child(2) {
		border-right: 0px;
	}

	.gjzb .gjzb-list:nth-child(3) {
		border-right: 0px;
	}

	.gjzb .gjzb-list:nth-child(4) {
		border-right: 0px;
	}

	.echartsData {
		height: 400px;
		background-color: #FFFFFF;
		margin-top: 20px;
		border-radius: 3px;
		padding: 20px;
	}

	.lookOrder .button {
		width: 87px;
		height: 30px;
		margin-top: 20px;
		margin-left: 50%;
		background: #0000FF;
		color: #fff;
	}

	.el-dialog {
		position: relative;
	}

	.iconE .iconfont {
		position: absolute;
		top: -62px;
		right: 55px;
		color: #000000;
		font-size: 14px;
		z-index: 1000;
	}

	.tab_oragel {
		width: 75px;
		height: 21px;
		line-height: 0px;
		border-radius: 8px;
		text-align: center;
		background-color: #0000FF;
		color: #fff;
		font-size: 10px;

	}

	.searchOrder {
		width: 375px;
		height: 45px;
		background-color: #FAFFE0;
		margin: 0 auto;
		margin-bottom: 20px;
		line-height: 45px;
		text-align: center;
	}

	.el-input {
		width: 300px;
		height: 30px;
	}

	.count-top {
		width: 100%;
	}

	.xse {
		font-size: 16px;
	}

	.xseTime .button {
		padding: 7px;
		/* height: 30px; */
		border: 1px solid #e1e1e1;
		margin-right: 0px;
		line-height: 30px;
		text-align: center;
		cursor: pointer;
	}

	.xseTime .button:hover {
		background-color: #0BB976;
		color: #fff;
	}

	.xseTime .button.active {
		background-color: #0BB976;
		color: #fff;
	}

	.zj7t {
		line-height: 34px;
	}

	.times .el-input {
		width: 136px;
	}

	.el-divider {
		margin: 20px 0;
	}
</style>
