<template>
    <div
        class="lookjobVacancy"
        id="lookjobVacancy"
        v-loading="fullscreenLoading"
        :element-loading-text="loadingText"
        element-loading-background="rgba(0, 0, 0, 0.7)"
    >
        <div class="addjob-top">职位详情信息</div>
        <el-form :model="lookjob" ref="lookjob">
            <el-form-item label="所属行业:" prop="industry" :label-width="labelwidth">
                <label>{{lookjob.industry}}</label>
            </el-form-item>
            <el-form-item label="职位名称:" prop="positionJob" :label-width="labelwidth">
                <label>{{lookjob.positionJob}}</label>
            </el-form-item>
            <el-form-item label="岗位薪资:" prop="pay" :label-width="labelwidth">
                <label style="color: #A4A4A4; margin-right: 10px;">(月薪)</label>
                <label>{{lookjob.pay}}</label>
            </el-form-item>
            <el-form-item label="职业类型:" prop="positiontype" :label-width="labelwidth">
                <label>{{lookjob.positiontype}}</label>
            </el-form-item>
            <el-form-item label="福利待遇:" prop="benefits" :label-width="labelwidth">
                <el-checkbox-group
                    disabled
                    style="cursor: pointer;"
                    v-model="lookjob.benefits"
                    v-for="item in this.lookjob.benefits"
                    :key="item.id"
                >
                    <el-checkbox
                        :label="item.welfare"
                        class="el-checkboxed"
                        v-if="item.welfare!=null"
                        :checked="checked"
                    ></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="学历要求:" prop="education" :label-width="labelwidth">
                <label>{{lookjob.education}}</label>
            </el-form-item>
            <el-form-item label="工作年限:" prop="ageLimit" :label-width="labelwidth">
                <label>{{lookjob.ageLimit}}</label>
            </el-form-item>
            <el-form-item label="工作地址:" prop="address" :label-width="labelwidth">
                <label>{{lookjob.address}}</label>
            </el-form-item>
            <el-form-item label="联系电话:" prop="phone" :label-width="labelwidth">
                <label>{{lookjob.phone}}</label>
            </el-form-item>
            <el-form-item label="岗位描述:" prop="postdescribe" :label-width="labelwidth">
                <label>{{lookjob.postdescribe}}</label>
            </el-form-item>
            <el-form-item label="团队介绍:" prop="teamIntroduction" :label-width="labelwidth">
                <label>{{lookjob.teamIntroduction}}</label>
            </el-form-item>
        </el-form>
        <el-button @click="returnjob" class="fabuss">返回</el-button>
    </div>
</template>

<script>
import citydata from '../../../api/address.json';
export default {
    name: 'lookjobVacancy',
    data() {
        return {
            labelwidth: '220px',
            addressOptions: {},
            checked: true,
            fullscreenLoading: true,
            loadingText: '加载中...',
            lookjob: {
                industry: '',
                positionJob: '',
                pay: '',
                positiontype: '',
                benefits: [],
                education: '',
                ageLimit: '',
                address: '',
                detailaddress: '', //详细地址
                phone: '',
                postdescribe: '',
                teamIntroduction: ''
            }
        };
    },
    mounted() {
        this.getSelectJob();
    },
    methods: {
        handleChange(value) {
            console.log(value);
        },
        returnjob() {
            var status = this.$route.query.status;
            if (status == '下架') {
                this.$router.push({
                    path: './xiajiaJobVacancy'
                });
            } else if (status == '上架') {
                this.$router.push({
                    path: './jobVacancy'
                });
            }
        },
        // 查询职位详情
        getSelectJob() {
            var id = this.$route.query.id;
            this.$axios.get('admin/job/manage/select/' + id).then((res) => {
                this.fullscreenLoading = false;
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var dataList = data.data;
                        this.lookjob.industry = dataList.industryName;
                        this.lookjob.positionJob = dataList.jobName;
                        this.lookjob.pay = dataList.salaries;
                        this.lookjob.positiontype = dataList.positionType;
                        // 福利待遇
                        this.lookjob.benefits = dataList.welfare;
                        this.lookjob.education = dataList.education;
                        this.lookjob.ageLimit = dataList.experience;
                        this.lookjob.address = dataList.province + dataList.city + dataList.address;
                        this.lookjob.phone = dataList.tel;
                        this.lookjob.postdescribe = dataList.jobIntroduce;
                        this.lookjob.teamIntroduction = dataList.team;
                    } else {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                        this.$router.push({
                            path: './jobVacancy'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: 'error'
                    });
                    this.$router.push({
                        path: './jobVacancy'
                    });
                }
            });
        }
    }
};
</script>

<style>
.lookjobVacancy {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
}

.el-checkboxed {
    float: left;
    margin-left: 10px;
}

.addjob-top {
    width: 100%;
    height: 45px;
    background-color: #fafbfa;
    line-height: 45px;
    padding-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
}

.el-form-item__content {
    position: relative;
}

.elselect {
    position: absolute;
    top: 0;
    left: 220px;
}

.textarea {
    width: 613px;
}
.el-textarea__inner {
    height: 190px;
}
.lookjobVacancy .fabuss {
    width: 90px;
    height: 30px;
    font-size: 14px;
    padding: 0;
    background-color: #2482d2;
    color: #fff;
    margin-left: 30%;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
    color: #000000;
}
</style>
