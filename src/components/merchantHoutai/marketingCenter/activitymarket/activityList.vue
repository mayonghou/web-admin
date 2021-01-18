<template>
    <!-- 营销活动列表页 -->
    <div class="activityList" id="activityList">
        <ul>
            <li class="list-li" v-for="item in this.activityList" :key="item.id">
                <div class="list-body" @click="activityDetail(item)">
                    <div class="List-title">{{ item.title }}</div>
                    <div class="pImg" v-html="item.content"></div>
                    <i style="font-size: 24px" class="el-icon-right"></i>
                </div>
            </li>
        </ul>
        <el-pagination
            class="el-pagination"
            background
            @prev-click="prev_click"
            @next-click="next_click"
            @current-change="current_change"
            :current-page="page"
            :page-size="limit"
            :total="counts"
            layout="prev, pager, next"
        ></el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            limit: 10,
            counts: this.coutns || 10,
            activityList: []
        };
    },
    mounted() {
        this.getActiviyList();
    },
    methods: {
        activityDetail(item) {
            this.$router.push({
                path: './activityDetail',
                query: {
                    id: item.id
                }
            });
        },
        prev_click(e) {
            this.page = e;
            this.getActiviyList();
        },
        next_click(e) {
            this.page = e;
            this.getActiviyList();
        },
        current_change(e) {
            this.page = e;
            this.getActiviyList();
        },
        getActiviyList() {
            let datas = {
                page: this.page,
                limit: this.limit
            };
            this.$axios.get('admin/admin/market/activity/selectAllMarketActivity', datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.activityList = data.data.data;
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
.activityList {
    box-sizing: border-box;
    padding: 20px;
}
.list-li {
    list-style: none;
}
.activityList .list-li .list-body {
    width: 80%;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}
.activityList .list-li .list-body .List-title {
    position: absolute;
    left: 40%;
    font-size: 26px;
    top: 30px;
}

.list-li .list-body .pImg img {
    height: 130px;
    width: 130px;
    display: inline-block;
    margin-right: 20px;
}
.el-pagination {
    width: 100%;
    text-align: center;
    margin-top: 20px;
}
</style>
