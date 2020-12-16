<template>
    <div class="addDynamic" id="editDynamic">
        <div class="addDynamic-top"><label style="margin-left: 20px">编辑发布的图文动态信息</label></div>
        <el-form :model="editDynamic" :rules="rules" ref="editDynamic">
            <el-form-item label="动态详情:" prop="dynamicDetial" :label-width="labelwidth">
                <el-input
                    v-model="editDynamic.dynamicDetial"
                    type="textarea"
                    class="textarea"
                    placeholder="请输入动态详情"
                    maxlength="200"
                    :show-word-limit="true"
                ></el-input>
            </el-form-item>
            <el-form-item label="" prop="dynamicImg" :label-width="labelwidth">
                <el-upload
                    class="avatar-uploader"
                    :action="action"
                    accept="image/*"
                    :limit="5"
                    list-type="picture-card"
                    :on-change="changeUpload"
                    :auto-upload="false"
                    :on-success="fmSuccess"
                    :on-remove="removeUpload"
                    multiple
                    ref="uploadimg"
                    :file-list="listFiel"
                >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
				<label>{{this.length + '/5'}}</label>
            </el-form-item>
        </el-form>
        <div class="btnbellbtn">
            <el-button @click="updatebut" class="btndds">发布</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addDynamic',
    data() {
        return {
            labelwidth: '230px',
            action: localStorage.getItem('actionUrl'),
            // fileList: [],
            editDynamic: {
                dynamicDetial: '',
                dynamicImg: '',
                file: {}
            },
            rules: {
                dynamicDetial: [
                    {
                        required: true,
                        message: '动态详情不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            imgUrl: [],
            loading: '',
            imgList: [],
            pushName: '',
            id: '',
			listFiel: [],
			length: ''
        };
    },
    mounted() {
        this.getEditDynamic();
    },
    methods: {
        changeUpload(file, fileList) {
            this.editDynamic.dynamicImg = file.url;
            this.editDynamic.file = file;
            this.imgList = fileList;
			this.length = fileList.length;
        },
        removeUpload(file, fileList) {
            this.imgList = fileList;
			if(fileList){
				var ddataUrl = [];
				let aaa = /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/
				fileList.forEach((val,index) => {
					if(aaa.test(val.url) == true){
						ddataUrl[index] = val.url.substring(val.url.lastIndexOf("/image"));
					}
				})
				this.imgList = ddataUrl;
				this.imgUrl = this.imgList;
				this.length = this.imgList.length;
			}
        },
        fmSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.imgUrl.push(response.data || '');
            }
			if(this.imgUrl.length == fileList.length){
				this.posteditDynamic();
			}
        },
        posteditDynamic() {
			let data = {
			    details: this.editDynamic.dynamicDetial,
			    type: 2,
			    url: this.imgUrl.join(','),
			    id: this.id
			};
            this.$axios.post('admin/admin/company/editDynamic', data).then((res) => {
                this.loading.close();
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'success'
                        });
                        this.$router.push({
                          path: '/dynamicState',
						  page: this.$route.query.page
                        });
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
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            });
        },
        updatebut() {
            this.$refs.editDynamic.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定编辑【' + this.pushName + '】发布图文动态?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading = this.$loading({
                            lock: true,
                            text: '编辑中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        if (this.editDynamic.dynamicImg != '') {
                            this.$refs.uploadimg.submit();
                        } else {
                            this.posteditDynamic();
                        }
                    });
                }
            });
        },
        getEditDynamic() {
            var data = this.$route.query.data;
            if (data != Object) {
                this.editDynamic.dynamicDetial = data.details;
                this.pushName = data.pushName;
				var imgDataUrl = [];
				var aaas = /^(https):\/\/.+$/;
                data.url.split(',').forEach(function(val, index){
					if(aaas.test(val) == true){
						imgDataUrl[index] = val;
					} else {
						imgDataUrl[index] = localStorage.getItem('imgUrl') + val;
					}
                });
				this.imgList = imgDataUrl;
				this.listFiel = imgDataUrl.map(i => {
					var obj = {};
					obj.url = i;
					return obj;
				})
                this.id = data.id;
            }
        }
    }
};
</script>

<style>
.addDynamic {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
}
.addDynamic-top {
    box-sizing: border-box;
    height: 45px;
    background-color: #FAFBFA;
    margin-bottom: 30px;
    line-height: 45px;
}
.addDynamic .el-form-item__label {
    text-align: right;
}
.textarea {
    width: 750px;
}
.textarea .el-input__count{
	padding: 0;
}
.el-textarea__inner {
    height: 250px;
}
.btnbellbtn {
    width: 100%;
    text-align: center;
}
.btnbellbtn .btndds {
    width: 90px;
    height: 30px;
	line-height: 30px;
	font-size: 14px;
    background-color: #2450D2;
    color: #fff;
    padding: 0;
}
</style>
