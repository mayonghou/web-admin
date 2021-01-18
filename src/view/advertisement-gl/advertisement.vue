<template>
<!-- 广告管理 -->
    <div>
        <tablea v-if="Datar18 != ''" :pageid="pageid" :Datar18='Datar18'></tablea>
    </div>
</template>

<script>
import tablea from '../conponents/table/tablea/tablea.vue';
export default {
    data() {
        return {
            Datar18:'',
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
                    align: 'center',
                },
                {
                    title: '广告名称',
                    key: 'col2',
                    align: 'center',
                },
                {
                    title: '广告图片',
                    key: 'col3',
                    align: 'center',
                },
                {
                    title: '广告链接',
                    key: 'col4',
                    align: 'center',
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
                    col4: 'IMGURL',
                }
            ],

            page: 1,
            limit: 20,
            counts: this.counts || 1,
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
        };
    },
    methods: {
        // 分页
        handleSizeChange(val) {
            this.limit = val;
        },
        handleCurrentChange(val) {
            this.page = val;
        }
    },
    mounted(){
        var url = 'admin/industry/advertise/list';
        this.$axios.get(url).then((res)=>{
            if(res.status == 200 && res.data.code ==200){
                var AjaxData18 = res.data.data;
                this.$nextTick(() => {
                    this.Datar18 = AjaxData18;
                })
            }else{
                alert(res.data.msg)
            }
        }).catch(()=>{

        })
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
