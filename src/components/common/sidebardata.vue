<template>
    <div class="sidebarData" id="sidebarData">
        <el-menu>
            <el-submenu v-for="item in items" :key="item.index" :index="item.index">
                <template slot="title">
                    <div @click="xioayuerfnx(item)">
                        <img class="imgIcon" width="13" height="13" :src="item.icon" />
                        <span style="margin-left: 10px;" slot="title">{{ item.title }}</span>
                    </div>
                </template>
                <template v-for="subItem in item.subs">
                    <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                        <template slot="title">{{ subItem.title }}</template>
                        <el-menu-item
                            v-for="(threeItem,index) in subItem.subs"
                            :key="index"
                            :index="threeItem.index"
                        >{{ threeItem.title }}</el-menu-item>
                    </el-submenu>
                    <!--列表项options-->
                    <el-menu-item
                        @click="SendData(subItem.title)"
                        v-else
                        :index="subItem.index"
                        :key="subItem.index"
                    >{{ subItem.title }}</el-menu-item>
                </template>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import bus from './bus.js';
export default {
    name: 'sidebarData',

    data() {
        return {
            collapse: false,
            items: []
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    mounted() {
        this.loginData();
    },
    methods: {
        // li上的点击事件 让图标旋转180度
        sidebarDa() {},
        xioayuerfnx(item) {
            bus.$emit('SidebarFn1', [item, 'Sid1']);
        },
        SendData(subs) {
            bus.$emit('SidebarFn2', subs);
        },
        loginData() {
            var loginData = localStorage.getItem('loginData');
            var items = [];
            if (loginData == 0) {
                // 总后台
                items = [
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'terrace',
                        title: '企业管理',
                        subs: [
                            {
                                index: 'index',
                                title: '企业列表'
                            }
                        ]
                    },
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'membership',
                        title: '会员管理',
                        subs: [
                            {
                                index: 'membership',
                                title: '会员列表'
                            }
                        ]
                    },
                    // xiaoyuer
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'Commodity-management',
                        title: '商品管理',
                        subs: [
                            {
                                index: 'commoditymanagement',
                                title: '商品列表'
                            }
                        ]
                    },
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'Order-manger',
                        title: '订单管理',
                        subs: [
                            {
                                index: 'orderlistb',
                                title: '订单列表'
                            },
                            {
                                index: 'ordersetupa',
                                title: '订单设置'
                            }
                        ]
                    },
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'inancial-management',
                        title: '财务管理',
                        subs: [
                            {
                                index: 'inancialmanagement',
                                title: '财务列表'
                            }
                        ]
                    },
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'Rental-management',
                        title: '租房管理',
                        subs: [
                            {
                                index: 'rentalmanagement',
                                title: '租房列表'
                            }
                        ]
                    },
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'Recruitment-management',
                        title: '招聘管理',
                        subs: [
                            {
                                index: 'recruitmentmanagement',
                                title: '招聘列表'
                            }
                        ]
                    },
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'Video-management',
                        title: '视频管理',
                        subs: [
                            {
                                index: 'videomanagement',
                                title: '视频列表'
                            }
                        ]
                    },
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'Opportunity-mg',
                        title: '商机管理',
                        subs: [
                            {
                                index: 'opportunitymg',
                                title: '商机列表'
                            }
                        ]
                    },
                    // 活动管理
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'Activity-management',
                        title: '活动管理',
                        subs: [
                            {
                                index: 'coupongl',
                                title: '优惠券管理'
                            },
                            {
                                index: 'group-buying',
                                title: '同城团购管理'
                            },
                            {
                                index: 'seckill',
                                title: '秒杀管理'
                            },
                            {
                                index: 'discount-zone',
                                title: '折扣专区'
                            },
                            {
                                index: 'Site-clearing',
                                title: '清仓处理管理'
                            },
                            {
                                index: 'luckdraw',
                                title: '抽奖管理'
                            },
                            {
                                index: 'flash-sale',
                                title: '限时抢购管理'
                            },
                            {
                                index: 'enterprise-activity',
                                title: '企业活动管理'
                            }
                        ]
                    },
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'Dynamic-management',
                        title: '动态管理',
                        subs: [
                            {
                                index: 'graphic-news',
                                title: '图文动态'
                            },
                            {
                                index: 'article-news',
                                title: '文章动态'
                            }
                        ]
                    },
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'Industry',
                        title: '行业管理',
                        subs: [
                            {
                                index: 'Industry',
                                title: '行业列表'
                            }
                        ]
                    },
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'advertisement-gl',
                        title: '广告管理',
                        subs: [
                            {
                                index: 'advertisement',
                                title: '广告列表'
                            }
                        ]
                    },
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'Sharing-Qianlima',
                        title: '共享千里马',
                        subs: [
                            {
                                index: 'Personnel',
                                title: '人员管理'
                            },
                            {
                                index: 'Orderment',
                                title: '订单管理'
                            },
                            {
                                index: 'PersonnelSet',
                                title: '人员管理设置'
                            }
                        ]
                    },
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'Expandfunction',
                        title: '拓展功能',
                        subs: [
                            {
                                index: 'expandfunction',
                                title: '平台公告管理'
                            },
                            {
                                index: 'SettleIn',
                                title: '商家入驻申请'
                            },
                            {
                                index: 'Report',
                                title: '投诉举报'
                            },
                            {
                                index: 'feedback',
                                title: '帮助反馈'
                            }
                        ]
                    }
                ];
                this.items = items;
            } else {
                // 商家后台
                items = [
                    {
                        icon: require('../../assets/img/icon/qiye.png'),
                        index: 'terrace',
                        title: '我的企业',
                        subs: [
                            {
                                index: 'editDatetl',
                                title: '企业信息'
                            },
                            {
                                index: 'member',
                                title: '团队管理'
                            },
                            {
                                index: 'cooperationList',
                                title: '企业合作管理'
                            }
                        ]
                    },
                    // 客户管理
                    {
                        icon: require('../../assets/img/icon/kehu.png'),
                        index: 'kehu',
                        title: '客户管理',
                        subs: [
                            {
                                index: 'kehuadmin',
                                title: '客户列表'
                            }
                        ]
                    },
                    // 订单管理
                    {
                        icon: require('../../assets/img/icon/icon--copy.png'),
                        index: 'order',
                        title: '订单管理',
                        subs: [
                            {
                                index: 'order',
                                title: '订单列表'
                            },
                            {
                                index: 'salesreturn',
                                title: '退货申请处理'
                            }
                        ]
                    },
                    // 商品管理
                    {
                        icon: require('../../assets/img/icon/shangpin.png'),
                        index: 'goods',
                        title: '商品管理',
                        subs: [
                            {
                                index: 'goodsList',
                                title: '商品列表'
                            },
                            {
                                index: 'xiajiagoods',
                                title: '下架列表'
                            }
                        ]
                    },
                    // 商机管理
                    {
                        icon: require('../../assets/img/icon/shangji.png'),
                        index: 'business',
                        title: '商机管理',
                        subs: [
                            {
                                index: 'business',
                                title: '商机列表'
                            }
                        ]
                    },
                    // 财务管理
                    {
                        icon: require('../../assets/img/icon/caiwu.png'),
                        index: 'finance',
                        title: '财务管理',
                        subs: [
                            {
                                index: 'finance',
                                title: '财务列表'
                            },
                            {
                                index: 'moneyNumber',
                                title: '提现记录'
                            }
                        ]
                    },

                    // 租房管理
                    {
                        icon: require('../../assets/img/icon/zufangyuechifangzixianxing.png'),
                        index: 'renting',
                        title: '租房管理',
                        subs: [
                            {
                                index: 'renting',
                                title: '房源列表'
                            },
                            {
                                index: 'lowerRenting',
                                title: '下架列表'
                            }
                        ]
                    },
                    // 招聘管理
                    {
                        icon: require('../../assets/img/icon/zhaopin.png'),
                        index: 'JobVacancy',
                        title: '招聘管理',
                        subs: [
                            {
                                index: 'jobVacancy',
                                title: '职位列表'
                            },
                            {
                                index: 'xiajiaJobVacancy',
                                title: '下架职位列表'
                            }
                        ]
                    },
                    // 视频管理
                    {
                        icon: require('../../assets/img/icon/shipin.png'),
                        index: 'video',
                        title: '视频管理',
                        subs: [
                            {
                                index: 'videoIndex',
                                title: '视频列表'
                            },
                            {
                                index: 'lowerVideo',
                                title: '下架视频列表'
                            }
                        ]
                    },
                    // 优惠卷管理
                    {
                        icon: require('../../assets/img/icon/youhuiquan.png'),
                        index: 'couponControl',
                        title: '优惠卷管理',
                        subs: [
                            {
                                index: 'couponConList',
                                title: '优惠卷列表'
                            }
                        ]
                    },
                    // 活动管理
                    {
                        icon: require('../../assets/img/icon/event_no_choice.png'),
                        index: 'activity',
                        title: '活动管理',
                        subs: [
                            {
                                index: 'coupon',
                                title: '优惠券活动管理'
                            },
                            {
                                index: 'localgroup',
                                title: '同城团购活动管理'
                            },
                            {
                                index: 'seckillgl',
                                title: '秒杀活动管理'
                            },
                            {
                                index: 'discount',
                                title: '折扣专区管理'
                            },
                            {
                                index: 'warehouses',
                                title: '清仓活动管理'
                            },
                            {
                                index: 'raffleLottery',
                                title: '抽奖活动管理'
                            },
                            {
                                index: 'flashSale',
                                title: '限时抢购管理'
                            },
                            {
                                index: 'company',
                                title: '企业活动管理'
                            }
                        ]
                    },
                    // 动态管理
                    {
                        icon: require('../../assets/img/icon/dongtai.png'),
                        index: 'dynamicState',
                        title: '动态管理',
                        subs: [
                            {
                                index: 'dynamicState',
                                title: '图文动态'
                            },
                            {
                                index: 'articleDynamic',
                                title: '文章动态'
                            }
                        ]
                    },
                    // 配送费管理
                    {
                        icon: require('../../assets/img/icon/peishongfei.png'),
                        index: 'shippingFee',
                        title: '配送费管理',
                        subs: [
                            {
                                index: 'shippingfee',
                                title: '配送费设置'
                            }
                        ]
                    },
                    // 官网管理
                    {
                        icon: require('../../assets/img/icon/guanwang.png'),
                        index: 'officialWebsite',
                        title: '官网管理',
                        subs: [
                            {
                                index: 'officialwebsite',
                                title: '官网设置'
                            },
                            {
                                index: 'productCase',
                                title: '产品案例'
                            },
                            {
                                index: 'companyProcess',
                                title: '企业历程'
                            },
                            {
                                index: 'contactus',
                                title: '联系我们'
                            },
                            {
                                index: 'pressRelease',
                                title: '新闻公告'
                            }
                        ]
                    },
                    // 店铺管理
                    {
                        icon: require('../../assets/img/icon/dainpu.png'),
                        index: 'store',
                        title: '店铺管理',
                        subs: [
                            {
                                index: 'store',
                                title: '打烊设置'
                            }
                        ]
                    }
                ];
                this.items = items;
            }
        }
    }
};
</script>

<style>
.sidebarData {
    width: 11.4%;
    height: 100%;
    background: #fcfbfc;
}
.sidebarDataLi {
    padding: 12px 20px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}
.sidebarDataLi:hover {
    background-image: linear-gradient(to right, #4760ff, #0dccff);
    color: #fff;
    border-radius: 0 50px 50px 0;
}
.sidebarDataLi .sidebarTitle {
    padding: 3px 15px;
    cursor: pointer;
}
.el-submenu__title:hover {
    background-image: linear-gradient(to right, #4760ff, #0dccff);
    color: #fff;
    border-radius: 0 50px 50px 0;
}
.el-submenu__title:active {
    background-image: linear-gradient(to right, #4760ff, #0dccff);
    color: #fff;
    border-radius: 0 50px 50px 0;
}
.el-submenu__icon-arrow.el-icon-arrow-down:hover {
    color: #fff;
}
.el-menu .el-menu-item:hover {
    background: #0dccff;
    border-radius: 50px 50px 50px 50px;
    color: #fff;
}
.el-menu .el-menu-item:active {
    background: #0dccff;
    border-radius: 50px 50px 50px 50px;
    color: #fff;
}
</style>