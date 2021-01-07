<template>
    <div>
        <table class="tableClass">
            <tr>
                <td>序号</td>
                <td>商品图片</td>
                <td>商品名称</td>
                <td>关联活动</td>
                <td>原价</td>
                <td>活动价</td>
                <td>属性</td>
                <td>数量</td>
                <td>小计</td>
            </tr>
            <tr v-for="(item,index) in InterfDataObject" :key="index">
                <td>{{ index+1 }}</td>
                <td>
                    <img :src="item.productPic" alt width="150" />
                </td>
                <td>{{ item.productName }}</td>
                <td>{{ item.promotionName }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.realAmount }}</td>
                <td>{{ item.productAttr }}</td>
                <td>{{ item.productQuantity }}</td>
                <td>{{ item.subTotal }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ['dataer'],
    data() {
        return {
            InterfDataObject: [
                {
                    productPic: 'imgUrl',
                    productName: '为人',
                    promotionName: '热替换',
                    price: '而非',
                    realAmount: '快乐',
                    productAttr: '地方',
                    productQuantity: '电饭锅',
                    subTotal: '豆腐干即可'
                }
            ]
        };
    },
    methods: {
        DataAnalysis() {
            let DataRequester = this.dataer.productList;
            let newElent = [];
            DataRequester.forEach((elent, index) => {
                newElent[index] = elent;
                let regImgUrl = /^(htts):\/\/.+$/;
                let iStrue = regImgUrl.test(newElent[index].productPic);
                if (iStrue == true) {
                    newElent[index].productPic = DataRequester[index].productPic;
                } else if (iStrue == false) {
                    newElent[index].productPic = localStorage.getItem('imgUrl') + DataRequester[index].productPic;
                }
            });
            this.InterfDataObject = newElent;
        }
    },
    mounted() {
        this.DataAnalysis();
    }
};
</script>

<style scoped>
.tableClass {
    width: 100%;
    height: auto;
    text-align: center;
    border-collapse: collapse;
}
.tableClass tr {
    height: 36px;
    line-height: 36px;
}
.tableClass tr:hover {
    transition: all 200ms;
    background-color: #ebf7ff;
}
.tableClass tr:first-child {
    font-weight: 600;
    background-color: #f8f8f9;
}
.tableClass tr td {
    border: #e8eaec 1px solid;
}
.tableClass tr td:nth-child(2) img {
    display: inline-block;
    padding: 10px 0 0 0;
    margin: 0;
}
</style>