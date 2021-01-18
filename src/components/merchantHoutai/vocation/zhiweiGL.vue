<template>
    <div class="zhiweiGL">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">
                <Zhiwei></Zhiwei>
            </el-tab-pane>
            <!-- <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
import Zhiwei from './zhiwei/zhiwei.vue';
export default {
    components: {
        Zhiwei
    },
    data() {
        return {
            activeName: 'first'
        };
    },
    methods: {
        handleClick(tab, event) {
            // console.log(tab, event);
        }
    }
};
</script>

<style>
.zhiweiGL {
    width: 1200px;
    margin-top: 10px;
}

.el-tabs__nav-scroll {
    width: 100%;
    background: #f5f9f1;
    height: 52px;
}

.el-tabs__item {
    width: 143px;
    height: 51px;
    line-height: 50px;
    text-align: center;
    border: 0px solid #fff;
}
.el-tabs__item.is-top.is-active {
    width: 143px;
    height: 51px;
    background: #2450d2;
    color: #fff;
}
</style>
