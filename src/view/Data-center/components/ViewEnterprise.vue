<template>
    <div class="rootClass">
        <div class="select">
            <div class="navtitle">查看行业</div>
            <div class="navcount" @click="selcectFun">
                <div class="navcounta">
                    <span>{{ this.titlsclick }}</span>
                    <span ref="iSif" class="spanIcon">
                        <Icon type="ios-arrow-down" class="icon" />
                    </span>
                </div>
                <transition name="fade">
                    <ul v-if="iShow">
                        <li
                            v-for="(item, index) in listData"
                            :key="index"
                            @click="selectfunction(item)"
                        >{{ item.name }}</li>
                    </ul>
                </transition>
            </div>
        </div>
        <div>
            <Row>
                <!-- <Col span="12"> -->
                <DatePicker
                    :value="TimeData"
                    format="yyyy-MM"
                    type="month"
                    placeholder="Select date"
                    style="width: 200px"
                    @on-change="timeDate"
                ></DatePicker>
                <!-- </Col> -->
            </Row>
        </div>
    </div>
</template>
<script>
import bus from '../../../components/common/bus.js';
export default {
    data() {
        return {
            TimeData: '',
            iShow: false,
            titlsclick: this.titlsclick,
            listData: []
        };
    },
    mounted() {
        // 获取当前时间
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month.toString().length < 10) {
            month = '0' + month;
        }
        this.TimeData = year + '-' + month;
        this.getIndustryList();
    },
    methods: {
        selcectFun(index) {
            let childIcon = this.$refs.iSif.childNodes;
            if (this.iShow == true) {
                this.iShow = false;
                for (let i = 0; i < childIcon.length; i++) {
                    childIcon[i].classList.add('transforma');
                    childIcon[i].classList.remove('transform');
                }
            } else if (this.iShow == false) {
                this.iShow = true;
                for (let i = 0; i < childIcon.length; i++) {
                    childIcon[i].classList.add('transform');
                    childIcon[i].classList.remove('transforma');
                }
            }
        },
        timeDate(value) {
            bus.$emit('timeData', value);
        },
        selectfunction(item) {
            this.titlsclick = item.name;
            bus.$emit('Industrydata', item);
        },
        // 获取所有行业
        getIndustryList() {
            this.$axios.get('admin/industry/list').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.listData = data.data;
                        this.titlsclick = this.listData[0].name;
                        bus.$emit('Industrydata', this.listData[0]);
                    }
                }
            });
        }
    }
};
</script>

<style scoped>
.select {
    position: relative;
    width: 250px;
    height: 36px;
    border: solid 1px #42a7ff;
    display: flex;
    line-height: 36px;
    border-radius: 3px;
    z-index: 99;
}
.navtitle {
    padding: 0px 20px;
    color: #42a7ff;
}
.navcount {
    flex-grow: 1;
}
.navcounta {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}
.icon {
    font-size: 16px;
}
ul {
    background-color: #fff;
    box-sizing: border-box;
    box-shadow: #e9e9e9 0 0 3px 3px;
    margin-top: 5px;
    border-radius: 5px;
    padding: 5px 0px;
    height: 252px;
    overflow: auto;
}
ul::-webkit-scrollbar {
    width: 0 !important;
}
li {
    list-style-type: none;
    padding: 0px 15px;
}
li:hover {
    background-color: #f3f3f3f3;
    transition: all 300ms;
}
.transform {
    transition: all 500ms;
    transform: rotate(180deg);
}
.transforma {
    transition: all 500ms;
    transform: rotate(0deg);
}
.rootClass {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0;
}
.spanIcon {
    padding-right: 15px;
}
</style>
