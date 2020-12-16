<template>
	<!-- 行业数据 -->
	<div class="industrydata" id="industrydata">
		<el-tag>餐饮业行业数据</el-tag>
		<div class="tubiao">
			<div id="myChart" :style="{width: '100%', height: '300px',}"></div>
		</div>
		<div class="dataMerchant">
			<div class="Merchant">
				<div class="Merchant-top">餐饮业商家数据</div>
			</div>
			<div class="sameMerchant">
				<div class="sametop">
					<div>贵阳市新入驻的同行业商家(近1个月)</div>
				</div>
				<el-table :data="tableData" style="width: 100%;">
					<el-table-column label="企业名称" prop="a" align="center"></el-table-column>
					<el-table-column label="商家所在区域" prop="b" align="center"></el-table-column>
					<el-table-column label="浏览量" prop="c" align="center"></el-table-column>
					<el-table-column label="入驻日期" prop="d" align="center"></el-table-column>
				</el-table>
				<el-pagination
				    @size-change="handleSizeChange"
				    @current-change="handleCurrentChange"
				    :current-page="page"
				    :page-sizes="[10, 20, 30, 40]"
				    :page-size="10"
				    layout="total, sizes, prev, pager, next, jumper"
				    :total="counts">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'industrydata',
		data() {
			return {
				tableData: [{
					a: '贵州万疆烽火科技有限公司',
					b: '贵州省贵阳市观山湖区',
					c: '3999',
					d: '2020-11-16'
				}],
				activities: [{
					content: '支持使用图标',
					size: 'large',
					type: 'primary',
					icon: 'el-icon-more'
				}, {
					content: '支持自定义颜色',
					color: '#0bbd87'
				}, {
					content: '支持自定义尺寸',
					size: 'large'
				}, {
					content: '默认样式的节点',
				}],
				page: 1,
				counts: this.counts || 1,
				limit: 10,
			}
		},
		mounted() {
			this.getAdminConsumerDataStat();
			this.drawLine();
		},
		methods: {
			drawLine() {
				// 基于准备好的dom，初始化echarts实例
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				// 绘制图表
				myChart.setOption({
					title: {
						text: '餐饮业成交单量',
					},
					tooltip: {},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子","衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销量',
						color: '#7dde91',
						type: 'bar',
						barWidth : 7,
						data: [5, 20, 36, 10, 10, 20,30,40,50,60,90,70]
					},{
						name: '销量',
						type: 'line',
						color: '#f6d393',
						data: [5, 20, 36, 10, 10, 20,30,40,50,60,90,70]
					}],
					
				});
			},
			handleSizeChange(val){
				this.limit = val;
			},
			handleCurrentChange(val){
				this.page = val;
			},
			getAdminConsumerDataStat(){
				let date = new Date();
				let Year = new Date().getFullYear();
				let mouth = new Date().getMonth()+1;
				this.$axios.get('admin/mall/dataCenter/getAdminDataCenterOrder').then((res)=>{
					console.log(res);
				});
			}
		
		}
	}
</script>

<style>
	.industrydata {
		box-sizing: border-box;
		padding: 20px;
	}
	.industrydata .tubiao{
		width: 100%;
	}
	.dataMerchant{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.dataMerchant .Merchant{
		width: 40%;
		height: 300px;
	}
	.dataMerchant .sameMerchant{
		width: 55%;
		height: 300px;
		padding: 10px;
	}
	.sametop{
		height: 30px;
		line-height: 30px;
		display: flex;
		justify-content: space-between;
	}
	.sametopright{
		color: #1FB054;
	}
	.industrydata .el-pagination{
		text-align: center;
		margin-top: 10px;
	}
	.Merchant-top{
		font-size: 14px;
		font-weight: bolder;
	}
</style>
