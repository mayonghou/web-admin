<template>
    <ul>
        <li v-for="(item,index) in listDataer" :key="index">
            <div class="rootClassList">
                <div class="rootClassLeft">
                    <div
                        ref="refsDiv1"
                        :style="index ==( listDataer.length -1) ? 'background-color: transparent;':''"
                    >&nbsp;</div>
                    <div ref="refsDiv2" :class="cur">&nbsp;</div>
                    <div
                        ref="refsDiv3"
                        :style="index == 0 ? 'background-color: transparent;':''"
                    >&nbsp;</div>
                </div>
                <div class="rootClassRight">
                    <div>
                        <h4>{{ item.titler }}</h4>
                        <p>{{ item.dataer }}</p>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    data() {
        return {
            cur: 'cur',
            listDataer: [
                {
                    titler: '餐饮业昨日浏览量',
                    dataer: '123456'
                },
                {
                    titler: '餐饮业昨日订单量',
                    dataer: '888888'
                },
                {
                    titler: '同行业转让商家数据',
                    dataer: '999999'
                },
                {
                    titler: '餐饮业商家数据',
                    dataer: '456789'
                },
                {
                    titler: '餐饮业平台联系次数',
                    dataer: '895612'
                }
            ]
        };
    },
    methods: {
        xiaoyuer() {
            for (let i = 0; i < this.$refs.refsDiv2.length; i++) {
                this.$refs.refsDiv2[i].classList.add('cur' + i);
            }
        }
    },
    mounted() {
        this.xiaoyuer();
    }
};
</script>

<style scope>
li {
    list-style-type: none;
}
.rootClassList {
    display: flex;
    align-items: center;
}
.rootClassLeft {
    display: flex;
    width: 90px;
    height: 72px;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
}
.rootClassLeft div:nth-child(1),
.rootClassLeft div:nth-child(3) {
    width: 2px;
    height: 100%;
    background-color: #efefef;
}
.rootClassLeft div:nth-child(2) {
    width: 15px;
    height: 15px;
    border-radius: 10px;
}
.rootClassRight {
    flex-grow: 1;
    height: 72px;
    display: flex;
    align-items: center;
}
.cur0 {
    background-image: linear-gradient(#1099d0, #41dcd6);
}
.cur1 {
    background-image: linear-gradient(#966ffa, #ff4c99);
}
.cur2 {
    background-image: linear-gradient(#f3646c, #f6c988);
}
.cur3 {
    background-image: linear-gradient(#7956fd, #a5c6fe);
}
.cur4 {
    background-image: linear-gradient(#ffab96, #ff0f47);
}
.vur1 {
    background-color: hotpink;
}
</style>