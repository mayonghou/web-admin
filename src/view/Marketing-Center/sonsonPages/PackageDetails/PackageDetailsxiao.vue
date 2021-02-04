<template>
    <div class="rootAop">
        <div class="formClass">
            <h3 class="h3er">填写视频信息</h3>
            <Form :model="formItem" :label-width="120">
                <FormItem label="视频名称">
                    <Input
                        v-model="formItem.videoName"
                        placeholder="输入视频名称......"
                        style="width:200px"
                    />
                </FormItem>
                <FormItem label="视频分类">
                    <Select v-model="formItem.videoType" style="width:200px">
                        <Option
                            v-for="item in videoTypeList"
                            :key="item.id"
                            :value="item.name"
                        >{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="视频封面">
                    <Upload
                        style="width:250px; height:auto;"
                        multiple
                        type="drag"
                        :action="action"
                        :show-upload-list="false"
                        :on-success="imgSuccess"
                    >
                        <div style="padding: 20px 0" v-if="this.imgUrl == ''">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>重新上传</p>
                        </div>
                        <img
                            width="250"
                            height="auto"
                            style="display:block;"
                            v-else
                            :src="this.imgUrl"
                        />
                    </Upload>
                </FormItem>
                <FormItem label="上传视频">
                    <Upload
                        style="width:250px; min-height:120px;height:auto;"
                        multiple
                        type="drag"
                        :action="videoUrls"
                        :show-upload-list="false"
                        :on-success="videoSuccess"
                    >
                        <div style="padding: 20px 0" v-if="this.videoUrl == ''">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                            <p>重新上传</p>
                        </div>
                        <video
                            width="100%"
                            height="auto"
                            controls
                            controlslist="nodownload"
                            v-else
                            :src="this.videoUrl"
                        ></video>
                    </Upload>
                </FormItem>
                <FormItem label="视频描述">
                    <Input
                        style="width:40%"
                        v-model="formItem.videoDescribe"
                        type="textarea"
                        :autosize="{minRows: 10,maxRows: 20}"
                        placeholder="视频描述..."
                    />
                </FormItem>
                <FormItem>
                    <div class="BTNClass">
                        <Button type="primary" @click="saveData">保存</Button>
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
            videoTypeList: [],
            action: localStorage.getItem('actionUrl'),
            videoUrls: localStorage.getItem('videoUrl'),
            imgUrl: '',
            videoUrl: '',
            formItem: {
                id: 0,
                videoName: '',
                videoType: '',
                videoPic: '',
                videoUrl: '',
                videoDescribe: ''
            }
        };
    },
    mounted() {
        this.getVideoType();
        if (this.$route.query.id) {
            this.getVideoDetail();
        }
    },
    methods: {
        returnClick() {
            this.$router.push({
                path: './sonpagecent',
                query: {
                    // queryyu: this.$route.query.qu,
                    ineryuer: 0
                }
            });
        },
        imgSuccess(res, file, fileList) {
            if (res.code == 200) {
                this.imgUrl = localStorage.getItem('imgUrl') + res.data;
                this.formItem.videoPic = res.data;
            }
        },
        videoSuccess(res, file, fileList) {
            if (res.code == 200) {
                this.videoUrl = localStorage.getItem('imgUrl') + res.data;
                this.formItem.videoUrl = res.data;
            }
        },
        // 查询所有视频分类
        getVideoType() {
            this.$axios.get('admin/admin/market/video/type/selectAllMarketVideoType?page=1&paging=false').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.videoTypeList = data.data.data;
                    }
                }
            });
        },
        //查询视频详情拿到编辑的数据
        getVideoDetail() {
            this.$axios.get('admin/admin/market/video/select/' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.formItem = data.data;
                        var https = /^https:\/\/.+$/;
                        if (data.data.videoUrl) {
                            if (https.test(data.videoUrl)) {
                                this.videoUrl = data.data.videoUrl;
                            } else {
                                this.videoUrl = localStorage.getItem('imgUrl') + data.data.videoUrl;
                            }
                        }
                        if (data.data.videoPic) {
                            if (https.test(data.videoPic)) {
                                this.imgUrl = data.data.videoPic;
                            } else {
                                this.imgUrl = localStorage.getItem('imgUrl') + data.data.videoPic;
                            }
                        }
                    }
                }
            });
        },
        // 保存按钮
        saveData() {
            if (this.$route.query.id) {
                this.$axios.post('admin/admin/market/video/update/Video', this.formItem).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './sonpagecent',
                                query: {
                                    // queryyu: this.$route.query.qu,
                                    ineryuer: 0
                                }
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
            } else {
                this.$axios.post('admin/admin/market/video/add/Video', this.formItem).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.$router.push({
                                path: './sonpagecent',
                                query: {
                                    // queryyu: this.$route.query.qu,
                                    ineryuer: 0
                                }
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