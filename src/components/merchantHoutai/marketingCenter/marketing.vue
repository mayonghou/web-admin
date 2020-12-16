<template>
	<!-- 营销中心   营销专区 -->
	<div class="marketing" id="marketing">
		<div class="marketing-top">
			<div class="top-left">
				<div class="" style="font-size: 18px;">营销中心</div>
				<div class="marketshare">
					<div class="gongxiangqianlima">
						<div class="liangtaiosxa"></div>
						<el-button @click="swifthorseBtn" class="qianlima">进入共享千里马</el-button>
					</div>
					<div class="gongxiangqianlima2">
						<h3>共享千里马</h3>
						<p style="font-size: 12px;margin-left: 30px;">您想要的人才这儿都有</p>
						<p style="font-size: 10px;font-weight: normal; margin-top: 30px;">1. 商品图不好看？来这儿找找专业的平面设计，你就就是下一个伯乐。</p>
						<p style="font-size: 10px;font-weight: normal;margin-top: 10px;">2. 不会视频剪辑？视频制作大神等你来淘。</p>
					</div>
				</div>
			</div>
			<div class="top-center">
				<div class="tips">
					<span style="font-size: 16px;">营销小知识</span>
					<span style="font-size: 14px;color: #313AC3;cursor: pointer;">更多<i class="el-icon-right"></i></span>
				</div>
				<div class="markket-special">
					<ul class="special-ul">
						<li class="special-li" v-for="item in data" :key="item.index">
							<div class="litips">
								<div class="litips-left">
									<span :class="'dian'+ item.index" class="dian"></span>
									<span class="tipschuxopa">{{item.title}}</span>
								</div>
								<div class="litips-right">
									<i class="el-icon-view"></i>
									<span style="width: 70px; text-align: right;">{{item.liulan}}次浏览</span>
								</div>
							</div>
							<div class="tips-text">
								<p class="text-tips">{{item.text}}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="top-right">
				<div class="activitytongzhi">活动通知</div>
				<ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
				    <li class="infinite-list-item" v-for="item in activityData" :key="item.index">
						<div class="activitIcon"><i class="el-icon-receiving"></i></div>
						<div class="activitTitle">
							<a style="font-size: 14px;color: #101010;">{{item.title}}</a>
							<p class="activefuTit" style="font-size: 12px; color: #9D9D9D;">{{item.text}}</p>
						</div>
						<div style="font-size: 12px; color: #313AC3;">
							<span>{{item.time}}分钟</span>
						</div>
					</li>
				</ul>
				<!-- <el-scrollbar>
					<ul class="infinite-list" id="" v-infinite-scroll="load">
					    <li class="infinite-list-item" v-for="item in activityData" :key="item.index">
							<div class="activitIcon"><i class="el-icon-receiving"></i></div>
							<div class="activitTitle">
								<a style="font-size: 14px;color: #101010;">{{item.title}}</a>
								<p class="activefuTit" style="font-size: 12px; color: #9D9D9D;">{{item.text}}</p>
							</div>
							<div style="font-size: 12px; color: #313AC3;">
								<span>{{item.time}}分钟</span>
							</div>
						</li>
					</ul>
				</el-scrollbar> -->
			</div>
		</div>
		<!-- 营销资源库 -->
		<div class="marketingResource">
			<div style="color: #101010; font-size: 18px;">营销资源库</div>
			<el-card class="marketingNav">
				<div class="marketnavList" @click="tabCut">
					<div class="navTitle ">课程·视频</div>
					<div class="navTitle ">设计图·图片</div>
					<div class="navTitle active">资料·文档</div>
				</div>
			</el-card>
		</div>
		<div class="tabListData">
			<div class="navTab">
				<div class="resource">
					<div class="classify">
						<div style="color: #101010; font-size: 16px;">
							<span>视频分类</span>
						</div>
						<div class="videoTabList" @click="classifyData">
							<div class="tabclassify tabvideo active">
								<img src="../../../assets/img/img.jpg" />
								<span>商业模式类</span>
							</div>
							<div class="tabclassify tabvideo">
								<img src="../../../assets/img/img.jpg" />
								<span>营销策划类</span>
							</div>
							<div class="tabclassify tabvideo">
								<img src="../../../assets/img/img.jpg" />
								<span>证券股票类</span>
							</div>
						</div>
					</div>
					<div class="dataList">
						<div style="color: #000000;">
							<el-dropdown>
								 <span class="el-dropdown-link" style="color: #000000;">
								    综合<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
								    <el-dropdown-item>黄金糕</el-dropdown-item>
								    <el-dropdown-item>狮子头</el-dropdown-item>
									<el-dropdown-item>螺蛳粉</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<span> 点赞 </span>
							<span> 播放量</span> 
						</div>
						<div class="videoList">
							<div class="ListTab active">
								<el-row>
									<el-col :span="8" v-for="i in 12" :key='i'>
										<div class="videoData grid-content bg-purple-light">
											<video class="video" src="../../../assets/a.mp4" controls="controls"></video>
										</div>
										<div class="titleText">
											<div style="font-size: 20px;line-height: 40px; font-weight: normal; color: #101010;">胡老师教你做电商</div>
											<div class="videoflex">
												<span>188.3万次播放</span>
												<span><i class="iconfont icon-icon_good"></i>188</span>
											</div>
										</div>
									</el-col>
								</el-row>
								<el-pagination @prev-click="prev_click" @next-click="next_click" background @current-change="current_change" :current-page="page"
									:page-size="12" :total="counts" layout="prev, pager, next">
								</el-pagination>
							</div>
							<div class="ListTab">三个方面开始的模仿克鲁赛德</div>
							<div class="ListTab">三分就开始年福建省</div>
						</div>
					</div>
				</div>
			</div>
			<div class="navTab">
				<div class="resource">
					<div class="classify">
						<div style="color: #101010; font-size: 16px;">
							<span>图片分类</span>
						</div>
						<div class="videoTabList" @click="classifyImg">
							<div class="tabclassify tabimg active">
								<img src="../../../assets/img/img.jpg" />
								<span>商业模式类</span>
							</div>
							<div class="tabclassify tabimg">
								<img src="../../../assets/img/img.jpg" />
								<span>营销策划类</span>
							</div>
							<div class="tabclassify tabimg">
								<img src="../../../assets/img/img.jpg" />
								<span>证券股票类</span>
							</div>
						</div>
					</div>
					<div class="dataList">
						<div style="color: #000000;">
							<el-dropdown>
								 <span class="el-dropdown-link" style="color: #000000;">
								    综合<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
								    <el-dropdown-item>黄金糕</el-dropdown-item>
								    <el-dropdown-item>狮子头</el-dropdown-item>
									<el-dropdown-item>螺蛳粉</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<span> 点赞 </span>
							<span> 播放量</span> 
						</div>
						<div>
							<div class="ListImg active">
								<el-row>
									<el-col :span="8" v-for="i in 12" :key="i">
										<div class="listLiimg grid-content bg-purple">
											<div class="imgData">
												<img class="img" src="../../../assets/img/img.jpg" />
												<div class="imgTltleText">
													<div style="font-size: 16px;line-height: 30px; font-weight: bold;">桥底跑车</div>
													<div class="classimg">
														<span>188.3万次播放</span>
														<span><i class="iconfont icon-icon_good"></i>188</span>
													</div>
												</div>
											</div>
										</div>
									</el-col>
								</el-row>
								<el-pagination @prev-click="prev_click" @next-click="next_click" background @current-change="current_change" :current-page="page"
									:page-size="12" :total="counts" layout="prev, pager, next">
								</el-pagination>
							</div>
							<div class="ListImg">三个方面开始的模仿克鲁赛德</div>
							<div class="ListImg">三分就开始年福建省</div>
						</div>
					</div>
				</div>
			</div>
			<div class="navTab active">
				<div class="resource">
					<div class="classify">
						<div style="color: #101010; font-size: 16px;">
							<span>文档分类</span>
						</div>
						<div class="videoTabList" @click="classifyDocument">
							<div class="tabclassify tabDocument active">
								<img src="../../../assets/img/img.jpg" />
								<span>合同模板</span>
							</div>
							<div class="tabclassify tabDocument">
								<img src="../../../assets/img/img.jpg" />
								<span>企业管理</span>
							</div>
							<div class="tabclassify tabDocument">
								<img src="../../../assets/img/img.jpg" />
								<span>宣传文案</span>
							</div>
						</div>
					</div>
					<div class="dataList">
						<div style="color: #000000;">
							<el-dropdown>
								 <span class="el-dropdown-link" style="color: #000000;">
								    综合<i class="el-icon-arrow-down el-icon--right"></i>
								</span>
								<el-dropdown-menu slot="dropdown">
								    <el-dropdown-item>黄金糕</el-dropdown-item>
								    <el-dropdown-item>狮子头</el-dropdown-item>
									<el-dropdown-item>螺蛳粉</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<span> 点赞 </span>
							<span> 播放量</span> 
						</div>
						<div class="fileData">
							<div class="TabDocument active">
								<el-row>
									<el-col :span="6">
										<div class="filelist grid-content bg-purple">
											
										</div>
									</el-col>
								  <el-col :span="6"><div class="filelist grid-content bg-purple-light"></div></el-col>
								  <el-col :span="6"><div class="filelist grid-content bg-purple"></div></el-col>
								  <el-col :span="6"><div class="filelist grid-content bg-purple-light"></div></el-col>
								</el-row>
							</div>
							<div class="TabDocument">三个方面开始的模仿克鲁赛德</div>
							<div class="TabDocument">三分就开始年福建省</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				page: 1,
				counts: this.counts || 12,
				activeIndex: '1',
				data:[
						{
						index: 1,
						title: '482促销专题',
						liulan: '1000',
						text: '主演的电影《西游·降魔篇》在全国上映 [9]  。2014年3月28日，主演的文艺爱情片《我在路上最爱你》在全国上映。2014年12月18日，在姜文执导的动作喜剧片《一步之遥》中扮演武七一角 [10]  。2016年，主演电视剧《少帅》 [11]  和《剃刀边缘》 [12]  。2017年9月16日，凭借导演的电影《陆垚知马俐》获得第31届中国电影金鸡奖导演处女作奖 [13-14]  。2018年9月30日，主演的喜剧动作电影《胖子行动队》上映'
					},{
						index: 2,
						title: '销售小江镇',
						liulan: '1100',
						text: '主演的电影《西游·降魔篇》在全国上映 [9]  。2014年3月28日，主演的文艺爱情片《我在路上最爱你》在全国上映。2014年12月18日，在姜文执导的动作喜剧片《一步之遥》中扮演武七一角 [10]  。2016年，主演电视剧《少帅》 [11]  和《剃刀边缘》 [12]  。2017年9月16日，凭借导演的电影《陆垚知马俐》获得第31届中国电影金鸡奖导演处女作奖 [13-14]  。2018年9月30日，主演的喜剧动作电影《胖子行动队》上映'
					},{
						index: 3,
						title: '促销小可爱',
						liulan: '1050',
						text: '主演的电影《西游·降魔篇》在全国上映 [9]  。2014年3月28日，主演的文艺爱情片《我在路上最爱你》在全国上映。2014年12月18日，在姜文执导的动作喜剧片《一步之遥》中扮演武七一角 [10]  。2016年，主演电视剧《少帅》 [11]  和《剃刀边缘》 [12]  。2017年9月16日，凭借导演的电影《陆垚知马俐》获得第31届中国电影金鸡奖导演处女作奖 [13-14]  。2018年9月30日，主演的喜剧动作电影《胖子行动队》上映'
					},{
						index: 4,
						title: '促销小霸王',
						liulan: '1050',
						text: '主演的电影《西游·降魔篇》在全国上映 [9]  。2014年3月28日，主演的文艺爱情片《我在路上最爱你》在全国上映。2014年12月18日，在姜文执导的动作喜剧片《一步之遥》中扮演武七一角 [10]  。2016年，主演电视剧《少帅》 [11]  和《剃刀边缘》 [12]  。2017年9月16日，凭借导演的电影《陆垚知马俐》获得第31届中国电影金鸡奖导演处女作奖 [13-14]  。2018年9月30日，主演的喜剧动作电影《胖子行动队》上映'
					},
				],
				activityData:[
					{
						index: 1,
						title: '418品牌联合促销活动预热1',
						text: '为促销活动引流51648964sfdsgfd号机动工ID寄给你的男女佛绝对是覅肯定是机构你打算',
						time: '13'
					},{
						index: 2,
						title: '418品牌联合促销活动预热1',
						text: '为促销活动引流51648964sfdsgfd号机动工ID寄给你的男女佛绝对是覅肯定是机构你打算',
						time: '13'
					},{
						index:3,
						title: '418品牌联合促销活动预热1',
						text: '为促销活动引流51648964sfdsgfd号机动工ID寄给你的男女佛绝对是覅肯定是机构你打算',
						time: '13'
					},{
						index: 4,
						title: '418品牌联合促销活动预热1',
						text: '为促销活动引流51648964sfdsgfd号机动工ID寄给你的男女佛绝对是覅肯定是机构你打算',
						time: '13'
					},{
						index: 5,
						title: '418品牌联合促销活动预热1',
						text: '为促销活动引流51648964sfdsgfd号机动工ID寄给你的男女佛绝对是覅肯定是机构你打算活动引流51648964sfdsgfd号机动工ID寄给你的男女佛绝对是覅肯定是机构你打算活动引流51648964sfdsgfd号机动工ID寄给你的男女佛绝对是覅肯定是机构你打算',
						time: '13'
					},{
						index: 6,
						title: '418品牌联合促销活动预热1',
						text: '为促销活动引流51648964sfdsgfd号机动工ID寄给你的男女佛绝对是覅肯定是机构你打算',
						time: '135216'
					},
				],
			}
		},
		mounted() {
			// this.$scrollBar(()={
			// 	var 
			// });
		},
		methods:{
			load(){
				
			},
			// 共享千里马
			swifthorseBtn(){
				this.$router.push({
					path: './swifthorse'
				});
			},
			handleSelect(){},
			// tab切换
			tabCut(){
				var navTitletab = document.getElementsByClassName('navTitle')
				var navTabT = document.getElementsByClassName('navTab');
				for(var i=0;i<navTitletab.length; i++){
					navTitletab[i].id = i;
					navTitletab[i].onclick = function(){
						for(var j=0; j<navTabT.length;j++){
							navTitletab[j].classList.remove('active');
							navTabT[j].classList.remove('active');
						}
						navTitletab[this.id].classList.add('active');
						navTabT[this.id].classList.add('active');
					}
				}
			},
			classifyData(){
				var tabvideo = document.getElementsByClassName('tabvideo');
				var ListTab = document.getElementsByClassName('ListTab');
				for(var i=0;i<tabvideo.length; i++){
					tabvideo[i].id = i;
					tabvideo[i].onclick = function(){
						for(var j=0; j<ListTab.length;j++){
							tabvideo[j].classList.remove('active');
							ListTab[j].classList.remove('active');
						}
						tabvideo[this.id].classList.add('active');
						ListTab[this.id].classList.add('active');
					}
				}
			},
			classifyImg(){
				var tabimg = document.getElementsByClassName('tabimg');
				var ListImg = document.getElementsByClassName('ListImg');
				for(var i=0;i<tabimg.length; i++){
					tabimg[i].id = i;
					tabimg[i].onclick = function(){
						for(var j=0; j<ListImg.length;j++){
							tabimg[j].classList.remove('active');
							ListImg[j].classList.remove('active');
						}
						tabimg[this.id].classList.add('active');
						ListImg[this.id].classList.add('active');
					}
				}
			},
			classifyDocument(){
				var tabDocument = document.getElementsByClassName('tabDocument');
				var TabDocument = document.getElementsByClassName('TabDocument');
				for(var i=0;i<tabDocument.length; i++){
					tabDocument[i].id = i;
					tabDocument[i].onclick = function(){
						for(var j=0; j<TabDocument.length;j++){
							tabDocument[j].classList.remove('active');
							TabDocument[j].classList.remove('active');
						}
						tabDocument[this.id].classList.add('active');
						TabDocument[this.id].classList.add('active');
					}
				}
			},
		
			
			
			prev_click(e) {
				this.page = e;
			},
			next_click(e) {
				this.page = e;
			},
			current_change(e) {
				this.page = e;
			},
		},
	}
</script>

<style>
	.marketing{
		box-sizing: border-box;
		padding: 10px;
	}
	.marketing-top{
		display: flex;
		justify-content: space-between;
		height: 300px;
	}
	.marketing-top .top-left{
		width: 43%;
		height: 100%;
	}
	.top-left .marketshare{
		width: 100%;
		height: 200px;
		background-color: #3A9DF4;
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
	}
	.top-left .marketshare .gongxiangqianlima{
		width: 40%;
		padding: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	.gongxiangqianlima .liangtaiosxa{
		width: 40px;
		height: 23px;
		border-right: 2px solid #313AC3;
		border-left: 2px solid #313AC3;
	}
	.gongxiangqianlima .qianlima{
		width: 120px;
		height: 40px;
		padding: 0;
		background-color: #F0BF41;
		border: 0;
		color: #313AC3;
		margin-top: 10px;
		font-size: 14px;
		font-weight: normal;
	}
	.top-left .marketshare .gongxiangqianlima2{
		width: 50%;
		padding: 10px;
		color: #fff;
		padding-top: 30px;
	}
	
	.marketing-top .top-center{
		height: 100%;
		width: 25%;
		padding: 10px;
		overflow: hidden;
	}
	.top-center .tips{
		display: flex;
		justify-content: space-between;
	}
	
	.top-center .markket-special{
		padding-top: 20px;
	}
	.top-center .markket-special .special-ul .special-li{
		list-style: none;
		margin-top: 20px;
	}
	.top-center .markket-special .special-ul .special-li:nth-child(1){
		margin-top: 0;
	}
	.special-li .litips{
		display: flex;
		justify-content: space-between;
	}
	.special-li .litips .litips-left{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.special-li .litips .litips-left .dian{
		width: 10px;
		height: 10px;
		display: block;
		border-radius: 50%;
	}
	.special-li .litips .litips-left .dian1{
		background-color: #313AC3;
	}
	.special-li .litips .litips-left .dian2{
		background-color: #DE5346;
	}
	.special-li .litips .litips-left .dian3{
		background-color: #F0BF41;
	}
	.special-li .litips .litips-left .tipschuxopa{
		font-size: 14px;
		font-weight: bold;
		margin-left: 5px;
	}
	.special-li .litips .litips-right{
		display: flex;
		align-items: center;
		font-size: 10px;
	}
	.special-li .tips-text .text-tips{
		width: 274px;
		padding-right: 10px;
		height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		line-height: 20px;
		color: #9F9F9F;
	}
	
	.marketing-top .top-right{
		height: 100%;
		width: 30%;
		padding: 10px;
		overflow: auto;	
	}
	.activitytongzhi{
		font-size: 16px;
		color: #101010;
	}
	.el-scrollbar{
		height: 100%;
	}
	.el-scrollbar__wrap {
	  overflow-x: hidden;
	}
	.el-scrollbar__bar.is-vertical > li {
	    background-color: #575f7b;
	}
	
	.infinite-list::-webkit-scrollbar {
		width: 100px;
	}
	
	.infinite-list-item{
		display: flex;
		justify-content: space-between;
		margin-top: 22px;
	}
	.infinite-list-item .activitTitle{
		width: 260px;
	}
	.infinite-list-item .activitTitle .activefuTit{
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.marketingResource .marketingNav{
		width: 80%;
		height: 70px;
		margin: 0 auto;
	}
	.marketingNav .marketnavList{
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.marketingNav .marketnavList .navTitle{
		font-size: 20px;
		height: 48px;
		width: 150px;
		text-align: center;
		cursor: pointer;
	}
	.marketingNav .marketnavList .navTitle.active{
		color: #FF8D00;
		border-bottom: 2px solid #FF8D00;
	}

	.navTab{
		width: 100%;
		display: none;
	}
	.navTab.active{
		display: block;
	}
	
	.tabListData{
		margin-top: 20px;
	}
	.tabListData .navTab .resource{
		display: flex;
		justify-content: space-between;
	}
	.tabListData .navTab .resource .classify{
		width: 20%;
	}
	.tabListData .navTab .resource .dataList{
		width: 80%;
	}
	.resource .videoTabList{
		line-height: 80px;
	}
	.resource .videoTabList img{
		width: 25px;
		height: 25px;
		margin-left: 5px;
	}
	.resource .tabclassify{
		font-size: 14px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.resource .tabclassify.active{
		color: #2F24D2;
	}
	.resource .tabclassify span{
		margin-left: 20px;
	}

	.dataList .ListTab{
		display: none;
	}
	.dataList .ListTab.active{
		display: block;
	}
	.ListImg{
		display: none;
	}
	.TabDocument{
		display: none;
	}
	.ListImg.active{
		display: block;
	}
	.TabDocument.active{
		display: block;
	}
	.videoList{
		margin-top: 10px;
	}
	.videoData{
		width: 90%;
		height: 210px;
		margin-top: 30px;
	}
	.videoData .video{
		width: 100%;
		height: 100%;
	}
	.titleText .videoflex{
		display: flex;
		font-size: 10px;
		align-items: center;
		color: #999999;
		justify-content: space-between;
		width: 300px;
	}
	.el-pagination{
		text-align: center;
	}

	.imgList{
		width: 30%;
		height: 300px;
	}
	.listLiimg{
		margin-top: 20px;
	}
	.listLiimg .imgData{
		width: 90%;
		height: 200px;
		margin-top: 30px;
	}
	.listLiimg .imgData .img{
		width: 100%;
		height: 150px;
		border-radius: 8px;
	}
	.classimg{
		font-size: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.filelist{
		width: 90%;
		height: 250px;
		background-color: #0000FF;
	}
	.fileData{
		margin-top: 20px;
	}
</style>
