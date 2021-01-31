<template>
    <div>
        <div class="right">
            <h4 class="titleHfour">贵阳市入住的同行商家（近一个月）</h4>
            <p class="colorFont">999</p>
        </div>
        <div class="tableDiv">
            <Table :columns="columns1" :data="data1"></Table>
            <div class="Pagefy">
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
    </div>
</template>

<script>
import bus from '../../../components/common/bus.js';
export default {
    data() {
        return {
            limit: 10,
            page: 1,
            total: 0,
            IndustyId: '',
            columns1: [
                {
                    title: '企业名称',
                    key: 'cooler1',
                    align: 'center'
                },
                {
                    title: '商家所在区域',
                    key: 'cooler2',
                    align: 'center'
                },
                {
                    title: '浏览量',
                    key: 'cooler3',
                    align: 'center'
                },
                {
                    title: '入驻时间',
                    key: 'cooler4',
                    align: 'center'
                }
            ],
            data1: [
                // {
                //     cooler1: '万境烽火',
                //     cooler2: '中国',
                //     cooler3: '898',
                //     cooler4: '2016-10-03'
                // }
            ]
        };
    },
    created() {
        bus.$on('Industrydata', (msg) => {
            this.IndustyId = msg.id;
            this.getAdminDataCenterNewBusiness();
        });
    },
    mounted() {
        // this.getAdminDataCenterNewBusiness();
    },
    methods: {
        prev_click(val) {
            this.page = val;
            this.getAdminDataCenterNewBusiness();
        },
        next_click(val) {
            this.page = val;
            this.getAdminDataCenterNewBusiness();
        },
        current_change(val) {
            this.page = val;
            this.getAdminDataCenterNewBusiness();
        },
        getAdminDataCenterNewBusiness() {
            let data = {
                page: this.page,
                limit: this.limit,
                industryId: this.IndustyId
            };
            this.$axios.post('admin/mall/dataCenter/getAdminDataCenterNewBusiness', data).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let dataLsit = [];
                        this.total = data.total;
                        data.forEach(function (val, index) {
                            dataLsit[index] = val;
                            dataLsit[index].cooler1 = val.name;
                            dataLsit[index].cooler2 = val.address;
                            dataLsit[index].cooler3 = val.viewCount;
                            dataLsit[index].cooler4 = val.time;
                        });
                        this.data1 = dataLsit;
                        console.log(dataLsit);
                    }
                }
            });
        }
    }
};
</script>

<style scope>
.right {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.colorFont {
    color: #0177d5;
}
.tableDiv {
    width: 100%;
    height: 100%;
    padding: 20px 0 20px 20px;
}
.Pagefy {
    text-align: center;
    padding: 36px 0px;
}
</style>