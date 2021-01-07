<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="(item, index) in Dataxiao" :key="index">{{ item.name }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in modeData" :key="index">
                    <td v-for="(item, index) in modeData[index]" :key="index">{{ item }}</td>
                </tr>
            </tbody>
        </table>
        <div class="numData">
            合计：￥
            <span>4567</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['Dataxiao', 'modeData'],
    data() {
        return {};
    },
    methods: {
        indevData() {
            for (let i = 0; i < this.modeData.length; i++) {
                this.modeData[i].ValData1 = i + 1;
            }
        }
    },
    mounted() {
        this.indevData();
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
tr {
    height: auto;
}
td,
th {
    border: #e0e0e0 solid 0px;
}
td {
    padding: 20px 0px;
}
tr:last-child {
    border-bottom: solid #eeeeee 1px;
}
th {
    padding: 15px;
}
td:first-child {
    width: 70px;
}
.tdClass {
    width: 70px;
}
.numData {
    text-align: right;
    padding: 10px 20px 10px 10px;
}
.numData span {
    color: red;
}
</style>
