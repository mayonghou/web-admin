<template>
    <div>
        <div class="setPadding">
            <NavTopyuer :zhibiaoData="zhibiaoData" :status="status"></NavTopyuer>
        </div>
        <div class="setPadding">
            <EcharseXiaoyuer1 :status="status"></EcharseXiaoyuer1>
        </div>
        <div class="setPadding02">
            <div style="width:50%">
                <EcharseXiaoyuer2 :datasd="datasd"></EcharseXiaoyuer2>
            </div>
            <div style="width:50%; padding-left:10px">
                <div>
                    <bottomList :dataList="dataList"></bottomList>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavTopyuer from './components/NavTopyuer.vue';
import EcharseXiaoyuer1 from './components/EcharseXiaoyuer/EcharseXiaoyuer1';
import EcharseXiaoyuer2 from './components/EcharseXiaoyuer/EcharseXiaoyuer2';
import bottomList from './components/EcharseXiaoyuer/bottomList';

export default {
    data() {
        return {
            status: 1,
            zhibiaoData: '',
            datasd: [],
            dataList: [],
            industyId: ''
        };
    },
    mounted() {
        //关键指标
        this.getJobAdminData();
        this.getAdminResume();
    },
    methods: {
        //关键指标
        getJobAdminData() {
            this.$axios.post('admin/job/dataCenter/jobAdminData').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.zhibiaoData = data.data.data;
                    }
                }
            });
        },
        getResume(value) {
            this.industyId = value;
            this.getAdminResume();
        },
        //获取简历平台数据
        getAdminResume() {
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
                        this.datasd = datasd;
                        this.$nextTick(() => {
                            this.dataList = data.data.data.resumeDataDTOList;
                        });
                    }
                }
            });
        }
    },
    components: {
        NavTopyuer,
        EcharseXiaoyuer1,
        EcharseXiaoyuer2,
        bottomList
    }
};
</script>

<style scope>
@import '../Data-center.css';
</style>