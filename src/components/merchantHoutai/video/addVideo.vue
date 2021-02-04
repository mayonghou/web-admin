<template>
    <!-- 添加发布的视频 -->
    <div class="addVideo" id="addvideo">
        <div class="videoTop">
            <label>填写发布的视频</label>
        </div>
        <el-form :model="addvideoData" :rules="rules" ref="addvideoData">
            <el-form-item label="封面: " prop="imgUrl" :label-width="labelWidth">
                <el-upload
                    class="avatar-uploader"
                    accept="image/*"
                    :action="action"
                    list-type="picture-card"
                    :auto-upload="true"
                    :show-file-list="false"
                    :on-change="changeUpload"
                    :on-success="fmSuccess"
                    ref="uploadfm"
                >
                    <img
                        width="100%"
                        height="100%"
                        v-if="addvideoData.imgUrl"
                        :src="addvideoData.imgUrl"
                    />
                    <i v-else class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="视频: " prop="videoUrl" :label-width="labelWidth">
                <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    accept="video/*"
                    :on-success="uploadVideoUrl"
                    :auto-upload="true"
                    :show-file-list="false"
                    ref="uploadvideo"
                >
                    <video
                        ref="videoPlayer"
                        width="100%"
                        height="100%"
                        controls
                        controlslist="nodownload"
                        v-if="addvideoData.videoUrl"
                        :src="addvideoData.videoUrl"
                        class="video"
                    ></video>
                    <i v-else style="font-size: 30px;" class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="视频标题: " prop="title" :label-width="labelWidth">
                <el-input class="elInput" v-model="addvideoData.title" placeholder="输入发布的视频标题"></el-input>
            </el-form-item>
            <el-form-item label="关联商品: " prop="cooper" :label-width="labelWidth">
                <label style="display: block;">{{this.addvideoData.cooper}}</label>
                <el-button class="el-icon-circle-plus-outline gunliang" @click="cooperShop">关联商品</el-button>
            </el-form-item>
        </el-form>

        <el-button class="fabushipin" @click="addvideofabvu">发布</el-button>

        <el-dialog title="关联商品" :visible.sync="dialogVisible" width="80%">
            <div class="iconEnlorder" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <div class="goodsSeacher">
                <i class="el-icon-search icon"></i>
                <el-input v-model="goodData"></el-input>
                <el-button @click="seacherdata" type="text" class="seacher">搜索</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%;" border>
                <el-table-column type="selection" width align="center"></el-table-column>
                <el-table-column prop="order" label="序号" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="商品名称" width align="center"></el-table-column>
                <el-table-column prop="price" label="商品售价" align="center">
                    <template slot-scope="scope">
                        <label>{{scope.row.price / 100}}￥</label>
                    </template>
                </el-table-column>
                <el-table-column prop="picture" label="商品封面" align="center">
                    <template slot-scope="scope">
                        <img width="80" height="80" :src="scope.row.picture" />
                    </template>
                </el-table-column>
                <el-table-column prop="no" label="商品货号" align="center"></el-table-column>
                <el-table-column prop="publishAtTime" label="发布时间" align="center"></el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button
                            @click="GLgoods(scope.row)"
                            v-show="scope.row.canBind == true && scope.row.id != shoppId"
                            class="bulebutton"
                            size="small"
                        >选择关联</el-button>
                        <el-button
                            type="text"
                            style="color: #FF8D00;"
                            v-show="scope.row.id == shoppId"
                            size="small"
                        >当前关联</el-button>
                        <el-button
                            type="text"
                            style="color: #FF8D00;"
                            v-show="scope.row.canBind == false"
                            size="small"
                        >已关联</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pagintion"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="counts"
            ></el-pagination>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'addvideo',
    data() {
        return {
            action: localStorage.getItem('actionUrl'),
            uploadUrl: localStorage.getItem('videoUrl'),
            labelWidth: '220px',
            dialogVisible: false,
            fullscreen: '',
            addvideoData: {
                id: '',
                imgUrl: '',
                videoUrl: '',
                title: '',
                cooper: '',
                file: ''
            },
            rules: {
                imgUrl: [
                    {
                        required: true,
                        message: '请选择视频封面',
                        trigger: 'blur'
                    }
                ],
                videoUrl: [
                    {
                        required: true,
                        message: '请选择视频',
                        trigger: 'blur'
                    }
                ],
                title: [
                    {
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }
                ],
                cooper: [
                    {
                        required: true,
                        message: '请选择商品',
                        trigger: 'blur'
                    }
                ]
            },
            page: 1,
            limit: 10,
            counts: this.counts,
            goodData: '',
            tableData: [],
            shoppId: [],
            videoUrldata: '',
            imgUrlData: ''
        };
    },
    mounted() {},
    methods: {
        // 关联商品按钮
        cooperShop() {
            this.dialogVisible = true;
            this.psotproductAll();
        },
        changeUpload(file, fileList) {
            this.addvideoData.imgUrl = file.url;
            this.addvideoData.file = file;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 团片上传成功的回调
        fmSuccess(response, file, filelist) {
            if (response.code == 200) {
                this.imgUrlData = response.data;
            }
        },
        // 视频上传成功的回调
        uploadVideoUrl(response, file, filelist) {
            if (response.code == 200) {
                this.videoUrldata = response.data;
                this.addvideoData.videoUrl = localStorage.getItem('imgUrl') + response.data;
            }
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.psotproductAll();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.psotproductAll();
        },
        // 弹框  搜索商品
        psotproductAll() {
            var data = {
                companyId: localStorage.getItem('loginData'),
                limit: this.limit,
                page: this.page,
                productNameLike: this.goodData
            };
            this.$axios.post('admin/company/activity/all/list_product', data).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var list = [];
                        data.list.forEach(function (val, index) {
                            list[index] = val;
                            list[index].picture = localStorage.getItem('imgUrl') + val.picture;
                        });
                        this.tableData = list;
                        this.counts = data.total;
                        console.log(data.total);
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
        // 选择关联
        GLgoods(row) {
            this.addvideoData.cooper = row.name;
            this.shoppId = row.id;
            this.dialogVisible = false;
        },
        seacherdata() {
            this.page = 1;
            this.psotproductAll();
        },
        // 全屏
        enlarge() {},
        //发布视频
        addvideofabvu() {
            this.$refs.addvideoData.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定发布标题为【' + this.addvideoData.title + '】的视频?', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let data = {
                            coverUrl: this.imgUrlData,
                            contentUrl: this.videoUrldata,
                            industryId: parseInt(localStorage.getItem('industryId')),
                            republish: false,
                            productId: this.shoppId,
                            title: this.addvideoData.title,
                            companyId: parseInt(localStorage.getItem('loginData')),
                            companyName: localStorage.getItem('companyName')
                        };
                        const loading = this.$loading({
                            lock: true,
                            text: '发布中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        this.$axios.post('admin/company/video/publish', data).then((res) => {
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
                                        path: './videoIndex'
                                    });
                                    this.addvideoData.videoUrl = '';
                                    this.$refs.addvideoData.resetFields();
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
        }
    }
};
</script>

<style>
.gunliang {
    border: 1px solid #0000ff;
    color: #0000ff;
}

.addVideo {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}

.videoTop {
    width: 100%;
    height: 45px;
    background-color: #fafafa;
    line-height: 45px;
    padding-left: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
}

.el-upload--text {
    width: 400px;
    height: auto;
    /* min-height: 200px; */
    /* line-height: 200px; */
}
.elInput .el-input__inner {
    width: 250px;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #c1c1c1;
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
    left: 11px;
}

.el-input {
    margin-top: 7px;
    margin-left: 10px;
    width: 290px;
    height: 30px;
    border: 0px;
}

.seacher {
    margin-left: 10px;
}

.iconEnlorder {
    position: relative;
}

.iconfont {
    position: absolute;
    right: 60px;
    top: -65px;
}

.el-table .bulebutton {
    width: 76px;
    height: 20px;
    background-color: #2450d2;
    color: #fff;
    padding: 0;
    border-radius: 8px;
}
.addVideo .fabushipin {
    width: 90px;
    height: 30px;
    margin-left: 35%;
    background-color: #2482d2;
    color: #fff;
    padding: 0;
}
.addVideo .el-form-item__label {
    text-align: right;
}

.el-upload--text {
    width: 400px;
    height: auto;
    min-height: 200px;
    line-height: 200px;
    border: 1px dashed #c0ccda;
}
</style>
