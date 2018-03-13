<!-- 权限功能管理 -->
<template>
  <div id="authority-manage">
    <Form :model="formSearchAuthority" label-position="right" :label-width="100" inline >
        <FormItem label="权限编码：">
            <Input v-model.trim="formSearchAuthority.code" placeholder="输入权限编码" :clearable="true"></Input>
        </FormItem>
        <FormItem label="权限名称：">
            <Input v-model.trim="formSearchAuthority.name" placeholder="输入权限名称" :clearable="true"></Input>
        </FormItem>
        <FormItem label="权限类型：">
            <Input v-model.trim="formSearchAuthority.type" placeholder="选择类型" :clearable="true"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" shape="circle" icon="ios-search" style="margin-left: -50px" @click="onFormSearchAuthority">查询</Button>
        </FormItem>
    </Form>
    <Card style="background:#E6F7FF">
        <p slot="title">
            <Icon type="unlocked"></Icon>
            &nbsp;权限管理
        </p>
        <div slot="extra" style="margin-top:-5px">
            <Tooltip content="新增" placement="top">
                <Button type="primary" shape="circle" icon="plus-round" @click="openAddAuthorityModal"></Button>
            </Tooltip>
        </div>
        <Table border :columns="columnsAuthority" :data="dataAuthority"></Table>
        <div style="margin: 10px;overflow: hidden">
	        <div style="float: right;">
	            <Page :total="100" :current="1" @on-change="changePage" show-total></Page>
	        </div>
	    </div>
    </Card>
    <Modal v-model="modalSaveAuthority" width="450" :mask-closable="false" @on-cancel="cancelModalSaveAuthority">
        <p slot="header" style="color:#1890ff;text-align:center">
            <Icon type="unlocked"></Icon>
            <span>&nbsp;{{modalSaveAuthorityTitle}}</span>
        </p>
        <Form :model="formSaveAuthority" label-position="right" :label-width="80" style="padding-left:20px;padding-right:25px;">
            <FormItem label="权限编码：">
                <Input v-model.trim="formSaveAuthority.code" placeholder="输入权限编码"></Input>
            </FormItem>
            <FormItem label="权限名称：">
                <Input v-model.trim="formSaveAuthority.name" placeholder="输入权限名称"></Input>
            </FormItem>
            <FormItem label="权限类型：">
                <Select v-model="formSaveAuthority.type" style="width:200px" placeholder="选择权限类型">
			        <Option v-for="item in AuthorityTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			    </Select>
            </FormItem>
            <FormItem label="权限事件：">
                <Input v-model="formSaveAuthority.event" type="textarea" placeholder="输入权限事件..."></Input>
            </FormItem>
            <FormItem label="是否可见：">
                <Select v-model="formSaveAuthority.see" style="width:200px" placeholder="选择是否可见">
			        <Option value="可见">可见</Option>
			        <Option value="不可见">不可见</Option>
			    </Select>
            </FormItem>
            <FormItem label="是否可用：">
                <Select v-model="formSaveAuthority.use" style="width:200px" placeholder="选择是否可用">
			        <Option value="可用">可用</Option>
			        <Option value="不可用">不可用</Option>
			    </Select>
            </FormItem>
            <FormItem label="备注：">
                <Input v-model="formSaveAuthority.remarks" type="textarea" placeholder="输入备注信息..."></Input>
            </FormItem>
        </Form>   
        <div slot="footer" style="text-align:center">
            <Button type="primary" shape="circle" icon="filing" @click="saveAuthority">保存</Button>
            <Button type="ghost" shape="circle" icon="refresh" style="margin-left: 10px" @click="resetSaveAuthorityForm">重置</Button>
        </div>
    </Modal>
    <Modal v-model="modalDeleteAuthority" width="360" :mask-closable="false">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除权限</span>
        </p>
        <div style="text-align:center">
            <p>此权限删除后，将无法恢复！</p>
            <p>是否继续删除？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="deleteAuthority">删 除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'AuthorityManage',
  methods:{
  	deleteAuthority () {
  		this.modalDeleteAuthority = false;
  	},
  	changePage () {

  	},
  	resetSaveAuthorityForm () {

  	},
  	saveAuthority () {
  		this.modalSaveAuthority = false;
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
    },
    remove (index) {
        /*this.data6.splice(index, 1);*/
        this.modalDeleteAuthority = true;
    },
  	openAddAuthorityModal () {
  		this.modalSaveAuthority = true;
  		this.modalSaveAuthorityTitle = '新增权限';
  	},
  	onFormSearchAuthority () {
  		
  	},
  },
  data () {
    return {
    	modalDeleteAuthority: false,
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
                align: 'center'
            },
            {
                title: '权限类型',
                key: 'type',
                align: 'center'
            },
            {
                title: '是否可见',
                key: 'see',
                align: 'center'
            },
            {
                title: '是否可用',
                key: 'use',
                align: 'center'
            },
            {
                title: 'Action',
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
                                type: 'error',
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
                type: '系统',
                see: '可见',
                use: '可用'
            },{
            	code: '00311',
                name: '系统管理中心',
                type: '系统',
                see: '可见',
                use: '可用'
            },{
            	code: '00311',
                name: '系统管理中心',
                type: '系统',
                see: '可见',
                use: '可用'
            },{
            	code: '00311',
                name: '系统管理中心',
                type: '系统',
                see: '可见',
                use: '可用'
            },{
            	code: '00311',
                name: '系统管理中心',
                type: '系统',
                see: '可见',
                use: '可用'
            },{
            	code: '00311',
                name: '系统管理中心',
                type: '系统',
                see: '可见',
                use: '可用'
            },{
            	code: '00311',
                name: '系统管理中心',
                type: '系统',
                see: '可见',
                use: '可用'
            },{
            	code: '00311',
                name: '系统管理中心',
                type: '系统',
                see: '可见',
                use: '可用'
            }
        ]
    }
  }
}
</script>

<style scoped>
    
</style>
