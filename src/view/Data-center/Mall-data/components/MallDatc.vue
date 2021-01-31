<template>
    <Card>
        <div class="abnfClassc">
            <div class="imgClass-xiaoyuerc">
                <div class="IconClssc">
                    <Icon type="logo-chrome" />
                </div>
            </div>
            <div class="imgClass-xiarc">
                <div class="IconClssfc">
                    <p class="fontSizec">
                        <span class="spanClassdfc">&nbsp;</span>
                        {{ MallData.Numcout }}
                    </p>
                    <p class="fontSize2c">{{ MallData.transaction }}</p>
                </div>
            </div>
        </div>
    </Card>
</template>

<script>
export default {
    props: ['sendGoodsTotal'],
    data() {
        return {
            MallData: {
                Numcout: this.sendGoodsTotal || 0,
                transaction: '今日出货量'
            }
        };
    }
};
</script>

<style scope>
.abnfClassc {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    background-color: #fd4d4f;
    padding: 20px;
    border-radius: 3px;
}
.imgClass-xiaoyuerc {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56px;
    color: #ffffff;
    opacity: 0.5;
}
.imgClass-xiarc {
    flex-grow: 1;
    height: auto;
}
.fontSizec {
    font-size: 28px;
    font-family: SourceHanSansSC-bold;
    color: #fff;
    padding: 10px 0;
    font-weight: 600;
}
.fontSize2c {
    font-size: 14px;
    font-family: SourceHanSansSC-bold;
    color: #fff;
    padding: 10px 0 0 30px;
}
.spanClassdfc {
    font-size: 20px;
}
</style>