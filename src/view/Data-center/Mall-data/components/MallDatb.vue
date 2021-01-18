<template>
    <Card>
        <div class="abnfClassa">
            <div class="imgClass-xiaoyuera">
                <div class="IconClssa">
                    <Icon type="logo-chrome" />
                </div>
            </div>
            <div class="imgClass-xiara">
                <div class="IconClssfa">
                    <p class="fontSizea">
                        <span class="spanClassdfa">￥</span>
                        {{ MallData.Numcout }}
                    </p>
                    <p class="fontSize2a">{{ MallData.transaction }}</p>
                </div>
            </div>
        </div>
    </Card>
</template>

<script>
export default {
    data() {
        return {
            MallData: {
                Numcout: '30000',
                transaction: '今日交易金额'
            }
        };
    }
};
</script>

<style scope>
.abnfClassa {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    background-color: #ffc439;
    padding: 20px;
    border-radius: 3px;
}
.imgClass-xiaoyuera {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56px;
    color: #ffffff;
    opacity: 0.5;
}
.imgClass-xiara {
    flex-grow: 1;
    height: auto;
}
.fontSizea {
    font-size: 28px;
    font-family: SourceHanSansSC-bold;
    color: #fff;
    padding: 10px 0;
    font-weight: 600;
}
.fontSize2a {
    font-size: 14px;
    font-family: SourceHanSansSC-bold;
    color: #fff;
    padding: 10px 0 0 30px;
}
.spanClassdfa {
    font-size: 20px;
}
</style>