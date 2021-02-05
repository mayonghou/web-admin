<template>
    <!-- 数据中心 -->
    <div class="datacenter" id="datacenter">
        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="行业数据" name="first">
                <industrydata></industrydata>
            </el-tab-pane>
            <el-tab-pane label="我的数据" name="second">
                <myData></myData>
            </el-tab-pane>
        </el-tabs>-->
        <span
            class="dataCenteress"
            v-for="item in tabList"
            ref="tablist"
            :key="item.index"
            :class="item.index == 0?'active':''"
            @click="tabQiehuan(item)"
        >{{item.name}}</span>
        <router-view></router-view>
    </div>
</template>

<script>
// import industrydata from './industrydata/industrydata.vue';
// import myData from './myData/shoppingMall.vue';
export default {
    name: 'datecenter',
    // components: {
    //     industrydata,
    //     myData
    // },
    data() {
        return {
            tabList: [
                { index: 0, name: '行业数据' },
                { index: 1, name: '我的数据' }
            ],
            activeName: 'first'
        };
    },
    mounted() {},
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        tabQiehuan(item) {
            if (item.index == 0) {
                this.$router.push({
                    path: './industrydata'
                });
            } else if (item.index == 1) {
                this.$router.push({
                    path: './shoppingMall'
                });
            }
            for (let i = 0; i < this.$refs.tablist.length; i++) {
                if (item.index == i) {
                    this.$refs.tablist[i].classList.add('active');
                } else {
                    this.$refs.tablist[i].classList.remove('active');
                }
            }
        }
    }
};
</script>

<style>
.dataCenteress {
    width: 100px;
    height: 40px;
    display: inline-block;
    border: 1px solid #0000ff;
    text-align: center;
    line-height: 40px;
    cursor: pointer;
}
.dataCenteress.active {
    background: #0000ff;
    color: #fff;
}
.dataCenteress:hover {
    background: #0000ff;
    color: #fff;
}

.datacenter .el-tabs__header {
    background-color: #f5f9f1;
    height: 52px;
    line-height: 52px;
    font-size: 14px;
    margin: 0;
}

.datacenter .el-tabs__item {
    width: 80%;
    height: 52px;
    line-height: 52px;
    text-align: center;
    background-color: #fff;
    border: 1px solid #0000ff;
    color: #0000ff;
}
.datacenter .el-tabs__active-bar.is-top::after {
    width: 0;
    height: 0;
}
.datacenter .el-tabs__item.is-active {
    background-color: #2f24d2;
    color: #fff;
    border: 1px solid #0000ff;
}
.datacenter .el-tabs__nav-wrap::after {
    background-color: #fff;
}
.datacenter .el-tabs__active-bar {
    background-color: #0000ff;
}
.tablist {
    width: 120px;
    height: 46px;
    display: inline-block;
    line-height: 46px;
    text-align: center;
    cursor: pointer;
    border: 1px solid #c1c1c1;
    margin-left: 10px;
}
.tablist.active {
    background: #2f24d2;
    color: #fff;
    border: 0;
}
</style>
