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
                        >{{ item.title }}</li>
                    </ul>
                </transition>
            </div>
        </div>
        <div>
            <Row>
                <Col span="12">
                    <DatePicker
                        :value="TimeData"
                        format="yyyy年MM月dd日"
                        type="date"
                        placeholder="Select date"
                        style="width: 200px"
                    ></DatePicker>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            TimeData: '2020年12月20日',
            iShow: false,
            titlsclick: '默认选项值',
            listData: [
                {
                    title: '服装f是儿'
                },
                {
                    title: '餐饮行业'
                },
                {
                    title: '旅游业'
                },
                {
                    title: '美容也'
                },
                {
                    title: '服务型行业'
                },
                {
                    title: '餐饮行业'
                },
                {
                    title: '旅游业'
                },
                {
                    title: '美容也'
                }
            ]
        };
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
        selectfunction(item) {
            this.titlsclick = item.title;
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
