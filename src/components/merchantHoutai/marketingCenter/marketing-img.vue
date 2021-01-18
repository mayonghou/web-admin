<template>
	<div class="marketing-img" id="marketing-img">
		<div class="marktingvideo-top">
			<div class="videoClass">
				<div class="shipinClass">图片分类</div>
				<div class="class">
					<img class="img" src="../../../assets/img/img.jpg" />
					<div class="className">活动海报</div>
				</div>
				<div class="class">
					<img class="img" src="../../../assets/img/img.jpg" />
					<div class="className">摄影图片</div>
				</div>
				<div class="class">
					<img class="img" src="../../../assets/img/img.jpg" />
					<div class="className">背景图片</div>
				</div>
			</div>
			<div class="videoList">
				<div class="xialaList">
					<div class="bbbb">
						<el-dropdown class="el-dropdown" @command="handleCommand">
						  <span class="el-dropdown-link">
						    <span class="link-font">{{this.commandName != '' ? this.commandName: '全部' }}</span><i class="el-icon-arrow-down el-icon--right"></i>
						  </span>
						  <el-dropdown-menu slot="dropdown">
						    <el-dropdown-item command="1">活动海报</el-dropdown-item>
						    <el-dropdown-item command="2">摄影图片</el-dropdown-item>
						    <el-dropdown-item command="3">背景图片</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
					</div>
					<div class="bbbb">
						<div>点赞</div>
						<div class="bbbv">
							<i class="vvv el-icon-arrow-up"></i>
							<i class="vvv el-icon-arrow-down"></i>
						</div>
					</div>
					<div class="bbbb">
						<div>浏览量</div>
						<div class="bbbv">
							<i class="vvv el-icon-arrow-up"></i>
							<i class="vvv el-icon-arrow-down"></i>
						</div>
					</div>
				</div>
				<div class="listVideo">
					<el-row>
						<el-col :span="8" v-for="index in 12" :key="index">
								<div class="grid-content bg-purple">
									<img class="video" src="../../../assets/img/img.jpg" />
									<div class="videoTitle">fdsjkfbnjk放到数据库备份能看见但是不能发几款就卡死的还不能击垮是你的的那就开始ODHNJKLNSAJ看</div>
									<div class="video-bottom">
										<span>193000000次播放</span>
										<span>
											<i class="iconfont icon-icon_good"></i>
											<span>1000</span>
										</span>
									</div>
								</div>
						</el-col>
					</el-row>
					<el-pagination
						background
						@size-change="handleSizeChange"
						@current-change="handleCurrentChange"
						:current-page="page"
						class="paginationss"
						:page-sizes="[10, 20, 30, 40]"
						:page-size="limit"
						layout="total, sizes, prev, pager, next, jumper"
						:total="counts">
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'marketing-img',
		data(){
			return{
				commandName: '',
				page: 1,
				limit: 12,
				counts: 50
			}
		},
		mounted() {
			
		},
		methods:{
			handleSizeChange(val){
				this.limit = val;
			},
			handleCurrentChange(val){
				this.page = val;
			},
			
			
			handleCommand(command){
				if(command == 1 ){
					this.commandName = '活动海报';
				} else if(command == 2) {
					this.commandName = '摄影图片';
				} else if(command == 3) {
					this.commandName = '背景图片';
				}
			}
		}
	}
</script>

<style scoped>
	.marketing-img{
		box-sizing: border-box;
		width: 100%;
	}
	.marktingvideo-top{
		display: flex;
		justify-content: space-between;
	}
	.marktingvideo-top .videoClass{
		width: 20%;
		border-right: 1px solid #F4F4F4;
	}
	.marktingvideo-top .videoList{
		width: 80%;
		padding: 5px 20px;
	}

	.videoClass .shipinClass {
		font-size: 22px;
		padding: 10px 20px;
		padding-bottom: 0;
	}
	.videoClass .class{
		padding: 0 20%;
		font-size: 20px;
		display: flex;
		align-items: center;
		margin-top: 50px;
	}
	.videoClass .class .img{
		width: 30px;
		height: 30px;
	}
	.videoClass .class .className{
		margin-left: 20px;
	}
	
	.videoList .xialaList{
		display: flex;
		align-items: center;
	}
	.el-dropdown-link{
		color: #666666;
	}
	/* .el-dropdown{
		width: 100px;
	} */
	.bbbb{
		margin-left:54px;
		display: flex;
		align-items: center;
		color: #666666;
	}
	.bbbv .vvv{
		display: block;
		font-size: 10px;
		cursor: pointer;
	}
	.bbbbbbbb{
		width: 100%;
		height: 100px;
		background-color: #0000FF;
	}
	.listVideo{
		margin-top: 10px;
	}
	
	.listVideo .grid-content{
		padding: 10px 40px;
		
	}
	
	.listVideo .grid-content .video{
		width: 100%;
		height: 200px;
	}
	.videoTitle{
		width: 100%;
		line-height: 40px;
		font-size: 18px;
		font-weight: bold;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		display: -webkit-box;
	}
	.video-bottom{
		display: flex;
		justify-content: space-between;
		color: #CCCCCC;
		font-size: 12px;
	}
	.grid-content {
		border: 0;
	}
	.paginationss{
		text-align: center;
		width: 100%;
	}
</style>
