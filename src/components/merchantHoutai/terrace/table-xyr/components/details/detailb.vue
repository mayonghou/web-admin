<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="(item, index) in dataXyr1" :key="index">{{ item.name }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item2,index) in dataXyr2" :key="index">
                    <td v-for="(item2, index) in dataXyr2[index]" :key="index">{{ item2 }}</td>
                </tr>
            </tbody>
        </table>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: ['dataXyr1', 'dataXyr2'],
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
