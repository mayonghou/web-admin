<template>
    <div>
        <div class="contrastTile">
            <span>我方公司</span>
            <span>对方公司</span>
        </div>
        <div class="countClass">
            <div class="countClasser" v-for="(item,index) in 5" :key="index">
                <span>
                    <div ref="countData">&nbsp;</div>
                </span>
                <span>购买用户</span>
                <span>
                    <div ref="countDataer">&nbsp;</div>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataData: ['20%', '40%', '60%', '80%', '100%'],
            dataDataer: ['20%', '40%', '60%', '80%', '100%']
        };
    },
    methods: {
        fn() {
            for (let i = 0; i < this.dataData.length; i++) {
                this.$refs.countData[i].style.width = this.dataData[i];
                this.$refs.countDataer[i].style.width = this.dataDataer[i];
            }
        }
    },
    mounted() {
        this.fn();
    }
};
</script>

<style scoped>
.contrastTile {
    width: 100%;
    height: auto;
    margin: 20px 0px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0px 80px;
}
.countClass {
    width: 100%;
    height: 100%;
}
.countClasser {
    width: 100%;
    height: 10px;
    display: flex;
    justify-content: space-between;
    margin: 36px 0px;
    align-items: center;
}
.countClasser span:nth-child(1) {
    display: flex;
    flex-direction: row-reverse;
    flex-grow: 1;
}
.countClasser span:nth-child(1) div {
    width: 100%;
    height: 12px;
    border-radius: 12px;
    background-color: #00a8b3;
}
.countClasser span:nth-child(2) {
    width: 90px;
    text-align: center;
}
.countClasser span:nth-child(3) {
    flex-grow: 1;
}
.countClasser span:nth-child(3) div {
    height: 12px;
    border-radius: 12px;
    background-color: #4d6fb7;
}
</style>