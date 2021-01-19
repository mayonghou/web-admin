import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      component: () => import( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: {
        title: '自述文件'
      },
      children: [{
          path: '/dataCenterindex',
          component: () => import('../view/Data-center/dataCenterindex.vue'),
          // component: Index,
          meta: {
            title: '数据中心'
          },
          children: [{
              path: '/',
              component: () => import('../view/Data-center/Industry-data/Industrydata.vue'),
              // component: Index,
              meta: {
                title: '行业数据'
              }
            },
            {
              path: '/Malldata',
              component: () => import('../view/Data-center/Mall-data/Malldata.vue'),
              // component: Index,
              meta: {
                title: '商城数据'
              }
            },
            {
              path: '/Recruitmentdata',
              component: () => import('../view/Data-center/Recruitment-data/Recruitmentdata.vue'),
              // component: Index,
              meta: {
                title: '招聘数据'
              }
            },
            {
              path: '/housedata',
              component: () => import('../view/Data-center/house-Data/housedata.vue'),
              // component: Index,
              meta: {
                title: '房源数据'
              }
            },
          ]
        },
        {
          path: '/marketingindex',
          component: () => import('../view/Marketing-Center/marketingindex.vue'),
          // component: Index,
          meta: {
            title: '营销中心'
          },
        },
        {
          path: '/productindex',
          component: () => import('../view/Product-Center/productindex.vue'),
          // component: Index,
          meta: {
            title: '产品中心'
          }
        },
        {
          path: '/index',
          component: () => import( /* webpackChunkName: "index" */ '../components/merchantHoutai/terrace/index.vue'),
          // component: Index,
          meta: {
            title: '企业列表'
          }
        },
        {
          path: '/addEnterprise',
          component: () => import( /* webpackChunkName: "addEnterprise" */
            '../components/merchantHoutai/terrace/addEnterprise.vue'),
          // component: Index,
          meta: {
            title: '添加企业'
          }
        },
        // xiaoyuer   businessmanage
        {
          path: '/businessmanage',
          component: () => import( /* webpackChunkName: "addEnterprise" */ '../components/merchantHoutai/terrace/business-manage/businessmanage.vue'),
          // component: Index,
          meta: {
            title: '管理 '
          }
        },
        {
          path: '/tablexyrCopy',
          component: () => import( /* webpackChunkName: "addEnterprise" */ '../components/merchantHoutai/terrace/table-xyr/tablexyrCopy.vue'),
          // component: Index,
          meta: {
            title: '查看 '
          }
        },
        {
          path: '/viewdata',
          component: () => import( /* webpackChunkName: "addEnterprise" */ '../components/merchantHoutai/terrace/table-xyr/view-data/viewdata.vue'),
          // component: Index,
          meta: {
            title: '查看数据 '
          }
        },
        {
          path: '/details',
          component: () => import( /* webpackChunkName: "addEnterprise" */ '../components/merchantHoutai/terrace/table-xyr/components/details.vue'),
          // component: Index,
          meta: {
            title: '查看详情'
          }
        },
        {
          path: '/editerinfor',
          component: () => import( /* webpackChunkName: "addEnterprise" */ '../components/merchantHoutai/terrace/editer-infor/editerinfor.vue'),
          // component: Index,
          meta: {
            title: '编辑 '
          }
        },
        {
          path: '/editEnterprise',
          component: () => import( /* webpackChunkName: "editEnterprise" */
            '../components/merchantHoutai/terrace/editEnterprise.vue'),
          // component: Index,
          meta: {
            title: '编辑企业'
          }
        },
        {
          path: '/editDatetl',
          component: () => import('../components/merchantHoutai/terrace/editDatetl.vue'),
          // component: Index,
          meta: {
            title: '查看企业'
          }
        },
        {
          path: '/lookcompany',
          component: () => import('../components/merchantHoutai/terrace/cooperation/lookcompany.vue'),
          // component: Index,
          meta: {
            title: '查看企业'
          }
        },
        {
          path: '/workadmin',
          component: () => import( /* webpackChunkName: "workadmin" */
            '../components/merchantHoutai/workAdmin/workadmin.vue'),
          // component: Index,
          meta: {
            title: '团队管理'
          }
        },
        {
          path: '/member',
          component: () => import( /* webpackChunkName: "member" */ '../components/merchantHoutai/workAdmin/member.vue'),
          // component: Index,
          meta: {
            title: '团队成员管理'
          }
        },
        {
          path: '/ManagePositions',
          component: () => import( /* webpackChunkName: "ManagePositions" */
            '../components/merchantHoutai/workAdmin/ManagePositions.vue'),
          // component: Index,
          meta: {
            title: '职位管理'
          }
        },
        {
          path: '/membership',
          component: () => import( /* webpackChunkName: "membership" */
            '../components/merchantHoutai/workAdmin/membership/membership.vue'),
          // component: Index,
          meta: {
            title: '会员列表'
          }
        },
        {
          path: '/memberdetails',
          component: () => import('../view/member-details/memberdetails.vue'),
          // component: Index,
          meta: {
            title: '查看详情'
          }
        },
        // xiaoyuer
        {
          path: '/commoditymanagement',
          component: () => import('../view/Commodity-management/commoditymanagement.vue'),
          // component: Index,
          meta: {
            title: '商品列表'
          }
        },
        {
          path: '/detailspage',
          component: () => import('../view/Commodity-management/details-page/detailspage.vue'),
          // component: Index,
          meta: {
            title: '商品详情'
          }
        },
        {
          path: '/inancialmanagement',
          component: () => import('../view/inancial-management/inancialmanagement.vue'),
          // component: Index,
          meta: {
            title: '财务管理'
          }
        },
        {
          path: '/rentalmanagement',
          component: () => import('../view/Rental-management/rentalmanagement.vue'),
          // component: Index,
          meta: {
            title: '租房管理'
          }
        },
        {
          path: '/Details-page-two',
          component: () => import('../view/Rental-management/Details-page-two/details-page-two.vue'),
          // component: Index,
          meta: {
            title: '租房详情'
          }
        },
        {
          path: '/recruitmentmanagement',
          component: () => import('../view/Recruitment-management/recruitmentmanagement.vue'),
          // component: Index,
          meta: {
            title: '招聘管理'
          }
        },
        {
          path: '/recruitdetails',
          component: () => import('../view/Recruitment-management/recruitdetails/recruitdetails.vue'),
          // component: Index,
          meta: {
            title: '招聘管理详情'
          }
        },
        {
          path: '/videomanagement',
          component: () => import('../view/Video-management/videomanagement.vue'),
          // component: Index,
          meta: {
            title: '视频列表'
          }
        },
        {
          path: '/videodetail',
          component: () => import('../view/Video-management/videodetail/videodetail.vue'),
          // component: Index,
          meta: {
            title: '视频列表详情'
          }
        },
        {
          path: '/opportunitymg',
          component: () => import('../view/Opportunity-mg/opportunitymg.vue'),
          // component: Index,
          meta: {
            title: '商机管理'
          }
        },
        {
          path: '/oppodetailpage',
          component: () => import('../view/Opportunity-mg/Oppodetailpage/oppodetailpage.vue'),
          // component: Index,
          meta: {
            title: '商机管理详情'
          }
        },
        {
          path: '/coupongl',
          component: () => import('../view/Activity-management/Coupongl/coupongl.vue'),
          // component: Index,
          meta: {
            title: '优惠券管理'
          }
        },
        {
          path: '/Event-detai-page',
          component: () => import('../view/Activity-management/Coupongl/Event-detai-page/Event-detai-page.vue'),
          // component: Index,
          meta: {
            title: '优惠券管理详情'
          }
        },
        {
          path: '/group-buying',
          component: () => import('../view/Activity-management/Group-buying/group-buying.vue'),
          // component: Index,
          meta: {
            title: '同城团购管理'
          }
        },
        {
          path: '/Group-detai-page',
          component: () => import('../view/Activity-management/Group-buying/Group-detai-page/Group-detai-page.vue'),
          // component: Index,
          meta: {
            title: '同城团购管理详情'
          }
        },
        {
          path: '/seckill',
          component: () => import('../view/Activity-management/seckill/seckill.vue'),
          // component: Index,
          meta: {
            title: '秒杀管理'
          }
        },
        {
          path: '/seckill-detai-page',
          component: () => import('../view/Activity-management/seckill/seckill-detai-page/seckill-detai-page.vue'),
          // component: Index,
          meta: {
            title: '秒杀管理详情'
          }
        },
        {
          path: '/discount-zone',
          component: () => import('../view/Activity-management/Discount-zone/discount-zone.vue'),
          // component: Index,
          meta: {
            title: '折扣专区管理'
          }
        },
        {
          path: '/Dis-detai-page',
          component: () => import('../view/Activity-management/Discount-zone/Dis-detai-page/Dis-detai-page.vue'),
          // component: Index,
          meta: {
            title: '折扣专区详情'
          }
        },
        {
          path: '/Site-clearing',
          component: () => import('../view/Activity-management/Site-clearing/Site-clearing.vue'),
          // component: Index,
          meta: {
            title: '清仓处理管理'
          }
        },
        {
          path: '/sit-detai-page',
          component: () => import('../view/Activity-management/Site-clearing/sit-detai-page/sit-detai-page.vue'),
          // component: Index,
          meta: {
            title: '清仓处理详情'
          }
        },
        {
          path: '/luckdraw',
          component: () => import('../view/Activity-management/luckdraw/luckdraw.vue'),
          // component: Index,
          meta: {
            title: '抽奖管理'
          }
        },
        {
          path: '/luck-detai-page',
          component: () => import('../view/Activity-management/luckdraw/luck-detai-page/luck-detai-page.vue'),
          // component: Index,
          meta: {
            title: '抽奖管理详情'
          }
        },
        {
          path: '/flash-sale',
          component: () => import('../view/Activity-management/flash-sale/flash-sale.vue'),
          // component: Index,
          meta: {
            title: '限时抢购管理'
          }
        },
        {
          path: '/flash-detai-page',
          component: () => import('../view/Activity-management/flash-sale/flash-detai-page/flash-detai-page.vue'),
          // component: Index,
          meta: {
            title: '限时抢购详情'
          }
        },
        {
          path: '/enterprise-activity',
          component: () => import('../view/Activity-management/enterprise-activity/enterprise-activity.vue'),
          // component: Index,
          meta: {
            title: '企业活动管理'
          }
        },
        {
          path: '/ent-detai-page',
          component: () => import('../view/Activity-management/enterprise-activity/ent-detai-page/ent-detai-page.vue'),
          // component: Index,
          meta: {
            title: '企业活动详情'
          }
        },
        {
          path: '/graphic-news',
          component: () => import('../view/Dynamic-management/Graphic-news/graphic-news.vue'),
          // component: Index,
          meta: {
            title: '图文动态'
          }
        },
        {
          path: '/Gr-detai-page',
          component: () => import('../view/Dynamic-management/Graphic-news/Gr-detai-page/Gr-detai-page.vue'),
          // component: Index,
          meta: {
            title: '图文动态详情'
          }
        },
        {
          path: '/Article-news',
          component: () => import('../view/Dynamic-management/Article-news/article-news.vue'),
          // component: Index,
          meta: {
            title: '文章动态'
          }
        },
        {
          path: '/Ar-detai-page',
          component: () => import('../view/Dynamic-management/Article-news/Ar-detai-page/Ar-detai-page.vue'),
          // component: Index,
          meta: {
            title: '文章动态详情'
          }
        },
        /*
        {
        	path: '/couponindex',
        	component: () => import('../view/coupon-gl/couponindex.vue'),
        	// component: Index,
        	meta: {
        		title: '优惠券管理'
        	}
        },
        */
        {
          path: '/Industry',
          component: () => import('../view/Industrygl/Industry.vue'),
          // component: Index,
          meta: {
            title: '行业管理'
          }
        },
        {
          path: '/administration',
          component: () => import('../view/Industrygl/administration/administration.vue'),
          // component: Index,
          meta: {
            title: '管理'
          }
        },
        {
          path: '/advertisement',
          component: () => import('../view/advertisement-gl/advertisement.vue'),
          // component: Index,
          meta: {
            title: '广告管理'
          }
        },

        {
          path: '/adver',
          component: () => import('../view/advertisement-gl/adver-gl/adver.vue'),
          // component: Index,
          meta: {
            title: '管理'
          }
        },
        {
          path: '/Personnel',
          component: () => import('../view/Sharing-Qianlima/Personnel-gl/Personnel.vue'),
          // component: Index,
          meta: {
            title: '人员管理'
          }
        },
        {
          path: '/personalinfor',
          component: () => import('../view/Sharing-Qianlima/Personnel-gl/personal-infor/personalinfor.vue'),
          // component: Index,
          meta: {
            title: '管理'
          }
        },
        {
          path: '/edit',
          component: () => import('../view/Sharing-Qianlima/Personnel-gl/component/edit.vue'),
          // component: Index,
          meta: {
            title: '编辑'
          }
        },
        {
          path: '/PersonnelSet',
          component: () => import('../view/Sharing-Qianlima/PersonnelSet/PersonnelSet.vue'),
          // component: Index,
          meta: {
            title: '人员管理设置'
          }
        },
        {
          path: '/expandfunction',
          component: () => import('../view/Expandfunction/expandfunction.vue'),
          // component: Index,
          meta: {
            title: '平台公告'
          }
        },
        {
          path: '/viewannoun',
          component: () => import('../view/Expandfunction/viewannoun/viewannoun.vue'),
          // component: Index,
          meta: {
            title: '查看公告'
          }
        },
        // end
        {
          path: '/cooperationGl',
          component: () => import( /* webpackChunkName: "cooperationGl" */
            '../components/merchantHoutai/terrace/cooperation/cooperationGl.vue'),
          // component: Index,
          meta: {
            title: '企业合作'
          }
        },
        {
          path: '/cooperationList',
          component: () => import('../components/merchantHoutai/terrace/cooperation/cooperationList.vue'),
          // component: Index,
          meta: {
            title: '企业合作列表'
          }
        },
        {
          path: '/AdvocacyMyShpping',
          component: () => import('../components/merchantHoutai/terrace/cooperation/AdvocacyMyShpping.vue'),
          meta: {
            title: '代言我的产品'
          }
        },
        {
          path: '/MyAdvocacyShpping',
          component: () => import('../components/merchantHoutai/terrace/cooperation/MyAdvocacyShpping.vue'),
          meta: {
            title: '我代言的产品'
          }
        },
        {
          // 查看代言数据
          path: '/lookData',
          component: () => import('../components/merchantHoutai/terrace/cooperation/lookData.vue'),
          meta: {
            title: '查看数据'
          }
        },
        {
          // 查看代言数据
          path: '/lookduibiList',
          component: () => import('../components/merchantHoutai/terrace/cooperation/lookduibiList.vue'),
          meta: {
            title: '查看数据'
          }
        },
        {
          // 查看代言数据详情
          path: '/lookDetail',
          component: () => import('../components/merchantHoutai/terrace/cooperation/lookDetail.vue'),
          meta: {
            title: '查看详情'
          }
        },
        {
          path: '/editDatetldata',
          component: () => import('../components/merchantHoutai/terrace/cooperation/editDatetldata.vue'),
          meta: {
            title: '查看企业'
          }
        },
        {
          path: '/addEndorsement',
          component: () => import('../components/merchantHoutai/terrace/addEndorsement.vue'),
          // component: Index,
          meta: {
            title: '添加产品代言'
          }
        },
        {
          path: '/qiyedaiyanList',
          component: () => import('../components/merchantHoutai/terrace/qiyehezuodaiyan/qiyedaiyanList.vue'),
          // component: Index,
          meta: {
            title: '产品代言列表'
          }
        },
        {
          path: '/vocationList',
          component: () => import( /* webpackChunkName: "vocationList" */
            '../components/merchantHoutai/vocation/vocationList.vue'),
          // component: Index,
          meta: {
            title: '行业列表'
          }
        },
        // {
        // 	path: '/vocationList',
        // 	component: () => import( /* webpackChunkName: "vocationList" */ '../components/merchantHoutai/vocation/vocationList.vue'),
        // 	// component: Index,
        // 	meta: {
        // 		title: '行业列表'
        // 	}
        // },
        {
          path: '/zhiweiGL',
          component: () => import('../components/merchantHoutai/vocation/zhiweiGL.vue'),
          // component: Index,
          meta: {
            title: '职位管理'
          }
        },
        //租房管理
        {
          path: '/renting',
          component: () => import( /* webpackChunkName: "Renting" */ '../components/merchantHoutai/Renting/renting.vue'),
          // component: Index,
          meta: {
            title: '房源列表'
          }
        },
        {
          path: '/addrenting',
          component: () => import('../components/merchantHoutai/Renting/addrenting.vue'),
          // component: Index,
          meta: {
            title: '添加房源'
          }
        },
        {
          path: '/updaterenting',
          component: () => import('../components/merchantHoutai/Renting/updaterenting.vue'),
          // component: Index,
          meta: {
            title: '修改房源'
          }
        },
        {
          path: '/dateilrenting',
          component: () => import('../components/merchantHoutai/Renting/dateilrenting.vue'),
          meta: {
            title: '房源详情'
          }
        },
        {
          path: '/lowerRenting',
          component: () => import('../components/merchantHoutai/Renting/lowerRenting.vue'),
          // component: Index,
          meta: {
            title: '下架的房源'
          }
        },
        // 订单管理
        {
          path: '/order',
          component: () => import('../components/merchantHoutai/order/order.vue'),
          // component: Index,
          meta: {
            title: '订单列表'
          }
        },
        {
          path: '/orderDetail',
          component: () => import('../components/merchantHoutai/order/orderDetail.vue'),
          // component: Index,
          meta: {
            title: '订单详情'
          }
        },
        {
          path: '/salesreturn',
          component: () => import('../components/merchantHoutai/order/returnsales/salesreturn.vue'),
          // component: Index,
          meta: {
            title: '退货申请处理'
          }
        },
        {
          path: '/salesreturn',
          component: () => import('../components/merchantHoutai/order/returnsales/salesreturn.vue'),
          // component: Index,
          meta: {
            title: '退货申请处理'
          }
        },
        {
          path: '/returnMoney',
          component: () => import('../components/merchantHoutai/order/returnsales/returnMoney.vue'),
          // component: Index,
          meta: {
            title: '退货申请中'
          }
        },
        {
          path: '/returnMoneywuliu',
          component: () => import('../components/merchantHoutai/order/returnsales/returnMoneywuliu.vue'),
          // component: Index,
          meta: {
            title: '物流退货申请中'
          }
        },
        {
          path: '/orderlistb',
          component: () => import( /* webpackChunkName: "Renting" */ '../view/Order-manger/orderlistb.vue'),
          // component: Index,
          meta: {
            title: '订单列表'
          }
        },
        {
          path: '/viewdetails',
          component: () => import( /* webpackChunkName: "Renting" */ '../view/Order-manger/component/viewdetails.vue'),
          // component: Index,
          meta: {
            title: '订单列表详情'
          }
        },
        {
          path: '/ordersetupa',
          component: () => import( /* webpackChunkName: "Renting" */ '../view/Order-manger/ordersetupa.vue'),
          // component: Index,
          meta: {
            title: '订单设置'
          }
        },
        // 客户管理
        {
          path: '/kehuadmin',
          component: () => import( /* webpackChunkName: "Renting" */ '../components/merchantHoutai/kehu/kehuadmin.vue'),
          // component: Index,
          meta: {
            title: '客户列表'
          }
        },
        {
          path: '/kuhuDetail',
          component: () => import('../components/merchantHoutai/kehu/kuhuDetail.vue'),
          meta: {
            title: '客户详情'
          }
        },
        {
          path: '/kehuleixingList',
          component: () => import('../components/merchantHoutai/kehu/kehuleixingList.vue'),
          meta: {
            title: '客户类型设置'
          }
        },
        // 商品管理
        {
          path: '/goodsList',
          component: () => import( /* webpackChunkName: "goods" */ '../components/merchantHoutai/goods/goodsList.vue'),
          // component: Index,
          meta: {
            title: '商品列表'
          }
        },
        {
          path: '/addgoods',
          component: () => import('../components/merchantHoutai/goods/addgoods.vue'),
          // component: Index,
          meta: {
            title: '发布商品'
          }
        },
        {
          path: '/goodsDetail',
          component: () => import('../components/merchantHoutai/goods/goodsDetail.vue'),
          // component: Index,
          meta: {
            title: '商品详情'
          }
        },
        {
          path: '/xiajiagoods',
          component: () => import('../components/merchantHoutai/goods/xiajiagoods.vue'),
          // component: Index,
          meta: {
            title: '下架的商品列表'
          }
        },
        // 商机管理
        {
          path: '/business',
          component: () => import( /* webpackChunkName: "business" */
            '../components/merchantHoutai/business/business.vue'),
          // component: Index,
          meta: {
            title: '商机列表'
          }
        },
        {
          path: '/addbusiness',
          component: () => import('../components/merchantHoutai/business/addbusiness.vue'),
          // component: Index,
          meta: {
            title: '添加商机'
          }
        },
        {
          path: '/editbusiness',
          component: () => import('../components/merchantHoutai/business/editbusiness.vue'),
          // component: Index,
          meta: {
            title: '编辑商机'
          }
        },
        {
          path: '/lookbusiness',
          component: () => import('../components/merchantHoutai/business/lookbusiness.vue'),
          // component: Index,
          meta: {
            title: '查看商机'
          }
        },
        // 财务管理
        {
          path: '/finance',
          component: () => import( /* webpackChunkName: "finance" */ '../components/merchantHoutai/finance/finance.vue'),
          // component: Index,
          meta: {
            title: '财务列表'
          }
        },
        {
          path: '/moneyNumber',
          component: () => import('../components/merchantHoutai/finance/moneyNumber.vue'),
          // component: Index,
          meta: {
            title: '财务列表'
          }
        },
        // 招聘管理
        {
          path: '/jobVacancy',
          component: () => import( /* webpackChunkName: "JobVacancy" */
            '../components/merchantHoutai/JobVacancy/jobVacancy.vue'),
          // component: Index,
          meta: {
            title: '职位列表'
          }
        },
        {
          path: '/xiajiaJobVacancy',
          component: () => import('../components/merchantHoutai/JobVacancy/xiajiaJobVacancy.vue'),
          // component: Index,
          meta: {
            title: '下架的职位列表'
          }
        },
        {
          path: '/addjobVacancy',
          component: () => import('../components/merchantHoutai/JobVacancy/addjobVacancy.vue'),
          // component: Index,
          meta: {
            title: '发布职位'
          }
        },
        {
          path: '/updateJobVacancy',
          component: () => import('../components/merchantHoutai/JobVacancy/updateJobVacancy.vue'),
          // component: Index,
          meta: {
            title: '修改职位'
          }
        },
        {
          path: '/lookJobVacancy',
          component: () => import('../components/merchantHoutai/JobVacancy/lookJobVacancy.vue'),
          // component: Index,
          meta: {
            title: '查看职位详情'
          }
        },
        // 视频管理
        {
          path: '/videoIndex',
          component: () => import( /* webpackChunkName: "video" */ '../components/merchantHoutai/video/videoIndex.vue'),
          // component: Index,
          meta: {
            title: '视频列表'
          }
        },
        {
          path: '/lowerVideo',
          component: () => import('../components/merchantHoutai/video/lowerVideo.vue'),
          // component: Index,
          meta: {
            title: '下架视频列表'
          }
        },
        {
          path: '/addVideo',
          component: () => import('../components/merchantHoutai/video/addVideo.vue'),
          // component: Index,
          meta: {
            title: '添加视频'
          }
        },
        {
          path: '/detailVideo',
          component: () => import('../components/merchantHoutai/video/detailVideo.vue'),
          // component: Index,
          meta: {
            title: '视频详情'
          }
        },
        // 优惠卷管理
        {
          path: '/couponConList',
          component: () => import( /* webpackChunkName: "localgroup" */
            '../components/merchantHoutai/couponControl/couponConList.vue'),
          meta: {
            title: '优惠券列表'
          }
        },
        // {
        // 	path: '/lowercouponCon',
        // 	component: () => import( '../components/merchantHoutai/couponControl/lowercouponCon.vue'),
        // 	meta: { title: '下架优惠券列表' }
        // },
        {
          path: '/addcouponControl',
          component: () => import('../components/merchantHoutai/couponControl/addcouponControl.vue'),
          meta: {
            title: '发布优惠券--满减'
          }
        },
        {
          path: '/addcouponControlvoucher',
          component: () => import('../components/merchantHoutai/couponControl/addcouponControlvoucher.vue'),
          meta: {
            title: '发布优惠券--代金'
          }
        },
        {
          path: '/detailCouponCon',
          component: () => import('../components/merchantHoutai/couponControl/detailCouponCon.vue'),
          meta: {
            title: '优惠券详情'
          }
        },
        // 活动管理 -----优惠卷
        {
          path: '/coupon',
          component: () => import( /* webpackChunkName: "coupon" */
            '../components/merchantHoutai/activity/coupon/coupon.vue'),
          // component: Index,
          meta: {
            title: '优惠卷活动'
          }
        },
        {
          path: '/addcoupon',
          component: () => import('../components/merchantHoutai/activity/coupon/addcoupon.vue'),
          // component: Index,
          meta: {
            title: '发布优惠卷活动'
          }
        },
        {
          path: '/detailCoupon',
          component: () => import('../components/merchantHoutai/activity/coupon/detailCoupon.vue'),
          // component: Index,
          meta: {
            title: '优惠卷活动详情'
          }
        },
        // 活动管理 -----同城团购
        {
          path: '/localgroup',
          component: () => import( /* webpackChunkName: "localgroup" */
            '../components/merchantHoutai/activity/localgroup/localgroup.vue'),
          meta: {
            title: '同城团购活动'
          }
        },
        {
          path: '/addLocalgroup',
          component: () => import('../components/merchantHoutai/activity/localgroup/addLocalgroup.vue'),
          // component: Index,
          meta: {
            title: '发布同城团购'
          }
        },
        {
          path: '/detailLocalgroup',
          component: () => import('../components/merchantHoutai/activity/localgroup/detailLocalgroup.vue'),
          // component: Index,
          meta: {
            title: '同城团购详情'
          }
        },
        // 活动管理 -----秒杀活动
        {
          path: '/seckillgl',
          component: () => import( /* webpackChunkName: "seckill" */
            '../components/merchantHoutai/activity/seckill/seckillgl.vue'),
          // component: Index,
          meta: {
            title: '秒杀活动'
          }
        },
        {
          path: '/addseckill',
          component: () => import('../components/merchantHoutai/activity/seckill/addseckill.vue'),
          // component: Index,
          meta: {
            title: '发布秒杀'
          }
        },
        {
          path: '/detailseckill',
          component: () => import('../components/merchantHoutai/activity/seckill/detailseckill.vue'),
          // component: Index,
          meta: {
            title: '秒杀详情'
          }
        },
        // 活动管理 -----折扣专区
        {
          path: '/discount',
          component: () => import( /* webpackChunkName: "discount" */
            '../components/merchantHoutai/activity/discount/discount.vue'),
          // component: Index,
          meta: {
            title: '折扣活动'
          }
        },
        {
          path: '/adddiscount',
          component: () => import('../components/merchantHoutai/activity/discount/adddiscount.vue'),
          // component: Index,
          meta: {
            title: '发布折扣'
          }
        },
        {
          path: '/detaildiscount',
          component: () => import('../components/merchantHoutai/activity/discount/detaildiscount.vue'),
          // component: Index,
          meta: {
            title: '折扣详情'
          }
        },
        // 活动管理 -----清仓处理专区
        {
          path: '/warehouses',
          component: () => import( /* webpackChunkName: "warehouses" */
            '../components/merchantHoutai/activity/warehouses/warehouses.vue'),
          meta: {
            title: '清仓活动'
          }
        },
        {
          path: '/addWarehouses',
          component: () => import('../components/merchantHoutai/activity/warehouses/addWarehouses.vue'),
          meta: {
            title: '发布清仓活动'
          }
        },
        {
          path: '/detailWarehouses',
          component: () => import('../components/merchantHoutai/activity/warehouses/detailWarehouses.vue'),
          meta: {
            title: '清仓活动详情'
          }
        },
        // 活动管理 -----抽奖活动
        {
          path: '/raffleLottery',
          component: () => import( /* webpackChunkName: "raffleLottery" */
            '../components/merchantHoutai/activity/raffleLottery/raffleLottery.vue'),
          meta: {
            title: '抽奖活动'
          }
        },
        {
          path: '/addraffleLottery',
          component: () => import('../components/merchantHoutai/activity/raffleLottery/addraffleLottery.vue'),
          meta: {
            title: '发布抽奖活动'
          }
        },
        {
          path: '/detailRaffleLottery',
          component: () => import('../components/merchantHoutai/activity/raffleLottery/detailRaffleLottery.vue'),
          meta: {
            title: '抽奖详情'
          }
        },
        // 活动管理 -----限时抢购
        {
          path: '/flashSale',
          component: () => import( /* webpackChunkName: "flashSale" */
            '../components/merchantHoutai/activity/flashSale/flashSale.vue'),
          meta: {
            title: '限时抢购活动'
          }
        },
        {
          path: '/addflashSale',
          component: () => import('../components/merchantHoutai/activity/flashSale/addflashSale.vue'),
          meta: {
            title: '发布限时抢购'
          }
        },
        {
          path: '/flashSaleDetail',
          component: () => import('../components/merchantHoutai/activity/flashSale/flashSaleDetail.vue'),
          meta: {
            title: '限时抢购详情'
          }
        },
        // 活动管理 -----企业活动
        {
          path: '/company',
          component: () => import( /* webpackChunkName: "company" */
            '../components/merchantHoutai/activity/company/company.vue'),
          meta: {
            title: '企业活动管理'
          }
        },
        {
          path: '/detailcompany',
          component: () => import('../components/merchantHoutai/activity/company/detailcompany.vue'),
          meta: {
            title: '企业活动详情'
          }
        },
        {
          path: '/addcompany',
          component: () => import('../components/merchantHoutai/activity/company/addcompany.vue'),
          meta: {
            title: '发布企业活动'
          }
        },

        // 动态管理
        {
          path: '/dynamicState',
          component: () => import( /* webpackChunkName: "dynamicState" */
            '../components/merchantHoutai/dynamicState/Dynamic/dynamicState.vue'),
          meta: {
            title: '图文动态'
          }
        },
        {
          path: '/addDynamic',
          component: () => import('../components/merchantHoutai/dynamicState/Dynamic/addDynamic.vue'),
          meta: {
            title: '添加图文动态'
          }
        },
        {
          path: '/editDynamic',
          component: () => import('../components/merchantHoutai/dynamicState/Dynamic/editDynamic.vue'),
          meta: {
            title: '编辑图文动态'
          }
        },
        {
          path: '/DynamicDetail',
          component: () => import('../components/merchantHoutai/dynamicState/Dynamic/DynamicDetail.vue'),
          meta: {
            title: '图文动态详情'
          }
        },
        {
          path: '/articleDynamic',
          component: () => import( /* webpackChunkName: "dynamicState" */
            '../components/merchantHoutai/dynamicState/articDynamin/articleDynamic.vue'),
          meta: {
            title: '文章动态'
          }
        },
        {
          path: '/addarticDynamic',
          component: () => import('../components/merchantHoutai/dynamicState/articDynamin/addarticDynamic.vue'),
          meta: {
            title: '添加文章动态'
          }
        },
        {
          path: '/editArticDynamic',
          component: () => import('../components/merchantHoutai/dynamicState/articDynamin/editArticDynamic.vue'),
          meta: {
            title: '编辑文章动态'
          }
        },
        {
          path: '/articDynaminDetail',
          component: () => import('../components/merchantHoutai/dynamicState/articDynamin/articDynaminDetail.vue'),
          meta: {
            title: '文章动态详情'
          }
        },
        // 配送费管理
        {
          path: '/shippingfee',
          component: () => import('../components/merchantHoutai/shippingFee/shippingfee.vue'),
          meta: {
            title: '配送费管理'
          }
        },
        // 官网设置
        {
          path: '/officialwebsite',
          component: () => import('../components/merchantHoutai/officialWebsite/officialwebsite.vue'),
          meta: {
            title: '官网管理'
          }
        },
        {
          path: '/productCase',
          component: () => import('../components/merchantHoutai/officialWebsite/productCase/productCase.vue'),
          meta: {
            title: '产品案例'
          }
        },
        {
          path: '/addProductCase',
          component: () => import('../components/merchantHoutai/officialWebsite/productCase/addProductCase.vue'),
          meta: {
            title: '添加产品案例'
          }
        },
        {
          path: '/uodateProductCase',
          component: () => import('../components/merchantHoutai/officialWebsite/productCase/uodateProductCase.vue'),
          meta: {
            title: '编辑产品案例'
          }
        },
        {
          path: '/companyProcess',
          component: () => import('../components/merchantHoutai/officialWebsite/companyProcess/companyProcess.vue'),
          meta: {
            title: '企业历程'
          }
        },
        {
          path: '/addprocess',
          component: () => import('../components/merchantHoutai/officialWebsite/companyProcess/addprocess.vue'),
          meta: {
            title: '添加企业历程'
          }
        },
        {
          path: '/updateprocess',
          component: () => import('../components/merchantHoutai/officialWebsite/companyProcess/updateprocess.vue'),
          meta: {
            title: '编辑企业历程'
          }
        },
        {
          path: '/contactus',
          component: () => import('../components/merchantHoutai/officialWebsite/contactus.vue'),
          meta: {
            title: '联系我们'
          }
        },
        // 新闻公告
        {
          path: '/pressRelease',
          component: () => import('../components/merchantHoutai/officialWebsite/pressRelease/pressRelease.vue'),
          meta: {
            title: '新闻公告'
          }
        },
        // 发布新闻公告
        {
          path: '/addpressRelease',
          component: () => import('../components/merchantHoutai/officialWebsite/pressRelease/addpressRelease.vue'),
          meta: {
            title: '发布新闻公告'
          }
        },
        // 查看新闻公告
        {
          path: '/lookpressRelease',
          component: () => import('../components/merchantHoutai/officialWebsite/pressRelease/lookpressRelease.vue'),
          meta: {
            title: '查看新闻公告'
          }
        },
        // 店铺管理
        {
          path: '/store',
          component: () => import('../components/merchantHoutai/store/store.vue'),
          meta: {
            title: '店铺管理'
          }
        },
        // 首页
        {
          path: '/indexshouye',
          component: () => import('../components/merchantHoutai/indexshouye.vue'),
          meta: {
            title: '首页'
          }
        },
        // 数据中心
        {
          path: '/datacenter',
          component: () => import('../components/merchantHoutai/dataCenter/datacenter.vue'),
          meta: {
            title: '数据中心'
          }
        },
        // 营销中心
        {
          path: '/marketing',
          component: () => import('../components/merchantHoutai/marketingCenter/marketing.vue'),
          meta: {
            title: '营销中心'
          }
        },
        {
          path: '/xiaozhishiList',
          component: () => import('../components/merchantHoutai/marketingCenter/marketingxizozhishi/xiaozhishiList.vue'),
          meta: {
            title: '营销小知识'
          }
        },

        {
          path: '/activityList',
          component: () => import('../components/merchantHoutai/marketingCenter/activitymarket/activityList.vue'),
          meta: {
            title: '营销活动列表'
          }
        },
        {
          path: '/activityDetail',
          component: () => import('../components/merchantHoutai/marketingCenter/activitymarket/activityDetail.vue'),
          meta: {
            title: '营销活动详情'
          }
        },
        {
          path: '/zhishiDeatil',
          component: () => import('../components/merchantHoutai/marketingCenter/marketingxizozhishi/zhishiDeatil.vue'),
          meta: {
            title: '营销小知识详情'
          }
        },
        // 营销千里马
        {
          path: '/swifthorse',
          component: () => import('../components/merchantHoutai/marketingCenter/swiftHorse/swifthorse.vue'),
          meta: {
            title: '共享千里马'
          }
        },
        // 营销千里马详情
        {
          path: '/swifthorseDetail',
          component: () => import('../components/merchantHoutai/marketingCenter/swiftHorse/swifthorseDetail.vue'),
          meta: {
            title: '找他'
          }
        },
        // 确定订单
        {
          path: '/orderConfirm',
          component: () => import('../components/merchantHoutai/marketingCenter/swiftHorse/orderConfirm.vue'),
          meta: {
            title: '订单确定'
          }
        },
        // 营销中心视频详情
        {
          path: '/videoDetailmarket',
          name: 'videoDetailmarket',
          component: () => import('../components/merchantHoutai/marketingCenter/detailFile/videoDetailmarket.vue'),
          meta: {
            title: '视频详情'
          }
        },
        {
          path: '/myOrderIndex',
          component: () => import('../components/merchantHoutai/marketingCenter/swiftHorse/myOrder/myOrderIndex.vue'),
          meta: {
            title: '我的订单'
          }
        },
        {
          path: '/lookText',
          component: () => import('../components/merchantHoutai/marketingCenter/swiftHorse/myOrder/lookText.vue'),
          meta: {
            title: '上传文件列表'
          }
        },
        {
          path: '/bumanyi',
          component: () => import('../components/merchantHoutai/marketingCenter/swiftHorse/myOrder/bumanyi.vue'),
          meta: {
            title: '对作品不满意'
          }
        },
        // 产品中心
        {
          path: '/product',
          component: () => import('../components/merchantHoutai/productCenter/product.vue'),
          meta: {
            title: '产品中心'
          }
        },
        {
          path: '/addproduct',
          component: () => import('../components/merchantHoutai/productCenter/addproduct.vue'),
          meta: {
            title: '新增预设产品'
          }
        },
        {
          path: '/editproduct',
          component: () => import('../components/merchantHoutai/productCenter/editproduct.vue'),
          meta: {
            title: '修改预设产品'
          }
        },
        {
          path: '/versionDetail',
          component: () => import('../components/merchantHoutai/productCenter/versionDetail.vue'),
          meta: {
            title: '查看版本详情'
          }
        },
        // 消息中心
        {
          path: '/messagelist',
          component: () => import('../components/merchantHoutai/messageCenter/messagelist.vue'),
          meta: {
            title: '消息中心'
          }
        },
        // 平台公告详情
        {
          path: '/pintaigonggaodetail',
          component: () => import('../components/merchantHoutai/messageCenter/pintaigonggaodetail.vue'),
          meta: {
            title: '平台公告详情'
          }
        },


      ]
    },
    {
      path: '/login',
      component: () => import( /* webpackChunkName: "login" */ '../components/common/Login.vue'),
      meta: {
        title: '登录'
      }
    },
  ]
});