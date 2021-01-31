<template>
    <div>
        <Card>
            <table class="bottomListStyle">
                <thead>
                    <tr class="trCone_1_1">
                        <th>排名</th>
                        <th>工作经验</th>
                        <th>占比（%）</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in dataXioyuer" :key="index">
                        <td>{{ index+1 }}</td>
                        <td>{{ item.experience }}</td>
                        <td class="leftClass">
                            <div>
                                <Progress
                                    :percent="parseInt(item.proportion)"
                                    :stroke-width="8"
                                    status="active"
                                    :stroke-color="['#108ee9', '#87d068']"
                                />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </Card>
    </div>
</template>

<script>
export default {
    props: ['dataList'],
    data() {
        return {
            dataXioyuer: this.dataList
        };
    },
    watch: {
        dataList(newData) {
            this.dataXioyuer = newData;
        }
    }
};
</script>

<style scope>
.bottomListStyle {
    width: 100%;
    border-radius: 3px;
    border-collapse: collapse;
    text-align: center;
}
.bottomListStyle tr {
    height: 36px;
}
.bottomListStyle tbody tr:nth-child(even) {
    background-color: rgba(234, 243, 253, 1);
}
.bottomListStyle tbody tr:nth-child(even):hover {
    background-color: rgba(45, 140, 240, 0.2);
}
.bottomListStyle tbody tr:nth-child(odd) {
    background-color: #f7fbff;
}
.bottomListStyle tbody tr:nth-child(odd):hover {
    background-color: #fff2f9;
}
.bottomListStyle tr th:nth-child(1),
.bottomListStyle tr th:nth-child(2),
.bottomListStyle tr td:nth-child(1),
.bottomListStyle tr td:nth-child(2) {
    width: 80px;
}
.bottomListStyle .trCone_1_1 {
    padding: 5px 0;
    background-color: rgba(45, 140, 240, 0.2);
}
.leftClass {
    text-align: left;
    padding: 0 10px;
}
</style>