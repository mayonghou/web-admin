<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <!-- <sidebardata></sidebardata> -->
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus';
// import sidebardata from './sidebardata.vue';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
        // sidebardata
    },
    created() {
        bus.$on('collapse-content', (msg) => {
            this.collapse = msg;
        });
    }
};
</script>
