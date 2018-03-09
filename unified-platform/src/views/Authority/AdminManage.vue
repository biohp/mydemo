<!-- 用户管理 -->
<template>
  <div id="admin-manage">
    <!-- <Form label-position="right" :label-width="80" :model="formQueryAdminManage" inline style="line-height: 33px;">
        <FormItem label="用户名：">
            <Input v-model="formQueryAdminManage.username" placeholder="输入用户名"></Input>
        </FormItem>
        <FormItem label="所属机构：">
            <Cascader 
            	v-model="formQueryAdminManage.department" 
            	:data="departmentList" 
            	trigger="hover" 
            	filterable 
            	change-on-select
            	placeholder="选择机构"
            ></Cascader>
        </FormItem>
        <FormItem label="姓名：">
            <Input v-model="formQueryAdminManage.employeeName" placeholder="输入姓名"></Input>
        </FormItem>
        <FormItem label="权限名称：">
            <Input v-model="formQueryAdminManage.authorityName" placeholder="输入权限名称"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" shape="circle" icon="ios-search" >查询</Button>
	        <Button type="ghost" shape="circle" style="margin-left: 4px">重置</Button>
        </FormItem>
    </Form> -->
    <Row :gutter="24">
        <Col span="8">
            <div style="margin-bottom:20px">
                <Input 
                    v-model="username" 
                    icon="ios-search" 
                    placeholder="搜索用户名..." 
                    style="width: 100%" 
                    @on-enter="queryUsername"
                    @on-click="queryUsername"></Input>
            </div>
            <Card>
                <p slot="title">
                    <Icon type="person-stalker"></Icon>
                    &nbsp;机构用户
                </p>
                <div slot="extra" style="margin-top:-5px">
                    <Tooltip content="新增" placement="top">
                        <Button type="ghost" shape="circle" icon="person-add" @click="addDepartmentUser"></Button>
                    </Tooltip>
                    <Tooltip content="删除" placement="top">
                        <Button type="ghost" shape="circle" icon="trash-a" @click="deleteDepartmentUser"></Button>
                    </Tooltip>
                </div>
                <Tree :data="departmentUserList" show-checkbox></Tree>
            </Card>
        </Col>
        <Col span="16">
            <Card>
                <p slot="title">
                    <Icon type="person"></Icon>
                    &nbsp;用户信息
                </p>
                <div slot="extra" style="margin-top:-5px">
                    <Tooltip content="编辑" placement="top">
                        <Button type="ghost" shape="circle" icon="edit" v-show="!isEditUser" @click="onEditUser"></Button>
                    </Tooltip>
                    <Tooltip content="撤销" placement="top">
                        <Button type="ghost" shape="circle" icon="reply" v-show="isEditUser" @click="onBackEdit"></Button>
                    </Tooltip>
                </div>
                <Row type="flex" justify="space-around" class="code-row-bg">
                    <Col span="10">
                        <Form :model="formUpdateUser" label-position="right" :label-width="100">
                            <FormItem label="用户名：">
                                <p v-show="!isEditUser">{{userInfo.username}}</p>
                                <Input v-show="isEditUser" v-model="formUpdateUser.username" placeholder="输入用户名"></Input>
                            </FormItem>
                            <FormItem label="所属机构：">
                                <p v-show="!isEditUser">{{userInfo.department[0]}}</p>
                                <Cascader 
                                    v-show="isEditUser"
                                    v-model="formUpdateUser.department" 
                                    :data="departmentList" 
                                    trigger="hover" 
                                    filterable 
                                    change-on-select
                                    placeholder="选择机构"
                                ></Cascader>
                            </FormItem>
                            <FormItem label="姓名：">
                                <p v-show="!isEditUser">{{userInfo.employeeName}}</p>
                                <Input v-show="isEditUser" v-model="formUpdateUser.employeeName" placeholder="输入姓名"></Input>
                            </FormItem>
                            <FormItem label="密码：" v-show="isEditUser">
                                <Input v-model="formUpdateUser.password" placeholder="输入6-12位数字或字母" @on-change="passwordStrong"></Input>
                            </FormItem>
                            <FormItem label="密码强度：" v-show="isEditUser">
                                <Progress  :percent="passwordPercent" hide-info :status="passwordStatus"></Progress>
                            </FormItem>
                            <FormItem label="IP：">
                                <p v-show="!isEditUser">{{userInfo.ip}}</p>
                                <Input v-show="isEditUser" v-model="formUpdateUser.ip" placeholder="输入IP"></Input>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span="14">
                        <Table 
                            border 
                            stripe
                            size="small" 
                            ref="selection" 
                            :columns="columnsUserAuthority" 
                            :data="userAuthorityList"></Table>
                    </Col>
                </Row>
                <div v-show="isEditUser" style="text-align:center">
                    <Button type="primary" shape="circle" icon="filing">保存</Button>
                    <Button type="ghost" shape="circle" icon="close" style="margin-left: 10px">取消</Button>
                </div>
            </Card>
        </Col>
    </Row>
  </div>
</template>

<script>
import password from '../../utils/password.js'
export default {
  name: 'AdminManage',
  methods: {
    queryUsername(){
        console.log(this.username);
    },
    addDepartmentUser(){

    },
    deleteDepartmentUser(){

    },
    passwordStrong(){
        let percentStatus = password.getPercentStatus(this.formUpdateUser.password);
        this.passwordPercent = percentStatus.passwordPercent;
        this.passwordStatus = percentStatus.passwordStatus;
    }, 
    onEditUser(){
        this.isEditUser = true;
        this.formUpdateUser = this.userInfo;
    },
    onBackEdit(){
        this.$Modal.warning({
            content: '放弃本次修改？'
        });
        this.isEditUser = false;
    }
  },
  computed: {
    columnsUserAuthority () {
        let columns = [];
        if (this.isEditUser) {
            columns.push({
                type: 'selection',
                width: 60,
                align: 'center'
            })
        }
        columns.push({
            title: '权限名称',
            key: 'name',
            align: 'center'
        });
        columns.push({
            title: '备注',
            key: 'remark',
            align: 'center'
        });
        return columns;
    }
  },
  data () {
    return {
        username:'',
        formQueryAdminManage:{
            username:'',
            department:[],
            employeeName:'',
            authorityName:'',
        },
        departmentList: [{
            value: '00001',
            label: '长沙支队',
            children: [
                {
                    value: '00002',
                    label: '星沙支队'
                },
                {
                    value: '00003',
                    label: '浏阳支队'
                },
                {
                    value: '00004',
                    label: '道林支队'
                }
            ]
         }, {
            value: '00005',
            label: '株洲支队',
            children: [
                {
                    value: '00006',
                    label: '天元支队',
                },
                {
                    value: '00007',
                    label: '荷塘支队',
                }
            ],
        }],
        departmentUserList: [
            {
                title: '湖南省高速公路交通管理局',
                expand: true,
                children: [
                    {
                        title: '662366'
                    },
                    {
                        title: '189005'
                    },
                    {
                        title: '长沙支队',
                        expand: true,
                        children: [
                            {
                                title: '324166'
                            },
                            {
                                title: '100765'
                            }
                        ]
                    },
                    {
                        title: '株洲支队',
                        expand: true,
                        children: [
                            {
                                title: '234442'
                            },
                            {
                                title: '108899'
                            }
                        ]
                    }
                ]
            }
        ],
        userInfo: {
            username:'000115',
            department:['00001'],
            employeeName:'穆合义',
            password:'',
            ip:''
        },
        formUpdateUser: {
            username: '',
            department: [],
            employeeName: '',
            password:'',
            ip:''
        },
        passwordPercent:0,
        passwordStatus : 'wrong',
        isEditUser: false,
        userAuthorityList: [
            {
                name: '超级管理员',
                remark: '超级管理员'
            },
            {
                name: '基本用户',
                remark: ''
            },
            {
                name: '集成平台用户',
                remark: '查看经纬度'
            },
            {
                name: '违法预处理',
                remark: ''
            },
            {
                name: '支队用户',
                remark: ''
            },
            {
                name: '总队用户',
                remark: ''
            }
        ],	
    }
  }
}
</script>

<style scoped>
    
</style>