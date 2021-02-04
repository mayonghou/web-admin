<template>
    <!-- 发布商机 -->
    <div
        class="lookbusiness"
        id="lookbusiness"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="addbusiness-top">
            <label>商机详情</label>
        </div>
        <el-form :model="lookbus">
            <el-form-item label="商机标题:" :label-width="labelwidth">
                <label class="elinput">{{lookbus.busTitle}}</label>
            </el-form-item>
            <el-form-item label="行业类型:" :label-width="labelwidth">
                <label class="elinput">{{lookbus.hangyeleixing}}</label>
            </el-form-item>
            <el-form-item label="商机类型:" :label-width="labelwidth">
                <label class="elinput">{{lookbus.busleixing}}</label>
            </el-form-item>
            <el-form-item label="商机标签:" :label-width="labelwidth">
                <el-tag
                    :key="item"
                    v-for="item in this.lookbus.tdynamicTags"
                    v-model="lookbus.tdynamicTags"
                    class="eltag"
                >{{item}}</el-tag>
            </el-form-item>
            <el-form-item label="商机图片:" :label-width="labelwidth">
                <label style="color: #C1C1C1; display: block;">(轮播展示图)</label>
                <div v-for="(item,index) in this.lookbus.shangjiimgUrl" :key="index">
                    <img v-if="item != ''" class="img" :src="item" />
                </div>
            </el-form-item>
            <el-form-item label="项目描述:" :label-width="labelwidth">
                <div class="sadsa" v-html="lookbus.xiangmumiaoshu"></div>
            </el-form-item>
            <el-form-item label="项目所在地:" :label-width="labelwidth">
                <label>{{this.lookbus.address}}</label>
                <label
                    v-if="lookbus.detailaddress != ''"
                    style="margin-left: 30px;"
                >详细地址：{{this.lookbus.detailaddress}}</label>
            </el-form-item>
        </el-form>
        <div class="returnBtn">
            <el-button @click="returnbus" class="addbusBtn">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'lookbusiness',
    data() {
        return {
            labelwidth: '40%',
            inputVisible: false,
            inputValue: '',
            editorOption: {},
            fullscreenLoading: true,
            loadingText: '加载中...',
            lookbus: {
                busTitle: '',
                hangyeleixing: '',
                eltag: [],
                shangjiimgUrl: '',
                xiangmumiaoshu: ``,
                detailaddress: ''
            }
        };
    },
    mounted() {
        this.getqueryAllChanceType();
        this.getIndustryData();
        this.getChanceInfo();
    },
    methods: {
        handleClose(tdynamicTags) {
            this.lookbus.tdynamicTags.splice(this.lookbus.tdynamicTags.indexOf(tdynamicTags), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick((_) => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.lookbus.tdynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        returnbus() {
            this.$router.push({
                path: './business'
            });
        },
        // 行业类型查询
        getIndustryData() {
            this.$axios.get('api/home/industry').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.option = data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    });
                }
            });
        },
        // 查询商机类型
        getqueryAllChanceType() {
            this.$axios.get('api/chance/queryAllChanceType').then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.busOption = data.data;
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    });
                }
            });
        },
        // 详情查询
        getChanceInfo() {
            this.$axios.get('admin/chance/chanceInfo?chanceId=' + this.$route.query.id).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        let formData = data.data;
                        this.lookbus.busTitle = formData.title;
                        if (formData.label) {
                            var labelText = [];
                            formData.label.split(',').forEach(function (val, index) {
                                labelText[index] = val;
                            });
                            this.lookbus.tdynamicTags = labelText;
                        }
                        if (formData.pic) {
                            var aaas = /^(https):\/\//;
                            var list = [];
                            formData.pic.split(',').forEach(function (val, index) {
                                list[index] = localStorage.getItem('imgUrl') + val;
                            });
                            this.lookbus.shangjiimgUrl = list;
                        }
                        this.lookbus.xiangmumiaoshu = formData.projectDescribe;
                        this.lookbus.address = formData.province + formData.city + formData.region;
                        this.lookbus.detailaddress = formData.detailAddress;
                        // 行业类型转换

                        if (this.option) {
                            var name = '';
                            this.option.forEach(function (val, index) {
                                if (formData.industryType == val.id) {
                                    name = val.name;
                                }
                            });
                            this.lookbus.hangyeleixing = name;
                        }

                        // 商机类型转换
                        if (this.busOption) {
                            var shoppleixing = '';
                            this.busOption.forEach(function (val, index) {
                                if (formData.type == val.id) {
                                    shoppleixing = val.name;
                                }
                            });
                            this.lookbus.busleixing = shoppleixing;
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                        this.$router.push({
                            path: './business'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    });
                    this.$router.push({
                        path: './business'
                    });
                }
            });
        }
    }
};
</script>

<style>
.lookbusiness {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}

.addbusiness-top {
    width: 100%;
    height: 45px;
    background-color: #fafbfa;
    line-height: 45px;
    padding-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.elinput.el-input .el-input__inner {
    border: 0px;
    width: 203px;
    border-radius: 0;
    border-bottom: 1px solid #c1c1c1;
}
.editor {
    width: 800px;
    /* height: 200px; */
}
.addbus .el-select {
    float: left;
}
.elselect {
    /*float: left;
		 margin-left: 220px;
		margin-top: -33px;  */
    position: relative;
}

.elselect .el-input__inner {
    width: 203px;
    border: 0px;
    border-radius: 0px;
    border-bottom: 1px solid #c1c1c1;
    position: absolute;
    top: -54px;
    left: 220px;
}
.returnBtn {
    width: 100%;
    text-align: center;
}
.returnBtn .addbusBtn {
    width: 90px;
    height: 30px;
    background-color: #2482d2;
    color: #fff;
    /* margin: 0 auto; */
    margin-top: 30px;
    padding: 0;
}
.input-new-tag {
    width: 203px;
    margin-left: 10px;
}
.button-new-tag {
    margin-left: 10px;
}
.eltag {
    margin-left: 10px;
}
.img {
    width: 80px;
    height: 80px;
    float: left;
    margin-left: 5px;
    margin-top: 5px;
}
.sadsa img {
    width: 200px;
    display: inline-block;
}
.lookbusiness .el-form-item__label {
    text-align: right;
}
</style>
