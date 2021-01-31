<template>
    <Card>
        <div>
            <h3>简历平台数据</h3>
        </div>
        <el-select v-model="value" @change="changeIndusty" placeholder="行业">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>

        <div ref="main4" style="width: 100%; height:400px"></div>
    </Card>
</template>

<script>
var echarts = require('echarts');
export default {
    data() {
        return {
            value: '',
            options: [],
            industyId: ''
        };
    },
    mounted() {
        this.EcharseXiaoyuer2();
        this.getIndustyData();
    },
    methods: {
        // 获取全部行业
        getIndustyData() {
            this.$axios.get('admin/industry/list').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.options = data.data;
                    }
                }
            });
        },
        changeIndusty(value) {
            this.industyId = value;
            this.EcharseXiaoyuer2();
        },
        EcharseXiaoyuer2() {
            let datas = {
                industryId: this.industyId
            };
            this.$axios.post('admin/job/dataCenter/getAdminResume', datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        let datasd = [];
                        data.data.data.educationDataDTOList.forEach(function (val, index) {
                            datasd[index] = val;
                            datasd[index].value = val.count;
                            datasd[index].name = val.education;
                        });
                        var myChart = echarts.init(this.$refs.main4);
                        // 指定图表的配置项和数据
                        var option = {
                            title: {
                                // text: '学历分布',
                                subtext: '',
                                left: 'center'
                            },
                            tooltip: {
                                // trigger: 'item',
                                formatter: '{a} <br/>{b} : {c} ({d}%)'
                            },
                            // legend: {
                            //     bottom: 10,
                            //     left: 'center'
                            //     // data: ['大专、本科及以上', '高中', '初中、中专', '小学及以下', '']
                            // },
                            series: [
                                {
                                    type: 'pie',
                                    radius: '65%',
                                    center: ['50%', '50%'],
                                    selectedMode: 'single',
                                    data: datasd
                                    // [
                                    //     {
                                    //         value: 1548,
                                    //         name: '大专、本科及以上',
                                    //         label: {
                                    //             backgroundColor: '#eee',
                                    //             borderColor: '#777',
                                    //             borderWidth: 1,
                                    //             borderRadius: 4
                                    //         }
                                    //     },
                                    //     { value: 735, name: '高中' },
                                    //     { value: 510, name: '初中、中专' },
                                    //     { value: 335, name: '小学及以下' }
                                    // ]
                                }
                            ]
                        };
                        // 使用刚指定的配置项和数据显示图表。
                        myChart.setOption(option);
                    }
                }
            });
        }
    }
};
</script>

<style>
</style>