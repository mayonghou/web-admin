<template>
    <Card>
        <div class="abnfClassd">
            <div class="imgClass-xiaoyuerd">
                <div class="IconClssd">
                    <Icon type="logo-chrome" />
                </div>
            </div>
            <div class="imgClass-xiard">
                <div class="IconClssfd">
                    <p class="fontSized">
                        <span class="spanClassdfd">￥</span>
                        {{ MallData.Numcout }}
                    </p>
                    <p class="fontSize2d">{{ MallData.transaction }}</p>
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
.abnfClassd {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    background-color: #42a7ff;
    padding: 20px;
    border-radius: 3px;
}
.imgClass-xiaoyuerd {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56px;
    color: #ffffff;
    opacity: 0.5;
}
.imgClass-xiard {
    flex-grow: 1;
    height: auto;
}
.fontSized {
    font-size: 28px;
    font-family: SourceHanSansSC-bold;
    color: #fff;
    padding: 10px 0;
    font-weight: 600;
}
.fontSize2d {
    font-size: 14px;
    font-family: SourceHanSansSC-bold;
    color: #fff;
    padding: 10px 0 0 30px;
}
.spanClassdfd {
    font-size: 20px;
}
</style>