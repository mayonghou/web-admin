<template>
    <div class="message" id="message">
        <ul class="messageUl">
            <li class="messageLi" v-for="(item,index) in this.dataList" :key="index">
                <span
                    @click="titleBtn(item)"
                    ref="messageBtn"
                    :class="index == 0?'active':''"
                    class="messageBtn"
                >{{item.title}}</span>
            </li>
        </ul>
        <div class="message-body">
            <div class="message-delAll">
                <el-button
                    type="text"
                    v-if="deleteBul == false"
                    @click="piliangDelete"
                    class="piliangDel"
                >批量删除</el-button>
                <el-button
                    type="text"
                    v-if="deleteBul == true"
                    @click="quedingDelete"
                    class="piliangDel"
                >删除</el-button>
                <el-button
                    type="text"
                    v-if="deleteBul == true"
                    @click="quxiaoDelete"
                    class="piliangDel"
                >取消</el-button>
            </div>
            <div class="message-body-list">
                <ul class="message-list-Ul" v-if="this.messageListData">
                    <li
                        v-for="(item,number) in this.messageListData"
                        :key="number"
                        class="message-list-li"
                    >
                        <div class="message-text">
                            <div class="message-list">
                                <el-checkbox-group
                                    v-if="deleteBul == true"
                                    v-model="checkboxGroup"
                                    size="mini"
                                >
                                    <el-checkbox :label="number+1" @change="checkedUpload(item)"></el-checkbox>
                                </el-checkbox-group>
                                <div
                                    class="list-text"
                                    ref="listText"
                                    :class="[item.messageType == '系统消息'?'system':'',item.messageType == '平台消息'?'pingtai':'']"
                                >
                                    <el-badge is-dot v-if="item.messageStatus == 0">通知</el-badge>
                                    <el-badge v-if="item.messageStatus == 1">通知</el-badge>
                                </div>
                                <div
                                    class="list-messText"
                                >{{item.messageChildTypeTitle}}：{{item.messageDetails}}</div>
                            </div>
                            <div class="list-right">
                                <span>{{item.pushTime}}</span>
                                <el-button
                                    type="text"
                                    @click="lookDetails(item)"
                                    class="lookdetail"
                                    v-if="item.messageChildTypeTitle != '评论'"
                                >查看详情</el-button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <el-pagination
                class="pagination"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="counts"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'message',
    data() {
        return {
            checkboxGroup: [],
            deleteBul: false,
            page: 1,
            limit: 10,
            counts: 0,
            messageType: 0,
            imgUrl: [],
            messageListData: [],
            checked: [],
            dataList: [
                {
                    index: 0,
                    title: '全部消息'
                },
                {
                    index: 1,
                    title: '通知消息'
                },
                {
                    index: 2,
                    title: '系统消息'
                },
                {
                    index: 3,
                    title: '平台公告'
                }
            ]
        };
    },
    mounted() {
        this.getmessageData();
    },
    methods: {
        // 取消删除
        quxiaoDelete() {
            this.deleteBul = false;
        },
        // 批量删除
        piliangDelete() {
            this.deleteBul = true;
        },
        // 确定删除
        quedingDelete() {
            if (this.checked == '') {
                return this.$message({
                    showClose: true,
                    message: '请选择要删除的消息',
                    type: 'error'
                });
            }
            this.$confirm('【是否确定删除已选中的消息】', '温馨提示', {
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
                this.$axios.post('admin/message/delMessageList', this.checked).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'success'
                            });
                            this.getmessageData();
                            this.deleteBul == false;
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
            });
        },
        // 查看详情
        lookDetails(item) {
            console.log(item);
            let jsData = JSON.parse(item.commonField);
            if (typeof jsData == 'object') {
                if (jsData.activityType == 2) {
                    this.$router.push({
                        path: './warehouses'
                    });
                } else if (jsData.activityType == 1) {
                    this.$router.push({
                        path: './coupon'
                    });
                } else if (jsData.activityType == 6) {
                    this.$router.push({
                        path: './localgroup'
                    });
                } else if (jsData.activityType == 4) {
                    this.$router.push({
                        path: './seckillgl'
                    });
                } else if (jsData.activityType == 1) {
                    this.$router.push({
                        path: './discount'
                    });
                } else if (jsData.activityType == 3) {
                    this.$router.push({
                        path: './raffleLottery'
                    });
                } else if (jsData.activityType == 5) {
                    this.$router.push({
                        path: './flashSale'
                    });
                } else if (jsData.activityType == 8) {
                    this.$router.push({
                        path: './company'
                    });
                }
            } else {
                if (item.messageType == '平台公告') {
                    this.$router.push({
                        path: './pintaigonggaodetail'
                    });
                }
                if (item.messageChildTypeTitle == '商品下架通知') {
                    this.$router.push({
                        path: './goodsDetail',
                        query: {
                            id: item.commonField,
                            status: 8
                        }
                    });
                } else if (item.messageChildTypeTitle == '共享千里马订单延长期限申请') {
                    this.$router.push({
                        path: './myOrderIndex'
                    });
                } else if (item.messageChildTypeTitle == '商品库存预警提醒') {
                    this.$router.push({
                        path: './goodsDetail',
                        query: {
                            id: item.commonField,
                            status: 8
                        }
                    });
                } else if (item.messageChildTypeTitle == '订单发货通知') {
                    this.$router.push({
                        path: './order',
                        query: {
                            id: item.commonField
                        }
                    });
                } else if (item.messageChildTypeTitle == '待付款通知') {
                    this.$router.push({
                        path: './goodsDetail',
                        query: {
                            id: parseInt(item.commonField),
                            status: 8
                        }
                    });
                }
            }
        },
        // 多选框
        checkedUpload(item) {
            this.checked.push(item.messageId);
        },
        titleBtn(item) {
            let messageList = this.$refs.messageBtn;
            for (let i = 0; i < messageList.length; i++) {
                if (item.index == i) {
                    this.messageType = i;
                    this.getmessageData();
                    messageList[i].classList.add('active');
                } else {
                    messageList[i].classList.remove('active');
                }
            }
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getmessageData();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getmessageData();
        },
        getmessageData() {
            let data = {
                page: this.page,
                limit: this.limit,
                messageType: this.messageType
            };
            this.$axios.post('admin/message/allMessageList', data).then((res) => {
                if (res.status == 200) {
                    let data = res.data;
                    if (data.code == 200) {
                        this.messageListData = data.data;
                        this.counts = data.totalCount;
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
.message {
    box-sizing: border-box;
    padding: 20px;
}
.messageUl {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
}
.messageLi {
    list-style: none;
    padding: 0 10px;
}
.messageBtn {
    cursor: pointer;
    font-size: 20px;
    height: 34px;
    display: inline-block;
}
.messageBtn.active {
    color: #3b58ff;
    height: 34px;
    border-bottom: 1px solid #3b58ff;
}
.message-body {
    width: 80%;
    margin: 0 auto;
}
.message-delAll {
    width: 100%;
    text-align: right;
}
.message-delAll .piliangDel {
    color: #ff3b31;
    font-size: 16px;
}
.message-list-li {
    width: 100%;
    list-style: none;
}
.message-text {
    border: 1px solid #f4f4f4;
    width: 100%;
    height: 60px;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 0;
}
.message-text:nth-child(1) {
    border-top: 1px solid #f4f4f4;
}
.message-text .message-list {
    display: flex;
    flex-direction: row;
    line-height: 60px;
    align-items: center;
}
.message-text .message-list .list-text {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: #4669fb;
    font-size: 8px;
    color: #fff;
    line-height: 30px;
    text-align: center;
    margin-left: 5px;
}
.list-messText {
    font-size: 20px;
    line-height: 60px;
    height: 60px;
    padding: 0 20px;
    font-family: Source Han Sans CN Light;
    width: 900px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.message-text .list-right {
    display: flex;
    flex-direction: row;
    line-height: 60px;
    align-items: center;
    font-size: 16px;
}
.lookdetail {
    font-size: 16px;
    margin-left: 10px;
}
.message-list-li .message-text .message-list .list-text.system {
    background: #ff851b;
}
.message-list-li .message-text .message-list .list-text.pingtai {
    background: #1fc16b;
}
</style>

