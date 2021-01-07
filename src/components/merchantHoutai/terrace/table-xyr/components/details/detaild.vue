<template>
    <div>
        <table>
            <thead>
                <tr>
                    <td v-for="(item,index) in datadetd1" :key="index">{{ item.name }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in datadetd2" :key="index">
                    <td v-for="(item,index) in datadetd2[index]" :key="index">{{ item }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: ['datadetd1', 'datadetd2'],
    data() {
        return {};
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