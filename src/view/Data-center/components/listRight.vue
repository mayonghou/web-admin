<template>
    <div>
        <div class="right">
            <h4 class="titleHfour">贵阳市入住的同行商家（近一个月）</h4>
            <p class="colorFont">999</p>
        </div>
        <div class="tableDiv">
            <Table :columns="columns1" :data="data1"></Table>
            <div class="Pagefy">
                <Page :total="100" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
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