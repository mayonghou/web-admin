<template>
    <div>
        <div class="padding">
            <ViewEnterprise></ViewEnterprise>
        </div>
        <div class="JSechartsC">
            <JSecharts></JSecharts>
        </div>
        <div class="CountleftAndRight">
            <div class="CountleftAndRightnav">
                <listlef></listlef>
            </div>
            <div class="CountleftAndRightcount">
                <listRight></listRight>
            </div>
        </div>
    </div>
</template>

<script>
// import navdata from '../components/navdata.vue';
import ViewEnterprise from '../components/ViewEnterprise.vue';
import JSecharts from '../components/JSecharts.vue';
import listlef from '../components/listlef';
import listRight from '../components/listRight';
export default {
    data() {
        return {};
    },
    components: {
        ViewEnterprise,
        JSecharts,
        listlef,
        listRight
    }
};
</script>

<style scoped>
.padding {
    box-sizing: border-box;
    padding: 20px;
}
.CountleftAndRight {
    width: 100%;
    height: auto;
    display: flex;
}
.CountleftAndRight .CountleftAndRightnav {
    width: 35%;
    height: auto;
    padding-left: 20px;
}
.CountleftAndRight .CountleftAndRightcount {
    width: 65%;
    margin-left: 10px;
    padding-right: 20px;
}
.JSechartsC {
    padding: 20px;
    padding-bottom: 10px;
}
</style>