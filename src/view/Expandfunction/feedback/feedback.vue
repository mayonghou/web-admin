<template>
    <div>
        <!-- 帮助与反馈 -->
        <div class="rootClass">
            <div style="margin-top:40px">
                <navinfo :judge="judge"></navinfo>
            </div>
            <div>
                <viewtable
                    :FinalChapter03="FinalChapter03"
                    :FinalData03="FinalData03"
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
            total: 0,
            FinalChapter03: [
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
                    title: '反馈人',
                    key: 'slot2',
                    align: 'center'
                },
                {
                    title: '反馈内容',
                    key: 'slot3',
                    align: 'center'
                },
                {
                    title: '反馈时间',
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
            FinalData03: [],
            judge: {
                name: 3
            }
        };
    },
    components: {
        viewtable,
        navinfo,
        fenPage
    },
    methods: {
        getDatalists(page, limit, keyword) {
            this.$axios.get('admin/user/feedback/list?page=' + page + '&limit=' + limit + '&keyword=' + keyword).then((res) => {
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
                        this.FinalData03 = datalistddd;
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