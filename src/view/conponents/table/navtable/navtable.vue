<template>
    <div>
        <div class="IdClass_1_1">
            <!-- btn1 -->
            <Button
                type="error"
                size="small"
                style="margin-left: 5px"
                class="btnClassSty"
                @click="TopDeleteAll"
            >全部删除</Button>
            <Button
                v-if="flgBtn"
                size="small"
                type="success"
                style="margin-left: 5px"
                class="btnClassSty"
                @click="Classifiedman"
            >分类管理</Button>
            <Button
                type="info"
                size="small"
                style="margin-left: 5px"
                class="btnClassSty"
                @click="VariableButton"
            >{{ BtnData.bthName }}</Button>
        </div>
        <div class="IdClass_2_1">
            <Table
                border
                :columns="LayoutData"
                :data="ProjectData"
                @on-selection-change="selectionChange"
            >
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <!-- btn2 -->
                    <Button
                        v-if="flgBtn2"
                        type="primary"
                        size="small"
                        style="margin-right: 5px"
                        @click="show(row)"
                    >{{ BtnData.bthName2 }}</Button>
                    <Button
                        type="primary"
                        size="small"
                        style="margin-right: 5px"
                        @click="edit(row)"
                    >编辑</Button>
                    <Button type="error" size="small" @click="remove(row)">删除</Button>
                </template>
            </Table>
        </div>
    </div>
</template>
<script>
export default {
    props: [
        // 布局数据
        'LayoutDatafa',
        // 项目数据
        'ProjectDatafa'
    ],
    data() {
        return {
            LayoutData: [], //布局数据
            ProjectData: [], //项目数据
            BtnData: {
                // btn1
                bthName: '',
                // btn2
                bthName2: ''
            },
            // btn1
            flgBtn: true,
            // btn2
            flgBtn2: false,
            videoListid: [], // 视频
            imgListid: [], // 图片
            documentListid: [], // 文档
            xiaozhishiListid: [], // 小知识
            activityListid: [] // 活动
        };
    },
    watch: {
        ProjectDatafa: {
            handler(newName) {
                this.ProjectData = newName;
            },
            deep: true,
            immediate: true
        }
    },
    created() {
        // 布局（必要时监听）
        this.LayoutData = this.LayoutDatafa;
        // 数据（必要时监听）
        this.ProjectData = this.ProjectDatafa;
    },
    mounted() {
        this.Btn();
    },
    methods: {
        // 查看回调
        show(row) {
            if (this.$route.query.ineryuer == 3) {
                this.$router.push({
                    path: './omviewpage',
                    query: {
                        id: row.id,
                        status: 1
                    }
                });
            } else if (this.$route.query.ineryuer == 4) {
                this.$router.push({
                    path: './omviewpage',
                    query: {
                        id: row.id,
                        status: 2
                    }
                });
            }
        },
        // 编辑回调
        edit(row) {
            if (this.$route.query.ineryuer == 0) {
                this.$router.push({
                    path: './PackageDetailsxiao',
                    query: {
                        id: row.id
                    }
                });
            } else if (this.$route.query.ineryuer == 1) {
                this.$router.push({
                    path: './updowmphoto',
                    query: {
                        id: row.id
                    }
                });
            } else if (this.$route.query.ineryuer == 2) {
                this.$router.push({
                    path: './updownfile',
                    query: {
                        id: row.id
                    }
                });
            } else if (this.$route.query.ineryuer == 3) {
                this.$router.push({
                    path: './Postarticles',
                    query: {
                        id: row.id
                    }
                });
            } else if (this.$route.query.ineryuer == 4) {
                this.$router.push({
                    path: './postnews',
                    query: {
                        id: row.id
                    }
                });
            }
        },
        // 删除回调
        remove(row) {
            if (this.$route.query.ineryuer == 0) {
                this.$parent.deteleData(row);
            } else if (this.$route.query.ineryuer == 1) {
                this.$parent.deteleData(row);
            } else if (this.$route.query.ineryuer == 2) {
                this.$parent.deteleData(row);
            } else if (this.$route.query.ineryuer == 3) {
                this.$parent.deteleData(row);
            } else if (this.$route.query.ineryuer == 4) {
                this.$parent.deteleData(row);
            }
        },
        // 拿到全部删除的ID
        selectionChange(value) {
            if (this.$route.query.ineryuer == 0) {
                let ids = [];
                // 视频
                value.forEach(function (val, index) {
                    ids[index] = val.id;
                });
                this.videoListid = ids;
            } else if (this.$route.query.ineryuer == 1) {
                let ids = [];
                // 图片
                value.forEach(function (val, index) {
                    ids[index] = val.id;
                });
                this.imgListid = ids;
            } else if (this.$route.query.ineryuer == 2) {
                let ids = [];
                // 文档
                value.forEach(function (val, index) {
                    ids[index] = val.id;
                });
                this.documentListid = ids;
            } else if (this.$route.query.ineryuer == 3) {
                let ids = [];
                value.forEach(function (val, index) {
                    ids[index] = val.id;
                });
                // 小知识
                this.xiaozhishiListid = ids;
            } else if (this.$route.query.ineryuer == 4) {
                let ids = [];
                value.forEach(function (val, index) {
                    ids[index] = val.id;
                });
                // 活动
                this.activityListid = ids;
            }
        },
        // 全部删除回调
        TopDeleteAll() {
            if (this.$route.query.ineryuer == 0) {
                this.$parent.deteleDataAlls(this.videoListid.join(','));
            } else if (this.$route.query.ineryuer == 1) {
                this.$parent.deteleDataAlls(this.imgListid.join(','));
            } else if (this.$route.query.ineryuer == 2) {
                this.$parent.deteleDataAlls(this.documentListid.join(','));
            } else if (this.$route.query.ineryuer == 3) {
                this.$parent.deteleDataAlls(this.xiaozhishiListid.join(','));
            } else if (this.$route.query.ineryuer == 4) {
                this.$parent.deteleDataAlls(this.activityListid.join(','));
            }
        },
        // 分类管理
        Classifiedman() {
            if (this.$route.query.ineryuer == 0) {
                this.$router.push({
                    path: './sonsonPages',
                    query: {
                        query: this.$route.query.ineryuer
                    }
                });
            } else if (this.$route.query.ineryuer == 1) {
                this.$router.push({
                    path: './sonsonPages',
                    query: {
                        query: this.$route.query.ineryuer
                    }
                });
            } else if (this.$route.query.ineryuer == 2) {
                this.$router.push({
                    path: './sonsonPages',
                    query: {
                        query: this.$route.query.ineryuer
                    }
                });
            } else if (this.$route.query.ineryuer == 3) {
                this.$router.push({
                    path: './sonsonPages',
                    query: {
                        query: this.$route.query.ineryuer
                    }
                });
            } else if (this.$route.query.ineryuer == 4) {
                this.$router.push({
                    path: './sonsonPages',
                    query: {
                        query: this.$route.query.ineryuer
                    }
                });
            }
        },
        // 第三按钮回调
        VariableButton() {
            if (this.$route.query.ineryuer == 0) {
                //视频上传
                this.$router.push({
                    path: './PackageDetailsxiao'
                });
            } else if (this.$route.query.ineryuer == 1) {
                //图片上传
                this.$router.push({
                    path: './updowmphoto'
                });
            } else if (this.$route.query.ineryuer == 2) {
                // 文档上传
                this.$router.push({
                    path: './updownfile'
                });
            } else if (this.$route.query.ineryuer == 3) {
                // 发布文章
                this.$router.push({
                    path: './Postarticles'
                });
            } else if (this.$route.query.ineryuer == 4) {
                // 发布通知
                this.$router.push({
                    path: './postnews'
                });
            }
        },
        // 头部按钮布局
        Btn() {
            if (this.$route.query.ineryuer == 0) {
                this.BtnData.bthName = '上传视频';
            } else if (this.$route.query.ineryuer == 1) {
                this.BtnData.bthName = '上传图片';
            } else if (this.$route.query.ineryuer == 2) {
                this.BtnData.bthName = '上传文档';
            } else if (this.$route.query.ineryuer == 3) {
                this.flgBtn = !this.flgBtn;
                this.flgBtn2 = !this.flgBtn2;
                this.BtnData.bthName = '发布文章';
                this.BtnData.bthName2 = '查看文章';
            } else if (this.$route.query.ineryuer == 4) {
                this.BtnData.bthName = '发布通知';
                this.flgBtn = !this.flgBtn;
                this.flgBtn2 = !this.flgBtn2;
                this.BtnData.bthName2 = '查看通知';
            }
        }
    }
};
</script>

<style scoped>
.IdClass_1_1 {
    display: flex;
    justify-content: flex-end;
}
.IdClass_2_1 {
    padding: 5px 0;
}
.btnClassSty {
    font-size: 14px;
}
</style>