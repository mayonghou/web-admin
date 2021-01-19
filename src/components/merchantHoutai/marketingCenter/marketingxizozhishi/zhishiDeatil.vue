<template>
    <!-- 营销小知识详情 -->
    <div class="zhishiDateitl" id="zhishiDateitl">
        <div class="detail-tatle">
            <div class="title">
                <span>
                    <i class="iconfont icon-ai-eye"></i>
                    {{this.dataList.browse}}
                </span>
                <span class="title-text">{{this.dataList.pushTime}}</span>
            </div>
            <div class="titleClass">
                <span>{{this.dataList.title}}</span>
            </div>
        </div>
        <!-- 这个地方渲染可能出错 -->
        <div>
            <div class="imgUrl">
                <el-image class="el-img" :src="src"></el-image>
            </div>
            <div class="contents">{{this.dataList.content}}</div>
        </div>
        <!-- ---------------以上 -->
    </div>
</template>

<script>
export default {
    name: 'zhishiDateitl',
    data() {
        return {
            src: require('../../../../assets/img/img.jpg'),
            dataList: {}
        };
    },
    mounted() {
        this.getDetailData();
    },
    methods: {
        getDetailData() {
            console.log('fas');
            this.$axios.get('admin/admin/market/knowledge/select/' + this.$route.query.id).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.dataList = data.data;
                        console.log(this.dataList);
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

<style scoped>
.zhishiDateitl {
    box-sizing: border-box;
    padding: 20px;
    background: #f5f7fc;
}
.detail-tatle {
    width: 80%;
    height: 130px;
    background: #ffffff;
    margin: 0 auto;
    padding: 10px 30px;
}
.classfix::before {
    content: '';
    clear: both;
    padding: 0;
}
.bbbb {
    width: 100%;
}
.title {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    width: 100%;
}
.title-text {
    font-size: 16px;
    font-family: SourceHanSansSC-regular;
    color: #6d7783;
    padding-left: 42%;
}
.titleClass {
    font-size: 28px;
    font-family: SourceHanSansSC-regular;
    color: #222a41;
    width: 100%;
    text-align: center;
    margin-top: 20px;
}
.imgUrl {
    width: 100%;
    text-align: center;
    margin-top: 20px;
}
.imgUrl .el-img {
    width: 50%;
    height: 500px;
}
.contents {
    width: 60%;
    /* height: auto; */
    margin: 0 auto;
    margin-top: 20px;
}
</style>

