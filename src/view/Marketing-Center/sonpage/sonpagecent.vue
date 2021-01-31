<template>
    <div>
        <div class="loaynClassd fister">
            <Input
                v-model="value"
                placeholder="请输入查询条件..."
                style="width: 200px ;margin-right:10px"
            />
            <Button type="primary" @click="queryData">查询</Button>
        </div>
        <div class="loaynClassd secondClass">
            <navtable :LayoutDatafa="LayoutDatafa" :ProjectDatafa="ProjectDatafa"></navtable>
        </div>
        <div class="pageClassd">
            <Page
                :total="total"
                :page-size="limit"
                :page-size-opts="[10,20,30,40]"
                @on-change="PageChanges"
                @on-page-size-change="TotalChanges"
                size="small"
                show-total
                show-elevator
                show-sizer
                class-name="ClassName"
            />
        </div>
    </div>
</template>

<script>
import navtable from '../../conponents/table/navtable/navtable.vue';
export default {
    data() {
        return {
            value: '',
            total: 0,
            limit: 10,
            page: 1,
            // 布局（不能改动）
            LayoutDatafa: [],
            // 项目数据（不能改动）
            ProjectDatafa: [],
            // 数据分发（备注：布局数据不能清空）
            // 布局=>0时 ----> 布局------>视频
            LayoutDatafa0: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    width: 80,
                    slot: 'solt1',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '视频名称',
                    key: 'solt2',
                    align: 'center'
                },
                {
                    title: '视频',
                    key: 'solt3',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'div',
                            {
                                attrs: {
                                    style: 'width:100%; height: auto;display:block;padding-top:15px;padding-bottom: 15px;'
                                }
                            },
                            [
                                h('video', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    attrs: {
                                        src: params.row.solt3,
                                        style: 'width:100%; height: auto;'
                                    }
                                })
                            ]
                        );
                    }
                },
                {
                    title: '视频描述',
                    key: 'solt4',
                    align: 'center'
                },
                {
                    title: '视频分类',
                    key: 'solt5',
                    align: 'center'
                },
                {
                    title: '获赞',
                    key: 'solt6',
                    align: 'center'
                },
                {
                    title: '添加时间',
                    key: 'solt7',
                    align: 'center'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 160,
                    align: 'center'
                }
            ],
            // 布局=>1时 ----> 布局------>图片
            LayoutDatafa1: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    width: 80,
                    slot: 'solt1',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '图片名称',
                    key: 'solt2',
                    align: 'center'
                },
                {
                    title: '图片',
                    key: 'solt3',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'div',
                            {
                                attrs: {
                                    style: 'width:100%; height: auto;display:block;padding-top:15px;padding-bottom: 15px;'
                                }
                            },
                            [
                                h('img', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    attrs: {
                                        src: params.row.solt3,
                                        style: 'width:100%; height: auto;'
                                    }
                                })
                            ]
                        );
                    }
                },
                {
                    title: '图片分类',
                    key: 'solt4',
                    align: 'center'
                },
                {
                    title: '获赞',
                    key: 'solt5',
                    align: 'center'
                },
                {
                    title: '添加时间',
                    key: 'solt6',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 160,
                    align: 'center'
                }
            ],
            // 布局=>2时 ----> 布局------>文档
            LayoutDatafa2: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    width: 80,
                    slot: 'solt1',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '文档名称',
                    key: 'solt2',
                    align: 'center'
                },
                {
                    title: '文档',
                    key: 'solt3',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'div',
                            {
                                attrs: {
                                    style: 'width:100%; height: auto;display:block;padding-top:15px;padding-bottom: 15px;'
                                }
                            },
                            [
                                h('img', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    attrs: {
                                        src: params.row.solt3,
                                        style: 'width:100%; height: auto;'
                                    }
                                })
                            ]
                        );
                    }
                },
                {
                    title: '文档分类',
                    key: 'solt4',
                    align: 'center'
                },
                {
                    title: '获赞',
                    key: 'solt5',
                    align: 'center'
                },
                {
                    title: '添加时间',
                    key: 'solt6',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 160,
                    align: 'center'
                }
            ],
            // 布局=>4时 ----> 布局------>活动通知
            LayoutDatafa4: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    width: 80,
                    slot: 'solt1',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '活动标题',
                    key: 'solt2',
                    align: 'center'
                },
                {
                    title: '浏览量',
                    key: 'solt3',
                    align: 'center'
                },
                {
                    title: '发布时间',
                    key: 'solt4',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 220,
                    align: 'center'
                }
            ],
            // 布局=>3时 ----> 布局------>营销小知识
            LayoutDatafa3: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    width: 80,
                    slot: 'solt1',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '文章标题',
                    key: 'solt2',
                    align: 'center'
                },
                {
                    title: '浏览量',
                    key: 'solt3',
                    align: 'center'
                },
                {
                    title: '发布时间',
                    key: 'solt4',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 220,
                    align: 'center'
                }
            ],
            // 数据分发（备注：项目数据可以能清空，清空后显示暂无数据）
            // 项目数据=>0时------>视频
            ProjectDatafa0: [
                {
                    solt1: '1',
                    solt2: '2',
                    solt3: '3',
                    solt4: '4',
                    solt5: '5',
                    solt6: '6',
                    solt7: '7'
                }
            ],
            // 项目数据=>1时------>图片
            ProjectDatafa1: [
                {
                    solt1: '1',
                    solt2: '2',
                    solt3: '3',
                    solt4: '4',
                    solt5: '5',
                    solt6: '6'
                }
            ],
            // 项目数据=>2时------>文档
            ProjectDatafa2: [
                {
                    solt1: '1',
                    solt2: '2',
                    solt3: '3',
                    solt4: '4',
                    solt5: '5',
                    solt6: '6'
                }
            ],
            // 项目数据=>3时------>营销小知识
            ProjectDatafa3: [
                {
                    solt1: '1',
                    solt2: '2',
                    solt3: '3',
                    solt4: '4'
                }
            ],
            // 项目数据=>4时------>活动通知
            ProjectDatafa4: [
                {
                    solt1: '1',
                    solt2: '2',
                    solt3: '3',
                    solt4: '4'
                }
            ]
        };
    },
    watch: {
        ProjectDatafa0: {
            handler(newName) {
                this.ProjectDatafa = newName;
            },
            deep: true,
            immediate: true
        },
        ProjectDatafa1: {
            handler(newName) {
                this.ProjectDatafa = newName;
            },
            deep: true,
            immediate: true
        },
        ProjectDatafa2: {
            handler(newName) {
                this.ProjectDatafa = newName;
            },
            deep: true,
            immediate: true
        },
        ProjectDatafa3: {
            handler(newName) {
                this.ProjectDatafa = newName;
            },
            deep: true,
            immediate: true
        },
        ProjectDatafa4: {
            handler(newName) {
                this.ProjectDatafa = newName;
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        this.PageRengderfn();
    },
    mounted() {
        let statusdata = this.$route.query.ineryuer;
        if (statusdata == 0) {
            this.getVideoList();
        } else if (statusdata == 1) {
            this.getImgList();
        } else if (statusdata == 2) {
            this.getDocument();
        } else if (statusdata == 3) {
            this.getSelectAllMarketKnowledge();
        } else if (statusdata == 4) {
            this.getSelectAllMarketActivity();
        } else if (statusdata == 5) {
        }
    },

    methods: {
        // 页面渲染
        PageRengderfn() {
            const Serial = parseInt(this.$route.query.ineryuer);
            if (Serial == 0) {
                this.LayoutDatafa = this.LayoutDatafa0;
                this.ProjectDatafa = this.ProjectDatafa0;
            } else if (Serial == 1) {
                this.LayoutDatafa = this.LayoutDatafa1;
                this.ProjectDatafa = this.ProjectDatafa1;
            } else if (Serial == 2) {
                this.LayoutDatafa = this.LayoutDatafa2;
                this.ProjectDatafa = this.ProjectDatafa2;
            } else if (Serial == 3) {
                this.LayoutDatafa = this.LayoutDatafa3;
                this.ProjectDatafa = this.ProjectDatafa3;
            } else if (Serial == 4) {
                this.LayoutDatafa = this.LayoutDatafa4;
                this.ProjectDatafa = this.ProjectDatafa4;
            } else if (Serial == 5) {
                this.LayoutDatafa = this.LayoutDatafa5;
                this.ProjectDatafa = this.ProjectDatafa5;
            } else if (Serial == 6) {
                this.LayoutDatafa = this.LayoutDatafa6;
                this.ProjectDatafa = this.ProjectDatafa6;
            }
        },
        // 查询按钮
        queryData() {
            const Serial = parseInt(this.$route.query.ineryuer);
            if (Serial == 0) {
                this.page = 1;
                this.getVideoList();
            } else if (Serial == 1) {
                this.page = 1;
                this.getImgList();
            } else if (Serial == 2) {
                this.page = 1;
                this.getDocument();
            } else if (Serial == 3) {
                this.page = 1;
                this.getSelectAllMarketKnowledge();
            } else if (Serial == 4) {
                this.page = 1;
                getSelectAllMarketActivity();
            }
        }, // 分页
        PageChanges(val) {
            const serial = parseInt(this.$route.query.ineryuer);
            if (serial == 0) {
                this.page = val;
                this.getVideoList();
            } else if (serial == 1) {
                this.page = val;
                this.getImgList();
            } else if (serial == 2) {
                this.page = val;
                this.getDocument();
            } else if (serial == 3) {
                this.page = val;
                this.getSelectAllMarketKnowledge();
            } else if (serial == 4) {
                this.page = val;
                getSelectAllMarketActivity();
            }
        },
        TotalChanges(val) {
            const serial = parseInt(this.$route.query.ineryuer);
            if (serial == 0) {
                this.limit = val;
                this.getVideoList();
            } else if (serial == 1) {
                this.limit = val;
                this.getImgList();
            } else if (serial == 2) {
                this.limit = val;
                this.getDocument();
            } else if (serial == 3) {
                this.limit = val;
                this.getSelectAllMarketKnowledge();
            } else if (serial == 4) {
                this.limit = val;
                this.getSelectAllMarketActivity();
            }
        },
        // 获取视频数据
        getVideoList() {
            let data = '?page=' + this.page + '&limit=' + this.limit + '&search=' + this.value;
            this.$axios.get('admin/admin/market/video/selectAllMarketVideo' + data).then((res) => {
                if (res.status == 200) {
                    let datals = res.data;
                    if (datals.code == 200) {
                        let datalistVideo = [];
                        var https = /^https:\/\/.+$/;
                        datals.data.data.forEach(function (val, index) {
                            datalistVideo[index] = val;
                            datalistVideo[index].solt2 = val.videoName;
                            if (val.videoUrl) {
                                if (https.test(val.videoUrl)) {
                                    datalistVideo[index].solt3 = val.videoUrl;
                                } else {
                                    datalistVideo[index].solt3 = localStorage.getItem('imgUrl') + val.videoUrl;
                                }
                            }
                            datalistVideo[index].solt4 = val.videoDescribe;
                            datalistVideo[index].solt5 = val.videoType;
                            datalistVideo[index].solt6 = val.zan;
                            datalistVideo[index].solt7 = val.createTime;
                        });
                        this.$nextTick(() => {
                            this.ProjectDatafa0 = datalistVideo;
                            this.total = datals.data.total;
                        });
                    }
                }
            });
        },
        // 获取图片数据
        getImgList() {
            let data = '?page=' + this.page + '&limit=' + this.limit + '&search=' + this.value;
            this.$axios.get('admin/admin/market/picture/selectAllMarketPicture' + data).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let datalistimg = [];
                        var https = /^https:\/\/.+$/;
                        data.data.data.forEach(function (val, index) {
                            datalistimg[index] = val;
                            datalistimg[index].solt2 = val.pictureName;
                            if (val.pictureUrl) {
                                if (https.test(val.pictureUrl)) {
                                    datalistimg[index].solt3 = val.pictureUrl;
                                } else {
                                    datalistimg[index].solt3 = localStorage.getItem('imgUrl') + val.pictureUrl;
                                }
                            }
                            datalistimg[index].solt4 = val.pictureType;
                            datalistimg[index].solt5 = val.zan;
                            datalistimg[index].solt6 = val.createTime;
                        });
                        this.$nextTick(() => {
                            this.total = data.data.total;
                            this.ProjectDatafa1 = datalistimg;
                        });
                    }
                }
            });
        },
        // 获取文档数据
        getDocument() {
            let data = '?page=' + this.page + '&limit=' + this.limit + '&search=' + this.value;
            this.$axios.get('admin/admin/market/file/selectAllMarketFile' + data).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let datalistimg = [];
                        var https = /^https:\/\/.+$/;
                        data.data.data.forEach(function (val, index) {
                            datalistimg[index] = val;
                            datalistimg[index].solt2 = val.fileName;
                            if (val.filePic) {
                                if (https.test(val.filePic)) {
                                    datalistimg[index].solt3 = val.filePic;
                                } else {
                                    datalistimg[index].solt3 = localStorage.getItem('imgUrl') + val.filePic;
                                }
                            }
                            datalistimg[index].solt4 = val.fileType;
                            datalistimg[index].solt5 = val.zan;
                            datalistimg[index].solt6 = val.createTime;
                        });
                        this.total = data.data.total;
                        console.log(datalistimg);
                        this.$nextTick(() => {
                            this.ProjectDatafa2 = datalistimg;
                        });
                    }
                }
            });
        },
        // 获取营销小知识
        getSelectAllMarketKnowledge() {
            let data = '?page=' + this.page + '&limit=' + this.limit + '&search=' + this.value;
            this.$axios.get('admin/admin/market/knowledge/selectAllMarketKnowledge' + data).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let datalistimg = [];
                        var https = /^https:\/\/.+$/;
                        data.data.data.forEach(function (val, index) {
                            datalistimg[index] = val;
                            datalistimg[index].solt2 = val.title;
                            datalistimg[index].solt3 = val.browse;
                            datalistimg[index].solt4 = val.pushTime;
                        });
                        this.total = data.data.total;
                        this.$nextTick(() => {
                            this.ProjectDatafa3 = datalistimg;
                        });
                    }
                }
            });
        },
        // 获取活动数据
        getSelectAllMarketActivity() {
            let data = '?page=' + this.page + '&limit=' + this.limit + '&search=' + this.value;
            this.$axios.get('admin/admin/market/activity/selectAllMarketActivity' + data).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let datalistimg = [];
                        var https = /^https:\/\/.+$/;
                        data.data.data.forEach(function (val, index) {
                            datalistimg[index] = val;
                            datalistimg[index].solt2 = val.title;
                            datalistimg[index].solt3 = val.browse;
                            datalistimg[index].solt4 = val.pushTime;
                        });
                        this.total = data.data.total;
                        this.$nextTick(() => {
                            this.ProjectDatafa3 = datalistimg;
                        });
                    }
                }
            });
        },
        // 删除单条数据
        deteleData(row) {
            const serial = parseInt(this.$route.query.ineryuer);
            if (serial == 0) {
                // 视频删除
                this.$axios.get('admin/admin/market/video/delete/' + row.id).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getVideoList();
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
            } else if (serial == 1) {
                // 图片删除
                this.$axios.get('admin/admin/market/picture/delete/' + row.id).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getImgList();
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
            } else if (serial == 2) {
                // 文档删除
                this.$axios.get('admin/admin/market/file/delete/' + row.id).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getDocument();
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
            } else if (serial == 3) {
                // 删除营销小知识
                this.$axios.get('admin/admin/market/knowledge/delete/' + row.id).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getSelectAllMarketKnowledge();
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
            } else if (serial == 4) {
                //删除活动
                this.$axios.get('admin/admin/market/activity/delete/' + row.id).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getSelectAllMarketActivity();
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
        },
        // 删除多条数据
        deteleDataAlls(ids) {
            const serial = parseInt(this.$route.query.ineryuer);
            if (serial == 0) {
                // 视频删除
                this.$axios.get('admin/admin/market/video/delete/' + ids).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getVideoList();
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
            } else if (serial == 1) {
                // 图片删除
                this.$axios.get('admin/admin/market/picture/delete/' + ids).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getImgList();
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
            } else if (serial == 2) {
                // 文档删除
                this.$axios.get('admin/admin/market/file/delete/' + ids).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getDocument();
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
            } else if (serial == 3) {
                // 删除营销小知识
                this.$axios.get('admin/admin/market/knowledge/delete/' + ids).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getSelectAllMarketKnowledge();
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
            } else if (serial == 4) {
                //删除活动
                this.$axios.get('admin/admin/market/activity/delete/' + ids).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getSelectAllMarketActivity();
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
    },
    components: {
        navtable
    }
};
</script>

<style scope="this api replaced by slot-scope in 2.5.0+">
.loaynClassd {
    padding: 20px;
}
.fister {
    margin-top: 40px;
}
.secondClass {
    padding: 0 20px;
}
.pageClassd {
    padding: 20px;
    text-align: center;
    margin-bottom: 60px;
}
</style>