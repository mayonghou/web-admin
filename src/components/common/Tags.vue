<template>
    <div class="titleDtata">
        <ul class="ulData">
            <span class="spanClass">&nbsp;</span>
            <li class="ulliData" v-for="(item, index) in listData" :key="index">
                <div ref="liDivf" class="liDiv">
                    <span
                        ref="listDa"
                        class="titleClass"
                        @click="routerClose(item, index)"
                    >{{ item.title }}</span>
                    <span ref="ishsow" class="lineClass" v-if="index != listData.length - 1">/</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import bus from './bus.js';
export default {
    data() {
        return {
            listData: [],
            xyrMsgTa: [],
            oldRouData: '',
            newRouData: ''
        };
    },
    watch: {
        $route: {
            handler(newvalue, oldvalue) {
                const da = {
                    name: newvalue.fullPath,
                    title: newvalue.meta.title
                };
                this.listData.push(da);
                for (let i = 1; i < this.listData.length; i++) {
                    for (let j = i + 1; j < this.listData.length; j++) {
                        if (this.listData[i].title == this.listData[j].title) {
                            this.listData.splice(j, 1);
                            j--;
                        }
                    }
                }
                if (oldvalue != undefined && oldvalue.fullPath == this.listData[this.listData.length - 1].name) {
                    this.listData.splice(this.listData.length - 1, 1);
                }
                this.$nextTick(() => {
                    this.xiaoyuer();
                });
            },
            immediate: true,
            deep: true
        }
    },
    created() {
        const obj = { title: '', name: '', titleName: '' };
        bus.$on('xiaoyuerfn', (xyr) => {
            obj.title = xyr.title;
            obj.name = xyr.name;
            this.listData = [];
            this.listData.unshift(obj);
        });
        bus.$on('xiaoyuerFunction', (dataXyr) => {
            obj.titleName = dataXyr.title;
            this.listData = [];
            this.listData.unshift(obj);
        });
        this.$nextTick(() => {
            this.xiaoyuer();
        });
    },
    mounted() {},
    methods: {
        xiaoyuer() {
            for (let i = 0; i < this.$refs.listDa.length; i++) {
                for (let j = 0; j < this.listData.length; j++) {
                    if (i == j) {
                        this.$refs.listDa[this.$refs.listDa.length - 1].classList.add('fontColor');
                    } else if (i != j) {
                        this.$refs.listDa[j].classList.remove('fontColor');
                    }
                }
                this.$refs.listDa[i].addEventListener('click', () => {
                    for (let j = 0; j < this.listData.length; j++) {
                        if (i == j) {
                            this.$refs.listDa[i].classList.add('fontColor');
                        } else if (i != j) {
                            this.$refs.listDa[j].classList.remove('fontColor');
                        }
                    }
                });
            }
        },
        routerClose(irem, index) {
            if (index < this.listData.length - 1 && index != 0) {
                this.listData.splice(index, this.listData.length - index);
            }
            if (this.listData.length > 0 && index != 0 && index != this.listData.length - 1) {
                this.$nextTick(() => {
                    this.$router.replace(irem.name);
                });
            }
        }
    }
};
</script>

<style>
.titleDtata {
    width: 98%;
    box-sizing: border-box;
    padding: 20px;
    position: absolute;
    background: #fff;
    box-shadow: 0px 0px 10px #c1c1c1;
    z-index: 999;
}
.ulData {
    display: flex;
    align-items: center;
}
.ulliData {
    display: flex;
    align-items: center;
    height: 20px;
    font-size: 14px;
    font-weight: 600;
    padding: 5px 0px;
}
.liDiv {
    width: 100%;
    height: auto;
    background-clip: red;
}
.ulliData span {
    display: inline-block;
}
.spanClass {
    display: inline-block;
    width: 4px;
    height: 20px;
    border-radius: 5px;
    margin-right: 15px;
    background-image: linear-gradient(#0dccff, #4760ff);
}
.lineClass {
    display: inline-block;
    padding: 0 8px;
    font-size: 16px;
    font-weight: 600;
}
.fontColor {
    color: #4985f0;
}
</style>
