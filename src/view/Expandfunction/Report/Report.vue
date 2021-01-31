<template>
    <div>
        <!-- 举报投诉 -->
        <div class="rootClass">
            <div style="margin-top:40px">
                <navinfo :judge="judge"></navinfo>
            </div>
            <div>
                <viewtable
                    :FinalChapter02="FinalChapter02"
                    :FinalData02="FinalData02"
                    :judge="judge"
                ></viewtable>
            </div>
        </div>
        <div class="fenPageClass">
            <fenPage :judge="judge" :total="total"></fenPage>
        </div>
    </div>
</template>

<script>
import navinfo from '../components/navinfo.vue';
import viewtable from '../../../view/conponents/ViewTable/viewtable.vue';
import fenPage from '../components/fenPage.vue';
export default {
    data() {
        return {
            keyword: '',
            total: 0,
            FinalChapter02: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'ID',
                    key: 'slot1',
                    align: 'center'
                },
                {
                    title: '投诉人',
                    key: 'slot2',
                    align: 'center'
                },
                {
                    title: '投诉事件',
                    key: 'slot3',
                    align: 'center'
                },
                {
                    title: '投诉时间',
                    key: 'slot4',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 180,
                    align: 'center'
                }
            ],
            FinalData02: [],
            judge: {
                name: 2
            }
        };
    },
    components: {
        viewtable,
        navinfo,
        fenPage
    },
    mounted() {},
    methods: {
        getDatalist(page, limit, keyword) {
            this.$axios.get('admin/user/complain/list?page=' + page + '&limit=' + limit + '&keyword=' + keyword).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let datalistddd = [];
                        data.data.list.forEach((val, index) => {
                            datalistddd[index] = val;
                            datalistddd[index].slot1 = val.id;
                            datalistddd[index].slot2 = val.phone;
                            datalistddd[index].slot3 = val.content;
                            let date = new Date(parseInt(val.createTime));
                            let time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            datalistddd[index].slot4 = time1;
                        });
                        this.FinalData02 = datalistddd;
                        this.total = data.data.totalCount;
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
        },
        // 删除单调数据
        DeleteData(row) {
            this.$axios.get('admin/user/complain/delete?ids=' + row.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'success'
                        });
                        this.getDatalist(1, 10, '');
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
        },
        // 删除多条数据
        DeleteDataAll(idList) {
            this.$axios.get('admin/user/complain/delete?ids=' + idList).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'success'
                        });
                        this.getDatalist(1, 10, '');
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
    }
};
</script>

<style scope>
.rootClass {
    margin-top: 20px;
    box-sizing: border-box;
}
.fenPageClass {
    display: flex;
    justify-content: center;
    padding: 20px;
}
</style>