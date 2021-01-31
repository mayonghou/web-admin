<template>
    <div class="activityDataList">
        <ul class="activityUI">
            <li class="activityLi">
                <div>
                    <h2>大姐夫iOS额地方集合大家好赛麟</h2>
                    <span>大萨达撒多萨达萨达 大的萨达</span>
                </div>
                <div>
                    <i style="font-size: 30px;" class="el-icon-right"></i>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'activityDataList',
    data() {
        return {};
    },
    mounted() {},
    methods: {}
};
</script>

<style scoped>
.activityDataList {
    padding: 0px;
    box-sizing: border-box;
}
.activityUI .activityLi {
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 300px;
    width: 100%;
    padding: 0 10%;
    background: #f6f6f6;
    cursor: pointer;
}
</style>