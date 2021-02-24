<template>
    <div>
        <div class="bgcolorfa" v-for="(item,index) in itemData" :key="index">
            <span class="bgcolora">商品名称：</span>
            <span class="bgcolorb">
                <div class="Bgcolor" ref="refsdata">&nbsp;</div>
            </span>
        </div>
        <div class="titleData">
            <span>0万</span>
            <span>50万</span>
            <span>100万</span>
        </div>
    </div>
</template>

<script>
export default {
	props:['companyId'],
	data() {
        return {
            itemData: ['100%', '90%', '80%', '70%', '60%', '50%', '40%', '30%', '20%', '10%']
        };
    },
    methods: {
        func() {
            for (let i = 0; i < this.itemData.length; i++) {
                this.$refs.refsdata[i].style.width = this.itemData[i];
            }
			this.$axios.get('admin/company/queryCompanyData?partnerCompanyId='+this.companyId).then((res) => {
				console.log(res);
			});
        }
    },
    mounted() {
        this.func();
    }
};
</script>

<style scoped>
.bgcolorfa {
    display: flex;
    align-items: center;
    margin: 20px 0px;
}
.bgcolora {
    display: inline;
    width: 150px;
    text-align: right;
    padding-right: 20px;
}
.bgcolorb {
    height: 12px;
    flex-grow: 1;
}
.Bgcolor {
    height: 100%;
    background-color: #0095d8;
    border-radius: 15px;
}
.titleData {
    width: 300px;
    height: auto;
    border-bottom: 1px solid #bbbbbb;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
}
</style>