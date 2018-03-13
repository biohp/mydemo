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
            <Card style="background:#E6F7FF">
                <p slot="title">
                    <Icon type="person-stalker"></Icon>
                    &nbsp;机构用户
                </p>
                <div slot="extra" style="margin-top:-5px">
                    <Tooltip content="新增" placement="top">
                        <Button type="primary" shape="circle" icon="person-add" @click="openAddUser"></Button>
                    </Tooltip>
                    <Tooltip content="删除" placement="top">
                        <Button type="primary" shape="circle" icon="trash-a" @click="openModalDeleteUser"></Button>
                    </Tooltip>
                </div>
                <Tree :data="departmentUserList" @on-select-change="getUserInfo"></Tree>
            </Card>
        </Col>
        <Col span="16">
            <Card style="background:#E6F7FF">
                <p slot="title">
                    <Icon type="person"></Icon>
                    &nbsp;用户信息
                </p>
                <div slot="extra" style="margin-top:-5px">
                    <Tooltip content="编辑" placement="top">
                        <Button type="primary" shape="circle" icon="edit" @click="openEditUser"></Button>
                    </Tooltip>
                </div>
                <Row type="flex" justify="space-around" class="code-row-bg">
                    <Col span="10">
                        <Form label-position="right" :label-width="100">
                            <FormItem label="用户名：">
                                <p>{{userInfo.username}}</p>
                            </FormItem>
                            <FormItem label="所属机构：">
                                <p>{{userInfo.department.title}}</p>
                            </FormItem>
                            <FormItem label="姓名：">
                                <p>{{userInfo.employeeName}}</p>
                            </FormItem>
                            <FormItem label="IP：">
                                <p>{{userInfo.ip}}</p>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span="14">
                        <Form label-position="right" :label-width="100">
                            <FormItem label="角色：">
                                <ul>
                                    <li v-for="(item,key) in userInfo.authority" :key="key">
                                        <Poptip trigger="hover" title="备注" :content="item.remarks" placement="right">
                                            <Tag type="dot" color="blue">{{item.name}}</Tag>
                                        </Poptip>
                                    </li>
                                </ul>
                            </FormItem>
                        </Form>
                        
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>
    <Modal v-model="modalSaveUser" width="750" :mask-closable="false" @on-cancel="cancelModalSaveUser">
        <p slot="header" style="color:#1890ff;text-align:center">
            <Icon type="person"></Icon>
            <span>&nbsp;{{modalSaveUserTitle}}</span>
        </p>
        <Row type="flex" justify="space-around" class="code-row-bg" :gutter="14">
            <Col span="10">
                <Form :model="formSaveUser" label-position="right" :label-width="100">
                    <FormItem label="用户名：">
                        <Input v-model.trim="formSaveUser.username" placeholder="输入用户名"></Input>
                    </FormItem>
                    <FormItem label="所属机构：">
                        <Poptip placement="left" width="300">
                            <Button type="ghost" shape="circle" icon="android-home">{{departmentLabel}}</Button>
                            <div slot="content">
                                <Tree :data="departmentList" @on-select-change="selectedDepartment"></Tree>
                            </div>
                        </Poptip>
                    </FormItem>
                    <FormItem label="姓名：">
                        <Input v-model.trim="formSaveUser.employeeName" placeholder="输入姓名"></Input>
                    </FormItem>
                    <FormItem label="密码：">
                        <Input 
                        v-model.trim="formSaveUser.password" 
                        placeholder="输入6-12位数字或字母" 
                        @on-change="getCipherStrength"></Input>
                    </FormItem>
                    <FormItem label="密码强度：">
                        <Progress  :percent="passwordPercent" hide-info :status="passwordStatus"></Progress>
                    </FormItem>
                    <FormItem label="IP：">
                        <Input v-model.trim="formSaveUser.ip" placeholder="输入IP"></Input>
                    </FormItem>
                </Form>
            </Col>
            <Col span="14">
                <div>
                    <Table
                    highlight-row  
                    stripe
                    size="small" 
                    ref="selection"
                    @on-selection-change="getSelectChange" 
                    :columns="columnsUserAuthority" 
                    :data="dataUserAuthority.slice((page.current-1)*6,page.current*6)"></Table>
                    <div v-show="dataUserAuthority.length>6?true:false" class="table-page">
                        <div class="table-page-son">
                            <Page 
                                :current="page.current" 
                                :total="dataUserAuthority.length" 
                                :page-size="6" 
                                @on-change="pageChange"
                                size="small"></Page>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <div slot="footer" style="text-align:center">
            <Button type="primary" shape="circle" icon="filing" @click="saveDepartmentUser">保存</Button>
            <Button type="ghost" shape="circle" icon="refresh" style="margin-left: 10px" @click="resetModalForm">重置</Button>
        </div>
    </Modal>
    <Modal v-model="modalDeleteUser" width="360" :mask-closable="false">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除用户</span>
        </p>
        <div style="text-align:center">
            <p>此用户删除后，将无法恢复！</p>
            <p>是否继续删除？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="deleteUser">删 除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import password from '../../utils/password.js'
export default {
  name: 'AdminManage',
  created(){
    //axios()
    /*this.$http.get('uap/tgs/queryTgsTree.do')
        .then((res)=>{
            return res.data;
        }).then((res)=>{
            this.departmentList=res.DATA;
            this.departmentUserList='';
            this.dataUserAuthority='';
        }).catch((err)=>{
            console.log(error.message);
        })*/
  },
  methods: {
    getSelectChange(data){
        for (let i = 0; i < this.dataUserAuthority.length; i++) {
            this.dataUserAuthority[i]._checked = false;
        }
        for (let i = 0; i < data.length; i++) {
            this.dataUserAuthority[data[i].id]._checked = true;
        }
    },
    resetFormSaveUser(){
        this.formSaveUser.id = '';
        this.formSaveUser.username = '';
        this.formSaveUser.department = '';
        this.formSaveUser.employeeName = '';
        this.formSaveUser.password = '';
        this.formSaveUser.ip = '';
        this.formSaveUser.authority = [];
        this.departmentLabel = '选择机构';
    },
    cancelModalSaveUser(){
        this.$Message.info('本次修改已撤销！');
        this.resetFormSaveUser();
    },
    //选择机构
    selectedDepartment(data){
        if(data.length!==0){
            this.departmentLabel = data[0].title;
            this.formSaveUser.department = data[0].value;
        }else {
            this.departmentLabel = '选择机构';
            this.formSaveUser.department = '';
        }
    },
    //确认删除用户
    deleteUser () {
        this.modalDeleteUser = false;
        if (this.userInfo.id!=='') {
            //axios()
            /*this.$http.get('uap/tgs/queryTgsTree.do')
            .then((res)=>{
                console.log(success);
            }).catch((err)=>{
                console.log(error.message);
            })*/
            this.$Message.success('删除成功'); 
        }   
    },
    //换页
    pageChange(val){
        this.page.current=val;
    },
    //获取用户信息
    getUserInfo(data){
        //axios(data.value)获取userInfo
        /*this.$http.get('uap/tgs/queryTgsTree.do')
        .then((res)=>{
            return res.data;
        }).then((res)=>{
            this.xzkkTree=res.DATA;
        }).catch((err)=>{
            console.log(error.message);
        })*/
    },
    //查询用户
    queryUsername(){
        //axios(this.username)获取用户树
        /*this.$http.get('uap/tgs/queryTgsTree.do')
        .then((res)=>{
            return res.data;
        }).then((res)=>{
            this.xzkkTree=res.DATA;
        }).catch((err)=>{
            console.log(error.message);
        })*/
    },
    //打开新增用户界面
    openAddUser(){
        for (let i = 0; i < this.dataUserAuthority.length; i++) {
            this.dataUserAuthority[i]._checked = false;
        }
        this.departmentLabel = '选择机构';
        this.modalSaveUserTitle = '新增用户';
        this.modalSaveUser = true;
        this.resetFormSaveUser();
    },
    //打开删除用户页面
    openModalDeleteUser(){
        this.modalDeleteUser = true;
    },
    //打开编辑用户页面
    openEditUser(){
        this.formSaveUser.id = this.userInfo.id;
        this.formSaveUser.username = this.userInfo.username;
        this.formSaveUser.department = this.userInfo.department.value;
        this.formSaveUser.employeeName = this.userInfo.employeeName;
        this.formSaveUser.ip = this.userInfo.ip;
        this.departmentLabel = this.userInfo.department.title;
        for (let i = 0; i < this.dataUserAuthority.length; i++) {
            this.dataUserAuthority[i]._checked = false;
        }
        for (let i = 0; i < this.userInfo.authority.length; i++) {
            this.dataUserAuthority[this.userInfo.authority[i].id]._checked = true;
        }
        this.modalSaveUserTitle = '编辑用户';
        this.modalSaveUser = true;
    },
    //保存用户
    saveDepartmentUser(){
        //axios()
        /*this.$http.post('uap/passcar/query.do', 
            this.formCarQuery
        ).then((res)=>{
            return res.data;
        }).then((res)=>{
            this.carQueryResult=res.DATA;
            this.total=res.TOTAL;
        }).catch((err)=>{
            console.log(error.message);
        })*/
        this.modalSaveUser = false;
        this.$Message.success('保存成功'); 
    },
    //重置表单
    resetModalForm(){
        this.resetFormSaveUser();
        for (let i = 0; i < this.dataUserAuthority.length; i++) {
            this.dataUserAuthority[i]._checked = false;
        }
    },
    //获取密码强度
    getCipherStrength(){
        let percentStatus = password.getPercentStatus(this.formSaveUser.password);
        this.passwordPercent = percentStatus.passwordPercent;
        this.passwordStatus = percentStatus.passwordStatus;
    }
  },
  data () {
    return {
        departmentLabel:'选择机构',
        modalSaveUser: false,
        modalDeleteUser: false,
        modalSaveUserTitle: '',
        page:{
            size: 4,
            current: 1
        },
        username:'',
        departmentList: [
            {
                title: '湖南省高速公路交通管理局',
                value: 'hnsgjj',
                expand: true,
                children: [
                    {
                        title: '长沙支队',
                        value: 'hnsgjj',
                        expand: true,
                        children: [
                            {
                                title: '星沙支队',
                                value: 'hnsgjj'
                                
                            },
                            {
                                title: '浏阳支队',
                                value: 'hnsgjj'
                            },
                            {
                                title: '道林支队',
                                value: 'hnsgjj'
                            }
                        ]
                    },
                    {
                        title: '株洲支队',
                        value: 'hnsgjj',
                        expand: true,
                        children: [
                            {
                                title: '天元支队',
                                value: 'hnsgjj'
                            },
                            {
                                title: '荷塘支队',
                                value: 'hnsgjj'
                            }
                        ]
                    }
                ]
            }
        ],
        departmentUserList: [
            {
                title: '湖南省高速公路交通管理局',
                value: 'hnsgjj',
                expand: true,
                children: [
                    {
                        title: '662366',
                        value:'liufeng'
                    },
                    {
                        title: '189005',
                        value:'guofei'
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
            id:'1',
            username:'662366',
            department:{
                title:'长沙支队',
                value:'cszd'
            },
            employeeName:'张三',
            ip:'',
            authority:[
                {   
                    id: 0,
                    name: '超级管理员',
                    remarks: '超级管理员'
                },
                {
                    id: 1,
                    name: '基本用户',
                    remarks: ''
                },
                {
                    id: 2,
                    name: '集成平台用户',
                    remarks: '查看经纬度'
                }
            ]
        },
        formSaveUser: {
            id:'',
            username: '',
            department: '',
            employeeName: '',
            password:'',
            ip:'',
            authority:[]
        },
        passwordPercent:0,
        passwordStatus : 'wrong',
        columnsUserAuthority:[
            {
                type: 'selection',
                width: 58,
                align: 'center'
            },{
                title: '角色名称',
                key: 'name',
                align: 'center'
            },{
                title: '备注',
                key: 'remarks',
                align: 'center'
            }
        ],
        dataUserAuthority: [
            {
                id: 0,
                name: '超级管理员',
                remarks: '超级管理员',
                _checked: false
            },
            {
                id: 1,
                name: '基本用户',
                remarks: '',
                _checked: false
            },
            {
                id: 2,
                name: '集成平台用户',
                remarks: '查看经纬度',
                _checked: false
            },
            {
                id: 3,
                name: '基本用户',
                remarks: '',
                _checked: false
            },
            {
                id: 4,
                name: '集成平台用户',
                remarks: '查看经纬度',
                _checked: false
            },
            {
                id: 5,
                name: '基本用户',
                remarks: '',
                _checked: false
            },
            {
                id: 6,
                name: '集成平台用户',
                remarks: '查看经纬度',
                _checked: false
            },
            {
                id: 7,
                name: '基本用户',
                remarks: '',
                _checked: false
            },
            {
                id: 8,
                name: '集成平台用户',
                remarks: '查看经纬度',
                _checked: false
            }
        ]	
    }
  }
}
</script>

<style scoped>
   .table-page{
     margin: 15px;
     overflow: hidden;
   }
   .table-page-son{
     float: right;
   }   
</style>