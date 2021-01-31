<template>
    <div>
        <div class="setPadding">
            <NavTopyuer :status="status" :houseData="houseData"></NavTopyuer>
        </div>
        <div class="setPadding">
            <EcharseXiaoyuer1 :status="status"></EcharseXiaoyuer1>
        </div>
    </div>
</template>

<script>
import NavTopyuer from '../Recruitment-data/components/NavTopyuer';
import EcharseXiaoyuer1 from '../Recruitment-data/components/EcharseXiaoyuer/EcharseXiaoyuer1';
export default {
    data() {
        return {
            status: 2,
            houseData: []
        };
    },
    components: {
        NavTopyuer,
        EcharseXiaoyuer1
    },
    mounted() {
        this.getAdminHouseData();
    },
    methods: {
        getAdminHouseData() {
            this.$axios.post('admin/renting/dataCenter/adminHouseData').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.$nextTick(() => {
                            this.houseData = data.data.data;
                        });
                    }
                }
            });
        }
    }
};
</script>

<style scope>
@import '../Data-center.css';
</style>