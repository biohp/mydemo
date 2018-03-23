<!-- 用户管理 -->
<template>
  <div id="admin-manage">
    <div class="input-first">
        <Row type="flex" justify="center">
            <Col span="8">
                <Input 
                    v-model.trim="form.input"
                    size="large" 
                    placeholder="查询..." 
                    @on-enter="queryUser">
                    <Select v-model="form.select" slot="prepend" style="width: 80px">
                        <Option value="1">用户名</Option>
                        <Option value="2">机构</Option>
                        <Option value="3">姓名</Option>
                    </Select>
                    <Button slot="append" icon="android-search" @click="queryUser"></Button>
                </Input> 
            </Col>
        </Row>      
    </div>
    <Card class="card-box">
        <p slot="title">
            <Icon type="person-stalker"></Icon>
            &nbsp;用户信息
        </p>
        <div slot="extra" class="card-box-extra">
            <Tooltip content="新增" placement="top">
                <Button type="primary" shape="circle" icon="person-add" @click="modalAdd"></Button>
            </Tooltip>
        </div>
        <Table :stripe="true" border :columns="columnsUser" :data="dataUser"></Table>
        <div class="card-box-page" v-if="dataUser.length===0?false:true">
            <div style="float: right;">
                <Page 
                    :total="page.total" 
                    :current="page.current" 
                    @on-change="pageChange" 
                    show-total
                    no-data-text 
                    show-elevator></Page>
            </div>
        </div>
    </Card>
    <Modal v-model="modal.visible.save" width="600" :mask-closable="false" @on-cancel="modalCloseSave">
        <p slot="header" class="modal-header-info">
            <Icon type="person"></Icon>
            <span>&nbsp;{{modal.title}}</span>
        </p>
        <div class="modal-content">
            <Form ref="formUser" :model="formUser" :rules="ruleUser" label-position="right" :label-width="100">
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="用户名：" prop="user">
                            <Input v-model.trim="formUser.user" placeholder="输入用户名"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="所属机构：" prop="dept">
                            <Poptip placement="bottom" width="300">
                                <Input :readonly="true" v-model.trim="dept.title" placeholder="选择机构"></Input>
                                <div slot="content">
                                    <Tree :data="dept.list" @on-select-change="selectDept"></Tree>
                                </div>
                            </Poptip>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="姓名：" prop="name">
                            <Input v-model.trim="formUser.name" placeholder="输入姓名"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="IP地址：">
                            <Input v-model.trim="formUser.ip" placeholder="输入IP"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="密码：" prop="pwd">
                            <Input 
                            type="password"
                            v-model.trim="formUser.pwd" 
                            placeholder="输入6-12位数字字母组合" 
                            @on-change="pwdChange"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="密码强度：">
                            <Progress  :percent="pwdPercent" hide-info :status="pwdStatus"></Progress>
                        </FormItem>
                    </Col>
                    <Col span="24">
                        <FormItem label="角色：">
                            <Select v-model="formUser.role" filterable multiple placeholder="选择角色" >
                                <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>   
            </Form>
        </div>
        <div slot="footer" style="text-align:center">
            <Button type="primary" shape="circle" icon="filing" @click="saveUser">保存</Button>
            <Button type="ghost" shape="circle" icon="refresh" style="margin-left: 10px" @click="resetForm">重置</Button> 
        </div>
    </Modal>
    <Modal v-model="modal.visible.del" width="360" :mask-closable="false">
        <p slot="header" class="modal-header-error">
            <Icon type="information-circled"></Icon>
            <span>&nbsp;{{modal.title}}</span>
        </p>
        <div style="text-align:center">
            <p>此用户删除后，将无法恢复！</p>
            <p>是否继续删除？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="delUser">删 除</Button> 
        </div>
    </Modal>
    <Modal v-model="modal.visible.show" width="250" :closable="false">
        <p slot="header" class="modal-header-info">
            <Icon type="person"></Icon>
            <span>&nbsp;{{modal.title}}</span>
        </p>
        <div style="text-align:center">
            <Poptip v-for="(item, key) in userRole" :key="key" trigger="hover" title="备注" :content="item.remarks">
                <Tag type="dot" color="green">{{ item.label }}</Tag>
            </Poptip>
        </div>
        <div slot="footer">
            <Button type="primary" long @click="modalCloseShow">关 闭</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import password from '../../utils/password.js'
import { deptTree } from '../../utils/tree.js'
export default {
  name: 'AdminManage',
  data () {
    return {
        form: {
            name: 'formUser',
            input: '',
            select: '1'
        },
        index: -1,
        columnsUser: [
            {
                title: '用户名',
                key: 'user',
                align: 'center',
                sortable: true
            },
            {
                title: '所属机构',
                key: 'dept',
                align: 'center',
                sortable: true
            },
            {
                title: '姓名',
                key: 'name',
                align: 'center',
                sortable: true
            },
            {
                title: 'IP地址',
                key: 'ip',
                align: 'center',
                sortable: true
            },
            {
                title: '用户角色',
                key: 'role',
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'success',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.modalShow(params.index)
                                }
                            }
                        }, '查看角色')
                    ]);
                }
            },
            {
                title: '操作',
                key: 'handle',
                width: 150,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.modalEdit(params.index)
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'warning',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.modalDelete(params.index)
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
        ],
        dataUser: [ 
            {
                user: '662366',
                dept: '长沙支队',
                name: '张三',
                ip: '',
                role: ['3','4']
            },
            {
                user: '662366',
                dept: '浏阳支队',
                name: '王五',
                ip: '',
                role: ['4','1']
            },
            {
                user: '662366',
                dept: '浏阳支队',
                name: '王五',
                ip: '',
                role: ['4','1']
            },
            {
                user: '662366',
                dept: '株洲支队',
                name: '李四',
                ip: '',
                role: ['3','4']
            },
            {
                user: '662366',
                dept: '浏阳支队',
                name: '王五',
                ip: '',
                role: ['4','1']
            }     
        ],
        page: {
            current: 1,
            total: 0
        },
        modal: {
            title: '',
            visible: {
                save: false,
                del: false,
                show: false
            }
        },
        dept: {
            title: '选择机构',
            list: [{
                title: '湖南省高速公路交通管理局',
                value: '001',
                expand: true
            },{
                title: '长沙支队',
                value: '002',
                expand: true,
                children: [{
                    title: '星沙支队',
                    value: '003'
                },{
                    title: '浏阳支队',
                    value: '004',
                    
                },{
                    title: '道林支队',
                    value: '005'
                }]
            },{
                title: '株洲支队',
                value: '006',
                expand: true,
                children: [{
                    title: '天元支队',
                    value: '007'
                },{
                    title: '荷塘支队',
                    value: '008'
                }]
            }]           
        },
        roleList: [
            {
                value: '1',
                label: '超级管理员',
                remarks: ''
            },
            {
                value: '2',
                label: '总队用户',
                remarks: '查看经纬度'
            },
            {
                value: '3',
                label: '支队用户',
                remarks: ''
            },
            {
                value: '4',
                label: '普通用户',
                remarks: ''
            }
        ],
        userRole: [],
        formUser: {
            user: '',
            dept: '',
            name: '',
            pwd:'',
            ip:'',
            role:[]
        },
        ruleUser: {
            user: [
                { required: true, message: '用户名不能为空', trigger: 'blur' }
            ],
            dept: [
                { required: true, message: '请选择一个机构', trigger: 'change' }
            ],
            name: [
                { required: true, message: '姓名不能为空', trigger: 'blur' }
            ],
            pwd: [
                { required: true, message: '密码不能为空', trigger: 'blur' },
                { type: 'string', min: 6, message: '密码至少6位', trigger: 'blur' }
            ]
        },
        pwdPercent:0,
        pwdStatus : 'wrong' 
    }
  },
  created() {
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
    this.page.total = this.dataUser.length;  
  },
  methods: {
    //重置表单
    utilReset() {
        this.formUser = {
            user: '',
            dept: '',
            name: '',
            pwd: '',
            ip: '',
            role: []
        };
        this.dept.title = '选择机构';
        this.dept.list = deptTree(this.dept.list, this.dept.title);
        this.pwdPercent = 0;
    },
    utilEdit(index) {
        this.formUser = {
            user: this.dataUser[index].user,
            dept: this.dataUser[index].dept,
            name: this.dataUser[index].name,
            ip: this.dataUser[index].ip,
            pwd: '',
            role: this.dataUser[index].role 
        } 
        this.dept.title = this.formUser.dept;
        this.dept.list = deptTree(this.dept.list, this.dept.title);      
    },
    //查询用户
    queryUser() {
        let form = {
            user: '',
            dept: '',
            name: ''
        }
        let flag = this.form.select;
        if (flag === '1') {
            form.user = this.form.input;
        } else if (flag === '2') {
            form.dept = this.form.input;
        } else if (flag === '3') {
            form.name = this.form.input;
        }
        console.log(form);
        /*this.$http.get('uap/tgs/queryTgsTree.do')
        .then((res)=>{
            return res.data;
        }).then((res)=>{
            this.xzkkTree=res.DATA;
        }).catch((err)=>{
            console.log(error.message);
        })*/
    },
    //打开模态框
    modalAdd() {
        this.$refs[this.form.name].resetFields();
        this.utilReset();
        this.modal.title = '新增用户';
        this.modal.visible.save = true;
    },
    modalEdit(index) {
        this.modal.title = '编辑用户';
        this.utilEdit(index);
        this.modal.visible.save = true;
    },
    modalDelete(index) {
        this.modal.visible.del = true;
        this.modal.title = '删除用户';
    },
    modalShow(index) {
        this.modal.visible.show = true;
        this.modal.title = '用户角色';
        let arr = this.roleList;
        this.userRole = [];
        this.dataUser[index].role.map( item => {
            for (let i = 0; i < arr.length; i++) {
                if (item === arr[i].value) {
                    this.userRole.push(arr[i]);
                }
            }
            return item;
        });
    },
    //关闭模态框
    modalCloseSave() {
        this.modal.visible.save = false;
        this.$Message.warning('本次修改已撤销！');
        this.utilReset();
    },
    saveUser() {
        this.$refs[this.form.name].validate((valid) => {
            if (valid) {
                this.$Message.success('保存成功！');
                this.modal.visible.save = false;
            } else {
                this.$Message.error('提交失败！');
            }
        })
        //axios()
        
    },
    resetForm() {
        this.$refs[this.form.name].resetFields();
        this.utilReset();
    },
    delUser() {
        //axios()
        this.modal.visible.del = false;
        this.$Message.success('删除成功'); 
    },
    modalCloseShow() {
        this.modal.visible.show = false;
    },
    //选择机构
    selectDept(data) {
        if(data.length!==0){
            this.dept.title = data[0].title;
            this.formUser.dept = data[0].value;
        }else {
            this.dept.title = '选择机构';
            this.formUser.dept = '';
        }
    },
    //换页
    pageChange(val) {
        this.page.current = val;
    },
    //监控密码强度
    pwdChange(){
        //百分比和颜色(Percent,Status)
        let ps = password.getPercentStatus(this.formUser.pwd);
        this.pwdPercent = ps.passwordPercent;
        this.pwdStatus = ps.passwordStatus;
    }
  }
}
</script>

<style scoped>
  .input-first{
    margin-bottom: 20px;
  }
  .card-box{
    background: #e8e8e8;
  }
  .card-box-extra{
    margin-top: -5px;
  }
  .card-box-page{
    margin: 10px;
    overflow: hidden;
    padding-bottom: 2px;
  }
  .modal-header-info{
    color: #1890ff;
    text-align: center;
  }
  .modal-header-error{
    color: #f60;
    text-align: center;
  }
  .modal-content{
    padding-right: 40px; 
  }  
</style>