<template>
    <div class="marketimgzhishi" id="marketimgzhishi">
        <div class="listClass">
            <ul class="listUl">
                <li class="listLi" v-if="this.dataList == ''">
                    <img
                        style="margin: 0 auto;"
                        width="100%"
                        src="../../../../assets/img/queshengPage/ques1.png"
                        alt
                    />
                </li>
                <li
                    class="listLi"
                    v-else
                    v-for="item in this.dataList"
                    :key="item.id"
                    @click="detaitl(item)"
                >
                    <div class="xaiozhishiListass">
                        <div class="titleList">
                            <div style="text-align: center; font-size: 24px;">{{ item.title }}</div>
                            <div class="countVhtml" v-html="item.content"></div>
                        </div>
                        <i style="font-size: 28px" class="el-icon-right"></i>
                    </div>
                    <!-- 这个地方渲染出错下 -->
                    <!-- <div class="xaiozhishiListass">
                        <div class="titleText">
                            <div class="title">{{ item.title }}</div>
                            <div class="text dsadsadsad" v-html="item.content"></div>
                        </div>
                        <i style="font-size: 28px" class="el-icon-right"></i>
                    </div>-->
                </li>
            </ul>
            <el-pagination
                class="el-pagination"
                background
                layout="prev, pager, next"
                :total="counts"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            limit: 10,
            counts: 0,
            dataList: []
        };
    },
    mounted() {
        this.getnowledgeList();
    },
    methods: {
        detaitl(item) {
            console.log('fas');
            console.log(item.id);
            this.$router.push({
                path: './zhishiDeatil',
                query: {
                    id: item.id
                }
            });
        },
        getnowledgeList() {
            let datas = '?page=' + this.page + '&limit=' + this.limit;
            this.$axios.get('admin/admin/market/knowledge/selectAllMarketKnowledge' + datas).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        console.log(data);
                        this.counts = data.data.total;
                        this.dataList = data.data.data;
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
        }
    }
};
</script>

<style >
.marketimgzhishi {
    box-sizing: border-box;
    padding: 20px;
    width: 100%;
    /* background-color: #f5f7fc; */
}
.listClass {
    width: 70%;
    margin: 0 auto;
}
.listUl {
    width: 100%;
    /* height: 150px; */
}
.listLi {
    width: 100%;
    height: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
    background: #f6f6f6;
    cursor: pointer;
    margin-top: 20px;
}
.imgUrl {
    width: 25%;
    height: 100%;
}
.titleText {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 5px 30px 5px 30px;
    height: 100%;
    width: 70%;
}
.titleText .title {
    font-family: SourceHanSansSC-bold;
    color: #101010;
    line-height: 54px;
    font-size: 22px;
}
.titleText .text {
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    height: 50px;
}
.titleText .text p img {
    display: none;
}
.el-pagination {
    width: 100%;
    margin-top: 20px;
    text-align: center;
}
.xaiozhishiListass {
    width: 100%;
    height: 180px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.xaiozhishiListass .titleList {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.xaiozhishiListass .countVhtml img {
    display: none;
}
</style>
