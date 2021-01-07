<template>
    <div>
        <table class="tableCss">
            <thead class="theadCss">
                <tr>
                    <th v-for="(item1, index) in dataData1" :key="index">{{ item1.name }}</th>
                </tr>
            </thead>
            <tbody class="tbodyCss">
                <tr v-for="(list, index) in listData1" :key="index">
                    <td v-for="(lister1, index) in listData1[index]" :key="index">{{ lister1 }}</td>
                </tr>
            </tbody>
            <thead class="theadCss">
                <tr>
                    <th v-for="(item2, index) in dataData2" :key="index">{{ item2.name }}</th>
                </tr>
            </thead>
            <tbody class="tbodyCss">
                <tr v-for="(list, index) in listData2" :key="index">
                    <td v-for="(lister2, index) in listData2[index]" :key="index">{{ lister2 }}</td>
                </tr>
            </tbody>
        </table>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['dataData1', 'listData1', 'dataData2', 'listData2'],
    data() {
        return {};
    }
};
</script>

<style scoped>
.tableCss {
    width: 100%;
    height: auto;
    border-collapse: collapse;
}
.theadCss {
    background-color: #f1fafd;
}
.tbodyCss {
    text-align: center;
}
th,
td {
    border: solid 1px #e0e0e0;
    height: 46px;
}
</style>
