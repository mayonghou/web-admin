<template>
    <Card>
        <div class="EcharseStyle">
            <div class="SoneSty">
                <div class="positionR">
                    <div class="positionA">
                        <p>平台转化率</p>
                        <p>平台转化率</p>
                        <p>平台转化率</p>
                    </div>
                </div>
            </div>
            <div class="SoneSty">
                <div class="positionR">
                    <div class="positionB">
                        <p>平台转化率</p>
                        <p>平台转化率</p>
                        <p>平台转化率</p>
                    </div>
                </div>
            </div>
        </div>
    </Card>
</template>

<script>
export default {};
</script>

<style scope="this api replaced by slot-scope in 2.5.0+">
.EcharseStyle {
    display: flex;
}
.EcharseStyle .SoneSty {
    width: 50%;
    padding: 20px 10px;
}
.EcharseStyle .SoneSty .positionR {
    position: relative;
}
.EcharseStyle .SoneSty .positionR .positionA {
    position: absolute;
    right: 0;
    top: 0;
    width: 80%;
    height: 100%;
}
.EcharseStyle .SoneSty .positionR .positionB {
    width: 80%;
    height: 100%;
}
</style>