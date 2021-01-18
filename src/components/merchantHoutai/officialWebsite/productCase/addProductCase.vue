<template>
    <!-- 添加产品案例 -->
    <div class="addProductCase" id="addProductCase">
        <div class="product-top">
            <label style="margin-left: 30px;">新增产品案例信息</label>
        </div>
        <el-form :model="addproduct" :rules="rules" ref="addproduct">
            <el-form-item label="产品图片或者视频:" prop="productUrl" label-width="230px">
                <el-button v-if="addproduct.productUrl == ''" @click="clickImgVideo">点击选择图片和视频</el-button>
                <div v-else>
                    <img
                        width="200"
                        v-show="this.isShow == true"
                        height="200"
                        :src="this.addproduct.productUrl"
                    />
                    <video
                        ref="videoPlayer"
                        width="300"
                        height="148"
                        controls
                        v-show="this.isShow == false"
                        controlslist="nodownload"
                        :src="this.addproduct.productUrl"
                        class="video"
                    ></video>
                </div>
            </el-form-item>
            <el-form-item label="产品描述:" prop="title" label-width="230px">
                <el-input
                    v-model="addproduct.title"
                    type="textarea"
                    maxlength="100"
                    show-word-limit
                    class="input"
                    placeholder="输入产品案例标题"
                ></el-input>
            </el-form-item>
        </el-form>
        <div class="product">
            <el-button @click="baocunproductCase" class="baocun">保存</el-button>
        </div>
        <el-dialog title="选择图片或者视频" :visible.sync="dialogVisible">
            <div>
                <div class="imgURl">图片</div>
                <el-upload
                    class="avatar-uploader"
                    :action="action"
                    list-type="picture-card"
                    :on-change="changeUpload"
                    :auto-upload="true"
                    :show-file-list="false"
                    :on-success="fmSuccess"
                    ref="uploadimg"
                >
                    <img width="100%" height="100%" v-if="imgUrl" :src="imgUrl" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div>
                <div class="imgURl">视频</div>
                <el-upload
                    class="avatar-uploader"
                    :action="viderU"
                    list-type="picture-card"
                    :on-change="changeUpload"
                    :auto-upload="true"
                    :show-file-list="false"
                    :on-success="videoSuccess"
                    ref="uploadimg"
                >
                    <video
                        ref="videoPlayer"
                        width="300"
                        height="148"
                        controls
                        controlslist="nodownload"
                        :src="this.videoUrlss"
                        class="video"
                        v-if="this.videoUrlss != ''"
                    ></video>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'addProductCase',
    data() {
        return {
            isShow: false,
            action: localStorage.getItem('actionUrl'),
            viderU: localStorage.getItem('videoUrl'),
            dialogVisible: false,
            addproduct: {
                title: '',
                productUrl: ''
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: '请输入案例标题',
                        trigger: 'blur'
                    }
                ],
                productUrl: [
                    {
                        required: true,
                        message: '请选择图片或视频',
                        trigger: 'blur'
                    }
                ]
            },
            imgUrl: '',
            videoUrlss: '',
            loadingupload: false,
            imgVideoUrl: ''
        };
    },
    mounted() {},
    methods: {
        clickImgVideo() {
            this.dialogVisible = true;
        },
        changeUpload(file, fileLsit) {
            const aaas = /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/;
            if (aaas.test(file.name)) {
                this.imgUrl = file.url;
                this.videoUrlss = '';
            } else {
                this.videoUrlss = file.url;
                this.imgUrl = '';
            }
            this.addproduct.file = file;
        },
        fmSuccess(response, file, fileLsit) {
            if (response.code == 200) {
                this.addproduct.productUrl = localStorage.getItem('imgUrl') + response.data;
                this.imgVideoUrl = response.data;
                this.isShow = true;
                this.dialogVisible = false;
            } else {
                this.$message({
                    showClose: true,
                    message: '图片上传失败',
                    type: 'error'
                });
                this.imgUrl = '';
            }
        },
        videoSuccess(response, file, fileLsit) {
            if (response.code == 200) {
                this.addproduct.productUrl = localStorage.getItem('imgUrl') + response.data;
                this.imgVideoUrl = response.data;
                this.isShow = false;
                this.dialogVisible = false;
            } else {
                this.$message({
                    showClose: true,
                    message: '视频上传失败',
                    type: 'error'
                });
                this.videoUrlss = '';
            }
        },
        baocunproductCase() {
            this.$refs.addproduct.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定添加产品案例【 ' + this.addproduct.title + '】', '温馨提示', {
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
                        let datalist = {
                            companyId: parseInt(localStorage.getItem('loginData')),
                            image: this.imgVideoUrl,
                            title: this.addproduct.title
                        };
                        this.$axios.post('api/partner/add/company/server', datalist).then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (data.code == 200) {
                                    this.$message({
                                        showClose: true,
                                        message: data.msg,
                                        type: 'success'
                                    });
                                    this.$router.push({
                                        path: './productCase'
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
                    });
                }
            });
        }
    }
};
</script>

<style>
.addProductCase {
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

.addProductCase .input {
    width: 440px;
    height: 100px;
}
.addProductCase .input .el-textarea__inner {
    height: 100px;
}
.imgURl {
    width: 148px;
    text-align: center;
}
.product .baocun {
    width: 90px;
    height: 30px;
    background: #2482d2;
    color: #fff;
    padding: 0;
    margin-left: 30%;
}
.addProductCase .el-dialog__body {
    display: flex;
    justify-content: space-around;
}
</style>
