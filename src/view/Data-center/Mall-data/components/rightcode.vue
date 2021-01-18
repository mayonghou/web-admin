<template>
    <Card>
        <ul class="ulStyleClass">
            <!--title-->
            <li>
                <span>
                    <Icon type="md-done-all" />
                </span>
                <span>销售排行榜（元）</span>
            </li>
            <table class="TableStyleClass">
                <tr v-for="(item,index) in 10" :key="index">
                    <td>
                        <span class="bgClasscoele">{{ index }}</span>
                    </td>
                    <td>万疆烽火</td>
                    <td class="LastChildClass">3333</td>
                </tr>
            </table>
        </ul>
    </Card>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style scope="this api replaced by slot-scope in 2.5.0+">
.ulStyleClass {
    width: 100%;
    height: auto;
}
.ulStyleClass .TableStyleClass {
    width: 100%;
}
.ulStyleClass .TableStyleClass tr {
    display: block;
    padding: 8px 0;
    position: relative;
}
.ulStyleClass .TableStyleClass tr td .bgClasscoele {
    display: inline-block;
    width: 20px;
    height: 20px;
    padding: 5px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: #c7c7cc;
}
.ulStyleClass .TableStyleClass tr:nth-child(1) td .bgClasscoele {
    background-color: red;
}
.ulStyleClass .TableStyleClass tr:nth-child(2) td .bgClasscoele {
    background-color: #ff9502;
}
.ulStyleClass .TableStyleClass tr:nth-child(3) td .bgClasscoele {
    background-color: green;
}
.ulStyleClass .TableStyleClass tr .LastChildClass {
    position: absolute;
    right: 0;
    top: 10px;
}
.ulStyleClass li {
    padding: 10px;
    list-style-type: none;
}
.ulStyleClass li:nth-child(1) {
    background-color: #f6f6f7;
}
.ulStyleClass li:nth-child(1) span:nth-child(1) {
    padding-right: 15px;
}
</style>