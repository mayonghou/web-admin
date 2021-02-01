<template>
    <div class="titleDtata">
        <Breadcrumb>
            <BreadcrumbItem v-for="(item,index)  in BusRouterData" :key="index">
                <Icon type="ios-arrow-dropright" />
                <span class="xiaoyuerSpan" @click="xiaoyuerTags(item)">
                    <span class="SonClass">{{ item.MainTitle }}</span>
                </span>
            </BreadcrumbItem>
        </Breadcrumb>
    </div>
</template>

<script>
import bus from './bus.js';
export default {
    data() {
        return {
            BusRouterData: [],
            isNew: ['/dataCenterindex', '/marketingindex', '/productindex'], //qyId =0
            isNew1: ['/indexshouye', '/datacenter', '/marketing', '/product'], //qyId !=0
            isNew2: ['/dataCenterindex', '/Malldata', '/Recruitmentdata', '/housedata'], // dataCenterindex  qyId =0
            isNew3: ['/Orderment', '/UnpaidPage', '/haveInHand', '/CompletedPage', '/TheDealFailed'] // Orderment  qyId =0
        };
    },
    watch: {
        $route: {
            handler(newvalue, oldvalue) {
                // left
                this.BusRouterData.push({
                    MainTitle: newvalue.meta.title,
                    RouterPath: newvalue.fullPath
                });
                for (let i = 1; i < this.BusRouterData.length; i++) {
                    for (let j = i + 1; j < this.BusRouterData.length; j++) {
                        if (this.BusRouterData[i].MainTitle == this.BusRouterData[j].MainTitle) {
                            this.BusRouterData.splice(j, 1);
                            j--;
                        }
                    }
                }
                if (
                    // top     qyId==0
                    newvalue.fullPath == this.isNew[0] ||
                    newvalue.fullPath == this.isNew[1] ||
                    (newvalue.fullPath == this.isNew[2] && localStorage.getItem('loginData') == 0)
                ) {
                    this.BusRouterData = [];
                    this.BusRouterData.push({
                        MainTitle: newvalue.meta.title
                    });
                } else if (
                    // top     qyId !=0
                    newvalue.fullPath == this.isNew1[0] ||
                    newvalue.fullPath == this.isNew1[1] ||
                    newvalue.fullPath == this.isNew1[2] ||
                    (newvalue.fullPath == this.isNew1[3] && localStorage.getItem('loginData') != 0)
                ) {
                    this.BusRouterData = [];
                    this.BusRouterData.push({
                        MainTitle: newvalue.meta.title
                    });
                } else if (
                    // top     dataCenterindex     qyId !=0
                    newvalue.fullPath == this.isNew2[0] ||
                    newvalue.fullPath == this.isNew2[1] ||
                    newvalue.fullPath == this.isNew2[2] ||
                    (newvalue.fullPath == this.isNew2[3] && localStorage.getItem('loginData') == 0)
                ) {
                    this.BusRouterData.splice(1);
                    this.BusRouterData.push({
                        MainTitle: newvalue.meta.title
                    });
                } else if (
                    // top     UnpaidPage     qyId !=0
                    newvalue.fullPath == this.isNew3[0] ||
                    newvalue.fullPath == this.isNew3[1] ||
                    newvalue.fullPath == this.isNew3[2] ||
                    newvalue.fullPath == this.isNew3[3] ||
                    (newvalue.fullPath == this.isNew3[4] && localStorage.getItem('loginData') == 0)
                ) {
                    this.BusRouterData.splice(1);
                    this.BusRouterData.push({
                        MainTitle: newvalue.meta.title
                    });
                }
                // return
                if (oldvalue != undefined && oldvalue.meta.title == this.BusRouterData[this.BusRouterData.length - 1].MainTitle) {
                    this.BusRouterData.splice(this.BusRouterData.length - 1, 1);
                }
            },
            immediate: true,
            deep: true
        }
    },
    computed: {},
    created() {},
    mounted() {
        this.xiaoyuerFunctions1();
        this.xiaoyuerFunctions2();
    },
    methods: {
        xiaoyuerFunctions1() {
            bus.$on('SidebarFn1', (SideSon1) => {
                if (SideSon1[1] == 'Sid1') {
                    this.BusRouterData = [];
                    this.BusRouterData.push({
                        MainTitle: SideSon1[0].title
                    });
                } else {
                }
            });
        },
        xiaoyuerFunctions2() {
            bus.$on('SidebarFn2', (SideSon2) => {
                if (SideSon2) {
                    this.BusRouterData.splice(1);
                } else {
                }
            });
        },
        xiaoyuerTags(item) {
            this.$router.push({
                path: item.RouterPath
            });
        }
    }
};
</script>

<style scope>
@import './Tags.css';
</style>
