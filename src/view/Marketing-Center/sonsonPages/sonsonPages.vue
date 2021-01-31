<template>
    <div>
        <div class="top">
            <Button
                type="error"
                size="small"
                style="margin-left: 5px"
                class="btnClassSty"
                @click="TopDeleteAll2"
                v-preventReClick
            >全部删除</Button>
            <Button
                type="primary"
                size="small"
                style="margin-left: 5px"
                class="btnClassSty"
                @click="TopAddData2"
            >新增分类</Button>
        </div>
        <div class="counts">
            <Table
                border
                :columns="LayoutDataQuery"
                :data="ProjectDataQuery"
                @on-selection-change="selectChange"
            >
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button
                        type="primary"
                        size="small"
                        style="margin-right: 5px"
                        @click="show(row,index)"
                    >编辑</Button>
                    <Button type="error" size="small" @click="remove(row,index)" v-preventReClick>删除</Button>
                </template>
            </Table>
        </div>
        <div class="third">
            <Page
                :total="total"
                :page-size="limit"
                :page-size-opts="[10,20,30,40]"
                @on-change="PageChanges"
                @on-page-size-change="TotalChanges"
                size="small"
                show-elevator
                show-sizer
                show-total
                class-name="ClassName"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            total: 0,
            limit: 10,
            page: 1,
            videoIds: [],
            ImgIds: [],
            fileIds: [],
            // 布局数据
            LayoutDataQuery: [],
            // 项目数据
            ProjectDataQuery: [],
            // 布局数据(备注：不能清空)
            // query==0
            Layoutyuer0: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'slot1',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '分类名称',
                    key: 'slot2',
                    align: 'center'
                },
                {
                    title: '添加时间',
                    key: 'slot3',
                    align: 'center'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            // 布局数据(备注：不能清空)
            // query==1
            Layoutyuer1: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'slot1',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '分类名称',
                    key: 'slot2',
                    align: 'center'
                },
                {
                    title: '添加时间',
                    key: 'slot3',
                    align: 'center'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            // 布局数据(备注：不能清空)
            // query==2
            Layoutyuer2: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '序号',
                    slot: 'slot1',
                    type: 'index',
                    align: 'center'
                },
                {
                    title: '分类名称',
                    key: 'slot2',
                    align: 'center'
                },
                {
                    title: '添加时间',
                    key: 'slot3',
                    align: 'center'
                },
                {
                    title: 'Action',
                    slot: 'action',
                    width: 150,
                    align: 'center'
                }
            ],
            // 项目数据(备注：可以清空，清空时为暂无数据)
            // query==0
            Projectyuer0: [
                {
                    slot1: 'John Bro',
                    slot2: 18,
                    slot3: 'New York'
                }
            ],
            // 项目数据(备注：可以清空，清空时为暂无数据)
            // query==1
            Projectyuer1: [
                {
                    slot1: 'John Bro',
                    slot2: 18,
                    slot3: 'New York'
                }
            ],
            // 项目数据(备注：可以清空，清空时为暂无数据)
            // query==2
            Projectyuer2: [
                {
                    slot1: 'John Bro',
                    slot2: 18,
                    slot3: 'New York'
                }
            ]
        };
    },
    created() {
        this.LayoutFunction();
    },

    mounted() {
        if (this.$route.query.query == 0) {
            this.getVideoType();
        } else if (this.$route.query.query == 1) {
            this.getImgType();
        } else if (this.$route.query.query == 2) {
            this.getFileType();
        }
    },
    methods: {
        // 编辑
        show(row, index) {
            if (this.$route.query.query == 0) {
                this.$router.push({
                    path: './addfl',
                    query: {
                        status: 0,
                        id: row.id
                    }
                });
            } else if (this.$route.query.query == 1) {
                this.$router.push({
                    path: './addfl',
                    query: {
                        status: 1,
                        id: row.id
                    }
                });
            } else if (this.$route.query.query == 2) {
                this.$router.push({
                    path: './addfl',
                    query: {
                        status: 2,
                        id: row.id
                    }
                });
            }
        },
        // 删除
        remove(row, index) {
            if (this.$route.query.query == 0) {
                // 删除视频分类
                this.$axios.get('admin/admin/market/video/type/delete/' + row.id).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getVideoType();
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
            } else if (this.$route.query.query == 1) {
                // 删除图片
                this.$axios.get('admin/admin/market/picture/type/delete/' + row.id).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getImgType();
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
            } else if (this.$route.query.query == 2) {
                // 删除文档
                this.$axios.get('admin/admin/market/file/type/delete/' + row.id).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getFileType();
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
        },
        // 表格多选框
        selectChange(value) {
            if (this.$route.query.query == 0) {
                let selectId = [];
                value.forEach((val, index) => {
                    selectId[index] = val.id;
                });
                this.videoIds = selectId;
            } else if (this.$route.query.query == 1) {
                let selectId = [];
                value.forEach((val, index) => {
                    selectId[index] = val.id;
                });
                this.ImgIds = selectId;
            } else if (this.$route.query.query == 2) {
                let selectId = [];
                value.forEach((val, index) => {
                    selectId[index] = val.id;
                });
                this.fileIds = selectId;
            }
        },
        // 全部删除回调
        TopDeleteAll2() {
            if (this.$route.query.query == 0) {
                // 删除视频分类
                this.$axios.get('admin/admin/market/video/type/delete/' + this.videoIds.join(',')).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getVideoType();
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
            } else if (this.$route.query.query == 1) {
                // 删除图片
                this.$axios.get('admin/admin/market/picture/type/delete/' + this.ImgIds.join(',')).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getImgType();
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
            } else if (this.$route.query.query == 2) {
                // 删除文档
                this.$axios.get('admin/admin/market/file/type/delete/' + this.fileIds.join(',')).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getFileType();
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
        },

        //新增分类回调
        TopAddData2() {
            if (this.$route.query.query == 0) {
                this.$router.push({
                    path: './addfl',
                    query: {
                        addstatus: 0
                    }
                });
            } else if (this.$route.query.query == 1) {
                this.$router.push({
                    path: './addfl',
                    query: {
                        addstatus: 1
                    }
                });
            } else if (this.$route.query.query == 2) {
                this.$router.push({
                    path: './addfl',
                    query: {
                        addstatus: 2
                    }
                });
            }
        },
        // 布局函数
        LayoutFunction() {
            if (this.$route.query.query == 0) {
                this.LayoutDataQuery = this.Layoutyuer0;
                this.ProjectDataQuery = this.Projectyuer0;
            } else if (this.$route.query.query == 1) {
                this.LayoutDataQuery = this.Layoutyuer1;
                this.ProjectDataQuery = this.Projectyuer1;
            } else if (this.$route.query.query == 2) {
                this.LayoutDataQuery = this.Layoutyuer2;
                this.ProjectDataQuery = this.Projectyuer2;
            }
        },
        // 分页
        PageChanges(val) {
            if (this.$route.query.query == 0) {
                this.page = val;
                this.getVideoType();
            } else if (this.$route.query.query == 1) {
                this.page = val;
                this.getImgType();
            } else if (this.$route.query.query == 2) {
                this.page = val;
                this.getFileType();
            }
        },
        TotalChanges(val) {
            if (this.$route.query.query == 0) {
                this.limit = val;
                this.getVideoType();
            } else if (this.$route.query.query == 1) {
                this.limit = val;
                this.getImgType();
            } else if (this.$route.query.query == 2) {
                this.limit = val;
                this.getFileType();
            }
        },
        // 查询视频分类
        getVideoType() {
            let dataUrl = '?page=' + this.page + '&limit=' + this.limit + '&paging=true';
            this.$axios.get('admin/admin/market/video/type/selectAllMarketVideoType' + dataUrl).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let datalistType = [];
                        data.data.data.forEach(function (val, index) {
                            datalistType[index] = val;
                            datalistType[index].slot2 = val.name;
                            datalistType[index].slot3 = val.createTime;
                        });
                        this.total = data.data.total;
                        this.$nextTick(() => {
                            this.ProjectDataQuery = datalistType;
                        });
                    }
                }
            });
        },
        // 查询图片分类
        getImgType() {
            let dataUrl = '?page=' + this.page + '&limit=' + this.limit + '&paging=true';
            this.$axios.get('admin/admin/market/picture/type/selectAllMarketPictureType' + dataUrl).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let datalistType = [];
                        data.data.data.forEach(function (val, index) {
                            datalistType[index] = val;
                            datalistType[index].slot2 = val.name;
                            datalistType[index].slot3 = val.createTime;
                        });
                        this.total = data.data.total;
                        this.$nextTick(() => {
                            this.ProjectDataQuery = datalistType;
                        });
                    }
                }
            });
        },
        // 查询文档分类
        getFileType() {
            let dataUrl = '?page=' + this.page + '&limit=' + this.limit + '&paging=true';
            this.$axios.get('admin/admin/market/file/type/selectAllMarketFileType' + dataUrl).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let datalistType = [];
                        data.data.data.forEach(function (val, index) {
                            datalistType[index] = val;
                            datalistType[index].slot2 = val.name;
                            datalistType[index].slot3 = val.createTime;
                        });
                        this.total = data.data.total;
                        this.$nextTick(() => {
                            this.ProjectDataQuery = datalistType;
                        });
                    }
                }
            });
        }
    }
};
</script>

<style scope>
.top {
    padding: 20px;
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 10px;
}
.counts {
    padding: 0 20px;
}
.third {
    padding: 20px;
    text-align: center;
    margin-bottom: 40px;
}
</style>