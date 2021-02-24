<template>
	<!-- 已完成的订单任务 -->
	<div class="offThenStocks" id="offThenStocks">
		<div class="returnBtn">
			<el-button type="text" @click="returnBtn">返回</el-button>
		</div>
		<div class="offThenStocksNav">
			<ul class="navUl">
				<li class="navLi" :class="item.index == 0?'active':''" @click="navLiTab(item)" v-for="item in this.navLiList" :key="item.index" ref="navLi">
					<span>{{item.name}}</span>
				</li>
			</ul>
			<div class="shangchuanNumber">
				已上传的图片列表<span style="color: #1FB054;">(8/10张)</span>
			</div>
			<ul class="renwuText" v-if="this.typeID == 0">
				<li class="renwuTextLi">
					<div class="imgDiv">
						<img width="100%" height="100%" />
					</div>
					<div class="imgText">
						<p class="" style="line-height: 30px;">苹果X</p>
						<p style="line-height: 30px; color: #8F8E94;">图片尺寸大小为110*100</p>
					</div>
				</li>
			</ul>
			<ul class="renwuText" v-if="this.typeID == 1">
				<li class="renwuTextLi">
					<div class="imgDiv">
						<video width="100%" height="100%" ></video>
					</div>
					<div class="imgText">
						<p class="" style="line-height: 30px;">苹果X</p>
						<p style="line-height: 30px;color: #8F8E94;">图片尺寸大小为110*100</p>
					</div>
				</li>
			</ul>
			<ul class="renwuText" v-if="this.typeID == 2">
				<li class="renwuTextLi">
					<div class="imgDiv">
						<img width="100%" height="100%" />
					</div>
					<div class="imgText">
						<p class="" style="line-height: 30px;">苹果X</p>
						<p style="line-height: 30px;color: #8F8E94;">图片尺寸大小为110*100</p>
					</div>
				</li>
			</ul>
			<el-pagination
				class="elpagination"
				@prev-click="prev_click"
				@next-click="next_click"
			    @current-change="current_change"
				:page-size="10"
				:total="counts"
				layout="prev, pager, next"
				>
			</el-pagination>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				navLiList:[
					{
						index:0,
						name:'图片'
					},
					{
						index:1,
						name:'视频'
					},
					{
						index:2,
						name:'文档'
					},
				],
				page:1,
				limit:10,
				counts:10,
				typeID:0,
			}
		},
		mounted() {
			this.heightBody();
		},
		methods:{
			heightBody(){
				let bodyHeight = document.body.clientHeight;
				let orderProlong = document.getElementById('offThenStocks');
				orderProlong.style.height = bodyHeight - 70;
			},
			// 头部nav导航切换
			navLiTab(item){
				this.typeID = item.index;
				let navLiList = this.$refs.navLi;
				for(let i = 0;i<navLiList.length;i++){
					if(item.index == i){
						navLiList[i].classList.add('active');
					} else {
						navLiList[i].classList.remove('active');
					}
				}
			},
			// 分页
			prev_click(e){
				this.page = e;
			},
			next_click(e){
				this.page = e;
			},
			current_change(e){
				this.page = e;
			},
			returnBtn(){
				this.$router.push({
					path:'./myOrder'
				});
			}
		}
	}
</script>

<style scoped>
	.offThenStocks{
		box-sizing: border-box;
		height: 100%;
		background-color: #F5F7FC;
		padding-top: 15px;
	}
	.offThenStocksNav{
		width: 90%;
		margin: 0 auto;
	}
	.offThenStocksNav .navUl{
		width: 100%;
		display: flex;
		height: 42px;
		flex-direction: row;
		align-items: center;
	}
	.offThenStocksNav .navUl .navLi{
		list-style: none;
		width: 200px;
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		background-color: #EDF8EE;
	}
	.offThenStocksNav .navUl .navLi.active{
		background-color: #1FB054;
		color:#fff;
	}
	.offThenStocksNav .navUl .navLi:hover{
		background-color: #1FB054;
		color:#fff;
	}
	.shangchuanNumber{
		line-height: 40px;
	}
	.renwuText{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	.renwuText .renwuTextLi{
		width: 24%;
		height: 240px;
		list-style: none;
		background-color: #fff;
		margin: 10px 10px 0 0;
		
	}
	.imgDiv{
		width: 100%;
		height: 70%;
		background-color: #179A16;
	}
	.imgText{
		width: 100%;
		height: 30%;
		padding: 0 20px;
	}
	.elpagination{
		width: 100%;
		text-align: center;
		margin-top: 10px;
	}
	.returnBtn{
		width: 100%;
		text-align: right;
		padding: 0 20px;
	}
</style>
