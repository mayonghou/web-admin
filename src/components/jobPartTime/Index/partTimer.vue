<template>
    <div class="partTimeIndex" id="partTimeIndex">
        <div class="partTimeIndex-top">
            <el-card class="card-box">
                <div class="topLeft">
                    <el-avatar :size="size" :src="src"></el-avatar>
                    <div class="leftBody">
                        <div class="jobMessage1">
                            <span>{{this.jobName}}</span>
                            <i @click="editIcon" class="el-icon-edit"></i>
                        </div>
                        <div class="jobMessage2">
                            <span style="width:100px;">{{this.jobPostName}}</span>
                            <span style="width:100px;">{{this.jobExperience+'经验'}}</span>
                        </div>
                        <div class="jobMessage3">
                            <span>{{this.peopelNumber}}人找过他</span>
                            <el-rate v-model="value1" allow-half disabled></el-rate>
                            <span>按时完成率{{this.percentageComplete }}%</span>
                        </div>
                        <div class="jobMessage4">
                            <span>当前平台指导价：</span>
                            <span style="color: red;">{{this.pricePT}}￥/张</span>
                        </div>
                    </div>
                </div>
                <div class="myOrder">
                    <el-button class="myOrderText" @click="myOrder">我的订单</el-button>
                    <el-badge :value="12">
                        <el-button class="orderDispose" @click="orderDispose">订单处理</el-button>
                    </el-badge>
                </div>
            </el-card>
            <el-card class="card-box">
                <el-carousel :interval="5000" arrow="always" v-if="this.bannerList != ''">
                    <el-carousel-item v-for="(item,index) in this.bannerList" :key="index">
                        <img width="100%" height="100%" :src="item" />
                    </el-carousel-item>
                </el-carousel>
				<div v-else style="width: 100%; height: 310px;">
					<img width="100%" height="100%" src="../../../assets/img/marketingqianlima/zhangwutuipian.png" />
				</div>
				<!-- ../../../assets/img/marketingqianlima/zhangwutuipian.png -->
            </el-card>
            <el-card class="card-box box-text" :body-style="{height:'270px',overflow:'hidden'}">
                <div slot="header">
                    <span style="font-size: 20px;font-weight: bold;">平台公告</span>
                </div>
                <div v-for="item in this.platList" :key="item.id" class="text item textItem">{{item.title}}</div>
            </el-card>
        </div>
        <div class="partTimeIndexzhong"></div>

        <div class="partTimeIndex-bottom">
            <!-- 个人介绍 -->
            <el-card class="bottomBoxCardLeft">
                <div class="works">
                    <p class="worksDirection" v-if="this.worksTabs != ''">作品方向</p>
                    <div class="worksTags" v-if="this.worksTabs != ''">
                        <div class="tagstab" v-for="(item, indexs) in this.worksTabs" :key="indexs">{{item}}</div>
                    </div>
                    <p class="worksDirection">个人介绍</p>
                    <div class="SelfIntroduction" v-if="this.context != ''" v-html="context"></div>
					<div style="width: 100%; text-align: center;" v-else>
						<img src="../../../assets/img/marketingqianlima/zhanwuData.png" />
					</div>
                    <p class="worksDirection" v-if="this.styleDescription != ''">个人及作品风格</p>
                    <div class="SelfIntroduction"  v-if="this.styleDescription != ''">{{this.styleDescription}}</div>
                </div>
            </el-card>
            <!-- 作品集 -->
            <el-card class="bottomBoxCardRight">
                <div class="sampleReels">
                    <span class="zuopingji">
                        <span>作品集</span>
                        <i class="el-icon-edit" @click="editWorksji"></i>
                    </span>
                    <span>
                        <i class="el-icon-arrow-left"></i>
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </div>

                <div class="showreel">
                    <ul class="showreelUl">
                        <li class="showreelLi">
                            <div class="showreelLeft">
                                <video
                                    class="videoData"
                                    src="../../../assets/a.mp4"
                                    controls
                                    controlslist="nodownload"
                                ></video>
                            </div>
                            <div class="showreelRight">
                                <p>宇宙与自然</p>
                                <p>搭配绿色与宇宙色色调，采用等比例切割布局给人深刻的视觉冲击，抓住用户眼球，表达产品特点</p>
                                <p style="width: 100%;text-align: right;">1888次浏览</p>
                            </div>
                        </li>
                        <li class="showreelLi">
                            <div class="showreelLeft">
                                <video
                                    class="videoData"
                                    src="../../../assets/a.mp4"
                                    controls
                                    controlslist="nodownload"
                                ></video>
                            </div>
                            <div class="showreelRight">
                                <p>宇宙与自然</p>
                                <p>搭配绿色与宇宙色色调，采用等比例切割布局给人深刻的视觉冲击，抓住用户眼球，表达产品特点</p>
                                <p style="width: 100%;text-align: right;">1888次浏览</p>
                            </div>
                        </li>
                        <li class="showreelLi">
                            <div class="showreelLeft">
                                <video
                                    class="videoData"
                                    src="../../../assets/a.mp4"
                                    controls
                                    controlslist="nodownload"
                                ></video>
                            </div>
                            <div class="showreelRight">
                                <p>宇宙与自然</p>
                                <p>搭配绿色与宇宙色色调，采用等比例切割布局给人深刻的视觉冲击，抓住用户眼球，表达产品特点</p>
                                <p style="width: 100%;text-align: right;">1888次浏览</p>
                            </div>
                        </li>
                        <li class="showreelLi">
                            <div class="showreelLeft">
                                <video
                                    class="videoData"
                                    src="../../../assets/a.mp4"
                                    controls
                                    controlslist="nodownload"
                                ></video>
                            </div>
                            <div class="showreelRight">
                                <p>宇宙与自然</p>
                                <p>搭配绿色与宇宙色色调，采用等比例切割布局给人深刻的视觉冲击，抓住用户眼球，表达产品特点</p>
                                <p style="width: 100%;text-align: right;">1888次浏览</p>
                            </div>
                        </li>
                        <li class="showreelLi">
                            <div class="showreelLeft">
                                <video
                                    class="videoData"
                                    src="../../../assets/a.mp4"
                                    controls
                                    controlslist="nodownload"
                                ></video>
                            </div>
                            <div class="showreelRight">
                                <p>宇宙与自然</p>
                                <p>搭配绿色与宇宙色色调，采用等比例切割布局给人深刻的视觉冲击，抓住用户眼球，表达产品特点</p>
                                <p style="width: 100%;text-align: right;">1888次浏览</p>
                            </div>
                        </li>
                        <li class="showreelLi">
                            <div class="showreelLeft">
                                <video
                                    class="videoData"
                                    src="../../../assets/a.mp4"
                                    controls
                                    controlslist="nodownload"
                                ></video>
                            </div>
                            <div class="showreelRight">
                                <p>宇宙与自然</p>
                                <p>搭配绿色与宇宙色色调，采用等比例切割布局给人深刻的视觉冲击，抓住用户眼球，表达产品特点</p>
                                <p style="width: 100%;text-align: right;">1888次浏览</p>
                            </div>
                        </li>
                        <li class="showreelLi">
                            <div class="showreelLeft">
                                <video
                                    class="videoData"
                                    src="../../../assets/a.mp4"
                                    controls
                                    controlslist="nodownload"
                                ></video>
                            </div>
                            <div class="showreelRight">
                                <p>宇宙与自然</p>
                                <p>搭配绿色与宇宙色色调，采用等比例切割布局给人深刻的视觉冲击，抓住用户眼球，表达产品特点</p>
                                <p style="width: 100%;text-align: right;">1888次浏览</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'partTimeIndex',
    data() {
        return {
            size: 90,
            src:'',//兼职用户头像
			jobName:'',//兼职用户姓名
			jobPostName:'',//兼职用户职位
			jobExperience:'',//工作经验
			peopelNumber:'',//有多少人找个他
            value1: 0,//评分
			percentageComplete:'',//完成率
			pricePT:'',//平台指导价
            context: '',//自我介绍
			bannerList: [],// 作品轮播图
			platList:[],//平台公告,
			styleDescription:'',//个人及作品风格说明
        };
    },
    mounted() {
		this.getSelectMessage();
		this.getPlatformList();
	},
    methods: {
        //编辑个人资料
        editIcon() {
            this.$router.push({
                path: './editPersonalData'
            });
        },
        // 订单处理
        orderDispose() {
            this.$router.push({
                path: './orderDispose'
            });
        },
        myOrder() {
            this.$router.push({
                path: './myOrder'
            });
        },
		// 编辑作品集
		editWorksji(){
			this.$router.push({
			    path: './showreel'
			});
		},
		// 兼职首页查询个人信息
		getSelectMessage(){
			this.$axios.post('admin/sideline/personal/get_profile/'+localStorage.getItem('partTimerId')).then((res) => {
				if(res.status == 200){
					let data = res.data;
					if(data.code == 200){
						const basicInfoData = data.data.basicInfo;
						const detailInfoData = data.data.detailInfo;
						const https = /^(https):\/\/.+$/;
						// 兼职用户头像
						if(basicInfoData.avatar){
							if(https.test(basicInfoData.avatar)){
								this.src = basicInfoData.avatar;
							} else {
								this.src = localStorage.getItem('imgUrl') + basicInfoData.avatar;
							}
						}
						// 姓名
						this.jobName = basicInfoData.userName;
						// 职位
						this.jobPostName = basicInfoData.career;
						// 工作经验
						this.jobExperience = basicInfoData.workExperiences;
						// 多少人
						this.peopelNumber = detailInfoData.countOrder;
						// 评分
						console.log(detailInfoData.personalScore);
						if(detailInfoData.countOrder == 0){
							this.value1 = 5;
						} else {
							if(detailInfoData.personalScore > 0 && detailInfoData.personalScore <= 20 ){
								if(detailInfoData.personalScore > 10){
									this.value1 = 1.5;
								} else {
									this.value1 = 1;
								}
							} else if(detailInfoData.personalScore > 20 && detailInfoData.personalScore <= 40 ){
								if(detailInfoData.personalScore > 30){
									this.value1 = 2.5;
								} else {
									this.value1 = 2;
								}
							} else if(detailInfoData.personalScore > 40 && detailInfoData.personalScore <= 60 ){
								if(detailInfoData.personalScore > 50){
									this.value1 = 3.5;
								} else {
									this.value1 = 3;
								}
							} else if(detailInfoData.personalScore > 60 && detailInfoData.personalScore <= 80 ){
								if(detailInfoData.personalScore > 70){
									this.value1 = 4.5;
								} else {
									this.value1 = 4;
								}
							} else if(detailInfoData.personalScore > 80 && detailInfoData.personalScore <= 100 ){
								this.value1 = 5;
							}
						}
						// 完成率
						if(detailInfoData.countOrder == 0){
							this.percentageComplete = 100;
						} else {
							// 已完成的订单数
							let accomplishOrder = detailInfoData.countOrder - detailInfoData.countDelayOrder;
							this.percentageComplete = parseInt(accomplishOrder / detailInfoData.countOrder * 100);
						}
						// 平台指导价
						this.pricePT = basicInfoData.sysRecommendPrice / 100;
						// 个人作品轮播图列表
						if(basicInfoData.works){
							basicInfoData.works.forEach(function(val, index){
								if(https.test(val)){
									this.bannerList = val;
								} else {
									this.bannerList =localStorage.getItem('imgUrl') + val;
								}
							});
						}
						// 作品方向
						this.worksTabs = detailInfoData.worksTabs.split(',');
						// 自我介绍
						this.context = detailInfoData.introduction;
						// 
					}
				}
			});
		},
		// 查询平台公告
		getPlatformList(){
			let datas = {
				limit: 10,
				page:1,
			};
			this.$axios.post('admin/platform/list',datas).then((res) => {
				if(res.status == 200){
					let data = res.data;
					if(data.code == 200){
						this.platList = data.data.dataList;
					}
				}
			});
		}
    }
};
</script>

<style scoped>
.partTimeIndex {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
}
.partTimeIndex-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}
.card-box {
    width: 30%;
    height: 350px;
}
.card-box:nth-child(2) {
    width: 39%;
}
.textItem{
	width: 100%;
	overflow: hidden;
}

.topLeft {
    display: flex;
    justify-content: space-between;
}
.topLeft .leftBody {
    width: 80%;
    padding: 0 10px;
}
.leftBody .jobMessage1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26px;
    padding: 0 20px;
}
.leftBody .jobMessage1 i {
    color: #3a9df4;
    cursor: pointer;
}
.leftBody .jobMessage2 {
    display: flex;
    align-items: center;
    padding: 0 20px;
}
.leftBody .jobMessage3 {
    display: flex;
    align-items: center;
    padding: 0 20px;
    color: #8f8e94;
}
.leftBody .jobMessage4 {
    display: flex;
    align-items: center;
    padding: 0 20px;
    font-size: 20px;
}
.myOrder {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 200px;
}
.myOrderText {
    background-color: #3a9df4;
    color: #fff;
}
.orderDispose {
    background-color: #ff8d00;
    color: #fff;
}
.partTimeIndex-bottom {
    display: flex;
    justify-content: space-between;
    /* padding: 20px; */
}
.bottomBoxCardLeft {
    width: 69.5%;
}
.bottomBoxCardRight {
    width: 30%;
}
.partTimeIndexzhong {
    width: 100%;
    height: 30px;
}
.worksDirection {
    font-size: 20px;
    margin-top: 30px;
}
.worksTags {
    display: flex;
    flex-direction: row;
}
.worksTags .tagstab {
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ff8d00;
    color: #ff8d00;
}
.worksTags .tagstab:nth-child(1) {
    margin-left: 40px;
}
.SelfIntroduction {
    text-indent: 35px;
}

.bottomBoxCardRight .sampleReels {
    width: 100%;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.bottomBoxCardRight .sampleReels .zuopingji i {
    color: #0000ff;
    margin-left: 10px;
    cursor: pointer;
}
.bottomBoxCardRight .sampleReels i {
    cursor: pointer;
}
.showreel .showreelUl {
    overflow: hidden;
    height: 550px;
}
.showreel .showreelUl .showreelLi {
    list-style-type: none;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #ff8d00;
    padding-top: 10px;
    margin-bottom: 10px;
}
.showreel .showreelUl .showreelLi:nth-child(1) {
    border-top: 0;
}
.showreelLeft {
    width: 30%;
    height: 165px;
    background-color: #0000ff;
}
.showreelLeft .videoData {
    width: 100%;
    height: 165px;
}
.showreelRight {
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
