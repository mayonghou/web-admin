<template>
    <Card style="min-height:195px">
        <div class="abnfClass">
            <div class="imgClass-xiaoyuer">
                <div class="IconClss">
                    <Icon type="logo-chrome" />
                </div>
            </div>
            <div class="imgClass-xiar">
                <div class="IconClssf">
                    <p class="fontSize">
                        <span class="spanClassdf">￥</span>
                        {{ MallData.Numcout }}
                    </p>
                    <p class="fontSize2">{{ MallData.transaction }}</p>
                </div>
            </div>
        </div>
    </Card>
</template>

<script>
export default {
    props: ['saleTotal'],
    data() {
        return {
            MallData: {
                Numcout: this.saleTotal || 0,
                transaction: '今日交易总金额'
            }
        };
    }
};
</script>

<style scope>
.abnfClass {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    background-color: #36cfca;
    padding: 20px;
    border-radius: 3px;
}
.imgClass-xiaoyuer {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56px;
    color: #ffffff;
    opacity: 0.5;
}
.imgClass-xiar {
    flex-grow: 1;
    height: auto;
}
.fontSize {
    font-size: 28px;
    font-family: SourceHanSansSC-bold;
    color: #fff;
    padding: 10px 0;
    font-weight: 600;
}
.fontSize2 {
    font-size: 14px;
    font-family: SourceHanSansSC-bold;
    color: #fff;
    padding: 10px 0 0 30px;
}
.spanClassdf {
    font-size: 20px;
}
</style>