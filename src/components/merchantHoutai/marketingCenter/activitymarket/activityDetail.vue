<template>
    <!-- 营销活动详情 -->
    <div class="marketactivity">
        <div class="marketactivity-top">
            <div class="top-title">
                <div class="title-time">
                    <div style="font-size: 16px;">{{this.actDetail.pushTime}}</div>
                    <span>
                        <i class="el-icon-view"></i>
                        <span>{{this.actDetail.browse}}</span>
                    </span>
                </div>
                <div class="title">
                    <h2>{{this.actDetail.title}}</h2>
                </div>
            </div>
            <div class="detail-text" v-html="this.actDetail.content"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'marketactivity',
    data() {
        return {
            actDetail: {}
        };
    },
    mounted() {
        this.getActivityDetail();
    },
    methods: {
        getActivityDetail() {
            console.log('sjafikj');

            this.$axios.get('admin/admin/market/activity/select/' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.actDetail = data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    });
                }
            });
        }
    }
};
</script>

<style scoped>
.marketactivity {
    box-sizing: border-box;
    padding: 20px;
    background: #f5f7fc;
}
.marketactivity-top {
    width: 80%;
    margin: 0 auto;
}
.marketactivity-top .top-title {
    width: 100%;
    height: 130px;
    padding: 20px;
    background: #fff;
}
.top-title .title-time {
    display: flex;
    justify-content: space-between;
    padding-left: 45%;
}
.title {
    width: 100%;
    text-align: center;
    margin-top: 20px;
}
.detail-text {
    margin-top: 20px;
}
.detail-text img {
    display: block;
}
</style>
