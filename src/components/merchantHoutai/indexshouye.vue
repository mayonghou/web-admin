<template>
    <!-- 首页 -->
    <div class="indexshouye" id="indexshouye">
        <!-- 头部 -->
        <div class="indextop">
            <ul class="indextopUl">
                <li class="indextopUlLi qingshe">
					<div>
						<p style="font-size: 20px;">企业人数(人)</p>
						<h1>1,882</h1>
					</div>
					<img class="imgmmm" src="../../assets/img/img.jpg" />
                </li>
                <li class="indextopUlLi huangshe">
					<div>
						<p style="font-size: 20px;">职位(个)</p>
						<h1>1,882</h1>
					</div>
					<img class="imgmmm" src="../../assets/img/img.jpg" />
                </li>
                <li class="indextopUlLi redShe">
					<div>
						<p style="font-size: 20px;">今日订单(单)</p>
						<h1>1,882</h1>
					</div>
					<img class="imgmmm" src="../../assets/img/img.jpg" />
                </li>
                <li class="indextopUlLi lvShe">
					<div>
						<p style="font-size: 20px;">今日销售额(元)</p>
						<h1>1,882</h1>
					</div>
					<img class="imgmmm" src="../../assets/img/img.jpg" />
                </li>
            </ul>
        </div>
        <!-- 统计图和公告 -->
        <div class="StatisticsBulletin">
            <!-- 统计图 -->
            <div class="Statistics">
				<el-card class="box-card">
					<div class="statisticspar" id="statisticspar"></div>
				</el-card>
			</div>
            <!-- 平台公告 -->
            <div class="Bulletin">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>平台公告</span>
						<span class="spanfont">更多 >></span>
                    </div>
                    <div v-for="o in 10" :key="o" class="text item">
                        {{ '平台 ' + o + '。即将发布' }}
                    </div>
                </el-card>
            </div>
        </div>
		<!-- 公司成员 -->
		<div class="company-staff">
			<el-card class="box-card">
				<el-card class="company-card companyCard">
					<span class="">贵州万疆锋火科技有限公司</span>
				</el-card>
				<div class="hengxian">
					<div class="hengxian-top"></div>
					<div class="hengxian-zhong"></div>
					<div class="hengxain-buttom">
						<div class="buttomxian"></div>
						<div class="buttomxian"></div>
						<div class="buttomxian"></div>
						<div class="buttomxian"></div>
						<div class="buttomxian"></div>
					</div>
				</div>
				<div class="company-main">
					<el-card class="main-card">
						<div class="card-body">
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
						</div>
						<div class="card-buttom">
							<span class="aabb el-icon-arrow-left"></span>
							<span class="aabb el-icon-arrow-right"></span>
						</div>
					</el-card>
					<el-card class="main-card">
						<div class="card-body">
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
						</div>
						<div class="card-buttom">
							<span class="aabb el-icon-arrow-left"></span>
							<span class="aabb el-icon-arrow-right"></span>
						</div>
						
					</el-card>
					<el-card class="main-card">
						<div class="card-body">
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
						</div>
						<div class="card-buttom">
							<span class="aabb el-icon-arrow-left"></span>
							<span class="aabb el-icon-arrow-right"></span>
						</div>
					</el-card>
					<el-card class="main-card">
						<div class="card-body">
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
						</div>
						<div class="card-buttom">
							<span class="aabb el-icon-arrow-left"></span>
							<span class="aabb el-icon-arrow-right"></span>
						</div>
					</el-card>
					<el-card class="main-card">
						<div class="card-body">
							<div class="company-zhiwei">
								<div class="company-text">
									<span style="font-size: 20px; color: #3D7EFF; display: block;">高</span>
									<div class="positionzhiwei">懂事长</div>
								</div>
								<div class="company-img">
									<img width="100%" height="100%" src="../../assets/img/img.jpg" />
								</div>
							</div>
						</div>
						<div class="card-buttom">
							<span class="aabb el-icon-arrow-left"></span>
							<span class="aabb el-icon-arrow-right"></span>
						</div>
					</el-card>
				</div>
			</el-card>
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
				    orient: 'value',
					left: 'right',
					y: '30%',
				    data: ['男','女','不公开'],
				 },
				series: [{
					name: '面积模式',
					type: 'pie',
					radius: [50, 100],
					center: ['35%', '50%'],
					roseType: 'area',
					trigger: 'item',
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
.indexshouye {
    box-sizing: border-box;
	width: 100%;
	padding: 20px;
	background-color: #F1F2F7;
}
.indextop .indextopUl {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
	
}
.indextop .indextopUl .indextopUlLi {
    list-style: none;
    width: 23%;
    height: 150px;
	padding: 0 40px;
    border-radius: 8px 0 0 8px;
	background-color: #FFFFFF;
    display: flex;
	align-items: center;
    justify-content: space-between;
}
.indextopUlLi .imgmmm{
	width: 50px;
	height: 50px;
	border-radius: 50%;
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
	width: 80%;
	height: 300px;
}

.StatisticsBulletin .Statistics .echarts {
    width: 100%;
    height: 400px;
}

.StatisticsBulletin .Bulletin {
    width: 49%;
	font-size:18px ;
	line-height: 29px;
	height: 340px;
	overflow: hidden;
}
.StatisticsBulletin .Bulletin .el-card__header .clearfix{
	display: flex;
	justify-content: space-between;
}
.Bulletin .el-card__header .spanfont{
	font-size: 18px;
	color: #888F97;
	cursor: pointer;
}
.company-staff{
	margin-top: 20px;
}
 .company-staff .company-card{
	 width: 40%;
	 margin: 0 auto;
 }
 .company-staff .company-card.companyCard .el-card__body{
		height: 50px;
		padding: 0;
		text-align: center;
		line-height: 50px;
		font-size: 20px;
}
.hengxian{
	width: 80%;
	margin: 0 auto;
}
.hengxian .hengxian-top{
		width: 2px;
		height: 40px;
		background-color: #4F6CFE;
		margin: 0 auto;
}
.hengxian .hengxian-zhong{
	width: 100%;
	border-bottom: 2px solid #0000FF;
}
.hengxian .hengxain-buttom{
	width: 100%;
	height: 40px;
	display: flex;
	justify-content: space-between;
}
.hengxain-buttom .buttomxian{
	width: 2px;
	height: 100%;
	background-color:  #0000FF;
}

.company-main{
	width: 100%;
	display: flex;
	justify-content: space-between;
}
.company-main .main-card{
	width: 18%;
	height: 473px;
}
.card-body{
	width: 100%;
	height: 400px;
	overflow: hidden;
}
.company-zhiwei{
	width: 100%;
	height: 70px;
	margin: 0 auto;
	position: relative;
	margin-top: 30px;
}
.company-zhiwei:nth-child(1){
	margin-top: 0;
}
.company-zhiwei .company-img {
	width: 30%;
	height: 100%;
	border-radius: 50%;
	position: absolute;
	left: 0;
}
.company-zhiwei .company-img img{
	width: 100%;
	height: 100%;
	border-radius: 50%;
}
.company-zhiwei .company-text{
	width: 100%;
	height: 90%;
	background-color: #F6F7FC;
	border-radius: 50px;
	position: absolute;
	right: 0;
	top: 5px;
	padding: 2px;
	padding-left: 50%;
}
.positionzhiwei{
	width: 56px;
	height: 23px;
	background-color: #F5A470;
	text-align: center;
	font-size: 14px;
	line-height: 23px;
	border-radius: 50px;
	margin-top: 3px;
}

.main-card .card-buttom{
	width: 60%;
	margin: 0 auto;
	height: 30px;
	padding-left: 15px;
}
.main-card .card-buttom .aabb{
	display:  inline-block;
	background-color: #F1F2F7;
	color: #c1c1c1;
	width: 30px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	font-size: 23px;
	cursor: pointer;
	margin-left: 10px;
}
.main-card .card-buttom .aabb:nth-child(2){
	margin-left: 20px;
}
</style>
