<template>
    <div>
        <div class="padding">
            <navdata></navdata>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import navdata from './components/navdata.vue';
export default {
    data() {
        return {};
    },
    components: {
        navdata
    }
};
</script>

<style scoped>
.padding {
    box-sizing: border-box;
    padding: 20px;
}
</style>