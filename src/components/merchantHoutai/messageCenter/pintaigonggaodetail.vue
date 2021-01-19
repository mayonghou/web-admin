<template>
    <!-- 品台公告列表 -->
    <div class="pintaigonggaodetail" id="pintaigonggaodetail">
        <div class="returnBens">
            <el-button class="return" type="primary" @click="returnBtn" round>返回</el-button>
        </div>
        <div class="pintaiDetail-top">
            <div class="pinDetail-time">
                <span style="width:40px;"></span>
                <span>{{this.times}}</span>
                <span>
                    <i class="iconfont icon-ai-eye"></i>
                    {{this.detaDAta.viewCount}}次浏览
                </span>
            </div>
            <div class="titlegonggao">{{this.detaDAta.title}}</div>
            <div class="textDetail" v-html="this.detaDAta.detail"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pintaigonggaodetail',
    data() {
        return {
            detaDAta: {},
            times: ''
        };
    },
    mounted() {
        this.getdetailData();
    },
    methods: {
        returnBtn() {
            this.$router.push({
                path: './messagelist'
            });
        },
        getdetailData() {
            console.log('daad');
            let id = this.$route.params.id || localStorage.getItem('pingtaiId');
            this.$axios.get('admin/platform/detail?id=' + id).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var date = new Date(parseInt(data.data.time));
                        var time =
                            date.getFullYear() +
                            '-' +
                            (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                            '-' +
                            date.getDate();
                        this.times = time;
                        this.detaDAta = data.data;
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
.pintaigonggaodetail {
    box-sizing: border-box;
    padding: 20px;
}
.returnBens {
    width: 90%;
    text-align: right;
}
.returnBens .return {
    width: auto;
    height: 30px;
    font-size: 16px;
    background: #42a7ff;
    padding: 0 10px;
}
.pintaiDetail-top {
    width: 70%;
    margin: 0 auto;
    margin-top: 20px;
}
.pinDetail-time {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
}
.titlegonggao {
    width: 100%;
    text-align: center;
    font-size: 26px;
}
.textDetail {
    margin-top: 20px;
}
</style>

