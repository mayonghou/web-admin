<template>
    <div>
        <div class="Commodity-details">
            <h4 class="h4Classd">填写添加的人员信息</h4>
            <ul>
                <li>
                    <div>姓名：</div>
                    <div>
                        <Input v-model="value0" placeholder="请输入姓名..." style="width: 300px" />
                    </div>
                </li>

                <li>
                    <div>性别：</div>
                    <div>
                        <Input v-model="value1" placeholder="请输入姓名..." style="width: 300px" />
                    </div>
                </li>

                <li>
                    <div>选择行业</div>
                    <div>
                        <Select v-model="model0" style="width:300px">
                            <Option
                                style="padding:0 15px;"
                                v-for="item in cityList0"
                                :value="item.value"
                                :key="item.value"
                            >{{ item.label }}</Option>
                        </Select>
                    </div>
                </li>

                <li>
                    <div>选择职业</div>
                    <div>
                        <Select v-model="model1" style="width:300px">
                            <Option
                                style="padding:0 15px;"
                                v-for="item in cityList1"
                                :value="item.value"
                                :key="item.value"
                            >{{ item.label }}</Option>
                        </Select>
                    </div>
                </li>

                <li>
                    <div>选择工作经验</div>
                    <div>
                        <Select v-model="model2" style="width:300px">
                            <Option
                                style="padding:0 15px;"
                                v-for="item in cityList2"
                                :value="item.value"
                                :key="item.value"
                            >{{ item.label }}</Option>
                        </Select>
                    </div>
                </li>

                <li>
                    <div>个人地址</div>
                    <div>
                        <el-cascader
                            v-model="model3"
                            :options="addressOptions"
                            placeholder="请选择"
                            class="InputClass"
                        ></el-cascader>
                    </div>
                </li>

                <li>
                    <div>身份证照片</div>
                    <div>
                        <br />
                        <p>正面</p>
                        <p>
                            <Upload
                                multiple
                                type="drag"
                                action="//jsonplaceholder.typicode.com/posts/"
                            >
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                    <p>添加身份证正面</p>
                                </div>
                            </Upload>
                        </p>
                        <p>反面</p>
                        <p>
                            <Upload
                                multiple
                                type="drag"
                                action="//jsonplaceholder.typicode.com/posts/"
                            >
                                <div style="padding: 20px 0">
                                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                    <p>添加身份证反面</p>
                                </div>
                            </Upload>
                        </p>
                    </div>
                </li>
            </ul>
            <h4 class="h4Classd h4Classd02">账户信息</h4>
            <ul>
                <li>
                    <div>开户行：</div>
                    <div>
                        <Select v-model="model4" style="width:300px">
                            <Option
                                style="padding:0 15px;"
                                v-for="item in cityList4"
                                :value="item.value"
                                :key="item.value"
                            >{{ item.label }}</Option>
                        </Select>
                    </div>
                </li>

                <li>
                    <div>开户网点：</div>
                    <div>
                        <Input v-model="value2" placeholder="请输入姓名..." style="width: 300px" />
                    </div>
                </li>

                <li>
                    <div>开户名称：</div>
                    <div>
                        <Input v-model="value3" placeholder="请输入姓名..." style="width: 300px" />
                    </div>
                </li>

                <li>
                    <div>收款账号</div>
                    <div>
                        <Input v-model="value4" placeholder="请输入姓名..." style="width: 300px" />
                    </div>
                </li>
            </ul>
        </div>
        <div class="buuttonn">
            <Button type="primary" @click="routerTocd">保存</Button>
        </div>
    </div>
</template>

<script>
import citydata from '../../../../api/address.json';
export default {
    data() {
        return {
            addressOptions: citydata,
            model0: '',
            model1: '',
            model2: '',
            model3: '',
            model4: '',
            cityList0: [
                {
                    value: 'New York',
                    label: 'New York',
                    width: 300
                },
                {
                    value: 'London',
                    label: 'London',
                    width: 300
                },
                {
                    value: 'Sydney',
                    label: 'Sydney',
                    width: 300
                }
            ],
            cityList1: [],
            cityList2: [],
            cityList4: [],
            value0: '',
            value1: '',
            value3: '',
            value2: '',
            value4: ''
        };
    },
    methods: {
        routerTocd() {}
    }
};
</script>

<style scoped>
.Commodity-details {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 50px;
    margin-top: 40px;
}
.Commodity-details li {
    width: 100%;
    height: auto;
    list-style-type: none;
    box-sizing: border-box;
    margin: 5px 0px;
    display: flex;
    font-size: 14px;
    padding: 10px 0px;
    line-height: 32px;
}
.Commodity-details li div:nth-child(1) {
    max-width: 200px;
    min-width: 200px;
    text-align: right;
    box-sizing: border-box;
    padding-right: 20px;
    font-weight: 600;
}
.Commodity-details li div:nth-child(2) {
    flex-grow: 1;
    box-sizing: border-box;
}
.buuttonn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
}
.buuttonn button {
    padding: 0px 50px;
    margin-bottom: 60px;
}
.h4Classd {
    height: 46px;
    line-height: 46px;
    box-sizing: border-box;
    padding-left: 10px;
    background-color: rgba(250, 251, 250, 100);
    margin-bottom: 34px;
}
.h4Classd02 {
    margin-bottom: 0px;
    margin-top: 30px;
}
</style>
