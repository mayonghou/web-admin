<template>
    <div class="rootClasss">
        <div class="switchBtn">
            <span>功能分配</span>
            <span @click="Enterprisecooper">企业合作管理</span>
        </div>
        <p class="ClassRoot" v-if="isShowinfor">设置企业可使用功能</p>
        <div v-if="iShow">
            <div class="rootClasss-count">
                <p class="rootClasss-count-p">工作台业务管理:</p>
                <div class="rootClasss-count-div">
                    <br />
                    <CheckboxGroup v-model="border">
                        <Checkbox
                            v-for="item in dataer"
                            :label="item.id"
                            :key="item.id"
                            border
                            style="margin:10px;"
                        >{{ item.name }}</Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div class="rootClasss-count">
                <p class="rootClasss-count-p">活动管理:</p>
                <div class="rootClasss-count-div">
                    <br />
                    <CheckboxGroup v-model="border02">
                        <Checkbox
                            v-for="item in dataer2"
                            :key="item.id"
                            :label="item.id"
                            border
                            style="margin:10px;"
                        >{{ item.name }}</Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div class="rootClasss-count">
                <p class="rootClasss-count-p">工作台信息管理:</p>
                <div class="rootClasss-count-div">
                    <br />
                    <CheckboxGroup v-model="border03">
                        <Checkbox
                            v-for="item in dataer3"
                            :key="item.id"
                            :label="item.id"
                            border
                            style="margin:10px;"
                        >{{ item.name }}</Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div class="btmbuttom">
                <Button @click="preservation" type="primary">保存</Button>
            </div>
        </div>
        <div v-if="iShowtwo">
            <tablexyr></tablexyr>
        </div>
    </div>
</template>

<script>
import tablexyr from '../table-xyr/tablexyr.vue';
export default {
    data() {
        return {
            iShow: false,
            iShowtwo: false,
            isShowinfor: true,
            border: [],
            border02: [],
            border03: [],
            dataer: [],
            dataer2: [],
            dataer3: [],
            QyId: '',
            sn: ''
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
                        });
                    } else if (i == 1) {
                        awitchBtn[1].classList.add('clickEvent');
                        awitchBtn[0].classList.remove('clickEvent');
                        this.$nextTick(() => {
                            this.iShow = false;
                            this.iShowtwo = true;
                            this.isShowinfor = false;
                        });
                    }
                });
            }
        },
        // 保存
        preservation() {
            this.sn = this.border.join(',') + ',' + this.border02.join(',') + ',' + this.border03.join(',');
            this.preservationRequest();
        },
        // $ajax   //CheckBox
        httpRequestData() {
            const url = 'admin/company/element/list';
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        let datat = res.data;
                        if (datat.code == 200) {
                            let dataer = datat.data;
                            this.dataer = dataer.informationMgr;
                            this.dataer2 = dataer.companyMgr;
                            this.dataer3 = dataer.activityMgr;
                        }
                    }
                })
                .catch((err) => {});
        },
        //  保存
        preservationRequest() {
            const url = 'admin/company/manage?id=' + this.QyId + '&sn=' + this.sn;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        const rewu = res.data;
                        if (rewu.code == 200) {
                            alert(rewu.msg);
                            this.$router.push({
                                path: '/index'
                            });
                        } else {
                            alert('你未选择标签，不能进行保存！');
                        }
                    }
                })
                .catch((err) => {});
        },
        // 企业合作管理
        Enterprisecooper() {}
    },
    created() {
        this.QyId = this.$route.query.id;
    },
    mounted() {
        this.switchBtn();
        this.httpRequestData();
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
</style>