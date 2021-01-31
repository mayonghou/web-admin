<template>
    <div>
        <div class="rootClass">
            <div
                class="xiaoyuerLXCLass"
                v-for="(item,index) in xyrData"
                :key="index"
                @click="RouterClickEvent(index)"
            >
                <div class="xiaoyuerLXCLass1">
                    <Icon type="md-analytics" :class="newArr01[index]" />
                </div>
                <div class="xiaoyuerLXCLass1">
                    <div :class="newArr02[index]">{{ item.numberD }}</div>
                    <div class="xiaoyuerLXCLass2_2_1">{{ item.Tilt }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //项目数据
            xyrData: [
                {
                    Tilt: '课程●视频',
                    numberD: '12345'
                },
                {
                    Tilt: '设计●图片',
                    numberD: '12345'
                },
                {
                    Tilt: '资料●文档',
                    numberD: '12345'
                },
                {
                    Tilt: '营销小知识',
                    numberD: '12345'
                },
                {
                    Tilt: '活动通知',
                    numberD: '12345'
                }
            ],
            // 布局数据01
            newArr01: [
                'xiaoyuerLXCLass1_1_1',
                'xiaoyuerLXCLass1_1_2',
                'xiaoyuerLXCLass1_1_3',
                'xiaoyuerLXCLass1_1_4',
                'xiaoyuerLXCLass1_1_5'
            ],
            // 布局数据02
            newArr02: [
                'xiaoyuerLXCLass2_1_1',
                'xiaoyuerLXCLass2_1_2',
                'xiaoyuerLXCLass2_1_3',
                'xiaoyuerLXCLass2_1_4',
                'xiaoyuerLXCLass2_1_5'
            ]
        };
    },
    methods: {
        RouterClickEvent(ind) {
            this.$router.push({
                path: './sonpagecent',
                query: {
                    ineryuer: ind
                }
            });
        }
    }
};
</script>

<style scope>
.rootClass {
    margin: 0 auto;
    padding: 20px 0;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
.xiaoyuerLXCLass {
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    margin: 10px;
}
.xiaoyuerLXCLass .xiaoyuerLXCLass1:nth-child(1) {
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.xiaoyuerLXCLass .xiaoyuerLXCLass1:nth-child(2) {
    flex-grow: 1;
    padding: 10px;
}
.xiaoyuerLXCLass .xiaoyuerLXCLass1:nth-child(2) .xiaoyuerLXCLass2_1,
.xiaoyuerLXCLass .xiaoyuerLXCLass1:nth-child(2) .xiaoyuerLXCLass2_2 {
    padding: 3px 0;
}
.xiaoyuerLXCLass1_1_1 {
    color: #007aff;
    font-size: 70px;
}
.xiaoyuerLXCLass1_1_2 {
    color: #ff3a30;
    font-size: 70px;
}
.xiaoyuerLXCLass1_1_3 {
    color: #ff9502;
    font-size: 70px;
}
.xiaoyuerLXCLass1_1_4 {
    color: #34c758;
    font-size: 70px;
}
.xiaoyuerLXCLass1_1_5 {
    color: #5756d7;
    font-size: 70px;
}
.xiaoyuerLXCLass2_1_1 {
    font-size: 28px;
    color: #007aff;
}
.xiaoyuerLXCLass2_1_2 {
    font-size: 28px;
    color: #ff3a30;
}
.xiaoyuerLXCLass2_1_3 {
    font-size: 28px;
    color: #ff9502;
}
.xiaoyuerLXCLass2_1_4 {
    font-size: 28px;
    color: #34c758;
}
.xiaoyuerLXCLass2_1_5 {
    font-size: 28px;
    color: #5756d7;
}
.xiaoyuerLXCLass2_2_1 {
    font-size: 18px;
    color: #aeaeb2;
}
</style>