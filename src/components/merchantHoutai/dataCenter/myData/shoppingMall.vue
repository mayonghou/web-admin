<template>
	<!-- 商城数据 -->
	<div class="mydatas" id="mydatas">
		<!-- 导航 -->
		<div class="button" @click="tabqiuehuan">
			<div class="but active">商城数据</div>
			<div class="but ">招聘数据</div>
			<div class="but">房源数据</div>
		</div>

		<!-- 商城数据 -->
		<div class="shoppingmall tab-list active">
			<!-- 头部总数 -->
			<div class="shoppingmall-top">
				<div class="top-text top-sale">
					<img class="img" src="../../../../assets/img/md-account_balance_wallet.svg" />
					<div class="top-countNum">
						<div class="countNum-top">￥123156</div>
						<div class="countNum-bottom">今日销售总额</div>
					</div>
				</div>
				<div class="top-text top-order">
					<img class="img" src="../../../../assets/img/fasfa-user.svg" />
					<div class="top-countNum">
						<div class="countNum-top">4522213</div>
						<div class="countNum-bottom">今日订单量</div>
					</div>
				</div>
				<div class="top-text top-market">
					<img class="img" src="../../../../assets/img/md-comment.svg" />
					<div class="top-countNum">
						<div class="countNum-top">123156</div>
						<div class="countNum-bottom">今日出货量</div>
					</div>
				</div>
				<div class="top-text top-browse">
					<img class="img" src="../../../../assets/img/md-visibilityCopy.svg" />
					<div class="top-countNum">
						<div class="countNum-top">123156</div>
						<div class="countNum-bottom">今日浏览量</div>
					</div>
				</div>
			</div>
			<!-- 客户和商品统计 -->
			<div class="kehuShoppCount">
				<!-- 客户统计 -->
				<div class="kehuCount">
					<el-card class="box-card">
						<div slot="header" class="kehu-card">
							<div>客户统计</div>
							<div>单位（个）</div>
						</div>
						<div class="text item">
							<div>
								<div style="font-size: 28px;">0</div>
								<div style="font-size: 8px;">今日新增</div>
							</div>
							<div>
								<div style="font-size: 28px;">112</div>
								<div style="font-size: 8px;">昨日新增</div>
							</div>
							<div>
								<div style="font-size: 28px;">312</div>
								<div style="font-size: 8px;">本月新增</div>
							</div>
							<div>
								<div style="font-size: 28px;">4312</div>
								<div style="font-size: 8px;">今日新增</div>
							</div>
						</div>
					</el-card>
				</div>
				<!-- 商品统计 -->
				<div class="shoppingCount">
					<el-card class="box-card">
						<div slot="header" class="kehu-card">
							<div>商品统计</div>
							<div>单位（件）</div>
						</div>
						<div class="text item">
							<div>
								<div style="font-size: 28px;">4564566</div>
								<div style="font-size: 8px;">商品总数</div>
							</div>
							<div>
								<div style="font-size: 28px;">112</div>
								<div style="font-size: 8px;">代言企业</div>
							</div>
							<div>
								<div style="font-size: 28px;">312</div>
								<div style="font-size: 8px;">今日上架</div>
							</div>
							<div>
								<div style="font-size: 28px;">4312</div>
								<div style="font-size: 8px;">今日下架</div>
							</div>
						</div>
					</el-card>
				</div>
			</div>
			<!-- 情况和排名 -->
			<div class="situationRanking">
				<!-- 情况 -->
				<div class="SR-Left">
					<div class="left-top">
						<div class="leftData left">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<span>订单情况</span>
								</div>
								<div class="text item">
									<div class="text-item">
										<div style="color: #101010; font-size: 13px;">待支付订单：</div>
										<div style="color:#55CA7D;">0</div>
									</div>
									<div class="text-item">
										<div style="color: #101010; font-size: 13px;">待发货订单：</div>
										<div style="color:#55CA7D;">10</div>
									</div>
									<div class="text-item">
										<div style="color: #101010; font-size: 13px;">待收货订单：</div>
										<div style="color:#55CA7D;">100</div>
									</div>
									<div class="text-item">
										<div style="color: #101010; font-size: 13px;">已成交订单数：</div>
										<div style="color:#55CA7D;">156</div>
									</div>
									<div class="text-item">
										<div style="color: #101010; font-size: 13px;">交易失败：</div>
										<div style="color:#55CA7D;">541665</div>
									</div>
								</div>
							</el-card>
						</div>
						<div class="leftData center">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<span>商品情况</span>
								</div>
								<div class="text item">
									<div class="text-item">
										<div style="color: #101010; font-size: 13px;">待审核商品：</div>
										<div style="color:#55CA7D;">0</div>
									</div>
									<div class="text-item">
										<div style="color: #101010; font-size: 13px;">库存警告商品：</div>
										<div style="color:#55CA7D;">10</div>
									</div>
									<div class="text-item">
										<div style="color: #101010; font-size: 13px;">上架商品：</div>
										<div style="color:#55CA7D;">100</div>
									</div>
									<div class="text-item">
										<div style="color: #101010; font-size: 13px;">下架商品：</div>
										<div style="color:#55CA7D;">156</div>
									</div>
									<div class="text-item">
										<div style="color: #101010; font-size: 13px;">已售商品数量：</div>
										<div style="color:#55CA7D;">541665</div>
									</div>
								</div>
							</el-card>
						</div>
						<div class="leftData right">
							<el-card class="box-card">
								<div slot="header" class="clearfix">
									<span>客户情况</span>
								</div>
								<div class="text item">
									<div class="text-item">
										<div style="color: #101010;">潜在客户：</div>
										<div style="color:#55CA7D;">0</div>
									</div>
									<div class="text-item">
										<div style="color: #101010;">客户数量：</div>
										<div style="color:#55CA7D;">10</div>
									</div>
									<div class="text-item">
										<div style="color: #101010;">今日活跃：</div>
										<div style="color:#55CA7D;">156</div>
									</div>
									<div class="text-item">
									</div>
									<div class="text-item">
									</div>
								</div>
							</el-card>
						</div>
					</div>
					<div class="left-bottom">
						<div class="bottom bottom-left">
							<el-card class="box-card">
								<div class="text">今日转换率</div>
								<div class="baifengbi">85%</div>
								<el-progress :show-text="false" :stroke-width="20" :percentage="percentagezhuanghuan"></el-progress>
							</el-card>
						</div>
						<div class="bottom bottom-right">
							<el-card class="box-card">
								<div class="box-text" style="margin-right: 60px;">
									<div class="text">复购率</div>
									<div class="baifengbi">25%</div>
								</div>
								<el-progress type="circle" :show-text="false" color="#34C758" stroke-linecap="square" :stroke-width="20" :percentage="percentagefugouy"></el-progress>
							</el-card>
						</div>
					</div>
				</div>
				<!-- 排名 -->
				<div class="SR-Right">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<img width="20" height="20" src="../../../../assets/img/antOutline-riseCopy.svg" />
							<span style="font-size: 16px; font-weight: bolder;margin-left: 5px;">销售额排名(元)</span>
						</div>
						<div v-for="o in 10" :key="o" class="text item">
							<div :class="'index'+ o" class="index">{{o}}</div>
							<div class="sole">
								<div>销售人员{{o}}号</div>
								<div>1546</div>
							</div>
						</div>
					</el-card>
				</div>
			</div>
			<!-- 订单销售统计 -->
			<div class="orderCount">
				<!-- 统计表 -->
				<div class="orderMarket">
					<!-- 订单统计 -->
					<div class="ordermeter">
						<div class="meter">
							<label class="meterspan">七天</label>
							<label class="meterspan">一月</label>
							<label class="meterspan">一年</label>
							<el-date-picker
								v-model="value1"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</div>
						<div id="orderChart" ref="orders" :style="{width: '750px', height: '300px',}"></div>
					</div>
					<!-- 销售统计 -->
					<div class="Marketmeter">
						<div class="meter">
							<label class="meterspan">七天</label>
							<label class="meterspan">一月</label>
							<label class="meterspan">一年</label>
							<el-date-picker
								v-model="value2"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
						</div>
						<div id="marketChart" :style="{width: '750px', height: '300px',}"></div>
					</div>
				</div>
				<!-- 前十订单 -->
				<div class="orderforefront">
					<div class="order-top-a">
						<img width="16" src="../../../../assets/img/antOutline-riseCopy.svg" />
						订单量前十的商品
					</div>
					<ul class="orderUl">
						<li class="orderLi" v-for="i in 10" :key="i">
							<div :class="'orderIndex'+ i" class="orderIndex">{{i}}</div>
							<div class="orderText">
								<div class="shoppName">三只松鼠</div>
								<div class="orderAmount">
									<div class="progress">
										<div class="progress-data"></div>
									</div>
									<div class="commit">15651563135</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 招聘数据 -->
		<div class="recruitment tab-list ">
			<!-- 关键指标 -->
			<div class="recruitment-top">
				<div class="indicator"><label style="margin-left: 20px;">关键指标</label></div>
				<div class="indicator-data">
					<div class="indicator-list">
						<div>职位被收藏次数</div>
						<div style="font-size: 30px;font-weight: bold;">3000</div>
					</div>
					<div class="indicator-list">
						<div>沟通过</div>
						<div style="font-size: 30px;font-weight: bold;">3000</div>
					</div>
					<div class="indicator-list">
						<div>在招职位</div>
						<div style="font-size: 30px;font-weight: bold;">3000</div>
					</div>
					<div class="indicator-list">
						<div>累计浏览量</div>
						<div style="font-size: 30px;font-weight: bold;">3000</div>
					</div>
				</div>
			</div>
			<!-- 在招职位浏览量及沟通量 -->
			<div class="recrutment-echarts">
				<div class="echarts-select">
					<el-select class="select" v-model="selectName">
					 <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					<el-date-picker
						class="data-picker"
					      v-model="methed"
					      type="month"
					      placeholder="选择月">
					    </el-date-picker>
				</div>
				<div id="positionEcharts" :style="{width: '1200px', height: '300px',}"></div>
			</div>
			<!-- 招聘简历的平台数据 -->
			<div class="resumeData">
				<div class="echartsPie">
					<el-select class="pie-select" v-model="echartPie">
						<el-option
						     v-for="item in options"
						     :key="item.value"
						     :label="item.label"
						     :value="item.value">
						   </el-option>
					</el-select>
					<div id="resumeDataPie" :style="{width:'590px',height:'300px',}"></div>
				</div>
				<div class="echartstable">
					<el-table :data="tableData">
						<el-table-column prop="" type="index" label="排名" align="center">
							<template slot-scope="scope">
								<div class="">{{scope.row.index}}</div>
							</template>
						</el-table-column>
						<el-table-column prop="gongzuo" label="工作经验" align="center"></el-table-column>
						<el-table-column prop="baifen" label="占比%" width="300" align="center">
							<template slot-scope="scope">
								<el-progress :text-inside="true" :stroke-width="12" :percentage="scope.row.baifen"></el-progress>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		
		</div>
		<!-- 房源数据 -->
		<div class="housing tab-list">
			<!-- 关键指标 -->
			<div class="recruitment-top">
				<div class="indicator"><label style="margin-left: 20px;">关键指标</label></div>
				<div class="indicator-data">
					<div class="indicator-list">
						<div>上架房源</div>
						<div style="font-size: 30px;font-weight: bold;">3000</div>
					</div>
					<div class="indicator-list">
						<div>被收藏的房源</div>
						<div style="font-size: 30px;font-weight: bold;">3000</div>
					</div>
					<div class="indicator-list">
						<div>累计沟通</div>
						<div style="font-size: 30px;font-weight: bold;">3000</div>
					</div>
					<div class="indicator-list">
						<div>累计浏览量</div>
						<div style="font-size: 30px;font-weight: bold;">3000</div>
					</div>
				</div>
			</div>
			<!-- 在招职位浏览量及沟通量 -->
			<div class="recrutment-echarts">
				<div class="echarts-select">
					<el-select class="select" v-model="selecthousing" placeholder="全部在租房源">
					 <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
					<el-date-picker
						class="data-picker"
					      v-model="monthed"
					      type="month"
					      placeholder="选择月">
					    </el-date-picker>
				</div>
				<div id="housingecharts" :style="{width: '1200px', height: '300px',}"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'mydatas',
		data() {
			return {
				activeIndex: "1",
				percentagezhuanghuan: 85,
				percentagefugouy: 25,
				value1: '',
				value2: '',
				selectName: '',
				orderC: '',
				mark: '',
				posEchart: '',
				methed:'',
				job: '',
				echartPie: '',
				selecthousing: '',
				monthed: '',
				tableData:[{
					gongzuo: '小学以下',
					baifen: 86,
				}],
				options: [{
				     value: '选项1',
				     label: '黄金糕'
				}, {
				     value: '选项2',
				   label: '双皮奶'
				}, {
				    value: '选项3',
				    label: '蚵仔煎'
				}],
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				// console.log(key, keyPath);
			},
			// 订单统计
			orderEcharts(){
				// 基于准备好的dom，初始化echarts实例
				this.orderC = document.getElementById('orderChart');
				let order = this.$echarts.init(this.orderC);
				// 绘制图表
				order.setOption({
					title: {
						text: '订单统计',
					},
					tooltip: {},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子","衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'line',
						color: '#f6d393',
						data: [5, 20, 36, 10, 10, 20,30,40,50,60,90,70]
					}],
					
				});
			},
			// 销售统计
			marketEcharts(){
				// 基于准备好的dom，初始化echarts实例
				this.mark = document.getElementById('marketChart');
				let market = this.$echarts.init(this.mark);
				// 绘制图表
				market.setOption({
					title: {
						text: '销售统计',
					},
					tooltip: {},
					xAxis: {
						data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子","衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
					},
					yAxis: {},
					series: [{
						name: '销量',
						type: 'line',
						color: '#f6d393',
						data: [5, 20, 36, 10, 10, 20,30,40,50,60,90,70]
					}],
					
				});
			},
			// 在招职位浏览量及沟通量统计
			positionEchartData(){
				this.posEchart = document.getElementById('positionEcharts');
				var positionE = this.$echarts.init(this.posEchart);
				positionE.setOption({
					title: {
						text: '在招职位浏览量及沟通量',
					},
					tooltip: {},
					grid: {
					        top: '15%',
					        right: '10%',
					        left: '10%',
					        bottom: '12%'
					    },
					legend: {
						 x: '900',            //水平方向的位置'left'，'center'，'right'        
						 y: '50',
						 width:0,               //组件的宽和高
						 height:0,
						 orient:'vertical',    //组件与文字的排列方式，默认横向，纵向为'vertical'
						 itemGap: 12,            //每个图例之间的间隔
						 textStyle: {            //图例文字属性设置
						    fcolor: '#ffffff',
						    fontFamily: 'Microsoft YaHei',
						    ontSize: '16'
						 },
						 tooltip: {              //在legend里的tooltip，在鼠标滑到图例上时，展示自定义的内容
						       show: true
						 },
						data: ['浏览量','沟通量'],
					},
					xAxis: {
						data: ["1", "2", "3", "4", "5", "6","7", "8", "9", "10","11", "12", "13", "14", "15", "16","17", "18", "19", "20","21", "22", "23", "24", "25", "26","27", "28", "29", "30",]
					},
					yAxis: {},
					series: [{
						name: '浏览量',
						type: 'bar',
						barWidth : 7,
						stack: 'one',
						color: '#f6d393',
						data: [10,80,500,300,100,200,300,500,100,600,900,120,250,358,156,176,1566,1568,1065,1235,135,1565,156,566,952,365,485,123,659,30]
					}, {
						name: '沟通量',
						type: 'bar',
						barWidth : 7,
						stack: 'one',
						color: '#00BB7A',
						data: [10,80,500,300,100,200,300,500,100,600,900,120,250,358,156,176,1566,1568,1065,1235,135,1565,156,566,952,365,485,123,659,30]
					}],
					
				});
			},
			// 招聘简历的品台数据
			resumeJobPie(){
				this.job = document.getElementById('resumeDataPie');
				var jobpie = this.$echarts.init(this.job);
				jobpie.setOption({
					title: {
						text: '招聘简历的品台数据',
					},
					tooltip: {
						trigger: 'item',
						formatter: '{b}:{c}<br />{d}%'
					},
					series: [{
						type: 'pie',
						name: '',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
						data: [
							{value: 152, name:'小学及以下'},
							{value: 1232, name:'初中、中专'},
							{value: 130, name:'高中'},
							{value: 120, name:'大学及本科'},
						],
					}],
				});
			},
			// 在租房源浏览量及沟通量
			housingechartpar(){
				this.housingpar = document.getElementById('housingecharts');
				var housingDp = this.$echarts.init(this.housingpar);
				housingDp.setOption({
					title:{
						text: '在租房源浏览量及沟通量',
					},
					tooltip: {},
					grid: {
					        top: '15%',
					        right: '10%',
					        left: '10%',
					        bottom: '12%'
					    },
					legend: {
						 x: '900',            //水平方向的位置'left'，'center'，'right'        
						 y: '50',
						 width:0,               //组件的宽和高
						 height:0,
						 orient:'vertical',    //组件与文字的排列方式，默认横向，纵向为'vertical'
						 itemGap: 12,            //每个图例之间的间隔
						 textStyle: {            //图例文字属性设置
						    fcolor: '#ffffff',
						    fontFamily: 'Microsoft YaHei',
						    ontSize: '16'
						 },
						 tooltip: {              //在legend里的tooltip，在鼠标滑到图例上时，展示自定义的内容
						       show: true
						 },
						data: ['浏览量','沟通量'],
					},
					xAxis: {
						data: ["1", "2", "3", "4", "5", "6","7", "8", "9", "10","11", "12", "13", "14", "15", "16","17", "18", "19", "20","21", "22", "23", "24", "25", "26","27", "28", "29", "30",]
					},
					yAxis: {},
					series: [{
						name: '浏览量',
						type: 'bar',
						barWidth : 7,
						stack: 'one',
						color: '#f6d393',
						data: [10,80,500,300,100,200,300,500,100,600,900,120,250,358,156,176,1566,1568,1065,1235,135,1565,156,566,952,365,485,123,659,30]
					}, {
						name: '沟通量',
						type: 'bar',
						barWidth : 7,
						stack: 'one',
						color: '#00BB7A',
						data: [10,80,500,300,100,200,300,500,100,600,900,120,250,358,156,176,1566,1568,1065,1235,135,1565,156,566,952,365,485,123,659,30]
					}],
				});
			},
			// tab切换
			tabqiuehuan(){
				var butList = document.getElementsByClassName('but');
				var tabList = document.getElementsByClassName('tab-list');
				for(var i=0; i<butList.length;i++){
					butList[i].id = i;
					butList[i].onclick = function(){
						for(var j=0;j<tabList.length;j++){
							tabList[j].classList.remove('active');
							butList[j].classList.remove('active');
						}
						butList[this.id].classList.add('active');
						tabList[this.id].classList.add('active');
					}
				}
			},
		},
		mounted() {
			this.orderEcharts();
			this.marketEcharts();
			this.positionEchartData();
			this.resumeJobPie();
			this.housingechartpar();
		},
	}
</script>

<style>
	.mydatas {
		box-sizing: border-box;
		padding: 20px;
	}

	.mydatas .button {
		width: 100%;
		height: 30px;
		display: flex;
		justify-content: stretch;
	}

	.mydatas .button .but {
		width: 90px;
		height: 100%;
		border: 1px solid #c1c1c1;
		text-align: center;
		line-height: 30px;
		cursor: pointer;
	}

	.mydatas .button .but:hover {
		color: #42A7FF;
		border: 1px solid #42A7FF;
	}

	.mydatas .button .but.active {
		color: #42A7FF;
		border: 1px solid #42A7FF;
	}

	.shoppingmall {
		margin-top: 20px;
	}
	.shoppingmall-top {
		display: flex;
		justify-content: space-around;
		align-content: space-around;
	}

	.shoppingmall-top .top-text {
		width: 270px;
		height: 90px;
		border-radius: 4px 0px 0px 4px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.shoppingmall-top .top-text.top-sale {
		background-color: #36CFCA;
	}

	.shoppingmall-top .img {
		margin-left: 20px;
	}

	.shoppingmall-top .top-countNum {
		display: flex;
		flex-direction: column;
		color: #fff;
	}

	.top-countNum .countNum-top {
		font-size: 28px;
	}

	.top-countNum .countNum-bottom {
		text-align: right;
	}

	.top-order {
		background-color: #FFC439;
	}

	.top-market {
		background-color: #FD4D4F;
	}

	.top-browse {
		background-color: #42A7FF;
	}
	
	.kehuShoppCount {
		display: flex;
		justify-content: space-between;
		padding: 20px;
	}

	.kehuShoppCount .kehuCount {
		width: 49%;
	}
	.kehuShoppCount .el-card__header {
		height: 40px;
		line-height: 10px;
		background-color: #F6F6F7;
		font-size: 14px;
		font-weight: bold;
	}
	.kehuShoppCount .kehu-card {
		display: flex;
		justify-content: space-between;
	}
	.kehuShoppCount .el-card__body .text {
		display: flex;
		justify-content: space-between;
	}
	.kehuShoppCount .shoppingCount {
		width: 49%;
	}
	.shoppingmall .situationRanking {
		padding: 20px;
		display: flex;
		justify-content: space-between;
	}
	.situationRanking .SR-Left {
		width: 70%;
		height: 320px;
		display: flex;
		flex-direction: column;
	}
	.situationRanking .SR-Left .left-top {
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.situationRanking .SR-Left .leftData {
		width: 32%;
	}
	.situationRanking .SR-Left .el-card__header {
		height: 40px;
		line-height: 0px;
		background-color: #F6F6F7;
		font-size: 14px;
		font-weight: bold;
	}
	.situationRanking .SR-Left .el-card__body {
		padding: 0;
	}
	.situationRanking .SR-Left .el-card__body .text {
		display: flex;
	}
	.SR-Left .el-card__body .text {
		display: flex;
		flex-direction: column;
	}
	.SR-Left .el-card__body .text .text-item {
		display: flex;
		padding: 0;
		justify-content: space-between;
		border-bottom: 1px solid #c5c5c5;
		padding-left: 5px;
		padding-right: 5px;
		height: 37px;
		line-height: 37px;
	}
	.SR-Left .el-card__body .text .text-item:nth-child(5){
		border-bottom: 0;
	}
	.situationRanking .SR-Left .left-bottom {
		width: 100%;
		display: flex;
		margin-top: 20px;
		justify-content: space-around;
	}
	.situationRanking .SR-Left .left-bottom .bottom {
		width: 49%;
	}
	.SR-Left .left-bottom .bottom-left .box-card{
		padding: 40px;
	}
	.SR-Left .left-bottom .bottom-left .text{
		font-size: 18px;
		color: #AEAEB2;
	}
	.SR-Left .left-bottom .bottom-left .baifengbi{
		font-size: 28px;
	}
	.situationRanking .SR-Left .left-bottom .bottom-right {
		display: flex;
		justify-content: space-between;
	}
	.left-bottom .bottom-right .box-text .text{
		font-size: 18px;
		color: #AEAEB2;
	}
	.left-bottom .bottom-right .box-text .baifengbi{
		font-size: 24px;
	}
	.left-bottom .bottom-right .el-card__body{
		display: flex;
		justify-content: space-between;
		padding: 20px;
	}
	.situationRanking .SR-Right {
		width: 28%;
	}
	.situationRanking .SR-Right .text {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #E5E5EA;
		line-height: 40px;
	}
	.situationRanking .SR-Right .text:nth-child(1) {
		border-top: 0;
	}
	.SR-Right .index {
		width: 20px;
		height: 20px;
		background-color: #C7C7CC;
		color: #fff;
		line-height: 22px;
		text-align: center;
		border-radius: 50%;
	}
	.SR-Right .text .index1 {
		background-color: #FF3A30;
	}
	.SR-Right .text .index2 {
		background-color: #FF9502;
	}
	.SR-Right .text .index3 {
		background-color: #00BB7A;
	}
	.SR-Right .sole {
		width: 90%;
		display: flex;
		justify-content: space-between;
	}
	.shoppingmall .orderCount{
		display: flex;
		justify-content: space-between;
	}
	.shoppingmall .orderCount .orderMarket{
		width: 60%;
		display: flex;
		flex-direction: column;
	}
	.shoppingmall .orderCount .orderMarket .ordermeter{
		width: 100%;
		position: relative;
	}
	.orderCount .orderMarket .ordermeter .meter{
		position: absolute;
		right: 0;
		top: 0px;
		z-index: 1;
	}
	.meter .meterspan{
		margin-left: 10px;
		cursor: pointer;
	}
	.meter .meterspan:nth-child(3){
		margin-right: 10px;
	}
	.meter .el-date-editor{
		width: 136px;
		margin-right: 20px;
	}
	.shoppingmall .orderCount .orderMarket .Marketmeter{
		width: 100%;
		position: relative;
	}
	.orderCount .orderMarket .meter{
		position: absolute;
		right: 0;
		top: 0px;
		z-index: 1;
	}
	.shoppingmall .orderCount .orderforefront{
		width: 40%;
		padding: 20px;
	}
	.orderforefront .order-top-a{
		border-bottom: 1px solid #E5E5EA;
		font-size: 16px;
		line-height: 40px;
		font-weight: bolder;
	}
	.orderforefront .orderLi{
		list-style: none;
		display: flex;
		line-height: 40px;
		justify-content: space-between;
		align-items: center;
	}
	.orderforefront .orderLi:nth-child(2n){
		background-color: #E6F5FD;
	}
	.orderforefront .orderLi .orderIndex{
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		background-color: #9AD1F0;
		color: #fff;
		border-radius: 50%;
	}
	.orderforefront .orderLi .orderIndex1{
		background-color: #FF3A30;
	}
	.orderforefront .orderLi .orderIndex2{
		background-color: #FF9502;
	}
	.orderforefront .orderLi .orderIndex3{
		background-color: #00BB7A;
	}
	.orderforefront .orderLi .orderText{
		width: 90%;
		display: flex;
		justify-content: space-between;
	}
	.orderText .orderAmount{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.orderText .orderAmount .progress{
		width: 200px;
		height: 7px;
		background-color: #F2F2F7;
		border-radius: 50px;
	}
	.orderAmount .progress .progress-data{
		width: 100px;
		height: 100%;
		background-color: #0000FF;
		border-radius: 50px;
	}
	.orderAmount .commit{
		width: 100px;
	}


	/* 招聘数据 */
	.recruitment{
		width: 100%;
		padding: 20px;
	}
	.recruitment-top{
		height: 200px;
		width: 100%;
		border: 1px solid #EEEEEE;
	}
	.recruitment-top .indicator{
		height: 40px;
		background-color: #EEEEEE;
		font-size: 16px;
		line-height: 40px;
		color: #101010;
	}
	.recruitment-top .indicator-data{
		display: flex;
		justify-content: space-between;
		height: 160px;
	}
	.recruitment-top .indicator-data .indicator-list{
		border-right: 1px solid #EEEEEE;
		border-top: 1px solid #EEEEEE;
		width: 25%;
		height: 100%;
		padding: 30px;
		color: #101010;
	}
	.recrutment-echarts{
		margin-top: 50px;
		width: 100%;
		position: relative;
	}
	.recrutment-echarts .echarts-select .select{
		position: absolute;
		top: 0px;
		left: 220px;
		z-index: 1;
	}
	.recrutment-echarts .echarts-select .data-picker{
		position: absolute;
		right: 110px;
		z-index: 1;
	}
	.recruitment .resumeData{
		display: flex;
		justify-content: space-between;
		margin-top: 50px;
	}
	
	.resumeData .echartsPie{
		width: 50%;
		height: 300px;
		position: relative;
	}
	.resumeData .echartsPie .pie-select{
		position: absolute;
		top: 30px;
		z-index: 1;
	}
	.resumeData .echartstable{
		width: 50%;
		height: 300px;
	}
	.housing{
		padding: 20px;
		width: 100%;
	}


	/* tab切换 */
	.tab-list{
		display: none;
	}
	.tab-list.active{
		display: block;
	}
	
	
</style>
