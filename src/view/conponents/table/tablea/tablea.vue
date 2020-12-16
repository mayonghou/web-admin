通过给 columns 数据设置一项，指定 type: 'selection'，即可自动开启多选功能。
给 data 项设置特殊 key _checked: true 可以默认选中当前项。
给 data 项设置特殊 key _disabled: true 可以禁止选择当前项。
正确使用好以下事件，可以达到需要的效果：
@on-select，选中某一项触发，返回值为 selection 和 row，分别为已选项和刚选择的项。
@on-select-all，点击全选时触发，返回值为 selection，已选项。
@on-selection-change，只要选中项发生变化时就会触发，返回值为 selection，已选项。
<template>
<div class="table_css_xiaoyuer">
    <div class="button-bnt">
        <Button type="error" class="Buttonplsc">批量删除</Button>
        <!-- <Button @click="handleSelectAll(false)">取消</Button> -->
    </div>
    <Table border ref="selection" :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="name">
            <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row,index }" slot="action">
            <Button type="error" size="small" class="Button bottokm" @click="RouteDetailsPage">查看详情</Button>
            <Button type="primary" size="small" class="Button bottokmt"  @click="show(index)" v-if="isShowIfShow">下架</Button>
            <Button type="error" size="small" class="Button bottomred" @click="remove(index)">删除</Button>
        </template>
    </Table>
</div>
</template>
<script>
    import store from '../../../../store/store';
    export default {
        data () {
            return {
                columns12: [],
                data6: [],
                isShowIfShow:true,
            }
        },
        methods: {
            // 下架 回调函数
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },
            // 删除 回调函数
            remove (index) {
                this.data6.splice(index, 1);
            },
            // 全选与取消 回调函数
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            RouteDetailsPage(){
                this.$router.push({
                    path:'./detailspage'
                })
            }
        },
        // 数据接收器
        props: ['pageid'],
        mounted(){
            this.pageIdr = this.pageid[0].pageid;

            if(this.pageid[0].pageid == 0){
                this.pageid.shift();
                var aaa = this.pageid.pop();
                this.columns12 = this.pageid;
                this.data6.push(aaa);
                for(var i=0;i<10;i++){
                    this.data6.push(aaa);
                }
                
            }else if(this.pageid[0].pageid == 1){
                this.pageid.shift();
                var bbb = this.pageid.pop();
                this.columns12 = this.pageid;
                for(var i=0;i<10;i++){
                    this.data6.push(bbb)
                }
                this.isShowIfShow = !this.isShowIfShow;
            }
        },
        created(){ 
            
        }
    }
</script>

<style scope>
    .table_css_xiaoyuer{
        box-sizing: border-box;
    }
    .button-bnt{
        display: flex;
        justify-content: flex-end;
        padding: 10px 0px;
    }
    .Button{
        border-radius: 20px;
        margin-right: 5px;
        border: 0;
    }
    .bottokm{
        background-color: #2450D2;
    }
    .bottokmt{
        background-color: #FF8D00;
    }
    .bottomred{
        background-color: #FF0000 10000%;
    }
    .Buttonplsc{
        border:0;
    }
</style>