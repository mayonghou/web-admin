<template>
    <div calss="RootStyleClass">
        <div class="flexGroe">
            <Button type="error" @click="batchDelAll">批量删除</Button>
        </div>
        <Card>
            <Table
                border
                :columns="FinalChapter"
                :data="FinalData"
                @on-selection-change="selectionChange"
            >
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <Button
                        type="primary"
                        size="small"
                        style="margin-right: 5px"
                        class="FinalChapter01Class"
                        @click="lookDetail(row)"
                    >查看详情</Button>
                    <Button
                        type="error"
                        size="small"
                        @click="deleteData(row,index)"
                        class="FinalChapter01Class"
                    >删除</Button>
                </template>
            </Table>
            <slot></slot>
        </Card>
    </div>
</template>
<script>
export default {
    props: [
        /*判断*/
        'judge',
        /*商家入驻申请*/
        'FinalChapter01',
        'FinalData01',
        /*举报投诉*/
        'FinalChapter02',
        'FinalData02',
        /*帮助与反馈*/
        'FinalChapter03',
        'FinalData03'
    ],
    data() {
        return {
            FinalChapter: [],
            FinalData: [],
            sttlelnId: [],
            reportId: [],
            feedbackid: []
        };
    },
    watch: {
        // 商家入驻申请
        FinalChapter01: {
            handler(newName, oldName) {
                this.FinalChapter = newName;
            },
            deep: true,
            immediate: true
        },
        FinalData01: {
            handler(newName, oldName) {
                this.FinalData = newName;
            },
            deep: true,
            immediate: true
        },
        //举报投诉
        FinalChapter02: {
            handler(newName, oldName) {
                this.FinalChapter = newName;
            },
            deep: true,
            immediate: true
        },
        FinalData02: {
            handler(newName, oldName) {
                this.FinalData = newName;
            },
            deep: true,
            immediate: true
        },
        //帮助与反馈
        FinalChapter03: {
            handler(newName, oldName) {
                this.FinalChapter = newName;
            },
            deep: true,
            immediate: true
        },
        FinalData03: {
            handler(newName, oldName) {
                this.FinalData = newName;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {},
    mounted() {
        this.PageRendering();
    },
    methods: {
        // 页面渲染函数
        PageRendering() {
            if (this.judge.name == 1) {
                // 商家入驻申请
                this.FinalChapter = this.FinalChapter01;
                this.FinalData = this.FinalData01;
            } else if (this.judge.name == 2) {
                //举报投诉
                this.FinalChapter = this.FinalChapter02;
                this.FinalData = this.FinalData02;
            } else if (this.judge.name == 3) {
                //帮助与反馈
                this.FinalChapter = this.FinalChapter03;
                this.FinalData = this.FinalData03;
            }
        },
        // 获取全选的id
        selectionChange(value) {
            if (this.judge.name == 1) {
                this.sttlelnId.push(value.id);
            } else if (this.judge.name == 2) {
                this.reportId.push(value.id);
            } else if (this.judge.name == 3) {
                this.feedbackid.push(value.id);
            }
        },
        // 批量删除
        batchDelAll() {
            if (this.judge.name == 1) {
                this.$axios.get('admin/user/attract/delete?ids=' + this.sttlelnId).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                            this.$parent.getDataList(1, 10);
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
            } else if (this.judge.name == 2) {
                this.$axios.get('admin/user/complain/delete?ids=' + this.reportId).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                            this.$parent.getDatalist(1, 10);
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
            } else if (this.judge.name == 3) {
                this.$axios.get('admin/user/feedback/delete?ids=' + this.reportId).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                            this.$parent.getDatalists(1, 10);
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
        // 删除
        deleteData(row, index) {
            if (this.judge.name == 1) {
                this.$axios.get('admin/user/attract/delete?ids=' + row.id).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                            this.$parent.getDataList(1, 10);
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
            } else if (this.judge.name == 2) {
                this.$axios.get('admin/user/complain/delete?ids=' + row.id).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                            this.$parent.getDatalist(1, 10);
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
            } else if (this.judge.name == 3) {
                this.$axios.get('admin/user/feedback/delete?ids=' + row.id).then((res) => {
                    if (res.status == 200) {
                        let data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                            this.$parent.getDatalists(1, 10);
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
        lookDetail(row) {
            if (this.judge.name == 1) {
                this.$Message.info('查看详情回调1');
                const Newjudge = this.judge.name;
                this.$router.push({
                    path: './ViewDetailsPage',
                    query: {
                        TitleSon: '商家入驻申请详情',
                        Newjudge: Newjudge
                    }
                });
            } else if (this.judge.name == 2) {
                this.$Message.info('查看详情回调2');
                const Newjudge = this.judge.name;
                this.$router.push({
                    path: './ViewDetailsPage',
                    query: {
                        TitleSon: '投诉举报详情',
                        Newjudge: Newjudge
                    }
                });
            } else if (this.judge.name == 3) {
                this.$Message.info('查看详情回调3');
                const Newjudge = this.judge.name;
                this.$router.push({
                    path: './ViewDetailsPage',
                    query: {
                        TitleSon: '帮助反馈详情',
                        Newjudge: Newjudge
                    }
                });
            }
        }
    }
};
</script>

<style scope>
.FinalChapter01Class {
    padding: 0px 8px;
    font-size: 12px;
}
.flexGroe {
    display: flex;
    justify-content: flex-end;
}
.flexGroe button {
    margin-left: 10px;
    font-size: 14px;
    padding: 0px 20px;
}
</style>