<template>
	<!-- 我的作品集 -->
	<div class="showreel" id="showreel">
		<div class="showreel-top">
			<h2>我的作品集</h2>
			<el-button class="returnBtn" @click="returnBtnIndex">返回</el-button>
		</div>
		<div class="worksGather">
			<ul class="gatherUl">
				<li class="gatherLi">
					<div class="videoText">
						<video
							width="100%"
							height="100%"
							controls
							controlslist="nodownload"
							src=""
						></video>
					</div>
					<div class="textBodylist">
						<div class="title">
							宇宙与自然
						</div>
						<div class="text">fdsfdsfds第十三师傅第三方第三方第三方萨达萨达萨达萨达</div>
					</div>
				</li>
				<li class="addList" @click="uploadFile">
					<i class="el-icon-plus"></i>
				</li>
			</ul>
			<el-pagination
				class="paginationsel"
				@prev-click="prev_click"
				@next-click="next_click"
				@current-change="current_change"
				:page-size="10"
				:total="counts"
				background
				layout="prev, pager, next"
			>
			</el-pagination>
		</div>
		<el-dialog title="编辑作品消息" :visible.sync="dialogFormVisible">
				<el-form :model="formWorks" :rules="rules" ref="formWorks">
					<el-form-item label="作品名称:" prop="worksName" :label-width="formLabelWidth">
						<el-input v-model="formWorks.worksName" style="width: 200px;" autocomplete="off" placeholder="请输入作品名称"></el-input>
					</el-form-item>
					<el-form-item label="作品封面:" prop="worksCoverUrl" :label-width="formLabelWidth">
						<el-upload
						  :action="actionUrl"
						  list-type="picture-card"
						  :show-file-list="false"
						  :on-success="imgUrlSuccess"
						  :auto-upload="true"
						>
							<img v-if="formWorks.worksCoverUrl" width="100%" height="100%" :src="formWorks.worksCoverUrl" />
							<span v-else>
								<i class="el-icon-plus"></i>
							</span>
						</el-upload>
					</el-form-item>
					<el-form-item label="上传作品:" prop="uploadWorks" :label-width="formLabelWidth">
						<el-upload
						  class="upload-demo"
						  drag
						  :action="actionFile"
						>
						  <i class="el-icon-upload"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="作品描述:" prop="worksDescribe" :label-width="formLabelWidth">
						<el-input v-model="formWorks.worksDescribe" type="textarea" class="textareael" maxlength="100" show-word-limit style="width: 80%;" autocomplete="off" placeholder="请输入作品名称"></el-input>
					</el-form-item>
					<el-form-item label-width="40%" class="fromBtn">
						<el-button class="addBtn">添加</el-button>
					</el-form-item>
				</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				counts:0,
				dialogFormVisible:false,
				formLabelWidth:'20%',
				actionFile:'',
				actionUrl: localStorage.getItem('actionUrl'),
				formWorks:{
					worksName:'',
					worksCoverUrl:'',
					uploadWorks:'',
					worksDescribe:''
				},
				rules:{
					worksName:[
						{ required: true, message: '请输入作品名称', trigger: 'blur' },
					],
					worksCoverUrl:[
						{ required: true, message: '请上传作品封面', trigger: 'blur' },
					],
					uploadWorks:[
						{ required: true, message: '请上传作品', trigger: 'blur' },
					],
					worksDescribe:[
						{ required: true, message: '请输入作品描述', trigger: 'blur' },
					]
				}
			}
		},
		mounted() {
			
		},
		methods:{
			// 返回按钮
			returnBtnIndex(){
				this.$router.push({
					path:'./partTimer'
				});
			},
			// 上传作品
			uploadFile(){
				this.dialogFormVisible = true;
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
			// 作品封面上传函数
			imgUrlSuccess(res,file,fileList){
				if(res.code == 200){
					this.formWorks.worksCoverUrl = localStorage.getItem('imgUrl') + res.data;
				}
			}
		}
	}
</script>

<style>
	.showreel{
		box-sizing: border-box;
	}
	.showreel-top{
		width: 90%;
		margin: 0 auto;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #FAFBFA;
		margin-top: 30px;
		padding: 0 20px;
	}
	.showreel-top .returnBtn{
		width: 80px;
		height: 30px;
		background-color: #3A9DF4;
		color: #fff;
		padding: 0;
	}
	.worksGather{
		width: 90%;
		margin: 0 auto;
	}
	.gatherUl {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20px;
		height: 600px;
	}
	.gatherUl .gatherLi{
		list-style: none;
		width: 28%;
		height: 165px;
		margin-left: 10px;
		display: flex;
		justify-content: space-between;
	}
	.gatherLi .videoText{
		width: 30%;
		height: 100%;
	}
	.textBodylist{
		width: 70%;
		padding: 5px 10px;
	}
	.textBodylist .title{
		width: 100%;
		height: 10%;
	}
	.textBodylist .text{
		height: 90%;
		width: 100%;
		padding-left: 24px;
		overflow: hidden;
		/* text-overflow:ellipsis; */
		/* white-space: nowrap; */
	}
	.addList{
		width: 128px;
		height: 148px;
		line-height: 148px;
		text-align: center;
		list-style: none;
		margin-left: 20px;
		cursor: pointer;
		border: 1px dashed #D9D9D9;
		font-size: 20px;
	}
	.paginationsel{
		width: 100%;
		text-align: center;
	}
	.textareael .el-textarea__inner{
		height: 130px;
	}
	.fromBtn .addBtn{
		width: 120px;
		background-color: #3A9DF4;
		height: 40px;
		color: #fff;
		padding: 0;
	}
</style>
