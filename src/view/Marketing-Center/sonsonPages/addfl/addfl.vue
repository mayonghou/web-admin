<template>
    <div class="rootAop">
        <div class="formClass">
            <h3 class="h3er">填写分类信息</h3>
            <Form :model="formItem" :label-width="120">
                <FormItem label="分类名称">
                    <Input v-model="formItem.name" placeholder="输入分类名称......" style="width:200px" />
                </FormItem>
                <FormItem label="图标">
                    <Upload
                        style="width:200px; height:200px;"
                        type="drag"
                        :action="action"
                        :show-upload-list="false"
                        :on-success="onSuccess"
                    >
                        <div style="padding: 20px 0" v-if="this.imgUrl == ''">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>上传图标</p>
                        </div>
                        <img v-else width="100%" height="100%" :src="this.imgUrl" />
                    </Upload>
                </FormItem>
                <FormItem>
                    <div class="BTNClass">
                        <Button type="primary" @click="saveBtn" v-preventReClick>保存</Button>
                        <Button style="margin-left: 8px" @click="returnClick">取消</Button>
                    </div>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            action: localStorage.getItem('actionUrl'),
            imgUrl: '',
            formItem: {
                name: '',
                id: 0,
                picture: ''
            }
        };
    },
    mounted() {
        if (this.$route.query.status == 0) {
            this.getVideoType();
        } else if (this.$route.query.status == 1) {
            this.getImgType();
        } else if (this.$route.query.status == 2) {
            this.getfileType();
        }
    },
    methods: {
        // 取消按钮
        returnClick() {
            if (this.$route.query.status == 0 || this.$route.query.addstatus == 0) {
                this.$router.push({
                    path: './sonsonPages',
                    query: {
                        query: 0
                    }
                });
            } else if (this.$route.query.status == 1 || this.$route.query.addstatus == 1) {
                this.$router.push({
                    path: './sonsonPages',
                    query: {
                        query: 1
                    }
                });
            } else if (this.$route.query.status == 2 || this.$route.query.addstatus == 2) {
                this.$router.push({
                    path: './sonsonPages',
                    query: {
                        query: 2
                    }
                });
            }
        },
        // 图片上传回调
        onSuccess(res, file, fileList) {
            if (res.code == 200) {
                this.imgUrl = localStorage.getItem('imgUrl') + res.data;
                this.formItem.picture = res.data;
            }
        },
        // 获取视频分类信息
        getVideoType() {
            this.$axios.get('admin/admin/market/picture/type/select/' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.formItem = data.data;
                    }
                }
            });
        },
        // 获取图片分类
        getImgType() {
            this.$axios.get('admin/admin/market/picture/type/select/' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.formItem = data.data;
                    }
                }
            });
        },
        // 获取文档分类
        getfileType() {
            this.$axios.get('admin/admin/market/picture/type/select/' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.formItem = data.data;
                    }
                }
            });
        },
        // 保存按钮
        saveBtn() {
            // 编辑时回调
            if (this.$route.query.status) {
                if (this.$route.query.status == 0) {
                    this.$axios.post('admin/admin/market/video/type/update/VideoType', this.formItem).then((res) => {
                        if (res.status == 200) {
                            let data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: './sonsonPages',
                                    query: {
                                        query: 0
                                    }
                                });
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'error'
                                });
                            }
                        }
                    });
                } else if (this.$route.query.status == 1) {
                    this.$axios.post('admin/admin/market/picture/type/update/PictureType', this.formItem).then((res) => {
                        if (res.status == 200) {
                            let data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: './sonsonPages',
                                    query: {
                                        query: 1
                                    }
                                });
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'error'
                                });
                            }
                        }
                    });
                } else if (this.$route.query.status == 2) {
                    this.$axios.post('admin/admin/market/file/type/update/fileType', this.formItem).then((res) => {
                        if (res.status == 200) {
                            let data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: './sonsonPages',
                                    query: {
                                        query: 2
                                    }
                                });
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'error'
                                });
                            }
                        }
                    });
                }
            }
            if (this.$route.query.addstatus) {
                if (this.$route.query.addstatus == 0) {
                    this.$axios.post('admin/admin/market/video/type/add/VideoType', this.formItem).then((res) => {
                        if (res.status == 200) {
                            let data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: './sonsonPages',
                                    query: {
                                        query: 0
                                    }
                                });
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'error'
                                });
                            }
                        }
                    });
                } else if (this.$route.query.addstatus == 1) {
                    this.$axios.post('admin/admin/market/picture/type/add/PictureType', this.formItem).then((res) => {
                        if (res.status == 200) {
                            let data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: './sonsonPages',
                                    query: {
                                        query: 1
                                    }
                                });
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'error'
                                });
                            }
                        }
                    });
                } else if (this.$route.query.addstatus == 2) {
                    this.$axios.post('admin/admin/market/file/type/add/fileType', this.formItem).then((res) => {
                        if (res.status == 200) {
                            let data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.$router.push({
                                    path: './sonsonPages',
                                    query: {
                                        query: 2
                                    }
                                });
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'error'
                                });
                            }
                        }
                    });
                }
            }
        }
    }
};
</script>

<style scoped>
.rootAop {
    padding: 20px;
}
.h3er {
    padding: 20px;
}
.formClass {
    padding-right: 60px;
}
.BTNClass {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>