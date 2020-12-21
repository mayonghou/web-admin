<template>
	<div class="marketing" id="marketing">
		<div class="marketing-top">
			<div class="bgyingxaio"></div>
			<div class="yingxiaozhuangqu">营销专区</div>
		</div>
		<div class="marketing-body">
			<div class="body-left">
				<div class="left-top">
					共享千里马
					<div class="renAll">你想要的人才这里都有</div>
				</div>
				<div class="left-body">
					<img class="img" src="../../../assets/img/img.jpg"/>
					<div class="left-body-text">
						<p style="margin-top: 5px;">1、商品图不好看？来这儿找专 业的平面设计，你就是下一个伯乐</p>
						<p style="margin-top: 5px;">2、不会视频剪辑？视频制作大神 等你来淘。</p>
					</div>
				</div>
				<el-button class="left-bottom">进入共享千里马</el-button>
			</div>
			<div class="body-center">
				<div class="center-top">
					<div class="center-top-left">
						<div class="top-left-left"></div>
						<div class="top-left-right">营销小知识</div>
					</div>
					<div class="center-gengduo">更多 >></div>
				</div>
				<div class="center-body">
					<ul class="center-ul">
						<li class="center-li clearfix">
							<div class="cneter-li-top">
								<div class="dianTitle">
									<div class="li-dian"></div>
									<div class="title">408促销小标提</div>
								</div>
								<div class="yuanjingIcon">
									<i class="el-icon-view"></i>
									<span>564526次浏览</span>
								</div>
							</div>
							<div class="li-body">
								daskdajsfklpajsmflkadsmfl;ds'kfdolps;fkdlms;fk,dsl;gk,dfl;gkdffgjdisdnsajkdhnaiksudhnaiosudhasiodjsa;diosajdisadj ansiodnas sajdioasnd sandiosandas iosadjnaklsd asd asjkldnasd saocnvxsjkfhdwjs sauxidhw8qijdfahjnsidouahs8ubncijsaxhudsn'
							</div>
						</li>
						<li class="center-li clearfix">
							<div class="cneter-li-top">
								<div class="dianTitle">
									<div class="li-dian"></div>
									<div class="title">408促销小标提</div>
								</div>
								<div class="yuanjingIcon">
									<i class="el-icon-view"></i>
									<span>564526次浏览</span>
								</div>
							</div>
							<div class="li-body">
								daskdajsfklpajsmflkadsmfl;ds'kfdolps;fkdlms;fk,dsl;gk,dfl;gkdffgjdisdnsajkdhnaiksudhnaiosudhasiodjsa;diosajdisadj ansiodnas sajdioasnd sandiosandas iosadjnaklsd asd asjkldnasd saocnvxsjkfhdwjs sauxidhw8qijdfahjnsidouahs8ubncijsaxhudsn'
							</div>
						</li>
						<li class="center-li clearfix">
							<div class="cneter-li-top">
								<div class="dianTitle">
									<div class="li-dian"></div>
									<div class="title">408促销小标提</div>
								</div>
								<div class="yuanjingIcon">
									<i class="el-icon-view"></i>
									<span>564526次浏览</span>
								</div>
							</div>
							<div class="li-body">
								daskdajsfklpajsmflkadsmfl;ds'kfdolps;fkdlms;fk,dsl;gk,dfl;gkdffgjdisdnsajkdhnaiksudhnaiosudhasiodjsa;diosajdisadj ansiodnas sajdioasnd sandiosandas iosadjnaklsd asd asjkldnasd saocnvxsjkfhdwjs sauxidhw8qijdfahjnsidouahs8ubncijsaxhudsn'
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="body-right">
				<div class="right-top">
					<div class="right-top-ddd"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){},
		methods:{
		}
	}
</script>

<style scoped>
	.marketing{
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
		background-color: #FAFAFA;
	}
	.marketing .marketing-top{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.marketing .marketing-top .bgyingxaio{
		width: 6px;
		height: 25px;
		background-image: linear-gradient(#4760FF, #0DCCFF);
		border-radius: 10px;
	}
	.marketing .marketing-top .yingxiaozhuangqu{
		font-size: 24px;
		margin-left: 10px;
		margin-top: -3px;
		font-family: Microsoft YaHei Regular;
	}
	.clearfix::after{
		clear: both;
		padding: 0;
		content: '';
	}
	.marketing .marketing-body{
		display: flex;
		justify-content: space-between;
		height: 350px;
	}
	.marketing .marketing-body .body-left{
		width: 26%;
		height: 100%;
		background-color: #FFFFFF;
		padding: 20px;
		padding-top: 0;
	}
	.marketing .marketing-body .body-center{
		width: 34%;
		height: 100%;
		background-color: #FFFFFF;
	}
	.marketing .marketing-body .body-right{
		width: 34%;
		height: 100%;
		background-color: #FFFFFF;
	}

	.body-left .left-top{
		color: #2971FF;
		font-size: 24px;
		margin-top: 50px;
		margin-left: 80px;
	}
	.body-left .left-top .renAll{
		font-size: 12px;
		margin-left: 60px;
	}
	.body-left .left-body{
		display: flex;
		justify-content: space-between;
	}
	.body-left .left-body .img{
		width: 100px;
		height: 100px;
	}
	.body-left .left-body .left-body-text{
		font-size: 12px;
		margin-left: 20px;
	}
	.body-left .left-bottom{
		width: 120px;
		height: 34px;
		background-color: #2971FF;
		margin-top: 10px;
		margin-left: 10px;
		color: #FFFFFF;
	}

	.center-top{
		display: flex;
		justify-content: space-between;
		padding:10px 20px;
		border-bottom: 1px solid #F4F4F4;
	}
	.center-top .center-top-left{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.center-top .center-top-left .top-left-left{
		width: 6px;
		height: 25px;
		background-image: linear-gradient(#4760FF, #0DCCFF);
		border-radius: 10px;
	}
	.center-top .center-top-left .top-left-right{
		font-size: 22px;
		margin-left: 10px;
	}
	.center-top .center-gengduo{
		font-size: 16px;
		color: #2971FF;
		cursor: pointer;
		margin-top: 5px;
	}
	.center-body{
		padding: 40px;
		padding-top: 20px;
	}
	.center-body .center-ul{
		height: 100%;
		overflow: hidden;
	}
	.center-ul .center-li{
		list-style: none;
		margin-top: 60px;
	}
	.center-ul .center-li .cneter-li-top{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.center-ul .center-li:nth-child(1){
		margin-top: 0;
	}
	.center-ul .center-li .cneter-li-top .dianTitle{
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
	}
	.center-li .cneter-li-top .dianTitle .li-dian{
		width: 10px;
		height: 10px;
		border-radius: 50%;
		margin-right: 10px;
	}
	.center-li .cneter-li-top .dianTitle .li-dian:nth-child(2){
		background-color: #FA675C;
	}
	.center-li .cneter-li-top .dianTitle .li-dian:nth-child(1){
		background-color: #4285F4;
	}
	.center-li .cneter-li-top .dianTitle .li-dian:nth-child(3){
		background-color: #42C3AF;
	}
	.center-li .cneter-li-top .dianTitle .title{
		font-size: 16px;
		font-weight: bold;
	}
	.cneter-li-top .yuanjingIcon{
		font-size: 12px;
		color: #999999;
	}
	.cneter-li-top .yuanjingIcon i{
		margin-right: 5px;
	}
	.center-li .li-body{
		width: 95%;
		float: right;
		height: 40px;
		line-height: 20px;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		font-size: 14px;
	}
	
	.body-right .right-top{
		display: flex;
		flex-wrap: nowrap;
	}
	.body-right .right-top .right-top-ddd{
		
	}

</style>
