<template>
	<div class="detailconpany" id="detailconpany">
		<div class="detail-top">
			<label style="margin-left: 20px;">企业活动详情</label>
		</div>
		<el-form :model="detailCom">
			<el-form-item label="活动标题:" label-width="230px">
				<el-input v-model="detailCom.title" readonly class="detailInput"></el-input>
			</el-form-item>
			<el-form-item label="活动图片:" label-width="230px">
				<img width="90" height="90" style="margin-top: 10px; margin-left: 10px;" v-for="item in this.detailCom.activityImg" :key="item" :src="item" />
			</el-form-item>
			<el-form-item label="活动详情:" label-width="230px">
				<div v-html="detailCom.activitydetail"></div>
			</el-form-item>
		</el-form>
		<div class="detailBtn">
			<el-button @click="returnBtns" class="returnBtn">返回</el-button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'detailconpany',
		data() {
			return {
				detailCom: {
					title: '',
					activityImg: '',
					activitydetail: ''
				}
			}
		},
		mounted() {
			this.getqueryData();
		},
		methods: {
			getqueryData() {
				var data = this.$route.query.data;
				if (data != undefined) {
					this.detailCom.title = data.title;
					var list = [];
					var aaas = /^https /;
					data.albumPics.split(',').forEach(function(val, index){
						console.log(aaas.test(val));
						if(aaas.test(val) == true){
							list[index] = val;
						} else {
							list[index] = localStorage.getItem('imgUrl') + val;
						}
					});
					this.detailCom.activityImg = list;
					this.detailCom.activitydetail = data.detailHtml;
				} else {
					this.$router.push({
						path: './company'
					}).catch((err) => {
						console.log(err);
					});
				}
			},
			returnBtns() {
				this.$router.push({
					path: './company'
				}).catch((err) => {
					console.log(err);
				});
			},
		}
	}
</script>

<style>
	.detailconpany {
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
	}

	.detailconpany .detail-top {
		width: 100%;
		height: 45px;
		line-height: 45px;
		background-color: #fafbfa;
		margin-bottom: 30px;
	}

	.detailInput .el-input__inner {
		border: 0;
	}
	.detailInput .el-textarea__inner {
		border: 0;
	}
	.detailBtn .returnBtn {
		width: 90px;
		height: 30px;
		padding: 0;
		background-color: #2482D2;
		color: #fff;
		margin-left: 25%;
	}
</style>
