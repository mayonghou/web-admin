<template>
    <!-- 首页 -->
    <div class="indexshouye" id="indexshouye">
        <!-- 头部 -->
        <div class="indextop">
            <ul class="indextopUl">
                <li class="indextopUlLi qingshe">
                    <div class="">
                        <img class="img" src="../../assets/img/md-account_balance_wallet.svg" alt="" />
                    </div>
                    <div class="indexcount">
                        <label class="countNum fontSize">1000</label>
                        <label class="countNum fontsize">企业人数(人)</label>
                    </div>
                </li>
                <li class="indextopUlLi huangshe">
                    <div class="">
                        <img class="img" src="../../assets/img/fasfa-user.svg" alt="" />
                    </div>
                    <div class="indexcount">
                        <label class="countNum fontSize">50</label>
                        <label class="countNum fontsize">职位(个)</label>
                    </div>
                </li>
                <li class="indextopUlLi redShe">
					
                    <div class="">
                        <img class="img" src="../../assets/img/md-comment.svg" alt="" />
                    </div>
                    <div class="indexcount">
                        <label class="countNum fontSize">1000</label>
                        <label class="countNum fontsize">今日订单(单)</label>
                    </div>
                </li>
                <li class="indextopUlLi lvShe">
                    <div class="">
                        <img class="img" src="../../assets/img/md-visibilityCopy.svg" alt="" />
                    </div>
                    <div class="indexcount">
                        <label class="countNum fontSize">4522</label>
                        <label class="countNum fontsize">今日销售额(元)</label>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 统计图和公告 -->
        <div class="StatisticsBulletin">
            <!-- 统计图 -->
            <div class="Statistics">
				<div class="statisticspar" id="statisticspar"></div>
			</div>
            <!-- 平台公告 -->
            <div class="Bulletin">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>平台公告</span>
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        {{ '平台 ' + o + '。即将发布' }}
                    </div>
                </el-card>
            </div>
        </div>
		<!-- 公司成员 -->
		<div class="company-staff">
			<div class="company-name">
				<div class="name">贵州万疆烽火科技有限公司</div>
				<div class="shuxian"></div>
			</div>
			<div class="charge-fa">
				<div class="charge">
					<div class="charge-a">
						<div class="harge-a-a">
							<div class="harge-a-a-a hargeLeft"></div>
							<div class="harge-a-a-a hargeBordertop"></div>
						</div>
						<div class="harge-a-b">
							<div class="countNumcha">
								<div class="countNumhidden">
									<div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div>
									
								</div>
								<div class="zuoyou">
									<el-button class="zuoyou-left"> < </el-button>
									<el-button class="zuoyou-right"> > </el-button>
								</div>
							</div>
						</div>
					</div>
						
					<div class="charge-a">
						<div class="harge-a-a">
							<div class="harge-a-a-a hargeBordertop hargeLeft"></div>
							<div class="harge-a-a-a hargeBordertop"></div>
						</div>
						<div class="harge-a-b">
							<div class="countNumcha">
								<div class="countNumhidden">
									<div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div>
									<div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div>
								</div>
								<div class="zuoyou">
									<el-button class="zuoyou-left"> < </el-button>
									<el-button class="zuoyou-right"> > </el-button>
								</div>
							</div>
						</div>
					</div>
					
					<div class="charge-a">
						<div class="harge-a-a">
							<div class="harge-a-a-a hargeBordertop hargeLeft"></div>
							<div class="harge-a-a-a hargeBordertop"></div>
						</div>
						<div class="harge-a-b">
							<div class="countNumcha">
								<div class="countNumhidden">
									<div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div>
									<div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div>
								</div>
								<div class="zuoyou">
									<el-button class="zuoyou-left"> < </el-button>
									<el-button class="zuoyou-right"> > </el-button>
								</div>
							</div>
						</div>
					</div>
					<div class="charge-a">
						<div class="harge-a-a">
							<div class="harge-a-a-a hargeBordertop hargeLeft"></div>
							<div class="harge-a-a-a hargeBordertop"></div>
						</div>
						<div class="harge-a-b">
							<div class="countNumcha">
								<div class="countNumhidden">
									<div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div>
									<div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div>
								</div>
								<div class="zuoyou">
									<el-button class="zuoyou-left"> < </el-button>
									<el-button class="zuoyou-right"> > </el-button>
								</div>
							</div>
						</div>
					</div>
					
					<div class="charge-a">
						<div class="harge-a-a">
							<div class="harge-a-a-a hargeBordertop hargeLeft"></div>
							<div class="harge-a-a-a"></div>
						</div>
						<div class="harge-a-b">
							<div class="countNumcha">
								<div class="countNumhidden">
									<div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div>
									<div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div><div class="zhiweiname">
										<div class="avater">
											<img class="img" src="../../assets/img/img.jpg" />
										</div>
										<div class="nameZhiwei">
											<div>高承林</div>
											<div class="zhiwei">董事长</div>
										</div>
									</div>
								</div>
								<div class="zuoyou">
									<el-button class="zuoyou-left"> < </el-button>
									<el-button class="zuoyou-right"> > </el-button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			</div>
			
			
			
		</div>
    </div>
</template>

<script>
export default {
    name: 'indexshouye',
    dataa() {
        return {
			statPar: '',
		};
    },
    mounted() {
		this.statisticsparData();
	},
    methods: {
		statisticsparData(){
			this.statPar = document.getElementById('statisticspar');
			var staticpar = this.$echarts.init(this.statPar);
			staticpar.setOption({
				title: {
					text: '员工人数占比%',
				},
				tooltip: {
					trigger: 'item',
					formatter: '{b}:{c}<br />{d}%'
				},
				legend: {
				    orient: 'vertical',
					left: 'right',
					y: '30%',
				    data: ['男','女','不公开']
				 },
				series: [{
					name:'访问来源',
					type:'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					label: {
						normal: {
							// formatter: '{b}:{c}' + '\n\r' + '({d}%)',
							show: false,
							position: 'center',
							// textStyle: {
							// 	fontSize: '16',
							// 	color:'#AEAEB2'
							// }
						},
					},
					// labelLine: {
					// 	normal: {
					// 		show: true
					// 	}
					// },
					data:[
						{value:335, name:'男'},
						{value:310, name:'女'},
						{value:234, name:'不公开'},
					]
				}],
			});
			
			
		},
		
	}
};
</script>

<style>
.indexshouyeP {
    box-sizing: border-box;
    padding: 20px;
}
.indextop .indextopUl {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    flex-wrap: wrap;
}
.indextop .indextopUl .indextopUlLi {
    list-style: none;
    min-width: 270px;
    height: 90px;
    border-radius: 4px 0 0 4px;
    margin-right: 10px;
    display: flex;
    justify-content: space-between;
}
.indextop .indextopUl .indextopUlLi.qingshe {
    background: #36CFCA;
}
.indextop .indextopUl .indextopUlLi.huangshe {
    background: #FFC439;
}
.indextop .indextopUl .indextopUlLi.redShe {
    background: #FD4D4F;
}
.indextop .indextopUl .indextopUlLi.lvShe {
    background: #42A7FF;
}
.indextopUlLi .img {
    width: 60px;
    height: 60px;
    margin-left: 26px;
    margin-top: 20%;
}
.indexcount {
    padding: 20px;
}
.indexcount .countNum {
    display: block;
    color: #fff;
}
.indexcount .countNum.fontSize {
    font-size: 28px;
}
.indexcount .countNum.fontsize {
    font-size: 10px;
    padding-top: 5px;
}

.StatisticsBulletin {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
	padding: 0 20px;
}
.StatisticsBulletin .Statistics {
    width: 49%;
}
.Statistics .statisticspar{
	width: 100%;
	height: 300px;
}

.StatisticsBulletin .Statistics .echarts {
    width: 100%;
    height: 400px;
}

.StatisticsBulletin .Bulletin {
    width: 49%;
}

.company-staff{
	margin-top: 30px;
}
.company-staff .company-name{
	width: 100%;
	box-sizing: border-box;
	padding: 0 38%;
	text-align: center;
}
.company-staff .company-name .name{
	min-height: 42px;
	background-color: #42A7FF;
	line-height: 42px;
	color: #fff;
	margin: 0 auto;
}
.company-staff .company-name .shuxian{
	width: 2px;
	height: 35px;
	margin: 0 auto;
	background-color: #42A7FF;
}
.charge-fa{
	box-sizing: border-box;
	padding: 0px 50px;
}
.charge{
	width:100%;
	height: 400px;
	display: flex;
}
.charge-a{
	width:20%;
	height: 400px;
}
.harge-a-a{
	display: flex;
	width:100%;
	height:50px;
}
.harge-a-b{
	width:100%;
	height:80%;
	box-sizing: border-box;
	padding: 0px 20px;
}
.harge-a-a-a{
	width:50%;
	height: 100%;
	display: flex;
}
	
.hargeBordertop{
	border-top: #42A7FF solid 2px;
}
.hargeLeft{
	border-right: #42A7FF solid 2px;
}
.countNumcha{
	/* height: 100%; */
	height: 380px;
	background-color: #42A7FF;
	padding: 20px;
	position: relative;
}
.countNumhidden{
	overflow: hidden;
	height: 300px;
	width: 100%;
	
}
.countNumcha .avater{
	background-color: aqua;
	display: flex;
	align-items:center;
	justify-content:center;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	float: left;
}
.countNumcha .avater .img{
	width: 45px;
	height: 45px;
	border-radius: 50%;
}
.countNumcha .zhiweiname{
	width: 100%;
	height: 50px;
	background-color: #FFFFFF;
	border-radius: 50px;
	text-align: center;
	margin-top: 10px;
}
.nameZhiwei{
	display: flex;
	align-items:center;
	flex-direction:column;
}
.nameZhiwei .zhiwei{
	width: 50px;
	height: 15px;
	background-color: #FF8D00;
	border-radius: 50px;
	padding: 0;
	font-size: 8px;
	color: #fff;
	margin-top: 10px;
}


.zuoyou{
	position: absolute;
	bottom: 10px;
	/* width: 60%; */
	height: 30px;
	
}
.zuoyou .zuoyou-left{
	width: 30px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	background-color: #fff;
	padding: 0;
	font-size: 16px;
	margin-left: 40px;
}
.zuoyou .zuoyou-right{
	float: right;
	width: 30px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	font-size: 16px;
	background-color: #fff;
	padding: 0;
}

</style>
