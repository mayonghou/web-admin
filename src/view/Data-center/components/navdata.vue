<template>
    <div>
        <table>
            <thead>
                <tr>
                    <td
                        @click="changeBtn"
                        ref="list"
                        v-for="(item, index) in datalistrt"
                        :key="index"
                    >{{ item.btn }}</td>
                </tr>
            </thead>
        </table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            datalistrt: [
                {
                    btn: '行业数据'
                },
                {
                    btn: '商城数据'
                },
                {
                    btn: '招聘数据'
                },
                {
                    btn: '房源数据'
                }
            ]
        };
    },
    methods: {
        changeBtn() {
            for (let i = 0; i < this.$refs.list.length; i++) {
                this.$refs.list[0].classList.add('BGcolor');
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
                            path: './dataCenterindex'
                        });
                    }
                    if (i == 1) {
                        this.$router.push({
                            path: './Malldata'
                        });
                    }
                    if (i == 2) {
                        this.$router.push({
                            path: './Recruitmentdata'
                        });
                    }
                    if (i == 3) {
                        this.$router.push({
                            path: './housedata'
                        });
                    }
                });
            }
            this.$emit('changeBtn', 123);
        }
    },
    mounted() {
        this.changeBtn();
    }
};
</script>

<style scoped>
table {
    border-collapse: collapse;
}
td {
    padding: 10px 25px;
    border: #2f24d2 solid 1px;
}
.BGcolor {
    background-color: #2f24d2;
    color: #fff;
}
</style>

