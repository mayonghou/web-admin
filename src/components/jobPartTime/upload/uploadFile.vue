<template>
    <!-- 上传图片或视频 -->
    <div class="uploadRenwu" id="uploadRenwu">
        <div class="uploadRenwu-top">上传{{this.type == 0?'图片':'视频'}}任务</div>
		<el-form :model="uploadText" :rules="rules" ref="uploadText" style="margin-top: 20px;">
			<el-form-item :label="this.type == 0?'图片标题：':'视频标题：'" prop="title" :label-width="labelwidth">
				<el-input v-model="uploadText.title" placeholder="请输入标题" style="width: 200px;"></el-input>
			</el-form-item>
			<el-form-item label="图片:" v-if="this.type == 0" prop="imgUrl" :label-width="labelwidth">
				<el-upload
				  :action="actionUrl"
				  list-type="picture-card"
				  :show-file-list="false"
				  :on-success="imgUrlSuccess">
				  <img v-if="uploadText.imgUrl" width="100%" height="100%" :src="uploadText.imgUrl" />
				  <i v-else class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="视频:" v-if="this.type == 1" prop="videoUrl" :label-width="labelwidth">
				<el-upload
				  :action="videoUrl"
				  list-type="picture-card"
				  :show-file-list="false"
				  :on-success="videoUrlSuccess">
				  <video
					v-if="uploadText.videoUrl"
					width="100%"
					height="100%"
					:src="uploadText.videoUrl"
					controls
					controlslist="nodownload"
				  ></video>
				  <i v-else class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
		<!-- 	<el-form-item label="文档:" v-if="this.type == 1" prop="videoUrl" :label-width="labelwidth">
				<el-upload
				  :action="videoUrl"
				  list-type="picture-card"
				  :show-file-list="false"
				  :on-success="videoUrlSuccess">
				  <video
					v-if="uploadText.videoUrl"
					width="100%"
					height="100%"
					:src="uploadText.videoUrl"
					controls
					controlslist="nodownload"
				  ></video>
				  <i v-else class="el-icon-plus"></i>
				</el-upload>
			</el-form-item> -->
			<el-form-item label="作品备注:" prop="remark" :label-width="labelwidth">
				<el-input v-model="uploadText.remark" type="textarea" maxlength="50" show-word-limit placeholder="请输入作品备注" class="worksRemark"></el-input>
			</el-form-item>
			<el-form-item label-width="30%">
				<el-button class="uploadBtn">取消</el-button>
				<el-button class="uploadBtn">确定上传</el-button>
			</el-form-item>
		</el-form>
    </div>
</template>

<script>
	export default{
		name:'uploadRenwu',
		data(){
			return{
				actionUrl: localStorage.getItem('actionUrl'),
				videoUrl: localStorage.getItem('videoUrl'),
				fileUrl:localStorage.getItem('fileUrl'),
				type:'',
				labelwidth:'20%',
				uploadText:{
					title:'',
					imgUrl:'',
					videoUrl:'',
					remark:''
				},
				rules:{
					title:[
						{ required: true, message: '请输入标题', trigger: 'blur' },
					],
					imgUrl:[
						{ required: true, message: '请选择图片', trigger: 'blur' },
					],
					videoUrl:[
						{ required: true, message: '请选择视频', trigger: 'blur' },
					],
					remark:[
						{ required: true, message: '请输入作品备注', trigger: 'blur' },
					]
				}
			}
		},
		mounted() {
			this.type = this.$route.query.type;
		},
		methods:{
			// 图片上传成功函数
			imgUrlSuccess(res, file, fileList){
				if(res.code == 200){
					this.uploadText.imgUrl = localStorage.getItem("imgUrl")+res.data;
				}
			},
			// 视频上传成功函数
			videoUrlSuccess(res, file, fileList){
				if(res.code == 200){
					this.uploadText.videoUrl = localStorage.getItem("imgUrl")+res.data;
				}
			},
		}
	}
</script>

<style scoped>
.uploadRenwu {
    box-sizing: border-box;
	padding-top: 20px;
}
.uploadRenwu-top {
    width: 90%;
    margin: 0 auto;
    height: 45px;
    background: #fafbfa;
	display: flex;
	align-items: center;
	padding: 0 20px;
	font-size: 16px;
}
.worksRemark{
	width: 50%;
}
.uploadBtn{
	width: 135px;
	height: 40px;
	background-color: #2F24D2;
	color: #fff;
}
</style>
