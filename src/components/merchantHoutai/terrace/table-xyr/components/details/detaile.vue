<template>
    <div>
        <table>
            <thead>
                <tr>
                    <td v-for="(item, index) in detailea1" :key="index">{{ item.name }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in detailea2" :key="index">
                    <td v-for="(item, index) in detailea2[index]" :key="index">{{ item }}</td>
                </tr>
            </tbody>

            <thead>
                <tr>
                    <td v-for="(item, index) in detailea3" :key="index">{{ item.name }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in detailea4" :key="index">
                    <td v-for="(item, index) in detailea4[index]" :key="index">{{ item }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            detailea1: [
                {
                    name: '商品合计',
                    key: 'value1'
                },
                {
                    name: '配送费',
                    key: 'asd'
                },
                {
                    name: '优惠券',
                    key: 'asd'
                }
            ],
            detailea2: [
                {
                    value1: '￥1000',
                    value2: '￥1000',
                    value3: '￥1000'
                }
            ],

            detailea3: [
                {
                    name: '活动优惠合计',
                    key: 'value1'
                },
                {
                    name: '订单总额',
                    key: 'asd'
                },
                {
                    name: '应付款金额',
                    key: 'asd'
                }
            ],
            detailea4: [
                {
                    value1: '￥1000',
                    value2: '￥1000',
                    value3: '￥1000'
                }
            ]
        };
    }
};
</script>

<style scoped>
table {
    width: 100%;
    height: auto;
    border-collapse: collapse;
    text-align: center;
}
thead {
    background-color: #f1fafd;
}
tbody {
    text-align: center;
}
th,
td {
    border: solid 1px #e0e0e0;
    height: 46px;
    width: 33.3%;
}
</style>
