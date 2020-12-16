<template>
	<div class="swifthorse" id="swifthorse">
		<div class="swifthorse-top">
			<div class="myOrder">
				<el-button class="myorderBtn" type="text">我的订单</el-button>
			</div>
			<div class="swifthorse-top-b">
				<div class="swifthorseShuxian"></div>
				<div class="swifthorseTitle">
					<span class="swifthorseT">共享千里马</span>
					<span class="fuTitle">您想要的人才这儿都有</span>
				</div>
				<div class="swifthorseTwo">
					<span>1. 商品图不好看？来这儿找找专业的平面设计，你就是下一个伯乐。</span>
					<span>2. 不会视频剪辑？视频制作大神等你来淘。</span>
				</div>
			</div>
		</div>
		
		<!--  -->
		<div class="swifthorse-body">
			<el-card class="elcard">
				<div class="tabqiehuan" @click="tabMake">
					<div class="tabDiv active">图片制作</div>
					<div class="tabDiv">视频制作</div>
					<div class="tabDiv">文案策划</div>
				</div>
			</el-card>
			<div class="body-bod-top">
				<el-dropdown >
					 <span class="el-dropdown-link"	style="color: #B3B3B3;">
					    综合<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown" style="color: #B3B3B3;">
					    <el-dropdown-item>黄金糕</el-dropdown-item>
					    <el-dropdown-item>狮子头</el-dropdown-item>
						<el-dropdown-item>螺蛳粉</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<div>经验</div>
				<div>点击量</div>
			</div>
			
			<div class="body-div tab-make active">
				<el-row>
					<el-col class="pluralistic" :span="8" v-for="item in 6" :key="item">
						<div class="pluralistic-li grid-content bg-purple">
							<div class="ImgMess" :class="'ImgMess' + item">
								<div class="imgLeft">
									<el-carousel height="130px">
									      <el-carousel-item v-for="item in dataimg" :key="item.index">
									        <img width="100%" height="100%" :src="item.imgUrl" />
									      </el-carousel-item>
									    </el-carousel>
								</div>
								<div class="messright">
									<div class="avaterData">
										<div>
											<i class="iconfont icon-nan iconnan"></i>
											<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
										</div>
										 <div style="margin-left: 30px;">
											 <div>高成林</div>
											 <div>185*********</div>
										 </div>
									</div>
									<div class="zhiweiingyan">
										<span>UI设计师</span>
										<span>2-3年经验</span>
									</div>
									<div style="margin-top: 20px;">
										<span>指导价：</span>
										<span style="color: #FF0000;font-size: 16px;">200￥/张</span>
									</div>
								</div>
							</div>
							<div class="zhaota">
								<el-button @click="zhaotaData" class="zhaotaBtn">找他</el-button>
							</div>
						</div>
					</el-col>
				</el-row>
				 <el-pagination
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page="page"
				      :page-sizes="[6, 12, 18, 24]"
				      :page-size="6"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="counts">
				  </el-pagination>
			</div>
			<div class="body-div tab-make">
				<el-row>
					<el-col class="pluralistic" :span="8" v-for="item in 6" :key="item">
						<div class="pluralistic-li grid-content bg-purple">
							<div class="ImgMess" :class="'ImgMess' + item">
								<div class="imgLeft">
									<el-carousel height="130px">
									      <el-carousel-item v-for="item in dataimg" :key="item.index">
									        <img width="100%" height="100%" :src="item.imgUrl" />
									      </el-carousel-item>
									    </el-carousel>
								</div>
								<div class="messright">
									<div class="avaterData">
										<div>
											<i class="iconfont icon-nan iconnan"></i>
											<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
										</div>
										 <div style="margin-left: 30px;">
											 <div>高成林</div>
											 <div>185*********</div>
										 </div>
									</div>
									<div class="zhiweiingyan">
										<span>视频剪辑师</span>
										<span>2-3年经验</span>
									</div>
									<div style="margin-top: 20px;">
										<span>指导价：</span>
										<span style="color: #FF0000;font-size: 16px;">200￥/张</span>
									</div>
								</div>
							</div>
							<div class="zhaota">
								<el-button class="zhaotaBtn">找他</el-button>
							</div>
						</div>
					</el-col>
				</el-row>
				 <el-pagination
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page="page"
				      :page-sizes="[6, 12, 18, 24]"
				      :page-size="6"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="counts">
				  </el-pagination>
			</div>
			<div class="body-div tab-make">
				<el-row>
					<el-col class="pluralistic" :span="8" v-for="item in 6" :key="item">
						<div class="pluralistic-li grid-content bg-purple">
							<div class="ImgMess" :class="'ImgMess' + item">
								<div class="imgLeft">
									<el-carousel height="130px">
									      <el-carousel-item v-for="item in dataimg" :key="item.index">
									        <img width="100%" height="100%" :src="item.imgUrl" />
									      </el-carousel-item>
									    </el-carousel>
								</div>
								<div class="messright">
									<div class="avaterData">
										<div>
											<i class="iconfont icon-nan iconnan"></i>
											<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
										</div>
										 <div style="margin-left: 30px;">
											 <div>高成林</div>
											 <div>185*********</div>
										 </div>
									</div>
									<div class="zhiweiingyan">
										<span>文案大神</span>
										<span>2-3年经验</span>
									</div>
									<div style="margin-top: 20px;">
										<span>指导价：</span>
										<span style="color: #FF0000;font-size: 16px;">200￥/张</span>
									</div>
								</div>
							</div>
							<div class="zhaota">
								<el-button class="zhaotaBtn">找他</el-button>
							</div>
						</div>
					</el-col>
				</el-row>
				 <el-pagination
				      @size-change="handleSizeChange"
				      @current-change="handleCurrentChange"
				      :current-page="page"
				      :page-sizes="[6, 12, 18, 24]"
				      :page-size="6"
				      layout="total, sizes, prev, pager, next, jumper"
				      :total="counts">
				  </el-pagination>
			</div>
		</div>
	
	</div>
</template>

<script>
	export default{
		name: '',
		data(){
			return{
				dataimg:[
					{
						index: 1,
						imgUrl: require('../../../../assets/img/img.jpg')
					}, {
						index: 2,
						imgUrl: require('../../../../assets/img/img.jpg')
					}, {
						index: 3,
						imgUrl: require('../../../../assets/img/img.jpg')
					},
				],
				page: 1,
				limit: 6,
				counts: this.counts || 1,
			}
		},
		mounted() {
			
		},
		methods:{
			tabMake(){
				var tabDiv = document.getElementsByClassName('tabDiv');
				var tabMaked= document.getElementsByClassName('tab-make');
				for(var i = 0; i<tabDiv.length; i++){
					tabDiv[i].id = i;
					tabDiv[i].onclick = function(){
						for(var j=0;j<tabMaked.length;j++){
							tabDiv[j].classList.remove('active');
							tabMaked[j].classList.remove('active');
						}
						tabDiv[this.id].classList.add('active');
						tabMaked[this.id].classList.add('active');
					}
				}
			},
			handleSizeChange(val){
				this.limit = val;
			},
			handleCurrentChange(val){
				this.page = val;
			},
			zhaotaData(){
				this.$router.push({
					path: './swifthorseDetail'
				});
			},
		}
	}
</script>

<style>
	.swifthorse{
		box-sizing: border-box;
		color: #101010;
		background-color: #F5F7FC;
	}
	.swifthorse-top{
	}
	.swifthorse-top .myOrder{
		text-align: right;
	}
	.swifthorse-top .myOrder .myorderBtn{
		color: #FF8D00;
		font-size: 16px;
	}
	.swifthorse-top .swifthorse-top-b{
		background-color: #3A9DF4;
		color: #fff;
		width: 100%;
		height: 100px;
		display: flex;
		flex-direction: row;
	}
	.swifthorse-top .swifthorse-top-b .swifthorseShuxian{
		width: 60px;
		height: 20px;
		border-right: 2px solid #313AC3;
		border-left: 2px solid #313AC3;
		margin-left: 36px;
		margin-top: 4.3%;
	}
	.swifthorse-top .swifthorse-top-b .swifthorseTitle{
		display: flex;
		margin-left: 80px;
		flex-direction: column;
	}
	.swifthorse-top .swifthorse-top-b .swifthorseTitle .swifthorseT{
		font-size: 20px;
	}
	.swifthorse-top .swifthorse-top-b .swifthorseTitle .fuTitle{
		margin-left: 40px;
	}
	.swifthorse-top .swifthorse-top-b .swifthorseTwo{
		display: flex;
		width: 280px;
		height: 75px;
		flex-direction: column;
		margin-top: 20px;
		margin-left: 50px;
	}
	
	.swifthorse-body{
		width: 100%;
	}
	.swifthorse-body .elcard{
		width: 80%;
		height: 72px;
		margin: 0 auto;
		margin-top: 10px;
	}
	.swifthorse-body .elcard .tabqiehuan{
		display: flex;
		justify-content: space-around;
		height: 100%;
	}
	.elcard .tabqiehuan .tabDiv{
			width: 150px;
			height: 50px;
			font-size: 20px;
			text-align: center;
			cursor: pointer;
	}
	.elcard .tabqiehuan .tabDiv.active{
		color: #FF8D00;
		border-bottom: 2px solid #FF8D00;
	}
	.body-bod-top{
		width: 250px;
		height: 40px;
		background-color: #FFFFFF;
		margin-top: 10px;
		margin-left: 50px;
		line-height: 40px;
		display: flex;
		padding-right: 10px;
		padding-left: 10px;
		justify-content: space-around;
		font-size: 14px;
		color: #B3B3B3;
	}
	.body-div{
		margin-top: 35px;
		padding:0 100px 0 100px;
	}
	.pluralistic-li{
		/* margin-top: 50px; */
	}
	.pluralistic-li .ImgMess{
		display: flex;
		width: 90%;
		justify-content: space-around;
		align-items: center;
		margin-top: 50px;
	}
	.pluralistic-li .ImgMess1{
		margin-top: 0;
	}
	.pluralistic-li .ImgMess2{
		margin-top: 0;
	}
	.pluralistic-li .ImgMess3{
		margin-top: 0;
	}
	.pluralistic-li .ImgMess .imgLeft{
		width: 170px;
		height: 130px;
	}
	.pluralistic-li .ImgMess .imgLeft .el-carousel__button{
		width: 8px;
		height: 8px;
		background-color: #000000;
		border-radius: 50%;
		
	}
	.pluralistic-li .ImgMess .messright{
		width: 150px;
		height: 130px;
		display: flex;
		flex-direction: column;
		align-items: auto;
		justify-content: center;
		margin-left: 20px;
	}
	.messright .avaterData{
		display: flex;
		justify-content: space-between;
		position: relative;
	}
	.messright .avaterData .iconnan{
		position: absolute;
		left: 28px;
		top: -15px;
		font-size: 24px;
		color: #3A9DF4;
	}
	.messright .zhiweiingyan{
		display: flex;
		justify-content: space-between;
		margin-top: 20px;	
	}
	.pluralistic-li .zhaota{
		width: 80%;
		text-align: center;
	}
	.pluralistic-li .zhaota .zhaotaBtn{
		width: 163px;
		height: 30px;
		line-height: 30px;
		background-color: #FF8D00;
		padding: 0;
		color: #FFFFFF;
		border-radius: 10px;
		margin-top: 20px;
		font-size: 14px;
	}

	.el-pagination{
		text-align: center;
		margin-top: 10px;
	}

	.tab-make{
		display: none;
	}
	.tab-make.active{
		display: block;
	}
</style>
