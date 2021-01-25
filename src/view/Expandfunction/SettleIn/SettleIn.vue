<template>
    <div>
        <!-- 商家入驻申请 -->
        <div class="rootClass">
            <div>
                <viewtable
                    :FinalChapter01="FinalChapter01"
                    :FinalData01="FinalData01"
                    :judge="judge"
                ></viewtable>
            </div>
        </div>
        <div class="fenPageClass">
            <fenPage :total="total" :judge="judge"></fenPage>
        </div>
    </div>
</template>

<script>
import viewtable from '../../../view/conponents/ViewTable/viewtable.vue';
import fenPage from '../components/fenPage.vue';
export default {
    data() {
        return {
            total: 0,
            FinalChapter01: [
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
                    title: '姓名/机构名称',
                    key: 'slot2',
                    align: 'center'
                },
                {
                    title: '联系电话',
                    key: 'slot3',
                    align: 'center'
                },
                {
                    title: '申请时间',
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
            FinalData01: [],
            judge: {
                name: 1
            }
        };
    },
    components: {
        viewtable,
        fenPage
    },
    mounted() {
        this.getDataList(1, 10);
    },
    methods: {
        getDataList(page, limit) {
            this.$axios.get('admin/user/attract/list?page=' + page + '&limit=' + limit).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let datalist = [];
                        data.data.list.forEach(function (val, index) {
                            datalist[index] = val;
                            datalist[index].slot1 = val.id;
                            datalist[index].slot2 = val.name;
                            datalist[index].slot3 = val.phone;
                            let date = new Date(parseInt(val.time));
                            let time1 =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            datalist[index].slot4 = time1;
                        });
                        this.FinalData01 = datalist;
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