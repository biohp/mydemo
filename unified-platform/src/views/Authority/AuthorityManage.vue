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
           <Form :model="formSaveAuthority" label-position="right" :label-width="80">
                <FormItem label="权限名称：">
                    <Input v-model.trim="formSaveAuthority.name" placeholder="输入权限名称"></Input>
                </FormItem>
                <FormItem label="权限编码：">
                    <Input v-model.trim="formSaveAuthority.code" placeholder="输入权限编码"></Input>
                </FormItem>
                <FormItem label="权限类型：">
                    <Select v-model="formSaveAuthority.type" style="width:250px" placeholder="权限类型">
                        <Option v-for="item in authority.type" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否可见：">
                    <Select v-model="formSaveAuthority.see" style="width:250px" placeholder="是否可见">
                        <Option v-for="item in authority.see" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="是否可用：">
                    <Select v-model="formSaveAuthority.use" style="width:250px" placeholder="是否可用">
                        <Option v-for="item in authority.use" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="权限事件：">
                    <Input v-model="formSaveAuthority.event" type="textarea" placeholder="输入权限事件..."></Input>
                </FormItem>
                <FormItem label="备注信息：">
                    <Input v-model="formSaveAuthority.remarks" type="textarea" placeholder="输入备注信息..."></Input>
                </FormItem>
            </Form>  
        </div>
        <div slot="footer" style="text-align:center">
            <Button type="primary" shape="circle" icon="filing" @click="saveAuthority">保存</Button>
            <Button type="ghost" shape="circle" icon="refresh" style="margin-left: 10px" @click="resetForm">重置</Button>
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
            type: [],
            see: [
                { value: '可见', label: '可见'},
                { value: '不可见', label: '不可见'}
            ],
            use: [
                { value: '可用', label: '可用'},
                { value: '不可用', label: '不可用'}
            ]
        },

        AuthorityTypeList: [],
        formSaveAuthority:{
            code: '',
            name: '',
            type: '',
            event: '',
            see: '',
            use: '',
            remarks: ''
        },
        modalSaveAuthorityTitle: '',
        modalSaveAuthority: false,
        modalDeleteAuthority: false,
        formSearchAuthority:{
            code:'',
            name:'',
            type:''
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
                                    this.show(params.index)
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
                                    this.remove(params.index)
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
                use: '不可用'
            },{
                code: '00311',
                name: '新增权限',
                type: '按钮',
                see: '可见',
                use: '可用'
            },{
                code: '00311',
                name: '新增用户',
                type: '按钮',
                see: '不可见',
                use: '可用'
            },{
                code: '00311',
                name: '删除用户',
                type: '按钮',
                see: '不可见',
                use: '可用'
            },{
                code: '00311',
                name: '编辑角色',
                type: '按钮',
                see: '可见',
                use: '不可用'
            },{
                code: '00311',
                name: '菜单列表',
                type: '菜单',
                see: '不可见',
                use: '不可用'
            },{
                code: '00311',
                name: '删除角色',
                type: '按钮',
                see: '不可见',
                use: '可用'
            },{
                code: '00311',
                name: '过车查询',
                type: '按钮',
                see: '可见',
                use: '可用'
            }
        ]
    }
  },
  created() {
    //axios
    this.page.total = this.dataAuthority.length;  
  },
  methods:{
    queryAuthority() {},
    modalAdd() {
        this.modal.title = '新增权限';
        this.modal.visible.save = true;
    },
    pageChange() {},
    modalCloseSave() {},
    saveAuthority() {},
    resetForm() {},
    delAuthority() {},

  	deleteAuthority () {
  		this.modalDeleteAuthority = false;
  	},
  	changePage () {
  		//axios
  	},
  	resetSaveAuthorityForm () {

  	},
  	cancelModalSaveAuthority () {
  		this.modalSaveAuthority = false;
  	},
  	show (index) {
        /*this.$Modal.info({
            title: 'User Info',
            content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })*/
        this.modalSaveAuthority = true;
  		this.modalSaveAuthorityTitle = '编辑权限';
  		//axios
    },
    remove (index) {
        /*this.data6.splice(index, 1);*/
        this.modalDeleteAuthority = true;
        //axios
    },
  	openAddAuthorityModal () {
  		this.modalSaveAuthority = true;
  		this.modalSaveAuthorityTitle = '新增权限';
  	},
  	onFormSearchAuthority () {
  		//axios
  	},
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
    padding-right: 25px;
  }  
</style>
