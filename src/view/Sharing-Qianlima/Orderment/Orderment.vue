<template>
    <div>
        <div>
            <ul class="ddglClassUl">
                <ol>
                    <li
                        ref="list"
                        :class="index == 0?'BGcolor':''"
                        v-for="(item,index) in navTab"
                        :key="index"
                    >{{item.title}}</li>
                </ol>
            </ul>
        </div>
        <div class="RouterClass">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navTab: [
                {
                    title: '未付款'
                },
                {
                    title: '进行中'
                },
                {
                    title: '已完成'
                },
                {
                    title: '交易失败'
                }
            ]
        };
    },
    mounted() {
        this.tabChangeBtn();
    },
    methods: {
        tabChangeBtn() {
            for (let i = 0; i < this.$refs.list.length; i++) {
                this.$refs.list[i].addEventListener('click', () => {
                    this.$refs.list[i].classList.add('BGcolor');
                    var siblings = this.$refs.list[i].parentNode.childNodes;
                    for (var j = 0; j < siblings.length; j++) {
                        if (siblings[j].nodeType == 1 && siblings[j] != this.$refs.list[i]) {
                            siblings[j].className = '';
                        }
                    }
                    if (i == 0) {
                        this.$router.push({
                            path: './UnpaidPage'
                        });
                    }
                    if (i == 1) {
                        this.$router.push({
                            path: './haveInHand'
                        });
                    }
                    if (i == 2) {
                        this.$router.push({
                            path: './CompletedPage'
                        });
                    }
                    if (i == 3) {
                        this.$router.push({
                            path: './TheDealFailed'
                        });
                    }
                });
            }
        }
    }
};
</script>

<style scope>
.ddglClassUl {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px;
    padding-bottom: 0;
}
.ddglClassUl ol {
    display: flex;
    background-color: #edf8ee;
}
.ddglClassUl ol li {
    list-style-type: none;
    padding: 15px 60px;
    font-size: 14px;
    border-radius: 3px;
}
.BGcolor {
    background-color: #2b9b27;
    color: #fff;
}
.RouterClass {
    box-sizing: border-box;
    padding: 20px;
    padding-top: 0;
}
</style>