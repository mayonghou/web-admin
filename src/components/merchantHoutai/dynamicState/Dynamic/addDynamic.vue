<template>
    <div class="addDynamic" id="addDynamic">
        <div class="addDynamic-top">
            <label style="margin-left: 20px">填写发布的图文动态信息</label>
        </div>
        <el-form :model="forData" :rules="rules" ref="forData">
            <el-form-item label="动态详情:" prop="dynamicDetial" :label-width="labelwidth">
                <el-input
                    v-model="forData.dynamicDetial"
                    type="textarea"
                    class="textarea"
                    placeholder="请输入动态详情"
                    maxlength="200"
                    :show-word-limit="true"
                ></el-input>
            </el-form-item>
            <el-form-item label prop="dynamicImg" :label-width="labelwidth">
                <label>{{this.length + '/5'}}</label>
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
                >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div class="btnbellBtn">
            <el-button @click="btnfabu" class="btndds">发布</el-button>
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
            forData: {
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
                ],
                dynamicImg: [
                    {
                        required: true,
                        message: '动态图片不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            imgUrl: [],
            loading: '',
            imgList: [],
            length: 0
        };
    },
    mounted() {},
    methods: {
        changeUpload(file, fileList) {
            this.forData.dynamicImg = file.url;
            this.forData.file = file;
            this.imgList = fileList;
            this.length = fileList.length;
        },
        removeUpload(file, fileList) {
            this.imgList = fileList;
            this.length = fileList.length;
        },
        fmSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.imgUrl.push(response.data || '');
                this.length = this.imgUrl.length;
                if (this.imgUrl.length >= this.imgList.length) {
                    let data = {
                        details: this.forData.dynamicDetial,
                        type: 2,
                        url: this.imgUrl.join(',')
                    };
                    this.$axios.post('admin/admin/company/insertDynamic', data).then((res) => {
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
                                    path: './dynamicState'
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
                }
            }
        },
        btnfabu() {
            this.$refs.forData.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定发布图文动态?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.loading = this.$loading({
                            lock: true,
                            text: '发布中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.$refs.uploadimg.submit();
                    });
                }
            });
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
    width: 100%;
    height: 45px;
    background-color: #fafbfa;
    margin-bottom: 30px;
    line-height: 45px;
}
.addDynamic .el-form-item__label {
    text-align: right;
}
.textarea {
    width: 750px;
}
.el-textarea__inner {
    height: 250px;
}
.btnbellBtn {
    width: 100%;
    text-align: center;
}
.btnbellBtn .btndds {
    width: 90px;
    height: 30px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
}
</style>
