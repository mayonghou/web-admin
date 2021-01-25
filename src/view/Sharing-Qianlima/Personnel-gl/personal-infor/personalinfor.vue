<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">
            <span class="checkbtn" @click="personnelinfomation">个人信息</span>
            <span class="checkbtn" @click="managerset">管理设置</span>
        </h4>
        <div class="positionClass">
            <div class="positionClassa" v-if="isHowifa">
                <infor :DetailsData="DetailsData"></infor>
            </div>
            <div class="positionClassb" v-if="isHowifb">
                <inforset :id="id"></inforset>
            </div>
        </div>
    </div>
</template>

<script>
import infor from '../component/infor.vue';
import inforset from '../component/inforset.vue';
export default {
    data() {
        return {
            id: '',
            isHowifa: false,
            isHowifb: true,
            DetailsData: ''
        };
    },
    methods: {
        personnelinfomation() {
            this.DetailsData = this.$route.query.Data;
            this.id = this.$route.query.Data.id;
            this.$nextTick(() => {
                this.isHowifa = true;
            });
        },
        managerset() {}
    },
    watch: {},
    mounted() {
        var checkBtn = document.querySelectorAll('.checkbtn');
        for (let i = 0; i < checkBtn.length; i++) {
            this.isHowifb = false;
            checkBtn[0].classList.add('changeStatus');
            checkBtn[i].addEventListener('click', () => {
                if (i == 0) {
                    checkBtn[0].classList.add('changeStatus');
                    checkBtn[1].classList.remove('changeStatus');
                    this.isHowifa = true;
                    this.isHowifb = false;
                } else if (i == 1) {
                    checkBtn[1].classList.add('changeStatus');
                    checkBtn[0].classList.remove('changeStatus');
                    this.isHowifb = true;
                    this.isHowifa = false;
                }
            });
        }
        this.personnelinfomation();
    },
    components: {
        infor,
        inforset
    }
};
</script>

<style scoped>
.checkbtn {
    width: 120px;
    height: 46px;
    text-align: center;
    line-height: 46px;
    display: inline-block;
    border: solid 1px #2450d2;
    color: #2450d2;
}
.changeStatus {
    background-color: #2450d2;
    color: #fff;
}
.positionClass {
    position: relative;
}
.positionClassa {
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
}
.positionClassb {
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 101;
}
</style>
