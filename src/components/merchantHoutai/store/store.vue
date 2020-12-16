<template>
    <!-- 店铺管理 -->
    <div class="store" id="store">
        <div class="store-top">
            <div class="store-top-label">
                <label>打烊设置</label>
            </div>
        </div>
        <div class="setting">
            <div class="setting-deta">
                <el-radio v-model="rideo" :label="1">手动打烊</el-radio>
                <el-switch
                    v-model="value"
                    active-color="#13ce66"
                    inactive-color="#c2c2c2"
                    active-value="1"
                    inactive-value="2"
                    :disabled="this.rideo != 1"
                >
                </el-switch>
                <span style="margin-left: 20px">{{ this.value == 1 ? '营业中' : '打烊' }}</span>
            </div>
            <div class="setting-deta">
                <el-radio v-model="rideo" :label="2">自动打烊</el-radio>
                <div class="dayangss">
                    <div><label>打烊开始时间(每天):</label></div>
                    <el-time-picker v-model="startTime" placeholder="任意时间点" :disabled="this.rideo != 2" value-format="HH:mm:ss">
                    </el-time-picker>
                </div>
                <div class="dayangss">
                    <div><label>打烊结束时间(每天):</label></div>
                    <el-time-picker v-model="endTime" placeholder="任意时间点" :disabled="this.rideo != 2" value-format="hh:mm:ss">
                    </el-time-picker>
                </div>
            </div>
        </div>
        <div class="DayangBtn">
            <el-button @click="dayangSetting" class="bocunBtn">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'store',
    data() {
        return {
            value: 1,
            rideo: this.rideo || '1',
            startTime: '',
            endTime: ''
        };
    },
    mounted() {
        this.gitQuery();
    },
    methods: {
        dayangSetting() {
            var startHour = parseInt(this.startTime.substring(0, 2));
            var startMongth = parseInt(this.startTime.substring(3, 5));
            var starSseckill = parseInt(this.startTime.substring(6, 8));
            var startTimeData = (startHour * 3600 + startMongth * 60 + starSseckill) * 1000;

            var endHour = parseInt(this.endTime.substring(0, 2));
            var endMongth = parseInt(this.endTime.substring(3, 5));
            var endSeckill = parseInt(this.endTime.substring(6, 8));
            var endTimeData = (endHour * 3600 + endMongth * 60 + endSeckill) * 1000;
            let data = {
                companyId: parseInt(localStorage.getItem('loginData')),
                type: parseInt(this.rideo),
                status: parseInt(this.value),
                restTimeStart: startTimeData,
                restTimeEnd: endTimeData
            };
            this.$axios.post('admin/company/setting/business_hours/save', data).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'success'
                        });
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
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            });
        },
        gitQuery() {
            this.$axios.post('admin/company/setting/business_hours/query/' + localStorage.getItem('loginData')).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.value = data.status;
                        this.rideo = data.type;
                        var hours =
                            parseInt((data.restTimeEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 10
                                ? '0' + parseInt((data.restTimeEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                                : parseInt((data.restTimeEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = parseInt((data.restTimeEnd  % (1000 * 60 * 60)) / (1000 * 60))<10?'0'+parseInt((data.restTimeEnd  % (1000 * 60 * 60)) / (1000 * 60)):parseInt((data.restTimeEnd  % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = (data.restTimeEnd  % (1000 * 60)) / 1000<10?'0'+(data.restTimeEnd  % (1000 * 60)) / 1000:(data.restTimeEnd  % (1000 * 60)) / 1000
                        this.endTime = hours +':'+minutes+':'+seconds;
                        var hours1 =
                            parseInt((data.restTimeStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 10
                                ? '0' + parseInt((data.restTimeStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                                : parseInt((data.restTimeStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes1 = parseInt((data.restTimeStart  % (1000 * 60 * 60)) / (1000 * 60))<10?'0'+parseInt((data.restTimeStart  % (1000 * 60 * 60)) / (1000 * 60)):parseInt((data.restTimeEnd  % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds1 = (data.restTimeStart  % (1000 * 60)) / 1000<10?'0'+(data.restTimeStart  % (1000 * 60)) / 1000:(data.restTimeStart  % (1000 * 60)) / 1000
                        this.endTime1 = hours +':'+minutes+':'+seconds;
                        this.startTime = hours1 +':'+minutes1+':'+seconds1;
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
                        message: res.data.msg,
                        type: 'error'
                    });
                }
            });
        }
    }
};
</script>

<style>
.store {
    box-sizing: border-box;
    padding: 20px;
}
.store-top {
    width: 100%;
    height: 50px;
    background: #f5f9f1;
    line-height: 50px;
}
.store-top-label {
    width: 150px;
    height: 100%;
    background: #2450d2;
    color: #fff;
    text-align: center;
}
.setting {
    margin-top: 30px;
    margin-left: 100px;
}
.setting-deta {
    margin-top: 30px;
}
.dayangss {
    margin-left: 60px;
    margin-top: 20px;
}
.el-switch {
    margin-left: 150px;
}
.DayangBtn .bocunBtn {
    width: 90px;
    height: 30px;
    background: #2482d2;
    color: #fff;
    padding: 0;
    margin-left: 30%;
    margin-top: 20px;
}
</style>