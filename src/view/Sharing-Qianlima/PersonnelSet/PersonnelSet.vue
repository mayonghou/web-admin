<template>
    <div class="table_css_xiaoyuer">
        <div class="top-compo">
            <!-- 千里马人员管理设置 -->
            <h4 class="h4Classqlm">功能设置</h4>
            <ul class="ClassUlLi">
                <li>
                    <span>未付款订单关闭时间：</span>
                    <Input v-model="ttlForOrder" placeholder="请输入......" style="width: 200px" />
                    <span>小时</span>
                </li>
                <li>
                    <span>平台指导价格设置：</span>
                </li>
                <li v-for="item in typeList" :key="item.id">
                    <span>{{item.name}}：</span>
                    <span class="count-files">
                        <div>
                            <p>价格</p>
                            <Input
                                v-model="item.sysRecommendPrice"
                                placeholder="200"
                                style="width: 100px"
                            />
                            <p>￥</p>
                        </div>
                    </span>
                </li>
            </ul>
            <div class="PrimaryPrimary">
                <Button type="primary" @click="qinlimaprice">保存</Button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            typeList: [
                {
                    id: '',
                    name: '',
                    sysRecommendPrice: 0
                }
            ],
            ttlForOrder: ''
        };
    },
    mounted() {
        this.getTypeList();
    },
    methods: {
        // 获取制作类型
        getTypeList() {
            this.$axios.get('admin/sideline/list_sideline_type').then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.ttlForOrder = data.ttlForOrder;
                        let typedata = [];
                        data.data.forEach(function (val, index) {
                            typedata[index] = val;
                            typedata[index].value = val.sysRecommendPrice;
                        });
                        this.typeList = typedata;
                    }
                }
            });
        },
        qinlimaprice() {
            let data = {
                recommendPrices: this.typeList,
                ttlForOrder: this.ttlForOrder //单位小时
            };
            this.$axios.post('admin/sideline/management/update_setting', data).then((res) => {
                if (res.status == 200) {
                    let datas = res.data;
                    if (datas.code == 200) {
                        this.$message({
                            showClose: true,
                            message: datas.msg,
                            type: 'success'
                        });
                        this.$router.push({
                            path: './Personnel'
                        });
                    } else {
                        this.$message({
                            showClose: true,
                            message: datas.msg,
                            type: 'error'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            });
        }
    }
};
</script>

<style scope>
.table_css_xiaoyuer {
    box-sizing: border-box;
    padding: 20px;
}
.top-compo {
    box-sizing: border-box;
    padding: 0 20px;
    margin-top: 20px;
}
.h4Classqlm {
    width: 100%;
    height: auto;
    background-color: #f5f9f1;
    box-sizing: border-box;
    padding: 16px 11px;
}
.ClassUlLi {
    width: 100%;
    height: auto;
}
.ClassUlLi li {
    display: flex;
    align-items: center;
    height: auto;
    width: 100%;
    margin: 5px 0px;
    list-style-type: none;
    line-height: 100%;
    padding: 15px 0px;
}
.ClassUlLi li span:nth-child(1) {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 200px;
    text-align: right;
    padding-right: 10px;
}
.ClassUlLi li span:nth-child(2) {
    box-sizing: border-box;
    padding: 10px;
}
.ClassUlLi li span:nth-child(3) {
    box-sizing: border-box;
    padding-left: 15px;
    flex-grow: 1;
}
.count-files {
    background-color: #0bd5d5;
    min-width: 200px;
    max-width: 200px;
    height: 90px;
}
.count-files div {
    width: 100%;
    height: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.count-files div input {
    margin: 0px 8px;
}
.PrimaryPrimary {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 90px;
}
.PrimaryPrimary button {
    padding: 0px 60px;
}
</style>
