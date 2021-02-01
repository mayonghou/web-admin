<template>
    <Card style="min-height:483px">
        <div>
            <div class="right">
                <h4 class="ulFirstClass">贵阳市入住的同行商家（近一个月）</h4>
                <h4 class="colorFont">999</h4>
            </div>
            <div class="tableDiv">
                <Table :columns="columns1" :data="data1"></Table>
                <div class="Pagefy">
                    <Page :total="total" />
                </div>
            </div>
        </div>
    </Card>
</template>

<script>
import bus from '../../../components/common/bus.js';
export default {
    data() {
        return {
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
                {
                    cooler1: '万境烽火',
                    cooler2: '中国',
                    cooler3: '898',
                    cooler4: '2016-10-03'
                },
                {
                    cooler1: '万境烽火',
                    cooler2: '中国',
                    cooler3: '898',
                    cooler4: '2016-10-03'
                },
                {
                    cooler1: '万境烽火',
                    cooler2: '中国',
                    cooler3: '898',
                    cooler4: '2016-10-03'
                },
                {
                    cooler1: '万境烽火',
                    cooler2: '中国',
                    cooler3: '898',
                    cooler4: '2016-10-03'
                },
                {
                    cooler1: '万境烽火',
                    cooler2: '中国',
                    cooler3: '898',
                    cooler4: '2016-10-03'
                }
            ]
        };
    },
    created() {
        bus.$on('Industrydata', (msg) => {
            this.IndustyId = msg.id;
            this.getAdminDataCenterNewBusiness();
        });
    },
    mounted() {},
    methods: {
        getAdminDataCenterNewBusiness() {
            let data = {
                page: 1,
                limit: 10,
                industryId: this.IndustyId
            };
            this.$axios.post('admin/mall/dataCenter/getAdminDataCenterNewBusiness', data).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let DataLis = res.data.data;
                        let dataLsit = [];
                        this.total = data.total;
                        DataLis.forEach((val, index) => {
                            dataLsit[index] = val;
                            dataLsit[index].cooler1 = val.name;
                            dataLsit[index].cooler2 = val.address;
                            dataLsit[index].cooler3 = val.viewCount;
                            dataLsit[index].cooler4 = val.time;
                        });
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
    display: flex;
    align-items: center;
    color: #1fb054;
}
.tableDiv {
    width: 100%;
    height: 100%;
}
.Pagefy {
    text-align: center;
    padding: 10px 0px;
}
.ulFirstClass {
    padding: 15px 0;
}
</style>