<template>
    <div>
        <div class="rootbenClass" v-for="(item,index) in DataJudgment" :key="index">
            <forhaveInHand></forhaveInHand>
        </div>
    </div>
</template>

<script>
import forhaveInHand from '../conponents/forhaveInHand.vue';
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
        forhaveInHand
    }
};
</script>

<style scope>
.rootbenClass {
    padding: 10px 0;
    margin: 10px 0;
}
</style>