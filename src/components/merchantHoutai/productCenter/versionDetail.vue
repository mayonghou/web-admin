<template>
    <!-- 版本想详情 -->
    <div class="versionDetail" id="versionDetail">
        <div class="versionDetail-top">
            <div class="top-title">
                <span></span>
                <span>{{time}}</span>
                <span style="font-size:14px; color:#C3C2C2;">
                    <i class="iconfont icon-ai-eye"></i>
                    {{viewCount}}次 浏览
                </span>
            </div>
            <div class="title">
                <span>{{versionName}}</span>
            </div>
        </div>
        <div class="detail" v-html="versionDescribe"></div>
    </div>
</template>

<script>
export default {
    name: 'versionDetail',
    data() {
        return {
            versionName: '',
            versionDescribe: '',
            viewCount: '',
            time: ''
        };
    },
    mounted() {
        this.getVersion();
    },
    methods: {
        getVersion() {
            this.$axios.get('admin/version/queryLastVersion').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.versionName = data.data.versionName;
                        this.versionDescribe = data.data.versionDescribe;
                        this.viewCount = data.data.viewCount;
                        this.time = data.data.date;
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
.versionDetail {
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    min-height: 817px;
    background: #f5f7fc;
}
.versionDetail-top {
    width: 80%;
    height: auto;
    margin: 0 auto;
    background: #fff;
}
.versionDetail-top .top-title {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    padding: 0 20px;
}
.versionDetail-top .top-title span:nth-child(2) {
    margin-left: 120px;
    display: block;
}
.title {
    font-size: 30px;
    font-family: SourceHanSansSC-regular;
    width: 100%;
    text-align: center;
    line-height: 70px;
}
.detail {
    padding: 20px 30px;
    width: 80%;
    margin: 0 auto;
}
.detail img {
    display: block;
}
</style>


