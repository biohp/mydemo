<!-- 权限功能管理 -->
<template>
  <div id="authority-manage">
    <div class="input-first">
        <Row>
            <Col span="8" offset="8">
                <Input 
                    v-model.trim="input"
                    size="large" 
                    placeholder="权限查询" 
                    @on-enter="queryAuthority">
                    <Button slot="append" icon="android-search" @click="queryAuthority"></Button>
                </Input> 
            </Col>
        </Row>      
    </div>
    <Card class="card-box">
        <p slot="title">
            <Icon type="unlocked"></Icon>
            &nbsp;权限管理
        </p>
        <div slot="extra" class="card-box-extra">
            <Tooltip content="新增" placement="top">
                <Button type="primary" shape="circle" icon="plus-round" @click="modalAdd"></Button>
            </Tooltip>
        </div>
        <Table :stripe="true" border :columns="columnsAuthority" :data="dataAuthority"></Table>
        <div class="card-box-page" v-if="dataAuthority.length===0?false:true">
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
    <Modal v-model="modal.visible.save" width="450" :mask-closable="false" @on-cancel="modalCloseSave">
        <p slot="header" class="modal-header-info">
            <Icon type="unlocked"></Icon>
            <span>&nbsp;{{modal.title}}</span>
        </p>
        <div class="modal-content">
           <Form ref="formAuthority" :model="formAuthority" :rules="ruleAuthority" label-position="right" :label-width="100">
                <FormItem label="权限名称：" prop="name">
                    <Input v-model.trim="formAuthority.name" placeholder="输入权限名称"></Input>
                </FormItem>
                <FormItem label="权限编码：" prop="code">
                    <Input v-model.trim="formAuthority.code" placeholder="输入权限编码"></Input>
                </FormItem>
                <FormItem label="权限类型：" prop="type">
                    <Select v-model="formAuthority.type" style="width:250px" placeholder="权限类型">
                        <Option v-for="item in authority.type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否可见：" prop="see">
                    <RadioGroup v-model="formAuthority.see">
                        <Radio label="可见">可见</Radio>
                        <Radio label="不可见">不可见</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="是否可用：" prop="use">
                    <RadioGroup v-model="formAuthority.use">
                        <Radio label="可用">可用</Radio>
                        <Radio label="不可用">不可用</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="权限事件：">
                    <Input v-model="formAuthority.event" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入权限事件..."></Input>
                </FormItem>
                <FormItem label="备注信息：">
                    <Input v-model="formAuthority.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="输入备注信息..."></Input>
                </FormItem>
            </Form>  
        </div>
        <div slot="footer" style="text-align:center">
            <Button type="primary" shape="circle" icon="filing" @click="saveAuthority('formAuthority')">保存</Button>
            <Button type="ghost" shape="circle" icon="refresh" style="margin-left: 10px" @click="resetForm()">重置</Button>
        </div>
    </Modal>
    <Modal v-model="modal.visible.del" width="360" :mask-closable="false">
        <p slot="header" class="modal-header-error">
            <Icon type="information-circled"></Icon>
            <span>&nbsp;{{modal.title}}</span>
        </p>
        <div style="text-align:center">
            <p>此权限删除后，将无法恢复！</p>
            <p>是否继续删除？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="delAuthority">删 除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'AuthorityManage',
  data () {
    return {
        input: '',
        index: -1,
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
        authority: {
            type: [
                { value: '菜单', label: '菜单' },
                { value: '按钮', label: '按钮' }
            ]
        },
        formAuthority:{
            name: '',
            code: '',
            type: '',
            see: '',
            use: '',
            event: '',
            remarks: ''
        },
        ruleAuthority: {
            name: [
                { required: true, message: '权限名称不能为空', trigger: 'blur' }
            ],
            code: [
                { required: true, message: '权限编码不能为空', trigger: 'blur' }
            ],
            type: [
                { required: true, message: '权限类型不能为空', trigger: 'change' }
            ],
            see: [
                { required: true, message: '选择是否可见', trigger: 'change' }
            ],
            use: [
                { required: true, message: '选择是否可用', trigger: 'change' }
            ]
        },
        columnsAuthority: [
            {
                title: '权限编码',
                key: 'code',
                align: 'center'
            },
            {
                title: '权限名称',
                key: 'name',
                align: 'center',
                sortable: true
            },
            {
                title: '权限类型',
                key: 'type',
                align: 'center',
                filters: [{
                        label: '菜单',
                        value: '菜单'
                    },{
                        label: '按钮',
                        value: '按钮'
                }],
                filterMultiple: false,
                filterMethod (value, row) {
                    return row.type === value;
                }
            },
            {
                title: '是否可见',
                key: 'see',
                align: 'center',
                filters: [{
                        label: '可见',
                        value: '可见'
                    },{
                        label: '不可见',
                        value: '不可见'
                }],
                filterMultiple: false,
                filterMethod (value, row) {
                    return row.see === value;
                }
            },
            {
                title: '是否可用',
                key: 'use',
                align: 'center',
                filters: [{
                        label: '可用',
                        value: '可用'
                    },{
                        label: '不可用',
                        value: '不可用'
                }],
                filterMultiple: false,
                filterMethod (value, row) {
                    return row.use === value;
                }
            },
            {
                title: '操作',
                key: 'action',
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
        dataAuthority: [
            {
                code: '00311',
                name: '系统管理中心',
                type: '菜单',
                see: '可见',
                use: '不可用',
                event: '点击事件',
                remarks: ''
            },{
                code: '00311',
                name: '新增权限',
                type: '按钮',
                see: '可见',
                use: '可用',
                event: '点击事件',
                remarks: ''
            },{
                code: '00311',
                name: '新增用户',
                type: '按钮',
                see: '不可见',
                use: '可用',
                event: '点击事件',
                remarks: ''
            },{
                code: '00311',
                name: '删除用户',
                type: '按钮',
                see: '不可见',
                use: '可用',
                event: '点击事件',
                remarks: ''
            },{
                code: '00311',
                name: '编辑角色',
                type: '按钮',
                see: '可见',
                use: '不可用',
                event: '点击事件',
                remarks: ''
            },{
                code: '00311',
                name: '菜单列表',
                type: '菜单',
                see: '不可见',
                use: '不可用',
                event: '点击事件',
                remarks: ''
            },{
                code: '00311',
                name: '删除角色',
                type: '按钮',
                see: '不可见',
                use: '可用',
                event: '点击事件',
                remarks: ''
            },{
                code: '00311',
                name: '过车查询',
                type: '按钮',
                see: '可见',
                use: '可用',
                event: '点击事件',
                remarks: ''
            }
        ]
    }
  },
  created() {
    //axios
    this.page.total = this.dataAuthority.length;  
  },
  methods:{
    utilReset() {
        this.formAuthority = {
            name: '',
            code: '',
            type: '',
            see: '',
            use: '',
            event: '',
            remarks: ''
        }
    },
    utilEdit(index) {
        this.formAuthority = {
            name: this.dataAuthority[index].name,
            code: this.dataAuthority[index].code,
            type: this.dataAuthority[index].type,
            see: this.dataAuthority[index].see,
            use: this.dataAuthority[index].use,
            event: this.dataAuthority[index].event,
            remarks: this.dataAuthority[index].remarks
        }
    },
    queryAuthority() {
        //axios
    },
    modalAdd() {
        this.$refs['formAuthority'].resetFields();
        this.modal.title = '新增权限';
        this.utilReset();
        this.modal.visible.save = true;
    },
    pageChange() {
        //axios
    },
    modalCloseSave() {
        this.modal.visible.save = false;
        this.$Message.warning('本次修改已撤销！');
    },
    saveAuthority(name) {
        this.$refs[name].validate((valid) => {
            if (valid) {
                this.$Message.success('保存成功！');
                this.modal.visible.save = false;
            } else {
                this.$Message.error('提交失败！');
            }
        });
    },
    resetForm() {
        this.$refs['formAuthority'].resetFields();
        this.utilReset();
    },
    delAuthority() {
        //axios
        this.modal.visible.del = false;
        this.$Message.success('删除成功!');
    },
    modalEdit(index) {
        this.$refs['formAuthority'].resetFields();
        this.modal.title = '编辑权限';
        this.utilEdit(index);
        this.modal.visible.save = true;
    },
    modalDel(index) {
        this.modal.title = '删除权限';
        this.modal.visible.del = true;
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
