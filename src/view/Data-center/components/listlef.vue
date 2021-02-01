<template>
    <Card style="min-height:483px">
        <ul>
            <li class="ulFirstClass">{{this.IndustyName+'业商家数据'}}</li>
            <li class="xiaoyuPosition" v-for="(item,index) in listDataer" :key="index">
                <div class="rootClassList">
                    <div class="rootClassLeft">
                        <div class="sonChild_1"></div>
                        <div class="sonChild_2" :class="cur[index]">
                            <Icon type="ios-analytics" />
                        </div>
                    </div>
                    <div class="rootmidlle">
                        <!--三角形-->
                    </div>
                    <div class="rootClassRight">
                        <div class="sonrootClassRight">
                            <h4>{{ item.titler }}</h4>
                            <h2 :class="index%2==0?'fontcur0':'fontcur1'">{{ item.dataer }}</h2>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </Card>
</template>

<script>
import bus from '../../../components/common/bus.js';
export default {
    data() {
        return {
            cur: ['cur0', 'cur1', 'cur2', 'cur3', 'cur4'],
            IndustyName: '',
            IndustyId: '',
            listDataer: []
        };
    },
    created() {
        bus.$on('Industrydata', (msg) => {
            this.IndustyId = msg.id;
            this.IndustyName = msg.name;
            this.getAdminDataCenterBusiness();
        });
    },
    mounted() {
        this.xiaoyuer();
    },
    methods: {
        xiaoyuer() {},
        // 获取商家数据
        getAdminDataCenterBusiness() {
            this.$axios.get('admin/mall/dataCenter/getAdminDataCenterBusiness?industryId=' + this.IndustyId).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.listDataer = [
                            {
                                titler: this.IndustyName + '业昨日浏览量',
                                dataer: data.data.yesDayViewCount
                            },
                            {
                                titler: this.IndustyName + '业昨日订单量',
                                dataer: data.data.yesDayViewCount
                            },
                            {
                                titler: this.IndustyName + '业转让商家数据',
                                dataer: data.data.industryDataCount
                            },
                            {
                                titler: this.IndustyName + '业商家数据',
                                dataer: data.data.industryDataCount
                            },
                            {
                                titler: this.IndustyName + '业平台联系次数',
                                dataer: data.data.callBusinessCount
                            }
                        ];
                    }
                }
            });
        }
    }
};
</script>

<style scope>
li {
    list-style-type: none;
}
.rootClassList {
    display: flex;
    align-items: center;
    padding-right: 5px;
}
.rootClassList:hover {
    border-radius: 3px;
    background-color: rgba(45, 140, 240, 0.08);
}
.xiaoyuPosition {
    position: relative;
}
.rootClassLeft {
    display: flex;
    width: 50px;
    height: 80px;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: relative;
}
.sonChild_1 {
    width: 4px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -2px;
    z-index: 0;
}
.sonChild_2 {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    position: relative;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 20px;
    box-shadow: inset 2px 2px 5px #2196f3;
}
/* 三角形 */
.rootmidlle {
    width: 0;
    height: 0;
    position: relative;
    border-top: 10px solid transparent;
    border-right: 14px solid #1099d0;
    border-bottom: 10px solid transparent;
}
.rootmidlle::after {
    content: '';
    position: absolute;
    top: -9px;
    left: 1px;
    border-top: 9px solid transparent;
    border-right: 14px solid #fff;
    border-bottom: 9px solid transparent;
}
.rootClassRight {
    flex-grow: 1;
    height: 72px;
    display: flex;
    align-items: center;
    border: #1099d0 solid 1px;
    padding: 10px 10px;
    border-radius: 5px;
}
/* 背景渐变 */
.cur0 {
    background-image: linear-gradient(#1099d0, #41dcd6);
}
.cur1 {
    background-image: linear-gradient(#966ffa, #ff4c99);
}
.cur2 {
    background-image: linear-gradient(#f3646c, #f6c988);
}
.cur3 {
    background-image: linear-gradient(#7956fd, #a5c6fe);
}
.cur4 {
    background-image: linear-gradient(#ffab96, #ff0f47);
}
/* 字体渐变 */
.fontcur0 {
    background-image: linear-gradient(135deg, #1099d0, #41dcd6);
    font-size: 24px;
    font-weight: bold;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    -moz-box-decoration-break: clone;
    color: transparent;
    position: relative;
}
.fontcur1 {
    background-image: linear-gradient(135deg, #966ffa, #ff4c99);
    font-size: 24px;
    font-weight: bold;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
    -moz-box-decoration-break: clone;
    color: transparent;
    position: relative;
}
.ulFirstClass {
    padding: 15px 0;
}
</style>