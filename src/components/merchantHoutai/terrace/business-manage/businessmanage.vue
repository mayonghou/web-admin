<template>
    <div class="rootClasss">
        <div class="switchBtn">
            <span>功能分配</span>
            <span @click="Enterprisecooper">企业合作管理</span>
			<span>提成设置</span>
        </div>
        <div v-if="iShow">
        <p class="ClassRoot">设置企业可使用功能</p>
            <div class="rootClasss-count">
                <p class="rootClasss-count-p">工作台业务管理:</p>
                <div class="rootClasss-count-div">
                    <br />
                    <CheckboxGroup v-model="border">
                        <Checkbox
                            v-for="item in dataer"
                            :label="item.id"
                            :key="item.id"
                            border
                            style="margin:10px;"
                        >{{ item.name }}</Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div class="rootClasss-count">
                <p class="rootClasss-count-p">活动管理:</p>
                <div class="rootClasss-count-div">
                    <br />
                    <CheckboxGroup v-model="border02">
                        <Checkbox
                            v-for="item in dataer2"
                            :key="item.id"
                            :label="item.id"
                            border
                            style="margin:10px;"
                        >{{ item.name }}</Checkbox>
                    </CheckboxGroup>
					<!-- <el-checkbox-group v-model="border02"  size="mini">
					      <el-checkbox  
							v-for="item in dataer2"
                            :key="item.id"
                            :label="item.id"
                            border
                            style="margin:10px;">{{item.name}}</el-checkbox>
					</el-checkbox-group> -->
                </div>
            </div>
            <div class="rootClasss-count">
                <p class="rootClasss-count-p">工作台信息管理:</p>
                <div class="rootClasss-count-div">
                    <br />
                    <CheckboxGroup v-model="border03">
                        <Checkbox
                            v-for="item in dataer3"
                            :key="item.id"
                            :label="item.id"
                            border
                            style="margin:10px;"
                        >{{ item.name }}</Checkbox>
                    </CheckboxGroup>
                </div>
            </div>
            <div class="btmbuttom">
                <Button @click="preservation" type="primary">保存</Button>
            </div>
        </div>
        <div v-if="iShowtwo">
            <tablexyr></tablexyr>
        </div>
		<div v-if="isShoowFoner" style="margin-top: 50px;">
			<tiChengSheZhi v-if="QyId != ''" :QyId="QyId"></tiChengSheZhi>
		</div>
    </div>
</template>

<script>
import tablexyr from '../table-xyr/tablexyr.vue';
import tiChengSheZhi from '../table-xyr/tiChengSheZhi.vue'
export default {
    data() {
        return {
            iShow: false,
            iShowtwo: false,
            isShowinfor: true,
			isShoowFoner: false,
            border: [],
            border02: [],
            border03: [],
            dataer: [],
            dataer2: [],
            dataer3: [],
            QyId: '',
            sn: ''
        };
    },
    components: {
        tablexyr,
		tiChengSheZhi
    },
    methods: {
        // swich
        switchBtn() {
            let awitchBtn = document.querySelectorAll('.switchBtn span');
            this.iShow = true;
            for (let i = 0; i < awitchBtn.length; i++) {
                awitchBtn[0].classList.add('clickEvent');
                awitchBtn[i].addEventListener('click', () => {
                    if (i == 0) {
                        awitchBtn[0].classList.add('clickEvent');
                        awitchBtn[1].classList.remove('clickEvent');
                        awitchBtn[2].classList.remove('clickEvent');
                        this.$nextTick(() => {
                            this.iShow = true;
                            this.iShowtwo = false;
                            this.isShowinfor = true;
							this.isShoowFoner = false;
                        });
                    } else if (i == 1) {
                        awitchBtn[1].classList.add('clickEvent');
                        awitchBtn[0].classList.remove('clickEvent');
                        awitchBtn[2].classList.remove('clickEvent');
                        this.$nextTick(() => {
                            this.iShow = false;
                            this.iShowtwo = true;
                            this.isShowinfor = false;
							this.isShoowFoner = false;
                        });
                    } else if (i == 2) {
                        awitchBtn[1].classList.remove('clickEvent');
                        awitchBtn[0].classList.remove('clickEvent');
                        awitchBtn[2].classList.add('clickEvent');
                        this.$nextTick(() => {
                            this.iShow = false;
                            this.iShowtwo = false;
                            this.isShowinfor = false;
							this.isShoowFoner = true;
                        });
                    }
                });
            }
        },
        // 保存
        preservation() {
            this.sn = this.border.join(',') + ',' + this.border02.join(',') + ',' + this.border03.join(',');
			const url = 'admin/company/manage?id=' + this.$route.query.id + '&sn=' + this.sn;
			this.$axios
			    .get(url)
			    .then((res) => {
					console.log(res);
			        if (res.status == 200) {
			            const rewu = res.data;
			            if (rewu.code == 200) {
			                alert(rewu.msg);
			                this.$router.push({
			                    path: '/index'
			                });
			            } else {
			                alert('你未选择标签，不能进行保存！');
			            }
			        }
			    })
			    .catch((err) => {});
        },
        // $ajax   //CheckBox
        httpRequestData() {
            const url = 'admin/company/element/list';
            this.$axios
                .get(url)
                .then((res) => {
                    if (res.status == 200) {
                        let datat = res.data;
                        if (datat.code == 200) {
                            let dataer = datat.data;
                            this.dataer = dataer.informationMgr;
                            this.dataer2 = dataer.companyMgr;
                            this.dataer3 = dataer.activityMgr;
                        }
                    }
                })
                .catch((err) => {});
        },
        // 企业合作管理
        Enterprisecooper() {},
		// 根据企业ID查询企业拥有那些权限
		getCompanyElecty(){
			let id = this.$route.query.id;
			this.$axios.get('admin/company/element/sn/' + id).then((res) => {
				if(res.status == 200){
					let data = res.data;
					if(data.code == 200){
						let arr1 = [];
						let arr2 = [];
						let arr3 = [];
						data.data.forEach((val, index) => {
							if(val.id < 200){
								arr1[index] = val.id;
							} else if(val.id < 300) {
								arr2[index] = val.id;
							} else if(val.id >= 300) {
								arr3[index] = val.id;
							}
						});
						this.border = arr1;
						this.border02 = arr2;
						this.border03 = arr3;
						
					}
				}
			});
		},
    },
    created() {
        this.QyId = this.$route.query.id;
    },
    mounted() {
        this.switchBtn();
        this.httpRequestData();
		this.getCompanyElecty();
    }
};
</script>

<style scoped>
.rootClasss {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 50px 50px;
}
.rootClasss-count {
    display: flex;
    width: 100%;
    height: auto;
}
.rootClasss-count-p {
    width: 150px;
    margin: 10px 0px;
    text-align: right;
    margin-right: 10px;
    display: block;
}
.rootClasss-count-div {
    width: 100%;
}
.ClassRoot {
    margin: 36px 0px 43px 0px;
}
.btmbuttom {
    width: 100%;
    height: auto;
    padding: 20px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btmbuttom Button {
    padding: 0 50px;
}
.switchBtn span {
    padding: 10px 36px;
    border: solid 1px #2450d2;
}
.clickEvent {
    background-color: #2450d2;
    color: #fff;
}
</style>