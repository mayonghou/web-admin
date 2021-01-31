<template>
    <Card>
        <div class="NavTopyuer_">
            <div class="NavTopyuer_1_1">关键指标</div>
            <div class="NavTopyuer_2_1">
                <div class="SonStyle">
                    <div>
                        <div class="countClass">{{this.status == 1?'招聘职位数':'上架房源'}}</div>
                        <h1
                            class="countClass"
                        >{{this.status==1?this.zhibiaoData.groundingPosition : this.houseData.groundingHouse}}</h1>
                    </div>
                </div>
                <div class="SonStyle">
                    <div>
                        <div class="countClass">{{this.status == 1?'发布企业数量':'发布房源企业数量'}}</div>
                        <h1
                            class="countClass"
                        >{{this.status==1?this.zhibiaoData.pushCompany : this.houseData.pushCompany}}</h1>
                    </div>
                </div>
                <div class="SonStyle">
                    <div>
                        <div class="countClass">{{this.status == 1?'总沟通数':'总沟通次数'}}</div>
                        <h1
                            class="countClass"
                        >{{this.status==1?this.zhibiaoData.totalConnect : this.houseData.totalConnect}}</h1>
                    </div>
                </div>
                <div class="SonStyle">
                    <div>
                        <div class="countClass">{{this.status == 1?'总浏览量':'总浏览量'}}</div>
                        <h1
                            class="countClass"
                        >{{this.status==1?this.zhibiaoData.yesterdayViews : this.houseData.totalViews}}</h1>
                    </div>
                </div>
            </div>
        </div>
    </Card>
</template>

<script>
export default {
    props: ['zhibiaoData', 'status', 'houseData'],
    data() {
        return {};
    }
};
</script>

<style scope="this api replaced by slot-scope in 2.5.0+">
.NavTopyuer_ {
    width: 100%;
    height: auto;
}
.NavTopyuer_1_1 {
    padding: 8px 10px;
    background-color: rgba(45, 140, 240, 0.1);
}
.NavTopyuer_2_1 {
    display: flex;
    justify-content: space-between;
    margin-top: 3px;
}
.NavTopyuer_2_1 .SonStyle {
    padding: 8px 10px;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    border-radius: 5px;
}
.NavTopyuer_2_1 .SonStyle:nth-child(odd) {
    background-color: #eaf3fd;
}
.NavTopyuer_2_1 .SonStyle:nth-child(even) {
    background-color: #f5f7fa;
}
.NavTopyuer_2_1 .SonStyle:nth-child(odd):hover {
    background-color: #36cfca;
    color: #fff;
    text-align: center;
    transition: background-color 500ms linear;
}
.NavTopyuer_2_1 .SonStyle:nth-child(even):hover {
    background-color: #42a7ff;
    color: #fff;
    text-align: center;
    transition: background-color 500ms linear;
}
.NavTopyuer_2_1 .SonStyle div {
    width: 100%;
}
.NavTopyuer_2_1 .SonStyle div .countClass {
    width: 100%;
}
</style>