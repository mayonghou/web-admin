<template>
    <div>
        <div class="setPadding">
            <div>
                <MallData></MallData>
            </div>
            <div>
                <MallDatb></MallDatb>
            </div>
            <div>
                <MallDatc></MallDatc>
            </div>
            <div>
                <MallDatd></MallDatd>
            </div>
        </div>
        <div class="secondCLass">
            <div class="OneClass">
                <Statisticsa></Statisticsa>
            </div>
            <div class="TwoClass">
                <Statisticsa></Statisticsa>
            </div>
        </div>
        <div class="secondCLass">
            <div>
                <div class="loyadClass">
                    <div class="three" v-for="(item,index) in 3" :key="index">
                        <listTable></listTable>
                    </div>
                </div>
                <div class="xiaoyuer-f">
                    <Echarse></Echarse>
                </div>
            </div>
            <div class="xiaoyuer-d">
                <rightcode></rightcode>
            </div>
        </div>
        <div class="midliieClassStyle">
            <div class="firstChild">
                <div>asdasd</div>
                <div>asdasd</div>
            </div>
            <div class="secondChild">asdasd</div>
        </div>
    </div>
</template>

<script>
import MallData from './components/MallData.vue';
import MallDatb from './components/MallDatb.vue';
import MallDatc from './components/MallDatc.vue';
import MallDatd from './components/MallDatd.vue';
import Statisticsa from './components/Statisticsa.vue';
import listTable from './components/listTable.vue';
import Echarse from './components/Echarse.vue';
import rightcode from './components/rightcode.vue';
export default {
    data() {
        return {};
    },
    components: {
        MallData,
        MallDatb,
        MallDatc,
        MallDatd,
        Statisticsa,
        listTable,
        Echarse,
        rightcode
    }
};
</script>

<style scope>
@import '../Data-center.css';
.setPadding {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.setPadding div {
    flex-grow: 1;
    margin: 0 5px;
    margin: 5px;
}
.secondCLass {
    padding: 0px 30px 20px 30px;
    display: flex;
    justify-content: space-between;
}
.secondCLass div {
    width: 100%;
}
.secondCLass .OneClass {
    padding-right: 10px;
}
.secondCLass .TwoClass {
    padding-left: 10px;
}
.loyadClass {
    display: flex;
}
.loyadClass .three:nth-child(2) {
    padding: 0 10px;
}
.secondCLass .xiaoyuer-d {
    height: auto;
    width: 350px;
    padding-left: 10px;
}
.xiaoyuer-f {
    padding: 10px 0;
    height: auto;
}
.midliieClassStyle {
    width: 100%;
    box-sizing: border-box;
    padding: 10px 30px;
    display: flex;
    justify-content: space-between;
}
.midliieClassStyle .firstChild {
    background-color: red;
    flex-grow: 1;
}
.midliieClassStyle .secondChild {
    background-color: gold;
    width: 320px;
    box-sizing: border-box;
    margin-left: 10px;
}
</style>