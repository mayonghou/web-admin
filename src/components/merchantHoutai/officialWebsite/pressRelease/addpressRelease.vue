<template>
    <!-- 添加新闻公告 -->
    <div class="addprocessRelease" id="addpressRelease">
        <div class="product-top">
            <label style="margin-left: 30px">新增新闻公告标题</label>
        </div>
        <el-form :model="addproduct" :rules="rules" ref="addproduct">
            <el-form-item label="新闻公告标题:" prop="title" label-width="230px">
                <el-input class="inputTitle"v-model="addproduct.title" placeholder="输入新闻公告"></el-input>
            </el-form-item>
            <el-form-item label="新闻图片:" prop="releaseImg" label-width="230px">
                <el-upload
                    class="avatar-uploader"
                    :action="action"
                    accept="image/*"
                    list-type="picture-card"
                    :auto-upload="true"
                    :on-success="fmSuccess"
                    :on-remove="removeUpload"
                    ref="uploadimg"
                    multiple
                >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
			<el-form-item label="新闻公告内容:" prop="content" label-width="230px">
			    <el-input v-model="addproduct.content" type="textarea" class="textarea" maxlength="500" show-word-limit placeholder="输入产品案例标题"></el-input>
			</el-form-item>
        </el-form>
        <div class="product">
            <el-button @click="baocunadd" class="baocun">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addpressRelease',
    data() {
        return {
            action: localStorage.getItem('actionUrl'),
            addproduct: {
                title: '',
                content: '',
                releaseImg: [],
			
            },
            rules: {
                title: [{
                    required: true,
                    message: '请输入新闻标题',
                    trigger: 'blur'
                }],
                content: [{
                    required: true,
                    message: '请输入新闻内容',
                    trigger: 'blur'
                    }],
                releaseImg:[{
                  required: true,
                  message: '请选择新闻图片',
                  trigger: 'blur'
                }],
            },
            imgUrl: [],
			imgList: [],
			fileList: []
        };
    },
    mounted() {
	},
    methods: {
        changeUpload(file, fileList) {
            this.addproduct.productImg = file.url;
            this.addproduct.file = file;
            this.imgList = fileList;
        },
        removeUpload(file, fileList) {
			if(fileList){
				var dddd = [];
				fileList.forEach(function(val, index){
					dddd[index] = val.response.data
				});
				this.imgUrl = dddd;
			}
        },
        fmSuccess(response, file, fileList) {
			if(response.code == 200){
				this.imgUrl.push(response.data);
				this.imgUrl.forEach(item => {
					this.addproduct.releaseImg = localStorage.getItem('imgUrl') + response.data;
				})
			} else {
				return this.$message({
					showClose: true,
					message: '图片上传失败',
					type: 'error'
				});
			}
        },
		baocunadd(){
			if(this.imgUrl == ''){
				return this.$message({
					showClose: true,
					message: '图片不能为空',
					type: 'error'
				});
			}
			this.$refs.addproduct.validate((valid) => {
				if(valid){
					this.$confirm('是否确定添加新闻公告【 ' + this.addproduct.title +'】', '温馨提示', {
					    confirmButtonText: '确定',
					    cancelButtonText: '取消',
					    type: 'warning'
					}).then(() => {
						const loading = this.$loading({
							lock: true,
							text: '添加中 ...',
							spinner: 'el-icon-loading',
							background: 'rgba(0, 0, 0, 0.7)'
						});
						let dataList = {
							albumPics: this.imgUrl,//图片
							companyId: parseInt(localStorage.getItem('loginData')),
							content: this.addproduct.content,
							title: this.addproduct.title
						}
						this.$axios.post('api/partner/add/company/news', dataList).then((res) => {
							loading.close(); 
							if(res.status == 200){
								var data = res.data;
								if(data.code == 200){
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'success'
									});
									this.$router.push({
										path: './pressRelease'
									});
									this.$refs.addproduct.resetFields();
								} else {
									this.$message({
										showClose: true,
										message: data.msg,
										type: 'error'
									});
								}
							} else {
								this.$message({
									showClose: true,
									message: data.msg,
									type: 'error'
								});
							}
						});
					}).catch(err=>{});
				}
			});
		}
    }
};
</script>

<style>
.addprocessRelease {
    width: 100%;
	box-sizing: border-box;
	padding: 20px;
}
.product-top {
    width: 100%;
    height: 45px;
    background: #fafbfa;
    margin-top: 20px;
    line-height: 45px;
    margin-bottom: 20px;
}
.input {
    width: 260px;
}
.product .baocun {
    width: 90px;
    height: 30px;
    background: #2482d2;
    color: #fff;
    padding: 0;
    margin-left: 30%;
}
.addprocessRelease .textarea{
  width: 800px;
}
.addprocessRelease .textarea .el-textarea__inner{
  height: 240px;
}
.inputTitle{
	width: 257px;
}
</style>
