<template>
    <div>
        <!-- 进行中 -->
        <div class="rootbenClass" v-for="(item,index) in DataJudgment" :key="index">
            <forUnpaidPage></forUnpaidPage>
        </div>
    </div>
</template>

<script>
import forUnpaidPage from '../conponents/forUnpaidPage.vue';
export default {
    data() {
        return {
            DataJudgment: [
                {
                    DataJ: ''
                },
                {
                    DataJ: ''
                },
                {
                    DataJ: ''
                }
            ]
        };
    },
    components: {
        forUnpaidPage
    }
};
</script>

<style scope>
.rootbenClass {
    padding: 10px 0;
    margin: 10px 0;
}
</style>