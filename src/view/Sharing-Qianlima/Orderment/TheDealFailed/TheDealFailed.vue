<template>
    <div>
        <div class="xiaouyerty">
            <forhaveInHand></forhaveInHand>
        </div>
        <div class="xiaouyerty">
            <forUnpaidPage></forUnpaidPage>
        </div>
        <div class="xiaouyerty">
            <forhaveInHand></forhaveInHand>
        </div>
        <div class="xiaouyerty">
            <forUnpaidPage></forUnpaidPage>
        </div>
        <div class="xiaouyerty">
            <forhaveInHand></forhaveInHand>
        </div>
    </div>
</template>

<script>
import forhaveInHand from '../conponents/forhaveInHand.vue';
import forUnpaidPage from '../conponents/forUnpaidPage.vue';
export default {
    data() {
        return {};
    },
    components: {
        forhaveInHand,
        forUnpaidPage
    }
};
</script>

<style scope>
.xiaouyerty {
    margin: 10px 0;
    padding: 10px 0px;
}
</style>