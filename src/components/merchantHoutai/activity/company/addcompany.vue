<template>
    <div class="addActivity" id="addActivityflashSale">
        <div class="addActivity-top">
            <label>填写发布的企业活动信息</label>
        </div>
        <el-form :model="addActivitydata" :rules="rules" ref="addActivitydata">
            <el-form-item label="活动标题:" prop="activityTitle" :label-width="labelwidth">
                <el-input
                    class="ElinputT"
                    placeholder="请输入活动的标题"
                    v-model="addActivitydata.activityTitle"
                ></el-input>
            </el-form-item>
            <el-form-item label="活动图片:" prop="activityImg" :label-width="labelwidth">
                <label style="color: #A4A4A4; display: block;">（轮播图展示）</label>
                <label style="text-align: right;">{{this.number || 0}}/5</label>
                <el-upload
                    class="avatar-uploader"
                    accept="image/*"
                    :action="action"
                    list-type="picture-card"
                    :auto-upload="true"
                    :on-change="changeUpload"
                    :file-list="fileList"
                    :on-success="fmSuccess"
                    :on-remove="handleRemove"
                    :limit="5"
                    ref="uploadfm"
                    multiple
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="活动详情:" prop="activityDetail" :label-width="labelwidth">
                <el-upload
                    :with-credentials="true"
                    multiple
                    class="quill-upload"
                    :action="action"
                    style="display: none;width:0"
                    :show-file-list="false"
                    accept="image/*"
                    :on-success="success"
                    :before-upload="beforeAvatarUpload"
                >
                    <i class="el-icon-upload"></i>
                </el-upload>
                <quill-editor
                    ref="myQuillEditor"
                    :content="content"
                    v-model="addActivitydata.activityDetail"
                    :options="editorOption"
                ></quill-editor>
            </el-form-item>
        </el-form>
        <div class="addactivityBtn ss">
            <el-button @click="addCompanyActivit" class="buttonr">发布</el-button>
        </div>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'addActivityflashSale',
    data() {
        const toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction

            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ['image'],
            ['clean'] // remove formatting button
        ];
        return {
            content: ``,
            labelwidth: '230px',
            action: localStorage.getItem('actionUrl'),
            editorOption: {
                placeholder: '请输入内容',
                modules: {
                    toolbar: {
                        container: toolbarOptions,
                        handlers: {
                            // 重写点击组件上的图片按钮要执行的代码
                            image: function (value) {
                                document.querySelector('.quill-upload .el-icon-upload').click();
                            }
                        }
                    }
                }
            },
            loading: '',
            fileList: [],
            addActivitydata: {
                id: '',
                activityTitle: '',
                activityImg: [],
                activityDetail: '',
                file: {}
            },
            rules: {
                activityTitle: [
                    {
                        required: true,
                        message: '请输入活动标题',
                        trigger: 'blur'
                    }
                ],
                activityImg: [
                    {
                        required: true,
                        message: '请选择图片',
                        trigger: 'blur'
                    }
                ],
                activityDetail: [
                    {
                        required: true,
                        message: '请输入详情',
                        trigger: 'blur'
                    }
                ]
            },
            imgList: [],
            imgUrl: [],
            number: ''
        };
    },
    watch: {
        serviceUrl(val) {
            this.serviceUrl = val;
        },
        getHeader(val) {
            this.getHeader = val;
        },
        editorData(val) {
            this.$emit('getEditorData', this.editorData);
        },
        content(val) {
            this.content = val;
        }
    },
    mounted() {
        this.getlowerData();
    },
    methods: {
        beforeAvatarUpload(file) {
            this.$emit('beforeAvatarUpload', file);
        },
        success(res, file, fileList) {
            // res为图片服务器返回的数据
            // 获取富文本组件实例
            let quill = this.$refs.myQuillEditor.quill;
            // 如果上传成功
            if (res.code == 200) {
                // 获取光标所在位置
                const pos = quill.selection.savedRange.index; //这个得注意下，网上很多都是不对的
                // 插入图片到光标位置
                quill.insertEmbed(pos, 'image', localStorage.getItem('imgUrl') + res.data);
                // 调整光标到最后
                quill.setSelection(length + 1);
            }
            // loading动画消失
            this.quillUpdateImg = false;
        },
        changeUpload(file, fileList) {
            this.addActivitydata.activityImg = file.url;
            this.addActivitydata.file = file;
            this.imgList = fileList;
            this.number = fileList.length;
        },
        handleRemove(file, fileList) {
            if (fileList) {
                var ddd = [];
                fileList.forEach(function (val, index) {
                    ddd[index] = val.url.substring(val.url.lastIndexOf('/image'));
                });
                this.imgUrl = ddd;
            }
            this.number = fileList.length;
        },
        fmSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.imgUrl.push(response.data);
            }
        },
        addCompanyActivit() {
            this.fileList.forEach((item) => {
                this.addActivitydata.activityImg = item.url;
            });
            this.$refs.addActivitydata.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定发布【' + this.addActivitydata.activityTitle + '】商品?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const loading = this.$loading({
                            lock: true,
                            text: '发布中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        let data = {
                            albumPics: this.imgUrl.join(','),
                            companyId: parseInt(localStorage.getItem('loginData')),
                            detailHtml: this.addActivitydata.activityDetail,
                            industryId: parseInt(localStorage.getItem('industryId')),
                            title: this.addActivitydata.activityTitle,
                            id: this.addActivitydata.id
                        };
                        this.$axios.post('admin/company/activity/company/publish', data).then((res) => {
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
                                        path: './company'
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
                                    message: data.msg,
                                    type: 'error'
                                });
                            }
                        });
                    });
                }
            });
        },

        // 获取重新发布的数据
        getlowerData() {
            var data = this.$route.query.data;
            if (data != undefined) {
                this.addActivitydata.activityTitle = data.title;
                this.addActivitydata.activityDetail = data.detailHtml;
                this.addActivitydata.id = data.id;
                data.albumPics.split(',').forEach((item) => {
                    this.fileList.push({
                        url: localStorage.getItem('imgUrl') + item
                    });
                });
                this.imgUrl = data.albumPics.split(',');
                this.number = this.imgUrl.length;
            }
        }
    }
};
</script>

<style>
.addActivity {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}

.addActivity .addActivity-top {
    padding-left: 20px;
    height: 45px;
    background-color: #fafbfa;
    line-height: 45px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.addActivity .shoppXuanzhe {
    width: 80px;
    height: 20px;
    padding: 0;
    background-color: #2450d2;
    color: #fff;
    margin-top: 8px;
    border-radius: 8px;
}

.addActivity .el-form-item__label {
    text-align: right;
}

.addActivity .btoun {
    border: 1px solid #2494d2;
    color: #2494d2;
    width: 200px;
    height: 50px;
}

.iconEnlorder {
    position: relative;
}

.iconEnlorder .iconfont {
    position: absolute;
    right: 80px;
    top: -64px;
}

.goodsSeacher {
    width: 350px;
    height: 45px;
    background-color: #faffe0;
    margin: 0 auto;
    margin-bottom: 25px;
    position: relative;
    line-height: 30px;
}

.icon {
    position: absolute;
    z-index: 1;
    top: 17px;
    left: 10px;
}

.addActivity .el-input {
    margin-top: 7px;
    margin-left: 10px;
    /* width: 290px; */
    height: 30px;
    border: 0px;
}

.seacher {
    margin-left: 10px;
}

.eltag {
    margin-left: 10px;
}

.addActivity .ElinputT .el-input__inner {
    width: 340px;
    border: 0;
    border-bottom: 1px solid #c1c1c1;
    border-radius: 0;
}

.textarea {
    width: 400px;
}

.textarea .el-textarea__inner {
    height: 100px;
}

.zhang {
    position: absolute;
    left: 340px;
    top: 10px;
}

.addActivity .el-input__inner {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #c1c1c1;
}

.addactivityBtn.ss {
    margin-left: 30%;
    margin-top: 20px;
}

.addactivityBtn .buttonr {
    width: 90px;
    height: 30px;
    border-radius: 8px;
    background-color: #2450d2;
    color: #fff;
}

.addactivityBtn .buttonr.mL {
    margin-left: 100px;
}

.quill-editor {
    width: 850px;
}

.ql-editor {
    height: 250px;
}

.ql-container .ql-snow {
    height: 250px;
}
.addActivity .img {
    width: 80px;
    height: 80px;
    float: left;
    margin-left: 10px;
}
.ql-editor img {
    width: 150px;
}
</style>
