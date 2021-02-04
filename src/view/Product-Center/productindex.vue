<template>
    <div>
        <div>
            <!-- leftTop -->
            <h3 class="jxgnClassd">精选功能</h3>
            <div class="navCountClass">
                <div class="sonChild">
                    <div class="SonChildren">
                        <div class="leftTopCty">
                            <span class="childClssd">{{this.banbenData.versionName}}</span>
                            <span class="childClssd">{{this.banbenData.title}}</span>
                        </div>
                        <div class="leftTopCty2">
                            <Button type="primary" style="background-color:#2F24D2 ">当前版本</Button>
                        </div>
                    </div>
                    <Card>
                        <div class="TextClassStyle">{{this.banbenData.versionDescribe}}</div>
                    </Card>
                </div>
                <!-- rightTop -->
                <div class="childrender">
                    <sliderxiaoyuer :functionList="functionList"></sliderxiaoyuer>
                </div>
            </div>
        </div>
        <div class="fbBtn">
            <Button
                @click="Releasenewversion"
                type="primary"
                style="background-color:#2F24D2 "
                v-preventReClick
            >发布新版本</Button>
        </div>
        <Table border :columns="columns12" :data="data6">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row, index }" slot="action">
                <Button
                    type="primary"
                    size="small"
                    style="margin-right: 5px"
                    @click="show(row, index)"
                    v-preventReClick
                >查看</Button>
                <Button
                    type="info"
                    size="small"
                    @click="modify(row,index)"
                    style="margin-right:5px"
                    v-preventReClick
                >修改</Button>
                <Button type="error" size="small" @click="remove(row,index)" v-preventReClick>删除</Button>
            </template>
        </Table>
        <div class="fenPageClssd">
            <el-pagination
                @prev-click="prev_click"
                @next-click="next_click"
                @current-change="current_change"
                :page-size="limit"
                :total="total"
                layout="prev, pager, next"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import sliderxiaoyuer from './components/sliderxiaoyuer';
export default {
    data() {
        return {
            page: 1,
            limit: 10,
            total: 0,
            banbenData: {},
            functionList: [],
            dataColor: ['#DADCFF', '#F0BF41', '#149F73', '#618076'],
            columns12: [
                {
                    title: '序号',
                    key: 'slot0',
                    width: 100,
                    align: 'center',
                    render: (h, p) => {
                        return h('div', [
                            h(
                                'Button',
                                {
                                    props: {
                                        size: 'large'
                                    },
                                    style: {
                                        borderRadius: '100px',
                                        backgroundColor: this.dataColor[p.index % this.dataColor.length],
                                        color: '#000000',
                                        border: '0',
                                        outline: 'none',
                                        margin: '20px 0px'
                                    }
                                },
                                p.index + 1
                            )
                        ]);
                    }
                },
                {
                    title: '版本名称',
                    key: 'slot1',
                    align: 'center'
                },
                {
                    title: '版本描述',
                    key: 'slot2',
                    align: 'center'
                },
                {
                    title: '版本功能标题',
                    key: 'slot3',
                    align: 'center',
                    render: (h, pr) => {
                        return h('div', [
                            h(
                                'div',
                                {
                                    style: {
                                        height: '60px',
                                        overflow: 'hidden'
                                    }
                                },
                                pr.row.slot3.map((val) => {
                                    return h(
                                        'Button',
                                        {
                                            props: {
                                                type: 'error',
                                                size: 'small'
                                            },
                                            style: {
                                                margin: '5px',
                                                backgroundColor: '#DADCFF',
                                                border: 0,
                                                outline: 'none',
                                                color: '#797979',
                                                opacity: 0.8
                                            }
                                        },
                                        val
                                    );
                                })
                            )
                        ]);
                    }
                },
                {
                    title: '发布日期',
                    key: 'slot4',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 230,
                    align: 'center'
                }
            ],
            data6: [
                {
                    slot1: 'John Brown',
                    slot2: 18,
                    slot3: [],
                    slot4: 'New York No.'
                }
            ]
        };
    },
    created() {},
    mounted() {
        this.getQueryLastVersion();
        this.getVersionList();
    },
    methods: {
        // 查看
        show(row) {
            this.$router.push({
                path: './viewyes',
                query: {
                    id: row.id
                }
            });
        },
        // 修改
        modify(row) {
            this.$router.push({
                path: './Releas',
                query: {
                    id: row.id
                }
            });
        },
        // 删除
        remove(row) {
            this.$axios.post('admin/version/deleteVersion?id=' + row.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'success'
                        });
                        this.getQueryLastVersion();
                        this.getVersionList();
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        //发布新版本
        Releasenewversion() {
            this.$router.push({
                path: './Releas'
            });
        },
        // 版本详情 //功能描述
        getQueryLastVersion() {
            this.$axios.get('admin/version/queryLastVersion').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.banbenData = data.data;
                        this.functionList = data.data.list;
                    }
                }
            });
        },
        // 分页
        prev_click(val) {
            this.page = val;
            this.getVersionList();
        },
        next_click(val) {
            this.page = val;
            this.getVersionList();
        },
        current_change(val) {
            this.page = val;
            this.getVersionList();
        },
        // 查询版本列表
        getVersionList() {
            let datas = {
                limit: this.limit,
                page: this.page
            };
            this.$axios.post('admin/version/queryVersionList', datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        var tabList = [];
                        data.data.forEach((val, index) => {
                            tabList[index] = val;
                            tabList[index].slot1 = val.versionName;
                            tabList[index].slot2 = val.versionDescribe;
                            if (val.title) {
                                let bbList = [];
                                val.title.forEach(function (v, i) {
                                    bbList[i] = v;
                                });
                                tabList[index].slot3 = bbList;
                            }
                            //  = val.title;
                            tabList[index].slot4 = val.createTime;
                        });
                        this.data6 = tabList;
                    }
                }
            });
        }
    },
    components: {
        sliderxiaoyuer
    }
};
</script>

<style scoped>
.fenPageClssd {
    padding: 10px 0;
    text-align: right;
    margin-bottom: 40px;
}
.jxgnClassd {
    padding: 20px 0;
    text-align: center;
    margin-top: 36px;
    font-size: 28px;
}
.navCountClass {
    display: flex;
}
.sonChild {
    margin: 15px 0;
    margin-top: 0;
    height: auto;
    min-height: 180px;
}
.sonChild:nth-child(1) {
    width: 50%;
    flex-direction: column;
    padding-right: 15px;
}
.sonChild:nth-child(2) {
    padding-left: 15px;
}
.fbBtn {
    padding: 10px 0;
    text-align: right;
}
.SonChildren {
    display: flex;
    justify-content: space-between;
}
.childClssd:nth-child(1) {
    font-size: 24px;
    font-weight: 800;
}
.childClssd:nth-child(2) {
    padding: 0 20px;
    font-size: 14px;
    color: #313ac3;
}
.TextClassStyle {
    height: 130px;
    font-size: 14px;
    padding: 15px 0;
    line-height: 34px;
    text-indent: 2em;
    display: -webkit-box; /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
    -webkit-box-orient: vertical; /*  -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
    -webkit-line-clamp: 5; /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
    overflow: auto;
}
.TextClassStyle::-webkit-scrollbar {
    /**滚动条整体部分 */
    width: 8px;
    height: 8px;
    /**/
}
.TextClassStyle::-webkit-scrollbar-track {
    /**滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条） */
    background: rgb(239, 239, 239);
    border-radius: 2px;
}
.TextClassStyle::-webkit-scrollbar-thumb {
    /**滚动条的轨道（里面装有Thumb） */
    background: #2db7f5;
    border-radius: 8px;
}
.TextClassStyle::-webkit-scrollbar-thumb:hover {
    /* */
    background: #2d8cf0;
}
.TextClassStyle::-webkit-scrollbar-corner {
    /** */
    background: #179a16;
}
</style>