<!-- 人员管理 -->
<template>
  <div id="employee-manage">
    <div class="input-first">
        <Row type="flex" justify="center">
            <Col span="7">
                <Input 
                    v-model.trim="input"
                    size="large" 
                    placeholder="人员查询" 
                    @on-enter="queryEmployee">
                    <Button slot="append" icon="android-search" @click="queryEmployee"></Button>
                </Input> 
            </Col>
        </Row>      
    </div>
    <Card class="card-box">
        <p slot="title">
            <Icon type="person-stalker"></Icon>
            &nbsp;机构人员
        </p>
        <div slot="extra" class="card-box-extra">
            <Tooltip content="新增" placement="top">
                <Button type="primary" shape="circle" icon="plus-round" @click="modalAdd"></Button>
            </Tooltip>
        </div>
        <Table :stripe="true" border :columns="columnsEmployee" :data="dataEmployee"></Table>
        <div class="card-box-page" v-if="dataEmployee.length===0?false:true">
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
            <Icon type="person"></Icon>
            <span>&nbsp;{{modal.title}}</span>
        </p>
        <div class="modal-content">
            <Form ref="formEmployee" :model="formEmployee" :rules="ruleEmployee" label-position="right" inline :label-width="90">
                <FormItem label="姓名：" prop="name">
                    <Input v-model.trim="formEmployee.name" placeholder="输入姓名"></Input>
                </FormItem>
                <FormItem label="警号：" prop="alarm">
                    <Input v-model.trim="formEmployee.alarm" placeholder="输入警号"></Input>
                </FormItem>
                <FormItem label="所属机构：" prop="dept">
                    <Poptip placement="bottom" width="300">
                        <Input :readonly="true" v-model="dept.title" placeholder="选择机构"></Input>
                        <div slot="content">
                            <Tree :data="dept.list" @on-select-change="selectDept"></Tree>
                        </div>
                    </Poptip>
                </FormItem>
                <FormItem label="手机：" prop="phone">
                    <Input v-model.trim="formEmployee.phone" placeholder="输入手机号码"></Input>
                </FormItem>
                <FormItem label="身份证号：">
                    <Input v-model.trim="formEmployee.IDnumber" placeholder="输入身份证号码"></Input>
                </FormItem>
                <FormItem label="性别：">
                    <RadioGroup v-model="formEmployee.sex">
                        <Radio label="apple">
                            <Icon type="male" color="blue" size="12px"></Icon>
                            <span>男</span>
                        </Radio>
                        <Radio label="android">
                            <Icon type="female" color="pink" size="14px"></Icon>
                            <span>女</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>  
                <FormItem label="出生日期：">
                    <DatePicker v-model="formEmployee.birth" type="date" placeholder="选择出生日期" style="width: 160px"></DatePicker>
                </FormItem>
                <FormItem label="警衔：">
                    <Select v-model="formEmployee.policeRank" style="width:160px" placeholder="选择警衔">
                        <Option v-for="item in list.policeRank" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="现任职务：">
                    <Select v-model="formEmployee.post" style="width:160px" placeholder="选择现任职务">
                        <Option v-for="item in list.post" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="编制类型：">
                    <Select v-model="formEmployee.type" style="width:160px" placeholder="选择编制类型">
                        <Option v-for="item in list.type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="所在岗位：">
                    <Select v-model="formEmployee.station" style="width:160px" placeholder="选择所在岗位">
                        <Option v-for="item in list.station" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="办公电话：">
                    <Input v-model.trim="formEmployee.officePhone" placeholder="输入身份证号码"></Input>
                </FormItem>
                <FormItem label="家庭电话：">
                    <Input v-model.trim="formEmployee.homePhone" placeholder="输入家庭电话"></Input>
                </FormItem>
                <FormItem label="手台：">
                    <Input v-model.trim="formEmployee.hand" placeholder="输入手台"></Input>
                </FormItem>
                <FormItem label="手台呼号：">
                    <Input v-model.trim="formEmployee.handSign" placeholder="输入手台呼号"></Input>
                </FormItem>
                <FormItem label="手台呼组：">
                    <Input v-model.trim="formEmployee.handGroup" placeholder="输入手台呼组"></Input>
                </FormItem>
            </Form> 
        </div> 
        <div slot="footer" style="text-align:center">
            <Button type="primary" shape="circle" icon="filing" @click="saveRole">保存</Button>
            <Button type="ghost" shape="circle" icon="refresh" style="margin-left: 10px" @click="resetForm">重置</Button>
        </div>
    </Modal>
    <Modal v-model="modal.visible.del" width="360" :mask-closable="false">
        <p slot="header" class="modal-header-error">
            <Icon type="information-circled"></Icon>
            <span>&nbsp;{{modal.title}}</span>
        </p>
        <div style="text-align:center">
            <p>此人员删除后，将无法恢复！</p>
            <p>是否继续删除？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="delRole">删 除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { deptTree } from '../../utils/tree.js'
export default {
  name: 'EmployeeManage',
  data () {
    return {
        form: {
            name: 'formEmployee'
        },
        input: '',
        index: -1,
        columnsEmployee: [
            {
                title: '姓名',
                key: 'name',
                align: 'center',
                sortable: true 
            },
            {
                title: '现任职务',
                key: 'post',
                align: 'center',
                sortable: true 
            },
            {
                title: '手台',
                key: 'hand',
                align: 'center',
                sortable: true 
            },
            {
                title: '手机',
                key: 'phone',
                align: 'center',
                sortable: true 
            },
            {
                title: '警号',
                key: 'alarm',
                align: 'center',
                sortable: true 
            },
            {
                title: '性别',
                key: 'sex',
                align: 'center',
                filters: [{
                        label: '男',
                        value: '男'
                    },{
                        label: '女',
                        value: '女'
                }],
                filterMultiple: false,
                filterMethod (value, row) {
                    return row.sex === value;
                }
            },
            {
                title: '所属机构',
                key: 'dept',
                align: 'center',
                sortable: true 
            },
            {
                title: '办公电话',
                key: 'officePhone',
                align: 'center',
                sortable: true 
            },
            {
                title: '手台呼号',
                key: 'handSign',
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
        dataEmployee: [
            {
                name: '李建',
                sex: '男',
                IDnumber: '',
                birth: '',
                alarm: '170339',
                policeRank: '',
                dept: '岳阳支队',
                post: '',
                type: '',
                station: '',
                phone: '18175693004',
                officePhone: '',
                homePhone: '',
                hand: '',
                handSign: '',
                handGroup: ''
            },{
                name: '李建',
                sex: '男',
                IDnumber: '',
                birth: '',
                alarm: '170339',
                policeRank: '',
                dept: '岳阳支队',
                post: '',
                type: '',
                station: '',
                phone: '18175693004',
                officePhone: '',
                homePhone: '',
                hand: '',
                handSign: '',
                handGroup: ''
            },{
                name: '李建',
                sex: '男',
                IDnumber: '',
                birth: '',
                alarm: '170339',
                policeRank: '',
                dept: '岳阳支队',
                post: '',
                type: '',
                station: '',
                phone: '18175693004',
                officePhone: '',
                homePhone: '',
                hand: '',
                handSign: '',
                handGroup: ''
            },{
                name: '李建',
                sex: '男',
                IDnumber: '',
                birth: '',
                alarm: '170339',
                policeRank: '',
                dept: '岳阳支队',
                post: '',
                type: '',
                station: '',
                phone: '18175693004',
                officePhone: '',
                homePhone: '',
                hand: '',
                handSign: '',
                handGroup: ''
            },{
                name: '李建',
                sex: '男',
                IDnumber: '',
                birth: '',
                alarm: '170339',
                policeRank: '',
                dept: '岳阳支队',
                post: '',
                type: '',
                station: '',
                phone: '18175693004',
                officePhone: '',
                homePhone: '',
                hand: '',
                handSign: '',
                handGroup: ''
            },{
                name: '李建',
                sex: '男',
                IDnumber: '',
                birth: '',
                alarm: '170339',
                policeRank: '',
                dept: '岳阳支队',
                post: '',
                type: '',
                station: '',
                phone: '18175693004',
                officePhone: '',
                homePhone: '',
                hand: '',
                handSign: '',
                handGroup: ''
            },{
                name: '李建',
                sex: '男',
                IDnumber: '',
                birth: '',
                alarm: '170339',
                policeRank: '',
                dept: '岳阳支队',
                post: '',
                type: '',
                station: '',
                phone: '18175693004',
                officePhone: '',
                homePhone: '',
                hand: '',
                handSign: '',
                handGroup: ''
            },{
                name: '李建',
                sex: '男',
                IDnumber: '',
                birth: '',
                alarm: '170339',
                policeRank: '',
                dept: '岳阳支队',
                post: '',
                type: '',
                station: '',
                phone: '18175693004',
                officePhone: '',
                homePhone: '',
                hand: '',
                handSign: '',
                handGroup: ''
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
        formEmployee: {
            name: '',
            sex: '',
            IDnumber: '',
            birth: '',
            alarm: '',
            policeRank: '',
            dept: '',
            post: '',
            type: '',
            station: '',
            phone: '',
            officePhone: '',
            homePhone: '',
            hand: '',
            handSign: '',
            handGroup: ''
        },
        ruleEmployee: {
            name: [
                { required: true, message: '姓名不能为空', trigger: 'blur' }
            ],
            alarm: [
                { required: true, message: '警号不能为空', trigger: 'blur' }
            ],
            dept: [
                { required: true, message: '选择所属机构', trigger: 'change' }
            ],
            phone: [
                { required: true, message: '电话号码不能为空', trigger: 'blur' }
            ]
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
        list: {
            policeRank: [
                { value: '一级警监', label: '一级警监' },
                { value: '二级警监', label: '二级警监' },
                { value: '三级警监', label: '三级警监' },
                { value: '一级警督', label: '一级警督' },
                { value: '二级警督', label: '二级警督' },
                { value: '三级警督', label: '三级警督' },
                { value: '一级警司', label: '一级警司' },
                { value: '二级警司', label: '二级警司' },
                { value: '三级警司', label: '三级警司' },
                { value: '一级警员', label: '一级警员' },
                { value: '二级警员', label: '二级警员' },
                { value: '三级警员', label: '三级警员' },
                { value: '见习', label: '见习' },
                { value: '学员', label: '学员' }
            ],
            post: [
                { value: '局级', label: '局级' },
                { value: '副教导员', label: '副教导员' },
                { value: '主任', label: '主任' },
                { value: '副主任', label: '副主任' },
                { value: '科长', label: '科长' }
            ],
            type: [
                { value: '行政', label: '行政' },
                { value: '文职', label: '文职' },
                { value: '事业', label: '事业' }
            ],
            station: [
                { value: '指挥调度岗', label: '指挥调度岗' },
                { value: '信息发布岗', label: '信息发布岗' },
                { value: '视频巡检岗', label: '视频巡检岗' },
                { value: '违法审核岗', label: '违法审核岗' },
                { value: '研判信息岗', label: '研判信息岗' }
            ] 
        }
    }
  },
  created() {
    //axios
    this.page.total = this.dataEmployee.length;  
  },
  methods: {
    utilReset() {
        this.formEmployee = {
            name: '',
            sex: '',
            IDnumber: '',
            birth: '',
            alarm: '',
            policeRank: '',
            dept: '',
            post: '',
            type: '',
            station: '',
            phone: '',
            officePhone: '',
            homePhone: '',
            hand: '',
            handSign: '',
            handGroup: ''
        }
        this.dept.title = '选择机构';
        this.dept.list = deptTree(this.dept.list, this.dept.title);
    },
    utilEdit(index) {
        let data = this.dataEmployee[index];
        this.formEmployee = {
            name: data.name,
            sex: data.sex,
            IDnumber: data.IDnumber,
            birth: data.birth,
            alarm: data.alarm,
            policeRank: data.policeRank,
            dept: data.dept,
            post: data.post,
            type: data.type,
            station: data.station,
            phone: data.phone,
            officePhone: data.officePhone,
            homePhone: data.homePhone,
            hand: data.hand,
            handSign: data.handSign,
            handGroup: data.handGroup
        }
        this.dept.title = this.formEmployee.dept;
        this.dept.list = deptTree(this.dept.list, this.dept.title);
    },
    queryEmployee() {
        //axios
    },
    modalAdd() {
        this.$refs[this.form.name].resetFields();
        this.utilReset();
        this.modal.title = '新增人员';
        this.modal.visible.save = true;
    },
    pageChange(val) {

    },
    modalCloseSave() {
        this.$Message.warning('本次修改已撤销！');
        this.modal.visible.save = false;
        this.utilReset();
    },
    saveRole(name) {
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
    delRole() {
        this.modal.visible.del = false;
    },
    modalEdit(index) {
        this.$refs[this.form.name].resetFields();
        this.utilEdit(index);
        this.modal.title = '编辑人员';
        this.modal.visible.save = true;
    },
    modalDel(index) {
        //axios
        this.modal.title = '删除人员';
        this.modal.visible.del = true;  
    },
    selectDept(data) {
        if(data.length!==0){
            this.dept.title = data[0].title;
            this.formEmployee.dept = data[0].value;
        }else {
            this.dept.title = '选择机构';
            this.formEmployee.dept = '';
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
    padding-right: 40px;
  } 
</style>