<template>
    <div class="inputa-xiaoyuer">
        <span class="bgcolor-ng">￥</span>
        <span class="bgcolor-ng" ref="fontSize">{{ DataDataC }}</span>
        <span class="bgcolor-ng">
            <span class="span-posi-fa" @click="isShowAndHidden">
                <span class="span-posi">
                    <span class="iconBox" v-if="iSshowIfFalse">
                        <Icon type="md-eye-off" style="font-size:20px" />
                    </span>
                </span>
                <span class="span-posi">
                    <span class="iconBox" v-if="iSshowIfShow">
                        <Icon type="md-eye" style="font-size:20px" />
                    </span>
                </span>
            </span>
        </span>
    </div>
</template>

<script>
export default {
    props: ['DataDataA'],
    data() {
        return {
            iSshowIfFalse: true,
            iSshowIfShow: false,
            DataDataB: '******',
            DataDataC: ''
        };
    },
    methods: {
        isShowAndHidden() {
            this.iSshowIfFalse = !this.iSshowIfFalse;
            this.iSshowIfShow = !this.iSshowIfShow;
            this.DataDataC = this.DataDataB;
            if (this.iSshowIfFalse == true) {
                this.DataDataC = this.DataDataB;
            } else {
                this.DataDataC = this.DataDataA;
            }
            if (this.iSshowIfFalse == true) {
                this.DataDataC = this.DataDataB;
            }
        }
    },
    mounted() {
        this.isShowAndHidden();
    }
};
</script>

<style scoped>
.inputa-xiaoyuer {
    display: flex;
    align-items: center;
    justify-content: center;
}
.bgcolor-ng {
    display: inline-block;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}
.bgcolor-ng:nth-child(1) {
    color: darkorange;
}
.bgcolor-ng:nth-child(2) {
    padding: 0px 5px 0px 0px;
    min-width: 72px;
    max-width: auto;
    color: darkorange;
    line-height: 32px;
}
.bgcolor-ng:nth-child(3) {
    width: 32px;
    position: relative;
}
.span-posi-fa {
    width: 26px;
    height: 26px;
    position: relative;
}
.iconBox {
    display: inline-block;
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: 0;
    left: 3px;
    top: 3px;
}
</style>
