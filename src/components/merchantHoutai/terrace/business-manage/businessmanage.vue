<template>
    <div class="rootClasss">
        <div class="switchBtn">
            <span>功能分配</span>
            <span>企业合作管理</span>
        </div>
        <p class="ClassRoot" v-if="isShowinfor">设置企业可使用功能</p>
        <div v-if="iShow">
            <div class="rootClasss-count">
                <p class="rootClasss-count-p">工作台业务管理:</p>
                <div class="rootClasss-count-div">
                    <br />
                    <CheckboxGroup v-model="border">
                        <Checkbox label="商品管理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="视频管理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="动态管理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="招聘管理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="商机管理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="租房管理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="优惠券管理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="活动管理" border style="margin:10px;"></Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div class="rootClasss-count">
                <p class="rootClasss-count-p">活动管理:</p>
                <div class="rootClasss-count-div">
                    <br />
                    <CheckboxGroup v-model="border">
                        <Checkbox label="优惠券活动" border style="margin:10px;"></Checkbox>
                        <Checkbox label="折扣专区" border style="margin:10px;"></Checkbox>
                        <Checkbox label="清仓处理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="抽奖" border style="margin:10px;"></Checkbox>
                        <Checkbox label="秒杀" border style="margin:10px;"></Checkbox>
                        <Checkbox label="同城团购" border style="margin:10px;"></Checkbox>
                        <Checkbox label="限时抢购" border style="margin:10px;"></Checkbox>
                        <Checkbox label="企业活动" border style="margin:10px;"></Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div class="rootClasss-count">
                <p class="rootClasss-count-p">工作台信息管理:</p>
                <div class="rootClasss-count-div">
                    <br />
                    <CheckboxGroup v-model="border">
                        <Checkbox label="订单管理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="官网管理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="企业信息" border style="margin:10px;"></Checkbox>
                        <Checkbox label="团队管理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="授权管理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="数据中心" border style="margin:10px;"></Checkbox>
                        <Checkbox label="名片管理" border style="margin:10px;"></Checkbox>
                        <Checkbox label="代言管理" border style="margin:10px;"></Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div class="btmbuttom">
                <Button type="primary">保存</Button>
            </div>
        </div>
        <div v-if="iShowtwo">
            <tablexyr></tablexyr>
        </div>
        <div v-if="totalPage" class="totalPage">
            <!-- 分页 -->
            <el-pagination
                class="pagintion"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="counts"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import tablexyr from '../table-xyr/tablexyr.vue';
export default {
    data() {
        return {
            border: [],
            iShow: false,
            iShowtwo: false,
            isShowinfor: true,
            totalPage: false,
            page: 1,
            limit: 10,
            counts: 0
        };
    },
    components: {
        tablexyr
    },
    methods: {
        // swich
        switchBtn() {
            let awitchBtn = document.querySelectorAll('.switchBtn span');
            this.iShow = true;
            for (let i = 0; i < awitchBtn.length; i++) {
                awitchBtn[0].classList.add('clickEvent');
                awitchBtn[i].addEventListener('click', () => {
                    if (i == 0) {
                        awitchBtn[0].classList.add('clickEvent');
                        awitchBtn[1].classList.remove('clickEvent');
                        this.$nextTick(() => {
                            this.iShow = true;
                            this.iShowtwo = false;
                            this.isShowinfor = true;
                            this.totalPage = false;
                        });
                    } else if (i == 1) {
                        awitchBtn[1].classList.add('clickEvent');
                        awitchBtn[0].classList.remove('clickEvent');
                        this.$nextTick(() => {
                            this.iShow = false;
                            this.iShowtwo = true;
                            this.isShowinfor = false;
                            this.totalPage = true;
                        });
                    }
                });
            }
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
        },
        handleCurrentChange(val) {
            this.page = val;
        }
    },
    mounted() {
        this.switchBtn();
    }
};
</script>

<style scoped>
.rootClasss {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 50px 50px;
}
.rootClasss-count {
    display: flex;
    width: 100%;
    height: auto;
}
.rootClasss-count-p {
    width: 150px;
    margin: 10px 0px;
    text-align: right;
    margin-right: 10px;
    display: block;
}
.rootClasss-count-div {
    width: 100%;
}
.ClassRoot {
    margin: 36px 0px 43px 0px;
}
.btmbuttom {
    width: 100%;
    height: auto;
    padding: 20px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btmbuttom Button {
    padding: 0 50px;
}
.switchBtn span {
    padding: 10px 36px;
    border: solid 1px #2450d2;
}
.clickEvent {
    background-color: #2450d2;
    color: #fff;
}
.totalPage {
    box-sizing: border-box;
    padding: 40px 0px;
    text-align: center;
}
</style>