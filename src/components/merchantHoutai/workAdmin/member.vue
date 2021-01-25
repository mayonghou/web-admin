<template>
    <div id="member" class="member">
        <!-- 名片头部查询 -->
        <div class="terracr_top">
            <div class="top_text">
                <label>名片查询</label>
            </div>
            <div class="top_search clear">
                <el-input class="search" v-model="inputName" placeholder="输入姓名"></el-input>
                <i
                    style="font-size: 22px;color: #2494D2;margin-left: 38px; padding-right: 38px;"
                    class="el-icon-date"
                ></i>
                <el-date-picker
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    prefix-icon="md-date_range"
                    v-model="time"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    @change="timeCuo"
                ></el-date-picker>
                <el-button @click="QueryMember" class="querybutton">查询</el-button>
            </div>
        </div>
        <!-- 删除和管理成员、添加成员-->
        <div class="add_Del">
            <label>{{this.companyName}}</label>
            <el-button @click="addMember" class="button add_qiye">添加成员名片</el-button>
            <el-button @click="Manageositions" class="button qiyeGL">管理职位</el-button>
            <el-button @click="del_All" class="tab_del button">全部删除</el-button>
        </div>
        <!-- 表格 -->
        <el-table
            :data="tableData"
            border
            style="width: 100%;"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="80" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="rank" label="职位" align="center"></el-table-column>
            <el-table-column prop="phoneNumber" label="电话号码" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" align="center"></el-table-column>
            <el-table-column prop="time" label="添加时间" align="center"></el-table-column>
            <el-table-column label="操作" width="450" align="center">
                <template slot-scope="scope">
                    <el-button
                        @click="setupStaff(scope.row)"
                        v-if="scope.row.service == false"
                        class="kefubutton"
                    >设为客服</el-button>
                    <el-button
                        @click="quxiaokufu(scope.row)"
                        v-if="scope.row.service == true"
                        class="kefufalse"
                    >取消客服</el-button>
                    <el-button @click="btn_Kinguser(scope.row)" class="sq_button">授权管理</el-button>
                    <el-button @click="btn_business(scope.row)" class="tab_button">交换名片</el-button>
                    <el-button @click="btn_member(scope.row)" class="bj_button">修改</el-button>
                    <el-button @click="del_member(scope.row)" class="del_button">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 页码 -->
        <el-pagination
            class="pagintion"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="counts"
        ></el-pagination>

        <!-- 添加成员弹框 -->
        <el-dialog title="添加成员名片" :visible.sync="dialogFormVisible" @close="closeup">
            <div class="iconE" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-form :model="addform" :rules="rules" ref="addform">
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="姓名:"
                            prop="membername"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-input
                                class="formWidth"
                                v-model="addform.membername"
                                placeholder="请输入姓名"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="手机号:"
                            prop="phoneumber"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-input
                                class="formWidth"
                                v-model="addform.phoneumber"
                                placeholder="请输入手机号"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="微信:"
                            prop="WeChat"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-input
                                class="formWidth"
                                v-model="addform.WeChat"
                                placeholder="请输入微信"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="邮箱:"
                            prop="mailbox"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-input
                                class="formWidth"
                                v-model="addform.mailbox"
                                placeholder="请输入邮箱"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="职位:"
                            prop="position"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-select
                                class="formWidth"
                                v-model="addform.position"
                                placeholder="请选择职位"
                            >
                                <el-option
                                    v-for="(item, i) in positionsList"
                                    :key="i"
                                    :label="item.name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="性别:"
                            prop="radio"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-radio class="radio" v-model="addform.radio" label="男">男</el-radio>
                            <el-radio v-model="addform.radio" label="女">女</el-radio>
                            <el-radio v-model="addform.radio" label="保密">保密</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="头像:"
                            prop="imageUrl"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-upload
                                class="avatar-uploader"
                                :action="action"
                                accept="image/*"
                                list-type="picture-card"
                                :on-change="changeUpload"
                                :auto-upload="true"
                                :show-file-list="false"
                                :on-success="headSuccess"
                                ref="upload"
                            >
                                <img
                                    width="100%"
                                    height="100%"
                                    v-if="addform.imageUrl"
                                    :src="addform.imageUrl"
                                />
                                <i
                                    v-show="addform.imageUrl == ''"
                                    class="el-icon-plus addimg avatar-uploader-icon"
                                ></i>
                            </el-upload>
                            <el-button @click="chongxi" type="text">重新上传</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="个人照片(选择好的照片可以给自己的人气值加分):"
                            prop="photoUrl"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-upload
                                class="avatar-uploader"
                                :action="action"
                                accept="image/*"
                                list-type="picture-card"
                                :on-change="changeUploadPhoto"
                                :auto-upload="true"
                                :show-file-list="false"
                                :on-success="exchangephotoSuccess"
                                ref="upload"
                            >
                                <img
                                    width="100%"
                                    height="100%"
                                    v-if="addform.photoUrl"
                                    :src="addform.photoUrl"
                                />
                                <i
                                    v-show="addform.photoUrl == ''"
                                    class="el-icon-plus addimg avatar-uploader-icon"
                                ></i>
                            </el-upload>
                            <el-button @click="chongxi" type="text">重新上传</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="dialogs">
                <el-button @click="addMem">保存</el-button>
            </div>
        </el-dialog>

        <!-- 修改成员弹框 -->
        <el-dialog
            title="修改成员名片"
            width="60%"
            :center="true"
            :visible.sync="dialogFormUpdate"
            @close="closeup"
        >
            <div class="iconE" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-form :model="updateform" :rules="uprules" ref="updateform">
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="姓名:"
                            prop="membername"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-input
                                class="formWidth"
                                v-model="updateform.membername"
                                placeholder="请输入姓名"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="手机号:"
                            prop="phoneumber"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-input
                                class="formWidth"
                                v-model="updateform.phoneumber"
                                placeholder="请输入手机号"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="微信:"
                            prop="WeChat"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-input
                                class="formWidth"
                                v-model="updateform.WeChat"
                                placeholder="请输入微信"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="邮箱:"
                            prop="mailbox"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-input
                                class="formWidth"
                                v-model="updateform.mailbox"
                                placeholder="请输入邮箱"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="职位:"
                            prop="position"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-select
                                class="formWidth"
                                v-model="updateform.position"
                                placeholder="请选择职位"
                            >
                                <el-option
                                    v-for="(item,index) in positionsList"
                                    :value="item.id"
                                    :key="index"
                                    :label="item.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="性别:"
                            prop="radio"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-radio class="radio" v-model="updateform.radio" label="男">男</el-radio>
                            <el-radio v-model="updateform.radio" label="女">女</el-radio>
                            <el-radio v-model="updateform.radio" label="保密">保密</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="头像:"
                            prop="imageUrl"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-upload
                                class="avatar-uploader"
                                :action="action"
                                list-type="picture-card"
                                :auto-upload="true"
                                accept="image/*"
                                :on-change="changeUpload"
                                :show-file-list="false"
                                :on-success="updateHeadSuccess"
                                ref="uploaddsad"
                            >
                                <img
                                    width="100%"
                                    height="100%"
                                    v-if="updateform.imageUrl"
                                    :src="updateform.imageUrl"
                                />
                                <i
                                    v-show="updateform.imageUrl == ''"
                                    class="el-icon-plus exchangeimg avatar-uploader-icon"
                                ></i>
                            </el-upload>
                            <el-button type="text" @click="exchange">重新上传</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="个人照片(选择好的照片可以给自己的人气加分哦):"
                            prop="photoUrl"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-upload
                                class="avatar-uploader"
                                :action="action"
                                list-type="picture-card"
                                :auto-upload="true"
                                accept="image/*"
                                :on-change="changeUploadPhoto"
                                :show-file-list="false"
                                :on-success="exchangephotoSuccess"
                                ref="uploaddsad"
                            >
                                <img
                                    width="100%"
                                    height="100%"
                                    v-if="updateform.photoUrl"
                                    :src="updateform.photoUrl"
                                />
                                <i
                                    v-show="updateform.photoUrl == ''"
                                    class="el-icon-plus exchangephoto avatar-uploader-icon"
                                ></i>
                            </el-upload>
                            <el-button type="text" @click="exchangephoto">重新上传</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <div class="dialogs">
                <el-button @click="updateMember">保存</el-button>
            </div>
        </el-dialog>

        <!-- 交换名片 -->
        <el-dialog title="修改成员名片" width="60%" :visible.sync="dialogFormExchange">
            <div class="iconE" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <el-form :model="exchangeform" :rules="uprules" ref="exchangeform">
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="姓名:"
                            prop="membername"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-input
                                class="formWidth"
                                v-model="exchangeform.membername"
                                placeholder="请输入姓名"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="手机号:"
                            prop="phoneumber"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-input
                                class="formWidth"
                                v-model="exchangeform.phoneumber"
                                placeholder="请输入手机号"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="微信:"
                            prop="WeChat"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-input
                                class="formWidth"
                                v-model="exchangeform.WeChat"
                                placeholder="请输入微信"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="邮箱:"
                            prop="mailbox"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-input
                                class="formWidth"
                                v-model="exchangeform.mailbox"
                                placeholder="请输入邮箱"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="职位:"
                            prop="position"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-select
                                class="formWidth"
                                v-model="exchangeform.position"
                                placeholder="请选择职位"
                            >
                                <el-option
                                    v-for="(item,index) in positionsList"
                                    :value="item.id"
                                    :key="index"
                                    :label="item.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="性别:"
                            prop="radio"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-radio class="radio" v-model="exchangeform.radio" label="男">男</el-radio>
                            <el-radio v-model="exchangeform.radio" label="女">女</el-radio>
                            <el-radio v-model="exchangeform.radio" label="保密">保密</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item
                            label="头像:"
                            prop="imageUrl"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-upload
                                class="avatar-uploader"
                                :action="action"
                                list-type="picture-card"
                                :auto-upload="true"
                                accept="image/*"
                                :on-change="changeUpload"
                                :show-file-list="false"
                                :on-success="exchangeSuccess"
                                ref="uploaddsad"
                            >
                                <img
                                    width="100%"
                                    height="100%"
                                    v-if="exchangeform.imageUrl"
                                    :src="exchangeform.imageUrl"
                                />
                                <i
                                    v-show="exchangeform.imageUrl == ''"
                                    class="el-icon-plus exchangeimg avatar-uploader-icon"
                                ></i>
                            </el-upload>
                            <el-button type="text" @click="exchange">重新上传</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item
                            label="个人照片(选择好的照片可以给自己的人气加分哦):"
                            prop="photoUrl"
                            :label-width="formLabelWidth"
                            :inline-message="true"
                        >
                            <el-upload
                                class="avatar-uploader"
                                :action="action"
                                list-type="picture-card"
                                :auto-upload="true"
                                accept="image/*"
                                :on-change="changeUploadPhoto"
                                :show-file-list="false"
                                :on-success="exchangephotoSuccess"
                                ref="uploaddsad"
                            >
                                <img
                                    width="100%"
                                    height="100%"
                                    v-if="exchangeform.photoUrl"
                                    :src="exchangeform.photoUrl"
                                />
                                <i
                                    v-show="exchangeform.photoUrl == ''"
                                    class="el-icon-plus exchangephoto avatar-uploader-icon"
                                ></i>
                            </el-upload>
                            <el-button type="text" @click="exchangephoto">重新上传</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="dialogs">
                <el-button @click="exchangeBut">保存</el-button>
            </div>
        </el-dialog>

        <!-- 授权管理 -->
        <el-dialog
            title="授权管理"
            :visible.sync="dialogFormKinguser"
            width="40%"
            class="shouquanKingUser"
        >
            <div class="iconE" @click="enlarge">
                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                    <i class="iconfont icon-quanping"></i>
                </el-tooltip>
            </div>
            <div class="el-checkbox-lists">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox
                        v-for="item in AlldictionList"
                        :key="item.id"
                        border
                        :label="item.id"
                        @change="checkeddddd($event, item)"
                    >
                        <img
                            v-if="item.checked || checkList.indexOf(item.id) !=-1"
                            :src="item.icon1"
                        />
                        <img v-else :src="item.icon2" />
                        {{item.name}}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="dialogs">
                <el-button @click="permissionsSave">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import bus from '../../common/bus';
export default {
    name: 'member',
    data() {
        // 手机号验证
        const validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else {
                if (!/^1[3456789]\d{9}$/.test(value)) {
                    callback(new Error('手机号格式不正确'));
                    return false;
                } else {
                    callback();
                }
            }
        };
        // 邮箱验证
        const validateEmil = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入邮箱'));
            } else {
                if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)) {
                    callback(new Error('邮箱格式不正确'));
                    return false;
                } else {
                    callback();
                }
            }
        };
        return {
            inputName: '',
            time: '',
            qiyeID: '',
            action: localStorage.getItem('actionUrl'),
            page: 1,
            counts: this.counts,
            limit: 10,
            fullscreen: '',
            formLabelWidth: '40%',
            dialogFormVisible: false,
            dialogFormUpdate: false,
            dialogFormExchange: false,
            dialogFormKinguser: false,
            photoUrlimg: '',
            tableData: [],
            companyName: '',
            checkeds: true,
            addform: {
                imageUrl: '',
                photoUrl: '',
                membername: '',
                phoneumber: '',
                WeChat: '',
                mailbox: '',
                position: '',
                radio: '',
                file: {}
            },
            updateform: {
                imageUrl: '',
                photoUrl: '',
                membername: '',
                phoneumber: '',
                WeChat: '',
                mailbox: '',
                position: '',
                radio: '',
                file: {}
            },
            exchangeform: {
                imageUrl: '',
                photoUrl: '',
                membername: '',
                phoneumber: '',
                WeChat: '',
                mailbox: '',
                position: '',
                radio: '',
                file: {}
            },
            rules: {
                imageUrl: [
                    {
                        required: true,
                        message: '图片不能为空',
                        trigger: 'blur'
                    }
                ],
                membername: [
                    {
                        required: true,
                        message: '名称不能为空',
                        trigger: 'blur'
                    }
                ],
                phoneumber: [
                    { required: true, validator: validatePhone, trigger: 'blur' },
                    { required: true, message: '电话不能为空', trigger: 'blur' },
                    { min: 11, max: 11, message: '电话号码有11位', trigger: 'blur' }
                ],
                WeChat: [
                    {
                        required: true,
                        message: '微信号不能为空',
                        trigger: 'blur'
                    }
                ],
                mailbox: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { required: true, validator: validateEmil, trigger: 'blur' }
                ],
                position: [
                    {
                        required: true,
                        message: '职位不能为空',
                        trigger: 'blur'
                    }
                ],
                radio: [
                    {
                        required: true,
                        message: '性别不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            uprules: {
                imageUrl: [
                    {
                        required: true,
                        message: '图片不能为空',
                        trigger: 'blur'
                    }
                ],
                photoUrl: [
                    {
                        required: true,
                        message: '个人照片找不能为空',
                        trigger: 'blur'
                    }
                ],
                membername: [
                    {
                        required: true,
                        message: '名称不能为空',
                        trigger: 'blur'
                    }
                ],
                phoneumber: [
                    { required: true, validator: validatePhone, trigger: 'change' },
                    { required: true, message: '电话不能为空', trigger: 'blur' },
                    { min: 11, max: 11, message: '电话号码有11位', trigger: 'blur' }
                ],
                WeChat: [
                    {
                        required: true,
                        message: '微信号不能为空',
                        trigger: 'blur'
                    }
                ],
                mailbox: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { required: true, validator: validateEmil, trigger: 'blur' }
                ],
                position: [
                    {
                        required: true,
                        message: '职位不能为空',
                        trigger: 'blur'
                    }
                ],
                radio: [
                    {
                        required: true,
                        message: '性别不能为空',
                        trigger: 'blur'
                    }
                ]
            },
            companyIds: '',
            companyId: '',
            positionsList: [],
            loading: false,
            Updatename: '',
            // userId: '',
            fileList: [],
            formExchange: [],
            imgList: [],
            // 根据成员id查的权限
            authorization: [],
            // 权限编码
            AlldictionList: [],
            listId: [],
            listName: [],
            userid: '',
            name: '',
            timeStart: '',
            timeEnd: '',
            checkList: [],
            imgdataUrl: '',
            imgdaUrl: '',
            addavatarUrl: '',
            dataicon: [
                {
                    id: 100,
                    icon1: require('../../../assets/img/shouquan/shopping(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/shopping(2).jpg')
                },
                {
                    id: 101,
                    icon1: require('../../../assets/img/shouquan/zhufang(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/zhufang(2).jpg')
                },
                {
                    id: 102,
                    icon1: require('../../../assets/img/shouquan/activity(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/activity(2).jpg')
                },
                {
                    id: 103,
                    icon1: require('../../../assets/img/shouquan/shangjiang(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/shangjiang(2).jpg')
                },
                {
                    id: 104,
                    icon1: require('../../../assets/img/shouquan/vidoe(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/vidoe(2).jpg')
                },
                {
                    id: 105,
                    icon1: require('../../../assets/img/shouquan/zhaopi(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/zhaopi(2).jpg')
                },
                {
                    id: 106,
                    icon2: require('../../../assets/img/shouquan/dongtai(1).jpg'),
                    icon1: require('../../../assets/img/shouquan/dongtai(2).jpg')
                },
                {
                    id: 107,
                    icon1: require('../../../assets/img/shouquan/youhuijuan(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/youhuijuan(2).jpg')
                },
                {
                    id: 200,
                    icon1: require('../../../assets/img/shouquan/youhuijuanActivit(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/youhuijuanActivit(2).jpg')
                },
                {
                    id: 201,
                    icon1: require('../../../assets/img/shouquan/zhekouzhangqu(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/zhekouzhangqu(2).jpg')
                },
                {
                    id: 202,
                    icon1: require('../../../assets/img/shouquan/qingchang(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/qingchang(2).jpg')
                },
                {
                    id: 203,
                    icon1: require('../../../assets/img/shouquan/choujiang(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/choujiang(2).jpg')
                },
                {
                    id: 204,
                    icon2: require('../../../assets/img/shouquan/miaosha(1).jpg'),
                    icon1: require('../../../assets/img/shouquan/miaosha(2).jpg')
                },
                {
                    id: 205,
                    icon1: require('../../../assets/img/shouquan/tongchengtuangou(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/tongchengtuangou(2).jpg')
                },
                {
                    id: 206,
                    icon1: require('../../../assets/img/shouquan/xaingshiqiangou(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/tongchengtuangou(2).jpg')
                },
                {
                    id: 207,
                    icon1: require('../../../assets/img/shouquan/qiyeactivity(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/qiyeactivity(2).jpg')
                },
                {
                    id: 300,
                    icon1: require('../../../assets/img/shouquan/qiyexinxi(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/qiyexinxi(2).jpg')
                },
                {
                    id: 301,
                    icon1: require('../../../assets/img/shouquan/tuandui(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/tuandui(2).jpg')
                },
                {
                    id: 302,
                    icon1: require('../../../assets/img/shouquan/mingpian(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/mingpian(2).jpg')
                },
                {
                    id: 303,
                    icon1: require('../../../assets/img/shouquan/shouquan(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/shouquan(2).jpg')
                },
                {
                    id: 304,
                    icon1: require('../../../assets/img/shouquan/shuju(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/shuju(2).jpg')
                },
                {
                    id: 305,
                    icon1: require('../../../assets/img/shouquan/dingdan(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/dingdan(2).jpg')
                },
                {
                    id: 306,
                    icon2: require('../../../assets/img/shouquan/guanwang(1).jpg'),
                    icon1: require('../../../assets/img/shouquan/guanwang(2).jpg')
                },
                {
                    id: 307,
                    icon1: require('../../../assets/img/shouquan/danyan(1).jpg'),
                    icon2: require('../../../assets/img/shouquan/danyan(2).jpg')
                },
                {
                    id: 308,
                    icon1: require('../../../assets/img/shouquan/peishongfei(1).png'),
                    icon2: require('../../../assets/img/shouquan/peishongfei(2).png')
                },
                {
                    id: 309,
                    icon1: require('../../../assets/img/shouquan/dianpu(1).png'),
                    icon2: require('../../../assets/img/shouquan/dianpu(2).png')
                }
            ]
        };
    },
    mounted() {
        this.obtain();
        this.getTeams();
        this.getPositions();
    },
    methods: {
        checkeddddd(e, val) {
            this.checkeds = e;
            this.$set(val, 'checked', e);
        },
        chongxi() {
            document.querySelector('.addimg').click();
        },
        afresh() {
            document.querySelector('.updateimg').click();
        },
        exchange() {
            document.querySelector('.exchangeimg').click();
        },
        exchangephoto() {
            document.querySelector('.exchangephoto').click();
        },
        quxiaokufu(row) {
            this.$confirm('是否确定将取消 成员【 ' + row.name + '】 的客服', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '取消中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.get('admin/company/setup/staff?flag=' + false + '&userId=' + row.id).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.getTeams();
                            } else if (data.code != 200) {
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
                    }
                });
            });
        },
        setupStaff(row) {
            this.$confirm('是否确定将成员【 ' + row.name + '】 设置为客服', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '设置中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.get('admin/company/setup/staff?flag=' + true + '&userId=' + row.id).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.getTeams();
                            } else if (data.code != 200) {
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
                    }
                });
            });
        },
        timeCuo(value) {
            if (value != null) {
                var date = new Date(value[0]);
                var startTime = date.getTime(date);
                var date1 = new Date(value[1]);
                var endTime = date1.getTime(date1);
                this.timeStart = startTime;
                this.timeEnd = endTime;
            } else if (value == null) {
                this.timeStart = '';
                this.timeEnd = '';
            }
        },
        closeup() {
            this.fileList = [];
            this.formExchange = [];
        },
        // 头像改变调用函数
        changeUpload(file, fileList) {
            var url = window.URL.createObjectURL(file.raw);
            // 上传图片
            this.addform.imageUrl = url;
            this.addform.file = file;
            // 修改图片
            this.updateform.imageUrl = url;
            this.updateform.file = file;

            this.exchangeform.imageUrl = url;
            this.exchangeform.file = file;
        },
        // 个人照片交换 选择图片回调
        changeUploadPhoto(file, fileList) {
            var url = window.URL.createObjectURL(file.raw);
            this.exchangeform.photoUrl = url;
            this.updateform.photoUrl = url;
            this.addform.photoUrl = url;
        },
        // 个人照片上传成功回调
        exchangephotoSuccess(response, file, fileList) {
            if (response.code == 200) {
                this.photoUrlimg = response.data;
                this.exchangeform.photoUrl = localStorage.getItem('imgUrl') + response.data;
                this.updateform.photoUrl = localStorage.getItem('imgUrl') + response.data;
                this.addform.photoUrl = localStorage.getItem('imgUrl') + response.data;
            } else {
                this.$message({
                    showClose: true,
                    message: '个人照片上传传失败',
                    type: 'error'
                });
            }
            // if(response.code)
        },
        // 图片删除
        removeUpload(file, fileList) {
            this.imgList = fileList;
        },
        // 职位管理按钮
        Manageositions() {
            this.$router
                .push({
                    path: './ManagePositions',
                    query: {
                        companyId: this.companyIds,
                        companyName: this.companyName
                    }
                })
                .catch((err) => {});
        },
        // 添加头像上传成功回调的函数
        headSuccess(response, file, filelist) {
            if (response.code == 200) {
                this.addavatarUrl = response.data;
                this.addform.imageUrl = localStorage.getItem('imgUrl') + response.data;
            }
        },
        // 添加成员按钮
        addMember() {
            this.dialogFormVisible = true;
        },
        // 添加 保存
        addMem() {
            this.$refs.addform.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定添加姓名为【 ' + this.addform.membername + '】 的成员', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const loading = this.$loading({
                            lock: true,
                            text: '添加中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        // this.$refs.upload.submit();
                        let adddata = {
                            avatar: this.addavatarUrl, //头像地址
                            companyId: this.qyID, //企业id
                            email: this.addform.mailbox, //邮箱
                            gender: this.addform.radio, //性别
                            name: this.addform.membername, //姓名
                            phoneNumber: this.addform.phoneumber, //手机号
                            rankId: this.addform.position, //职位
                            wxNumber: this.addform.WeChat, // 微信号
                            photo: this.photoUrlimg
                        };
                        this.$axios.post('admin/company/add/card', adddata).then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (res.status == 200) {
                                    var data = res.data;
                                    if (data.code == 200) {
                                        this.$message({
                                            showClose: true,
                                            message: data.msg,
                                            type: 'success'
                                        });
                                        this.dialogFormVisible = false;
                                        this.getTeams();
                                        this.$refs.addform.resetFields();
                                        this.$refs.upload.clearFiles();
                                    } else if (data.code != 200) {
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
                            }
                        });

                        this.timer = setInterval(() => {}, 4000);
                    });
                } else {
                    return false;
                }
            });
        },

        // 修改成员弹框
        btn_member(row) {
            var https = /^https: \/\/.+$/;
            if (https.test(row.avatar)) {
                this.updateform.imageUrl = row.avatar;
            } else if (https.test(row.photo)) {
                this.updateform.photoUrl = row.photo;
            } else {
                this.updateform.imageUrl = localStorage.getItem('imgUrl') + row.avatar;
                this.updateform.photoUrl = localStorage.getItem('imgUrl') + row.photo;
            }

            this.imgdataUrl = row.avatar;
            this.updateform.membername = row.name;
            this.Updatename = row.name;
            this.updateform.phoneumber = row.phoneNumber;
            this.updateform.WeChat = row.wxNumber;
            this.updateform.mailbox = row.email;
            this.updateform.position = row.rankId;
            this.updateform.radio = row.gender;
            this.userId = row.id;
            this.dialogFormUpdate = true;
        },
        // 修改图片上传成功之后的回调
        updateHeadSuccess(response, file, filelist) {
            if (response.code == 200) {
                this.imgdataUrl = response.data;
            }
        },
        // 修改保存
        updateMember() {
            // this.$refs.uploadupdata.submit();
            this.$refs.updateform.validate((valid) => {
                if (valid) {
                    this.$confirm('是否确定修改成员【' + this.updateform.membername + '】的信息', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const loading = this.$loading({
                            lock: true,
                            text: '修改中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        let updateDate = {
                            avatar: this.imgdataUrl,
                            email: this.updateform.mailbox,
                            gender: this.updateform.radio,
                            name: this.updateform.membername,
                            rankId: this.updateform.position,
                            userId: this.userId,
                            wxNumber: this.updateform.WeChat,
                            photo: this.photoUrlimg
                        };
                        this.$axios.post('admin/company/edit/card', updateDate).then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (res.status == 200) {
                                    var data = res.data;
                                    if (data.code == 200) {
                                        this.$message({
                                            showClose: true,
                                            message: data.msg,
                                            type: 'success'
                                        });
                                        this.dialogFormUpdate = false;
                                        this.getTeams();
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
                            }
                        });
                    });
                }
            });
        },

        // 交换名片弹框
        btn_business(row) {
            this.exchangeform.imageUrl = localStorage.getItem('imgUrl') + row.avatar;
            this.imgdaUrl = row.avatar;
            this.exchangeform.membername = row.name;
            this.exchangeformname = row.name;
            this.exchangeform.phoneumber = row.phoneNumber;
            this.exchangeform.WeChat = row.wxNumber;
            this.exchangeform.mailbox = row.email;
            this.exchangeform.position = row.rankId;
            this.exchangeform.radio = row.gender;
            this.userId = row.id;
            this.dialogFormExchange = true;
            this.avatar = row.avatar;
            this.exchangeform.photoUrl = localStorage.getItem('imgUrl') + row.photo;
        },
        // 交换图片上传成功的回调
        exchangeSuccess(response, file, filelist) {
            if (response.code == 200) {
                this.imgdaUrl = response.data;
            } else {
                this.$message({
                    showClose: true,
                    message: '头像上传失败',
                    type: 'error'
                });
            }
        },
        // 交换保存
        exchangeBut() {
            this.$refs.uploaddsad.submit();
            this.$refs.exchangeform.validate((valid) => {
                if (valid) {
                    this.$confirm('【是否确定修改成员' + this.exchangeform.membername + '的信息】', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        const loading = this.$loading({
                            lock: true,
                            text: '修改中...',
                            spinner: 'el-icon-loading',
                            background: 'rgba(0, 0, 0, 0.7)'
                        });
                        let exchangeDate = {
                            avatar: this.imgdaUrl,
                            email: this.exchangeform.mailbox,
                            gender: this.exchangeform.radio,
                            name: this.exchangeform.membername,
                            rankId: this.exchangeform.position,
                            userId: this.userId,
                            wxNumber: this.exchangeform.WeChat,
                            photo: this.photoUrlimg
                        };
                        this.$axios.post('admin/company/edit/card', exchangeDate).then((res) => {
                            loading.close();
                            if (res.status == 200) {
                                var data = res.data;
                                if (res.status == 200) {
                                    var data = res.data;
                                    if (data.code == 200) {
                                        this.$message({
                                            showClose: true,
                                            message: data.msg,
                                            type: 'success'
                                        });
                                        this.dialogFormExchange = false;
                                        this.getTeams();
                                    } else if (data.code != 200) {
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
                            }
                        });
                    });
                }
            });
        },

        // 授权保存
        permissionsSave() {
            this.$confirm('是否确定修改成员【 ' + this.name + ' 】的授权信息', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let loading = this.$loading({
                    lock: true,
                    text: '修改中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$axios.get('admin/company/authorization/element?sn=' + this.checkList + '&userId=' + this.userid).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.dialogFormKinguser = false;
                                this.getTeams();
                            } else if (data.code != 200) {
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
                    }
                });
            });
        },

        // 当授权管理的id等于编码数组中的编码时就选中
        // 授权管理 弹框
        btn_Kinguser(row) {
            const _this = this;
            _this.name = row.name;
            _this.AlldictionList = [];
            _this.dialogFormKinguser = true;
            _this.userid = row.id;
            _this.getElementSn();
            _this.$axios.get('admin/company/element/sn/' + row.companyId).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            let dataList = [];
                            this.dataicon.forEach(function (val, index) {
                                if (val.id == data.data[index].id) {
                                    dataList[index] = {
                                        icon1: val.icon1,
                                        icon2: val.icon2,
                                        name: data.data[index].name,
                                        id: data.data[index].id
                                    };
                                }
                            });
                            this.AlldictionList = dataList;
                        } else if (data.code != 200) {
                            _this.$message({
                                showClose: true,
                                message: data.msg,
                                type: 'error'
                            });
                        }
                    } else {
                        _this.$message({
                            showClose: true,
                            message: data.msg,
                            type: 'error'
                        });
                    }
                }
            });
        },
        // 查询当前用户拥有那些权限
        getElementSn() {
            this.$axios.get('admin/company/find/element/' + this.userid).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (res.status == 200) {
                        var data = res.data;
                        if (data.code == 200) {
                            this.checkList = data.data;
                        } else if (data.code != 200) {
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
                }
            });
        },

        // 删除单个
        del_member(row) {
            this.$confirm('【是否确定删除' + row.name + '的成员信息】', '温馨提示', {
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
                this.$axios.get('admin/company/delete/card/?userIds=' + row.id).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.getTeams();
                            } else if (data.code != 200) {
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
                    }
                });
            });
        },

        // 拿到复选框的id
        handleSelectionChange(val) {
            var listId = [];
            var listName = [];
            val.forEach(function (list, i) {
                listId[i] = list.id;
                listName[i] = list.name;
            });
            this.listName = listName;
            this.listId = listId;
            this.list = val;
        },
        // 删除所有钮
        del_All() {
            this.$confirm('【是否确定删除 ' + this.listName + ' 的成员信息】', '温馨提示', {
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
                let id = this.listId;
                this.$axios.get('admin/company/delete/card/?userIds=' + id).then((res) => {
                    loading.close();
                    if (res.status == 200) {
                        var data = res.data;
                        if (res.status == 200) {
                            var data = res.data;
                            if (data.code == 200) {
                                this.$message({
                                    showClose: true,
                                    message: data.msg,
                                    type: 'success'
                                });
                                this.getTeams();
                            } else if (data.code != 200) {
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
                    }
                });
            });
        },
        // 页码
        handleSizeChange(val) {
            this.limit = val;
            this.getTeams();
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getTeams();
        },
        // 全屏事件
        enlarge() {},
        obtain() {
            let beginTime = this.time[0] || 0;
            let endTime = this.time[1] || 0;
            this.beginTime = beginTime;
            this.endTime = endTime;
            let qyID = localStorage.getItem('loginData');
            this.qyID = qyID;
        },
        QueryMember() {
            this.getTeams();
            this.page = 1;
        },

        // 查询接口
        getTeams() {
            var data =
                '?page=' +
                this.page +
                '&beginTime=' +
                this.timeStart +
                '&endTime=' +
                this.timeEnd +
                '&name=' +
                this.inputName +
                '&companyId=' +
                this.qyID +
                '&limit=' +
                this.limit;
            this.$axios.get('admin/company/teams' + data).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        var dataList = [];
                        var companyName = '';
                        var companyIds = '';
                        data.data.forEach(function (val, index) {
                            dataList[index] = val;
                            var date = new Date(val.time);
                            var time =
                                date.getFullYear() +
                                '-' +
                                (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
                                '-' +
                                date.getDate();
                            dataList[index].time = time;
                            companyName = val.companyName;
                            companyIds = val.companyId;
                        });
                        this.tableData = dataList;
                        this.counts = data.totalCount;
                        this.companyName = companyName;
                        this.companyIds = companyIds;
                    } else {
                        this.$message({
                            showClose: true,
                            message: '未知错误',
                            type: 'error'
                        });
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: '未知错误',
                        type: 'error'
                    });
                }
            });
        },
        //职位接口
        getPositions() {
            this.qiyeName = this.$route.query.companyName;
            var id = this.$route.query.companyId;
            var data = '?page=' + this.page + '&companyId=' + this.qyID + '&limit=' + this.limit;
            this.$axios.get('admin/company/positions' + data).then((res) => {
                if (res.status == 200) {
                    var data = res.data;
                    if (data.code == 200) {
                        this.positionsList = data.data;
                    } else if (data.code == 401) {
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


<style>
.after {
    border: 1px solid #0000ff;
    color: #0000ff;
}

.before {
    border: 1px solid #eeeeee;
    cursor: pointer;
}

.el-checkbox-lists {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-items: center;
    align-items: center;
    justify-content: center;
}

.el-checkbox-tab {
    width: 25%;
}

.tab {
    display: flex;
    justify-items: center;
    align-items: center;
    width: 60%;
    height: 35px;
    margin: 10px 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    font-size: 14px;
}

.img-tab {
    margin-right: 5px;
}

.uploadImg {
    width: 100%;
    height: 100%;
}

.el-checkboxLists {
    margin: 0 auto;
    padding-left: 20px;
    clear: both;
    display: flex;
    flex-wrap: wrap;
}

.el-checkboxLists i {
    padding-right: 10px;
}

.el-checkboxLists .el-checkbox__inner {
    top: 0;
}

.el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0px;
}

.el-checkbox-group {
    float: left;
    margin-left: 20px;
}

.el-checkboxLists .el-checkbox {
    float: left;
    margin-right: 30px;
    width: 120px;
    height: 30px;
}

.el-checkbox {
    margin-top: 20px;
}

.dialogs {
    width: 100%;
    clear: both;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 10px;
}

.member .dialogs .el-button {
    width: 151px;
    height: 30px;
    line-height: 15px;
    background-color: #2450d2;
    border-radius: 8px;
    margin-left: 0;
    color: #fff;
    margin-top: 20px;
}

.el-form {
    width: 100%;
}

.iconE {
    position: relative;
    cursor: pointer;
}

.iconE .iconfont {
    position: absolute;
    top: -63px;
    right: 40px;
    font-size: 14px;
    color: #909399;
}

.formWidth {
    width: 250px;
}

.formWidth .el-input {
    width: 100%;
}
.el-select.formWidth .el-input {
    width: 100%;
}
.formWidth .el-form-item__label {
    text-align: right;
}

.clear {
    clear: both;
}

.member {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
}

.terracr_top {
    width: 100%;
    height: 114px;
    margin: 0 auto;
    margin-bottom: 20px;
    background-color: #fafbfa;
}

.top_text {
    padding: 10px 20px;
    font-size: 14px;
}

.top_search {
    padding: 10px 20px;
    font-size: 12px;
    margin-top: -8px;
}

.top_search .search {
    width: 200px;
    height: 30px;
    color: #a4a4a4;
}

.member .querybutton {
    width: 151px;
    height: 30px;
    background-color: #2450d2;
    color: #ffffff;
    /* border-radius: 30px; */
    font-size: 14px;
    padding: 0;
}

.add_Del {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
}

.add_Del .button {
    width: auto;
    height: 30px;
    font-size: 14px;
    color: #fff;
    /* border-radius: 50px; */
    float: right;
    margin-right: 5px;
    padding: 0 10px;
}

.add_Del .add_qiye {
    background: #2482d2;
}

.add_Del .qiyeGL {
    background: #ff8d00;
}

.add_Del .tab_del {
    background: #ff0000;
}

.el-table .tab_button {
    width: auto;
    height: 30px;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    border-radius: 30px;
    background: #ff8d00;
    padding: 0 10px;
}

.el-table .sq_button {
    width: auto;
    height: 30px;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    border-radius: 30px;
    background: #2450d2;
    padding: 0 15px;
}

.el-table .bj_button {
    width: auto;
    height: 30px;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    border-radius: 30px;
    background: #109955;
    padding: 0 15px;
}
.el-dialog__header {
    background-color: #f9f9fa;
}
.el-table .del_button {
    width: auto;
    height: 30px;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    border-radius: 30px;
    background: #ff0000;
    padding: 0 15px;
}
.el-table .kefubutton {
    width: auto;
    height: 30px;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    border-radius: 30px;
    background: #42a7ff;
    padding: 0 15px;
}
.el-checkbox-group {
    width: 100%;
}
.el-checkbox-group .el-checkbox__input .el-checkbox .el-checkbox__inner {
    top: 0;
}
.el-checkbox-group .el-checkbox__input {
    margin-left: 8px;
    margin-top: 3px;
    float: right;
}
.el-table .kefufalse {
    width: auto;
    height: 30px;
    font-size: 14px;
    text-align: center;
    color: #ffffff;
    border-radius: 30px;
    background: #979497;
    padding: 0 15px;
}
.member .el-dialog__body .el-form-item__label {
    text-align: right;
}

.el-dialog__body {
    background: #fff;
}
.el-checkbox {
    margin: 0;
}
.shouquanKingUser .el-checkbox {
    width: 145px;
    position: relative;
    margin-top: 20px;
    margin-right: 20px;
}
.el-checkbox-lists .el-checkbox.is-bordered.el-checkbox--small {
    height: 40px;
    font-size: 20px;
    padding: 5px 10px 5px 20px;
}
.el-checkbox-lists .el-checkbox img {
    width: 15px;
    height: 15px;
    position: absolute;
    left: 10px;
}
.el-checkbox-lists .el-checkbox.is-bordered.is-checked {
    border-color: #3b58ff;
}
.el-checkbox-lists .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #3b58ff;
}
.el-checkbox-lists .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: #3b58ff;
    border-color: #3b58ff;
}
</style>
