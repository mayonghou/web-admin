<template>
    <!-- 企业历程 -->
    <div class="companyProsess" id="companyProsess"
		v-loading="fullscreenLoading" :element-loading-text="loadingText" element-loading-background="rgba(0, 0, 0, 0.7)"
	>
        <div class="product-btn">
          <el-button @click="addprocessdd" class="btn">新增企业历程</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column type="selection" width=""></el-table-column>
            <el-table-column prop="index" type="index" align="center" label="序号"></el-table-column>
            <el-table-column prop="time"  align="center" label="历程时间"></el-table-column>
            <el-table-column prop="detailUrl" align="center" label="历程图片">
              <template slot-scope="scope">
                <img width="80" height="80"  :src="scope.row.detailUrl" />
              </template>
            </el-table-column>
            <el-table-column prop="detailcontent"  align="center" label="历程描述"></el-table-column>
            <el-table-column label="操作" width="220" align="center">
                <template slot-scope="scope">
                    <el-button @click="detacom(scope.row)" class="tab_button">编辑</el-button>
                    <el-button @click="del_compilesss(scope.row)" class="del_button">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'companyProsess',
    data() {
        return {
            input: '',
            page: 1,
            limit: 10,
            counts: this.counts,
            tableData: [],
			processIds: [],
			fullscreenLoading: true,
			loadingText: '加载中...'
        };
    },
    mounted() {
		this.getWebsite();
	},
    methods: {
        // 编辑
        detacom(row) {
			this.$router.push({
				path: './updateprocess',
				query: {
					data: row
				}
			});
		},
		getWebsite(){
			this.$axios.get('api/partner/query/website?id='+ localStorage.getItem('loginData')).then((res) => {
				this.fullscreenLoading = false;
				if(res.status == 200 && res.data.code == 200){
					let data = res.data;
					var dataLsit = [];
					var sdas = '';
					var aaas = /^(https):\/\/.+$/;
					 data.data.process.forEach(function(val, index){
						dataLsit[index] = val;
						var dateeTime = new Date(parseInt(val.time));
						var time1 = dateeTime.getFullYear() + '-' + (dateeTime.getMonth() + 1 < 10 ? '0' + (dateeTime.getMonth() + 1) : dateeTime.getMonth() + 1) + '-' + dateeTime.getDate();
						dataLsit[index].time = time1;
						if(aaas.test(val.detail[0].url)){
							sdas = val.detail[0].url;
						} else {
							sdas = localStorage.getItem('imgUrl') + val.detail[0].url;
						}
						dataLsit[index].detailUrl = sdas;
						dataLsit[index].detailcontent = val.detail[0].content;
					 });
					 this.tableData = dataLsit;
				} else {
					this.$message({
						showClose: true,
						message: res.data.msg,
						type: 'error'
					});
				}
			});
		},
        // 删除
        del_compilesss(row) {
			this.$confirm('是否确定删除时间为【' + row.time + '】的企业历程?', '温馨提示', {
			    confirmButtonText: '确定',
			    cancelButtonText: '取消',
			    type: 'warning'
			}).then(() => {
				const loading = this.$loading({
					lock: true,
					text: '删除中...',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				this.$axios.get('api/partner/delete/company/process?id='+localStorage.getItem('loginData')+'&processId='+row.processId).then((res) => {
					loading.close();
					if(res.status == 200 && res.data.code == 200){
						var data = res.data;
						this.$message({
							showClose: true,
							message: data.msg,
							type: 'success'
						});
						this.getWebsite();
					} else {
						this.$message({
							showClose: true,
							message: data.msg,
							type: 'error'
						});
					}
				});
			}).catch(err => {
			});
		},
        addprocessdd(){
          this.$router.push({
            path: './addprocess'
          });
        }
        
    }
};
</script>

<style>
.companyProsess {
    width: 100%;
	box-sizing: border-box;
	padding: 20px;
}

.changpin {
    display: inline-block;
    margin-top: 15px;
    margin-left: 20px;
}
.input-width {
    width: 200px;
}
.shangpinganli {
    margin-top: 10px;
    margin-left: 20px;
}
.shangpinganli .query {
    width: 150px;
    height: 35px;
    background: #2450d2;
    color: #fff;
    margin-left: 20px;
}
.product-btn{
  text-align: right;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.product-btn .btn{
  width: 90px;
  height: 30px;
  background: #42A7FF;
  color: #fff;
  padding: 0;
  border-radius: 8px;
}

.el-table .del_button{
  width: 66px;
  height: 30px;
  font-size: 14px;
  padding: 0; 
  background: #FF0000;
  color: #fff;
}
.el-table .tab_button {
  width: 70px;
  height: 30px;
  font-size: 14px;
  background: #3A9DF4;
  color: #fff;
  padding: 0;
}
</style>
