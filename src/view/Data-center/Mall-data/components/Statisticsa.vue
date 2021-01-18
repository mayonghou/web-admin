<template>
    <Card>
        <div class="Statisticsa">
            <div class="StatisticsaA staistic">
                <span class="StatisticsaB">商家统计</span>
                <span>单位（个）</span>
            </div>
            <div class="StatisticsaA">
                <table class="tableClass">
                    <thead>
                        <tr>
                            <td>321</td>
                            <td style=" text-align: center;">456</td>
                            <td style=" text-align: center;">895</td>
                            <td style=" text-align: right;">999</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>今日新增</td>
                            <td style=" text-align: center;">昨日新增</td>
                            <td style=" text-align: center;">本月新增</td>
                            <td style=" text-align: right;">商家总数</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Card>
</template>

<script>
export default {};
</script>

<style scope>
.Statisticsa {
    width: 100%;
    height: auto;
}
.StatisticsaA {
    display: flex;
    padding: 10px;
    justify-content: space-between;
}
.StatisticsaB {
    font-weight: 600;
}
.tableClass {
    width: 100%;
}
.tableClass thead tr td {
    font-size: 28px;
}
.staistic {
    background-color: #f6f6f7;
    border-radius: 3px;
}
</style>