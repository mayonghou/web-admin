<template>
	<!-- 视频详情 -->
	<div class="detailvideo" id='detailvideo' v-loading="fullscreenLoading" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.7)">
		<div class="videoTop"><label>视频信息</label></div>
		<el-form :model="detailvideoData" ref="detailvideoData">
			<el-form-item label="封面: " prop="coverUrl" :label-width="labelWidth">
				<img width="100" height="100" v-model="detailvideoData.coverUrl" :src="this.detailvideoData.coverUrl" />
			</el-form-item>
			<el-form-item label="视频: " prop="contentUrl" :label-width="labelWidth">
				<video
					ref="videoPlayer"
					width="400"
					height="200"
					controls
					controlslist="nodownload"
					@play="toPlays"
					@timeupdate="updateTime"
					@pause="toPause"
					:src="this.detailvideoData.contentUrl"
					class="video"
				>
				</video>
			</el-form-item>
			<el-form-item label="视频标题: " prop="title" :label-width="labelWidth">
				<el-input class="elInput" v-model="detailvideoData.title" readonly></el-input>
			</el-form-item>
			<el-form-item label="关联商品: " prop="cooper" :label-width="labelWidth">
				<el-input class="elInput" v-model="detailvideoData.cooper" readonly></el-input>
			</el-form-item>
		</el-form>
		<el-button class="fabushipin" @click="returnvideo">返回</el-button>
	</div>
</template>

<script>
	export default {
		name: 'detailvideo',
		data() {
			return {
				labelWidth: '220px',
				fullscreenLoading: false,
				loadingText: '加载中...',
				detailvideoData: {
					id: '',
					coverUrl: '',
					videoUrl: '',
					title: '',
					cooper: '',
				},
				status: '',
			}
		},
		mounted() {
			this.getVideoDetail();
		},
		methods: {
			// 视频播放
			toPlays(e){
			},
			// 视频暂停
			toPause(e){
			},
			// 时间
			updateTime(e){
			},
			// 查看视频详情
			getVideoDetail(){
				var data = this.$route.query.data;
				if(data != null){
					this.detailvideoData = data;
					var http = /https/;
					var bbb = http.test(data.coverUrl);
					if(bbb == true){
						this.detailvideoData.coverUrl = data.coverUrl;
					} else {
						this.detailvideoData.coverUrl = localStorage.getItem('imgUrl') + data.coverUrl;
					}
					if(http.test(data.contentUrl) == true){
						this.detailvideoData.contentUrl = data.contentUrl;
					} else {
						this.detailvideoData.contentUrl = localStorage.getItem('imgUrl') + data.contentUrl;
					}
					this.detailvideoData.cooper = data.productInfo.name;
					this.status = data.status;
				}
			},
			// 返回按钮
			returnvideo(){
				if(this.status == '上架'){
					this.$router.push({
						path: './videoIndex'
					});
				} else {
					this.$router.push({
						path: './lowerVideo'
					});
				}
			},
		}
	}
</script>

<style>
	.gunliang {
		border: 1px solid #0000FF;
		color: #0000FF;
	}

	.detailvideo {
		width: 100%;
		box-sizing: border-box;
		padding: 20px
	}

	.videoTop {
		width: 100%;
		height: 45px;
		background-color: #FAFAFA;
		line-height: 45px;
		padding-left: 20px;
		margin-top: 20px;
		margin-bottom: 30px;
	}

	.el-upload--text {
		width: 80px;
		height: 32px;
	}

	.detailvideo .elInput .el-input__inner {
		width: 250px;
		border: 0;
		border-radius: 0;
		/* border-bottom: 1px solid #C1C1C1; */
	}

	.goodsSeacher {
		width: 350px;
		height: 45px;
		background-color: #FAFFE0;
		margin: 0 auto;
		margin-bottom: 25px;
		position: relative;
		line-height: 30px;
	}

	.icon {
		position: absolute;
		z-index: 1;
		top: 17px;
		left: 11px;
	}

	.el-input {
		margin-top: 7px;
		margin-left: 10px;
		width: 290px;
		height: 30px;
		border: 0px;
	}

	.seacher {
		margin-left: 10px;
	}

	.iconEnlorder {
		position: relative;
	}

	.iconfont {
		position: absolute;
		right: 60px;
		top: -65px;
	}
	 .el-table .bulebutton{
		width: 76px;
		height: 20px;
		background-color: #2450D2;
		color: #fff;
		padding: 0;
		border-radius: 8px;
	}
	.detailvideo .fabushipin{
		width: 90px;
		height: 30px;
		margin-left: 35%;
		background-color: #2482D2;
		color: #fff;
	}
	.detailvideo .el-form-item__content .elInput{
		line-height: 30px;
	}
</style>
