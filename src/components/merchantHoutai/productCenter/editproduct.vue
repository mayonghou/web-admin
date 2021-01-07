<template>
    <!-- 新增产品预设 -->
    <div class="addproduct" id="addproduct">
        <div class="addproduct-top">填写预设产品信息</div>
        <el-form class="el-form" :model="addproduct" ref="addproduct">
            <el-form-item label="产品名称:" :label-width="labelwdith">
                <el-input class="inputwidth" v-model="addproduct.productName" placeholder="请输入产品名称"></el-input>
            </el-form-item>
            <el-form-item label="产品图片:" :label-width="labelwdith">
                <el-upload
                    :action="action"
                    list-type="picture-card"
                    :on-change="handleChange"
                    :on-remove="handleRemove"
                    :on-success="handleSuccess"
                    accept="image/*"
                    :auto-upload="true"
                    :file-list="listFiel"
                    multiple
                >
                    <!-- <img
                        width="100%"
                        height="100%"
                        v-for="(item, index) in this.addproduct.pic"
                        :src="item"
                        :key="index"
                        class="editimg"
                    />-->
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="产品视频:" :label-width="labelwdith">
                <!-- <el-upload
                    :action="videoUrls"
                    list-type="picture-card"
                    :on-success="handlevideoSuccess"
                    accept="video/*"
                    :auto-upload="true"
                    multiple
                    v-if=" this.videoList == ''"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <video
                    v-else
                    ref="videoPlayer"
                    class="videoPlayer"
                    width="400"
                    height="200"
                    controls
                    controlslist="nodownload"
                    v-for="(item, index) in this.videoList"
                    :key="index"
                    :src="item"
                ></video>-->

                <el-upload
                    list-type="picture-card"
                    :auto-upload="true"
                    :action="videoUrls"
                    accept="video/*"
                    multiple
                    :on-success="handlevideoSuccess"
                    :on-remove="handlevideoRemove"
                >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <video
                            class="el-upload-list__item-thumbnail"
                            controls
                            controlslist="nodownload"
                            :src="file.url"
                        ></video>
                        <span class="el-upload-list__item-actions">
                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handlevideoRemove(file,fileList)"
                            >
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="产品描述:" :label-width="labelwdith">
                <el-input
                    class="inputwidth"
                    v-model="addproduct.productDescribe"
                    type="textarea"
                    placeholder="请输入产品描述"
                ></el-input>
            </el-form-item>
            <el-form-item label="库存:" :label-width="labelwdith">
                <el-input class="inputwidth" v-model="addproduct.stock" placeholder="请输入产品库存"></el-input>
            </el-form-item>
            <el-form-item label="已售:" :label-width="labelwdith">
                <el-input class="inputwidth" v-model="addproduct.sales" placeholder="请输入产品销售量"></el-input>
            </el-form-item>
        </el-form>
        <div class="baocunquxiao">
            <el-button @click="baocunproduct" class="el-btton-text" round>保存</el-button>
            <el-button @click="quxiaoBtn" round>取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'addproduct',
    data() {
        return {
            action: localStorage.getItem('actionUrl'),
            videoUrls: localStorage.getItem('videoUrl'),
            labelwdith: '220px',
            listFiel: [],
            addproduct: {
                productName: '',
                pic: [],
                video: [],
                productDescribe: '',
                stock: '',
                sales: '',
                file: {}
            },
            videoList: [],
            disabled: false,
            imgfileList: []
        };
    },
    mounted() {
        this.getUpdataData();
    },
    methods: {
        handleChange(file, fileList) {
            this.addproduct.pic = file.url;
            this.addproduct.file = file;
            this.imgfileList = fileList;
        },
        handleRemove(file, fileList) {
            if (fileList) {
                let aaa = /\.(png|svg|jpg|gif|woff|woff2|svg|eot|ttf)$/;
                var ddataUrl = [];
                fileList.forEach(function (val, index) {
                    console.log(val);
                    if (aaa.test(val.url)) {
                        ddataUrl[index] = val.url.substring(val.url.lastIndexOf('/images'));
                    }
                });
                this.imgfileList = ddataUrl;
                console.log(this.imgfileList);
            }
        },
        handleSuccess(res, file, fileList) {
            if (res.code == 200) {
                this.imgfileList.push(res.data);
                console.log(this.imgfileList);
                // this.addproduct.pic.push(res.data);
            } else {
                this.$message({
                    showClose: true,
                    message: data.msg,
                    type: 'error'
                });
            }
        },
        // 视频上传回调函数
        handlevideoSuccess(res, file, fileList) {
            if (res.code == 200) {
                this.videoList.push(localStorage.getItem('imgUrl') + res.data);
                this.addproduct.video.push(res.data);
            } else {
                this.$message({
                    showClose: true,
                    message: data.msg,
                    type: 'error'
                });
            }
        },
        handlevideoRemove(file, fileList) {
            console.log(fileList);
        },

        quxiaoBtn() {
            this.$router.push({
                path: './product'
            });
        },
        // 获取要修改的数据
        getUpdataData() {
            this.$axios.get('admin/admin/selectOne?id=' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.addproduct = data.data;
                        var https = /^https:\/\/.+$/;
                        let imgUrr = [];
                        let imgUrllsit = [];
                        data.data.pic.split(',').forEach(function (val, index) {
                            imgUrllsit[index] = val;
                            if (https.test(val) == false) {
                                imgUrr[index] = localStorage.getItem('imgUrl') + val;
                            } else {
                                timgUrr[index] = val;
                            }
                        });
                        this.imgfileList = imgUrr;
                        this.listFiel = imgUrr.map((i) => {
                            var obj = {};
                            obj.url = i;
                            return obj;
                        });
                        this.addproduct.pic = imgUrr;
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
        },
        baocunproduct() {
            this.$confirm('是否确定修改预设产品【 ' + this.addproduct.name + '】', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var data = {
                    productName: this.addproduct.name,
                    pic: this.addproduct.pic.join(','),
                    video: this.addproduct.video.join(','),
                    productDescribe: this.addproduct.describe,
                    id: 0,
                    stock: this.addproduct.stock,
                    sales: this.addproduct.sales
                };
                const loading = this.$loading({
                    lock: true,
                    text: '修改中 ...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.post('admin/admin/addPreinstallProduct', data).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './product'
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
            });
        }
    }
};
</script>


<style>
.addproduct {
    box-sizing: border-box;
    padding: 20px;
}
.addproduct-top {
    font-size: 16px;
    color: #101010;
    font-family: SourceHanSansSC-regular;
}
.addproduct .el-form {
    margin-top: 20px;
}
.el-form .inputwidth {
    width: 40%;
}
.el-form .inputwidth .el-textarea__inner {
    height: 200px;
}
.addproduct .el-form .avatar-uploader .el-upload {
    width: 140px;
    height: 140px;
}
.videoPlayer {
    margin-left: 10px;
}
.videoPlayer:nth-child(1) {
    margin-left: 0;
}
.baocunquxiao {
    width: 100%;
    margin-left: 25%;
    margin-top: 20px;
}
.baocunquxiao .el-btton-text {
    background: #38a28a;
    color: #fff;
    height: 32px;
    width: 100px;
    padding: 0 10px;
}
.el-upload .editimg {
    width: 100%;
}
.editimg {
    /* display: inline-block; */
    margin-left: 20px;
    float: left;
}
.editimg:nth-child(1) {
    margin-left: 0;
}
</style>
