<template>
    <div class="table_css_xiaoyuer">
        <h4 class="ckspxq_tile">查看商品详情</h4>
        <div class="Commodity-details">
            <Form :model="formLeft" label-position="right" :label-width="150" :label-colon="true" :disabled="true">
                <FormItem label="封面" class="marginTop">
                    <Avatar :src="this.formLeft.Data1" shape="square" icon="ios-person" size="150" style="margin-left: 40px" />
                </FormItem>
                <FormItem label="商品视频" class="marginTop">
                    <video :src="this.formLeft.Data2" width="320" height="240" controls autoplay loop></video>
                </FormItem>
                <FormItem label="商品名称" class="marginTop02">
                    <p class="marginleft">{{ this.formLeft.Data3 }}</p>
                </FormItem>
                <FormItem label="商品主图）" class="marginTop">
                    <p style="margin-left: 40px; color: #a4a4a4">(轮播图展示)</p>
                    <img class="imgStyle"
                        v-for="(item, index) in this.formLeft.Data4"
                        :key="index"
                        :src="item"
                    />
                </FormItem>
                <FormItem label="商品详情" class="marginTop02">
                    <div class="dsadsadas">
                        <div class="dddd" v-html="content"></div>
                    </div>
                </FormItem>
                <FormItem label="商品库存" class="marginTop02">
                    <p class="marginLeft02">{{ this.formLeft.Data11 }}</p>
                </FormItem>
                <FormItem label="库存预警值" class="marginTop02">
                    <p class="marginLeft02">{{ this.formLeft.Data12 }}</p>
                </FormItem>
                <FormItem label="商品售价" class="marginTop02">
                    <p class="marginLeft02">{{ this.formLeft.Data13 }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;元</p>
                </FormItem>
                <FormItem label="限购数量" class="marginTop02">
                    <p class="marginLeft02" style="color: #a4a4a4">限每人购买的数量</p>
                    <p class="marginLeft02" style="padding-left: 30px">{{ this.formLeft.Data14 }}</p>
                </FormItem>
                <FormItem label="商品单位" class="marginTop02">
                    <p class="marginLeft02" style="color: #a4a4a4">{{ this.formLeft.Data15 }}</p>
                </FormItem>
                <FormItem label="商品货号" class="marginTop02">
                    <p class="marginLeft02">{{ this.formLeft.Data16 }}</p>
                </FormItem>
                <FormItem label="商品参数" class="marginTop02">
                    <div v-for="(item, index) in ParameterName" :key="index">
                        <p>&nbsp;</p>
                        <p>
                            <span>商品{{ index + 1 }}名称：</span>
                            <span class="color-span">{{ item.ParName }}</span>
                        </p>
                        <div class="color-span-a">
                            <span>参数详情：</span>
                            <span class="count-span-a">
                                <p style="margin-left: 10px; color: #a4a4a4">{{ item.ParDetails }}</p>
                            </span>
                        </div>
                    </div>
                </FormItem>

                <FormItem label="商品规格" class="marginTop02">
                    <div>
                        <p>&nbsp;</p>
                        <p>
                            <span>主规格标题：</span>
                            <!-- 主商品标题 -->
                            <span class="color-span">{{ this.formLeft.Data17 }}</span>
                        </p>
                        <div v-for="(itemb, index) in Commoditysped" :key="index">
                            <div class="color-span-a">
                                <span>主规格{{ index + 1 }}名称：</span>
                                <span class="count-span-a">
                                    <p class="color-span">{{ itemb.name }}</p>
                                </span>
                            </div>
                            <div class="color-span-ab">
                                <span>单价：</span>
                                <span class="count-span-a">
                                    <p class="color-span">{{ itemb.price }}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- 富规格 -->
                    <div v-for="(vlaue, index) in Subtitled" :key="index">
                        <p>&nbsp;</p>
                        <p>
                            <span>副规格{{ index + 1 }}标题：</span>
                            <span class="color-span">{{ vlaue.title }}</span>
                        </p>
                        <div v-for="(val, ind) in vlaue.subName" :key="ind">
                            <div class="color-span-a">
                                <span>副规格{{ ind + 1 }}名称：</span>
                                <span class="count-span-a">
                                    <p class="color-span">{{ val.name }}</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="保障描述" class="marginTop02">
                    <span class="marginLeft02" v-for="(item,index) in this.formLeft.Data18" :key="index">{{ item }}</span>
                </FormItem>
                <FormItem label="商品配送" class="marginTop02">
                    <span class="marginLeft02" v-for="(i,inde) in this.formLeft.Data19" :key="inde"> {{ i }} </span>
                </FormItem>
                <FormItem label="是否包邮" class="marginTop02">
                    <span class="marginLeft02">{{ this.formLeft.Data20 }}</span>
                </FormItem>
                <FormItem label="商品准备时间" class="marginTop02">
                    <span class="marginLeft02">{{ this.formLeft.Data21 }}</span>
                </FormItem>
            </Form>
            <div class="buuttonn">
                <Button type="primary" @click="routerTocd">返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import Edit from '../../Sharing-Qianlima/Personnel-gl/component/edit.vue';
export default {
    data() {
        return {
            formLeft: {
                Data1: '',
                Data2: '',
                Data3: '',
                Data4: [],
                Data5: '',
                Data6: '',
                Data7: '',
                Data8: '',
                Data11: '',
                Data12: '',
                Data13: '',
                Data14: '',
                Data15: '',
                Data16: '',
                Data17: '',
                Data18: '',
                Data19: '',
                Data20: '',
                Data21: ''
            },
            // 商品参数
            ParameterName: [],
            // 商品规格
            Commoditysped: [],
            Subtitled: [{ title: '水电费人生巅峰' }],
            // 附文本
            content: `欢迎使用`
        };
    },
    components: {// 附文本
        quillEditor
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        routerTocd() {
            this.$router.push({
                path: './commoditymanagement'
            });
        },
        getData() {
            var url = 'admin/product/adminQueryProductInfo' + '?productId=' + this.$route.query.id;
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        if (res.data.code == 200) {
                            var TransVvalue = res.data.data;
                            var imgUrl = /^(https):\/\/.+$/;
                            var imgUrlverification = imgUrl.test(TransVvalue.productDTO.pic);
                            let aRr = TransVvalue.productDTO.albumPics.split(',');
                            if (imgUrlverification == true) {
                                this.formLeft.Data1 = TransVvalue.productDTO.pic;
                                this.formLeft.Data2 = TransVvalue.productDTO.videoUrl;
                                var datadsd = [];
                                aRr.forEach(function (val, index) {
                                    datadsd[index] = val;
                                });
                                this.formLeft.Data4 = datadsd;
                            } else if (imgUrlverification == false) {
                                this.formLeft.Data1 = localStorage.getItem('imgUrl') + TransVvalue.productDTO.pic;
                                this.formLeft.Data2 = localStorage.getItem('imgUrl') + TransVvalue.productDTO.videoUrl;
                                var datadsd = [];
                                aRr.forEach(function (val, index) {
                                    datadsd[index] = localStorage.getItem('imgUrl') + val;
                                });
                                this.formLeft.Data4 = datadsd;
                            }
                            this.formLeft.Data3 = TransVvalue.productDTO.name;
                            this.content = TransVvalue.productDTO.detailHtml;
                            this.formLeft.Data11 = TransVvalue.productDTO.stock + `(已售：${TransVvalue.productDTO.sale})`;
                            this.formLeft.Data12 = TransVvalue.productDTO.lowStock;
                            if (TransVvalue.productDTO.count == 0) {
                                TransVvalue.productDTO.count = '不限';
                            }
                            this.formLeft.Data13 = TransVvalue.productDTO.price;
                            this.formLeft.Data14 = TransVvalue.productDTO.count;
                            this.formLeft.Data15 = TransVvalue.productDTO.unit;
                            this.formLeft.Data16 = TransVvalue.productDTO.sn;
                            this.formLeft.Data17 = TransVvalue.productDTO.specTitle;
                            let xyeData = TransVvalue.productDTO.serviceIds.split(',');//转成数组
                            let xyeData02 = [];
                            xyeData.forEach(function(val,hgj){
                                if(val == 1){
                                    xyeData02.push('假一赔十');
                                }else if(val == 2){
                                    xyeData02.push('极速退款');
                                }else if(val == 3){
                                    xyeData02.push('无忧退货');
                                }
                            })
                            let xyeData03 = xyeData02.join().replace(/,/g,' ');
                            this.formLeft.Data18 = xyeData02;//转成字符
                            var Data19Da = TransVvalue.productDTO.logisticsIds.split(',');
                            const Data19Daer = [];
                            Data19Da.forEach(function(val,ing){
                                if(val == 1){
                                    Data19Daer.push('可自提')
                                }else if(val == 2){
                                    Data19Daer.push('可到店消费')
                                }else if(val == 3){
                                    Data19Daer.push('可配送')
                                }
                            })
                            this.formLeft.Data19 = Data19Daer;
                            if(TransVvalue.productDTO.freeShipping == 0){
                                TransVvalue.productDTO.freeShipping = '否';
                            }else if(TransVvalue.productDTO.freeShipping == 1){
                                TransVvalue.productDTO.freeShipping = '是';
                            }
                            this.formLeft.Data20 = TransVvalue.productDTO.freeShipping;

                            this.formLeft.Data21 = TransVvalue.productDTO.makeTime + '分钟';
                            // 商品参数
                            const Str = TransVvalue.productDTO.parameter;
                            const Obj = JSON.parse(Str);
                            const newObj = [];
                            Obj.forEach(function (value, index) {
                                newObj[index] = value;
                                newObj[index].ParName = value.shoppCanshuName;
                                newObj[index].ParDetails = value.shoppCanshuDetaitl;
                            });
                            this.ParameterName = newObj;
                            this.Commoditysped = TransVvalue.prodAttrList;
                            // 副规格
                            const grTy = [];
                            TransVvalue.prodAttrSubList.forEach(function (value, index) {
                                grTy[index] = value;
                                grTy[index].title = value.subTitle;
                                grTy[index].subName = JSON.parse(value.subName);
                            });
                            this.Subtitled = grTy;
                        }
                    }
                })
                .catch((err) => {});
        }
    }
};
</script>

<style scoped>
.table_css_xiaoyuer {
    box-sizing: border-box;
    padding: 20px;
    margin-top: 20px;
}
.ckspxq_tile {
    background-color: rgb(250, 251, 250);
    padding: 10px;
}
.Commodity-details {
    box-sizing: border-box;
    padding: 0 100px;
    margin-top: 50px;
}
.marginTop {
    margin-top: 50px;
}
.marginTop02 {
    margin-top: 20px;
}
.marginleft {
    margin-left: 40px;
}
.dataImg-large {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    flex-direction: row;
    flex-wrap: wrap;
}
.marginLeft02 {
    margin-left: 20px;
}
.color-span {
    color: rgb(164, 164, 164);
}
.color-span-a {
    padding-left: 40px;
    display: flex;
}
.color-span-ab {
    padding-left: 80px;
    display: flex;
}
.buuttonn {
    display: flex;
    align-items: center;
    justify-content: center;
}
.buuttonn button {
    padding: 0px 50px;
    margin-bottom: 60px;
}
.dsadsadas .dddd img{
    display: block;
    width: 200px;
}
.imgStyle{
    display: inline-block;
    margin: 10px;
    width:120px;
    height: auto;
}
.imgStyle:first-child{
    display: inline-block;
    margin-left: 0px;
}
</style>
