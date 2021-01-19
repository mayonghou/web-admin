<template>
    <!-- 广告管理 -->
    <div>
        <tablea v-if="Datar18 != ''" :pageid="pageid" :Datar18="Datar18" :statusCode="statusCode"></tablea>
    </div>
</template>

<script>
import tablea from '../conponents/table/tablea/tablea.vue';
export default {
    data() {
        return {
            Datar18: '',
            // 数据发散
            pageid: [
                { pageid: 18 },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'ID',
                    slot: 'dataTanle',
                    width: 65,
                    align: 'center'
                },
                {
                    title: '广告位名称',
                    key: 'col1',
                    align: 'center'
                },
                {
                    title: '广告名称',
                    key: 'col2',
                    align: 'center'
                },
                {
                    title: '广告图片',
                    key: 'col3',
                    align: 'center',
                    render: (h, params) => {
                        return h(
                            'div',
                            {
                                attrs: {
                                    style: 'width:100%; height: auto;display:block;padding-top:15px;padding-bottom: 15px;'
                                }
                            },
                            [
                                h('img', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    attrs: {
                                        src: params.row.col3,
                                        style: 'width:100%; height: auto;'
                                    }
                                })
                            ]
                        );
                    }
                },
                {
                    title: '广告链接',
                    key: 'col4',
                    align: 'center'
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 90,
                    align: 'center'
                },
                {
                    dataTanle: '1',
                    col1: '万江烽火',
                    col2: '小鱼儿',
                    col3: 'IMG',
                    col4: 'IMGURL'
                }
            ],
            page: 1,
            limit: 20,
            counts: this.counts,
            // value2: ['2016-01-01', '2016-02-15'],
            // 时间段选择
            pickerOptions: {
                shortcuts: [
                    {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            },
            statusCode: ''
        };
    },
    watch: {
        Datar18: {
            handler(newdata, oldata) {
                this.Datar18 = newdata;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        // $ajax
        RequertDataert() {
            var url = 'admin/industry/advertise/list';
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200 && res.data.code == 200) {
                        const statusCode = res.data.code;
                        this.statusCode = statusCode;
                        var AjaxData = res.data.data;
                        var DataAjax18 = [];
                        var https = /^https.+$/;
                        AjaxData.forEach(function (val, index) {
                            DataAjax18[index] = val;
                            DataAjax18[index].dataTanle = val.id;
                            DataAjax18[index].col1 = val.note;
                            DataAjax18[index].col2 = val.name;
                            if (val.location == 0) {
                                val.location = '首页轮播图';
                            } else if (val.location == 1) {
                                val.location = '优惠券广告';
                            } else if (val.location == 2) {
                                val.location = '折扣专区广告';
                            } else if (val.location == 3) {
                                val.location = '清仓处理广告';
                            } else if (val.location == 4) {
                                val.location = '抽奖广告';
                            } else if (val.location == 5) {
                                val.location = '秒杀广告';
                            } else if (val.location == 6) {
                                val.location = '同城团购广告';
                            } else if (val.location == 7) {
                                val.location = '限时抢购广告';
                            }
                            DataAjax18[index].col4 = val.url;
                            if (https.test(val.image)) {
                                DataAjax18[index].col3 = val.image;
                            } else {
                                DataAjax18[index].col3 = localStorage.getItem('imgUrl') + val.image;
                            }
                        });
                        this.$nextTick(() => {
                            this.Datar18 = DataAjax18;
                        });
                    } else {
                        alert(res.data.msg);
                    }
                })
                .catch(() => {
                    this.$nextTick(() => {
                        this.Datar18 = [{ name: '暂无数据！' }];
                    });
                });
        }
    },
    mounted() {
        this.RequertDataert();
    },
    components: {
        tablea
    }
};
</script>

<style scope>
.table_css_xiaoyuer {
    box-sizing: border-box;
    padding: 20px;
}
.top-compo {
    box-sizing: border-box;
    padding: 0 20px;
    margin-top: 20px;
}
</style>
