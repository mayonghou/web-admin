<template>
    <Card style="min-height:982px; min-width:320px">
        <ul class="ulStyleClass">
            <!--title-->
            <li>
                <span>
                    <Icon type="md-done-all" />
                </span>
                <span>订单量前十的企业 (单)</span>
            </li>
            <table class="TableStyleClass">
                <div v-if="TableData02 != ''">
                    <tr v-for="(item,index) in TableData02" :key="index">
                        <td>
                            <span class="bgClasscoele">{{ index+1 }}</span>
                        </td>
                        <td>{{ item.name }}</td>
                        <td class="backgroundClass">
                            <!--进度-->
                            <div class="classdert">
                                <Progress
                                    :percent="item.value"
                                    stroke-color="#00BB7A"
                                    :stroke-width="8"
                                    hide-info
                                />
                            </div>
                        </td>
                        <td class="LastChildClass">{{ item.value / 100 }}</td>
                    </tr>
                </div>
                <div v-else class="indPositionClass">
                    <img
                        class="rightClassCode"
                        src="../../../../assets/img/queshengPage/ques2.png"
                        alt
                    />
                </div>
            </table>
        </ul>
    </Card>
</template>

<script>
export default {
    props: ['orderList'],
    data() {
        return {
            TableData02: this.orderList
        };
    }
};
</script>

<style scope>
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
    border-radius: 3px;
}
.ulStyleClass .TableStyleClass tr:hover {
    background-color: #ebeef5;
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
.ulStyleClass .TableStyleClass tr .backgroundClass {
    width: 150px;
}
.ulStyleClass .TableStyleClass tr .backgroundClass .classdert {
    display: flex;
    align-items: center;
}
.rightClassCode {
    display: block;
    width: 100%;
    height: auto;
}
.indPositionClass {
    width: 100%;
    text-align: center;
    font-size: 20px;
    position: relative;
}
</style>