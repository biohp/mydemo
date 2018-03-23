<!-- 机构管理 -->
<template>
  <div id="department-manage">
    <div class="input-first">
        <Row type="flex" justify="center">
            <Col span="7">
                <Input 
                    v-model.trim="input"
                    size="large" 
                    placeholder="机构查询" 
                    @on-enter="queryDept">
                    <Button slot="append" icon="android-search" @click="queryDept"></Button>
                </Input> 
            </Col>
        </Row>      
    </div>
    <Card class="card-box">
        <p slot="title">
            <Icon type="briefcase"></Icon>
            &nbsp;机构管理
        </p>
        <div slot="extra" class="card-box-extra">
            <Tooltip content="新增" placement="top">
                <Button type="primary" shape="circle" icon="plus-round" @click="modalAdd"></Button>
            </Tooltip>
        </div>
        <Table :stripe="true" border :columns="columnsDept" :data="dataDept"></Table>
        <div class="card-box-page" v-if="dataDept.length===0?false:true">
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
    <Modal v-model="modal.visible.save" width="900" :mask-closable="false" @on-cancel="modalCloseSave">
        <p slot="header" class="modal-header-info">
            <Icon type="briefcase"></Icon>
            <span>&nbsp;{{modal.title}}</span>
        </p>
        <div class="modal-content">
            <Form ref="formDept" :model="formDept" :rules="ruleDept" label-position="right" inline :label-width="90">
                <FormItem label="机构编码：" prop="code">
                    <Input v-model.trim="formDept.code" placeholder="输入机构编码"></Input>
                </FormItem>
                <FormItem label="机构名称：" prop="name">
                    <Input v-model.trim="formDept.name" placeholder="输入机构名称"></Input>
                </FormItem>
                <FormItem label="行政级别：">
                    <Select v-model="formDept.level" style="width:160px" placeholder="选择行政级别">
    			        <Option v-for="item in dept.level" :value="item.value" :key="item.value">{{ item.label }}</Option>
    			    </Select>
                </FormItem>
                <FormItem label="机构职能：">
                    <Input v-model.trim="formDept.function" placeholder="输入机构职能"></Input>
                </FormItem>
                <FormItem label="业务描述：">
                    <Input v-model.trim="formDept.business" placeholder="输入业务描述"></Input>
                </FormItem>
                <FormItem label="上级机构：" prop="father">
                    <Poptip placement="bottom" width="300">
                        <Input :readonly="true" v-model.trim="dept.title" placeholder="选择机构"></Input>
                        <div slot="content">
                            <Tree :data="dept.list" @on-select-change="selectDept"></Tree>
                        </div>
                    </Poptip>
                </FormItem>
                <FormItem label="机构类型：" prop="type">
                    <Select v-model="formDept.type" style="width:160px" placeholder="选择机构类型">
    			        <Option v-for="item in dept.type" :value="item.value" :key="item.value">{{ item.label }}</Option>
    			    </Select>
                </FormItem>
                <FormItem label="所处地址：">
                    <Input v-model.trim="formDept.address" placeholder="输入所处地址"></Input>
                </FormItem>
                <FormItem label="邮政编码：">
                    <Input v-model.trim="formDept.zip" placeholder="输入邮政编码"></Input>
                </FormItem>
                <FormItem label="编制人数：">
                    <Input v-model.trim="formDept.policeNum" placeholder="输入编制人数"></Input>
                </FormItem>
                <FormItem label="在编民警：">
                    <Input v-model.trim="formDept.police" placeholder="输入在编民警"></Input>
                </FormItem>
                <FormItem label="在编职工：">
                    <Input v-model.trim="formDept.worker" placeholder="输入在编职工"></Input>
                </FormItem>
                <FormItem label="其他人数：">
                    <Input v-model.trim="formDept.otherNum" placeholder="输入其他人数"></Input>
                </FormItem>
                <FormItem label="负责人：">
                    <Input v-model.trim="formDept.head" placeholder="输入负责人"></Input>
                </FormItem>
                <FormItem label="负责人电话：">
                    <Input v-model.trim="formDept.headTel" placeholder="输入负责人电话"></Input>
                </FormItem>
                <FormItem label="负责人手机：">
                    <Input v-model.trim="formDept.headPhone" placeholder="输入负责人手机"></Input>
                </FormItem>
                <FormItem label="值班电话1：" prop="watchTel1">
                    <Input v-model.trim="formDept.watchTel1" placeholder="输入值班电话1"></Input>
                </FormItem>
                <FormItem label="值班电话2：">
                    <Input v-model.trim="formDept.watchTel2" placeholder="输入值班电话2"></Input>
                </FormItem>
                <FormItem label="值班电话3：">
                    <Input v-model.trim="formDept.watchTel3" placeholder="输入值班电话3"></Input>
                </FormItem>
                <FormItem label="传真：">
                    <Input v-model.trim="formDept.fax" placeholder="输入传真"></Input>
                </FormItem>
            </Form>      
        </div>    
        <div slot="footer" style="text-align:center">
            <Button type="primary" shape="circle" icon="filing" @click="saveDept">保存</Button>
            <Button type="ghost" shape="circle" icon="refresh" style="margin-left: 10px" @click="resetForm">重置</Button>
        </div>
    </Modal>
    <Modal v-model="modal.visible.del" width="360" :mask-closable="false">
        <p slot="header" class="modal-header-error">
            <Icon type="information-circled"></Icon>
            <span>&nbsp;{{modal.title}}</span>
        </p>
        <div style="text-align:center">
            <p>此机构删除后，将无法恢复！</p>
            <p>是否继续删除？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="delDept">删 除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import expandRow from '../../components/Table/TableExpand.vue'
import { deptTree } from '../../utils/tree.js'
export default {
  name: 'DepartmentManage',
  components: { expandRow },
  data () {
    return {
        form: {
            name: 'formDept'
        },
        input: '',
        index: -1,
        columnsDept: [
                    {
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '机构编码',
                        key: 'code',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '机构名称',
                        key: 'name',
                        align: 'center',
                        sortable: true                        
                    },
                    {
                        title: '行政级别',
                        key: 'level',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '机构职能',
                        key: 'func',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '业务描述',
                        key: 'business',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '上级机构',
                        key: 'father',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '机构类型',
                        key: 'type',
                        align: 'center',
                        sortable: true
                    },
                    {
                        title: '值班电话1',
                        key: 'watchTel1',
                        align: 'center',
                        sortable: true
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
                                            this.modalDel(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }                  
        ],
        dataDept: [
            {
                code: '4310000',
                name: '长沙支队',
                level: '',
                func: '',
                business: '',
                father: '',
                type: '支队',
                watchTel1: '202',
                address: '',
                zip: '',
                policeNum: '',
                police: '',
                worker: '',
                otherNum: '',
                head: '',
                headTel: '',
                headPhone: '',
                watchTel2: '',
                watchTel3: '',
                fax: ''
            },{
                code: '4310000',
                name: '长沙支队',
                level: '',
                func: '',
                business: '',
                father: '',
                type: '支队',
                watchTel1: '202',
                address: '',
                zip: '',
                policeNum: '',
                police: '',
                worker: '',
                otherNum: '',
                head: '',
                headTel: '',
                headPhone: '',
                watchTel2: '',
                watchTel3: '',
                fax: ''
            },{
                code: '4310000',
                name: '长沙支队',
                level: '',
                func: '',
                business: '',
                father: '',
                type: '支队',
                watchTel1: '202',
                address: '',
                zip: '',
                policeNum: '',
                police: '',
                worker: '',
                otherNum: '',
                head: '',
                headTel: '',
                headPhone: '',
                watchTel2: '',
                watchTel3: '',
                fax: ''
            },{
                code: '4310000',
                name: '长沙支队',
                level: '',
                func: '',
                business: '',
                father: '',
                type: '支队',
                watchTel1: '202',
                address: '',
                zip: '',
                policeNum: '',
                police: '',
                worker: '',
                otherNum: '',
                head: '',
                headTel: '',
                headPhone: '',
                watchTel2: '',
                watchTel3: '',
                fax: ''
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
                del: false
            }
        },
        formDept: {
            code: '',
            name: '',
            level: '',
            func: '',
            business: '',
            father: '',
            type: '',
            address: '',
            zip: '',
            policeNum: '',
            police: '',
            worker: '',
            otherNum: '',
            head: '',
            headTel: '',
            headPhone: '',
            watchTel1: '',
            watchTel2: '',
            watchTel3: '',
            fax: ''
        },
        ruleDept: {
            code: [
                { required: true, message: '机构编码不能为空', trigger: 'blur' }
            ],
            name: [
                { required: true, message: '机构名称不能为空', trigger: 'blur' }
            ],
            father: [
                { required: true, message: '选择上级机构', trigger: 'change' }
            ],
            type: [
                { required: true, message: '选择机构类型', trigger: 'blur' }
            ],
            watchTel1: [
                { required: true, message: '值班电话1不能为空', trigger: 'blur' }
            ]
        },
        dept: {
            level: [
                { value: '局级', label: '局级' },
                { value: '副教导员', label: '副教导员' },
                { value: '主任', label: '主任' },
                { value: '副主任', label: '副主任' },
                { value: '科长', label: '科长' }
            ],
            type: [
                { value: '总队', label: '总队' },
                { value: '支队', label: '支队' },
                { value: '大队', label: '大队' },
                { value: '中队', label: '中队' },
                { value: '其他', label: '其他' }
            ],
            title: '选择上级机构',
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
        }
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
    this.page.total = this.dataDept.length;  
  },
  methods:{
    utilReset() {
        this.formDept = {
            code: '',
            name: '',
            level: '',
            func: '',
            business: '',
            father: '',
            type: '',
            address: '',
            zip: '',
            policeNum: '',
            police: '',
            worker: '',
            otherNum: '',
            head: '',
            headTel: '',
            headPhone: '',
            watchTel1: '',
            watchTel2: '',
            watchTel3: '',
            fax: ''
        }
        this.dept.title = '选择机构';
        this.dept.list = deptTree(this.dept.list, this.dept.title);
    },
    utilEdit(index) {
        let data = this.dataDept[index];
        this.formDept = {
            code: data.code,
            name: data.name,
            level: data.level,
            func: data.func,
            business: data.business,
            father: data.father,
            type: data.type,
            address: data.address,
            zip: data.zip,
            policeNum: data.policeNum,
            police: data.police,
            worker: data.worker,
            otherNum: data.otherNum,
            head: data.head,
            headTel: data.headTel,
            headPhone: data.headPhone,
            watchTel1: data.watchTel1,
            watchTel2: data.watchTel2,
            watchTel3: data.watchTel3,
            fax: data.fax
        }
        this.dept.title = this.formDept.father;
        this.dept.list = deptTree(this.dept.list, this.dept.title);
    },
    queryDept() {
        //axios
    },
    modalAdd() {
        this.$refs[this.form.name].resetFields();
        this.modal.title = '新增机构';
        this.utilReset();
        this.modal.visible.save = true;
    },
    pageChange() {

    },
    modalEdit(index) {
        this.$refs[this.form.name].resetFields();
        this.modal.title = '编辑机构';
        this.utilEdit(index);
        this.modal.visible.save = true;
    },
    modalDel(index) {
        this.modal.title = '删除机构';
        this.modal.visible.del = true;
    },
    modalCloseSave() {
        this.$Message.warning('本次修改已撤销！');
        this.modal.visible.save = false;
        this.utilReset();
    },
    saveDept() {
        this.$refs[this.form.name].validate((valid) => {
            if (valid) {
                this.$Message.success('保存成功！');
            } else {
                this.$Message.error('保存失败！');
            }
        })
        this.modal.visible.save = false;
    },
    resetForm() {
        this.$refs[this.form.name].resetFields();
        this.utilReset();
    },
    delDept() {
        this.modal.visible.del = false;
    },
    selectDept(data) {
        if(data.length!==0){
            this.dept.title = data[0].title;
            this.formDept.father = data[0].value;
        }else {
            this.dept.title = '选择机构';
            this.formDept.father = '';
        }
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
    padding-left: 20px;
    padding-right: 20px;
  } 
</style>