<!-- 角色管理 -->
<template>
  <div id="role-manage">
    <!-- <Form :model="formSearchRole" label-position="right" :label-width="100" inline >
        <FormItem label="角色名称：">
            <Input v-model.trim="formSearchRole.rolename" placeholder="输入角色名" :clearable="true"></Input>
        </FormItem>
        <FormItem label="角色用户：">
            <Input v-model.trim="formSearchRole.roleUser" placeholder="输入用户名" :clearable="true"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" shape="circle" icon="ios-search" style="margin-left: -50px" @click="onFormSearchRole">查询</Button>
        </FormItem>
    </Form> -->
    <div style="margin-bottom:20px;text-align:center;">
        <!-- <Input 
            v-model="username" 
            icon="ios-search-strong" 
            placeholder="搜索用户名..." 
            style="width: 50%" 
            @on-enter="queryUsername"
            @on-click="queryUsername"></Input> -->
            <Input  
            size="large"
            icon="ios-search-strong" 
            placeholder="角色查询" 
            style="width: 25%"></Input>

    </div>
    <Card style="background:#e8e8e8">
        <p slot="title">
            <Icon type="android-contact"></Icon>
            &nbsp;角色信息
        </p>
        <div slot="extra" style="margin-top:-5px">
            <Tooltip content="新增" placement="top">
                <Button type="primary" shape="circle" icon="plus-round" @click="openAddRoleModal"></Button>
            </Tooltip>
        </div>
        <Table :stripe="true" border :columns="columnsRole" :data="dataRole"></Table>
    </Card>

    <Modal v-model="modalSaveRole" width="450" :mask-closable="false" @on-cancel="cancelModalSaveRole">
        <p slot="header" style="color:#1890ff;text-align:center">
            <Icon type="android-contact"></Icon>
            <span>&nbsp;{{modalSaveRoleTitle}}</span>
        </p>
        <Form :model="formSaveRole" label-position="right" :label-width="80" style="padding-left:20px;padding-right:25px;">
            <FormItem label="角色名称：">
                <Input v-model.trim="formSaveRole.name" placeholder="输入用户名"></Input>
            </FormItem>
            <FormItem label="角色描述：">
                <Input v-model="formSaveRole.remarks" type="textarea" placeholder="输入描述信息..."></Input>
            </FormItem>
            <FormItem label="角色权限：">
                <Poptip placement="right" width="300">
			        <Button type="success" shape="circle" icon="unlocked">{{authorityLabel}}</Button>
			        <div slot="content">
						<Tree :data="authorityList" show-checkbox></Tree>
			        </div>
			    </Poptip>
            </FormItem>
        </Form>
            
        <div slot="footer" style="text-align:center">
            <Button type="primary" shape="circle" icon="filing" @click="saveRole">保存并分配权限</Button>
            <Button type="ghost" shape="circle" icon="refresh" style="margin-left: 10px" @click="resetSaveRoleForm">重置</Button>
        </div>
    </Modal>
    <Modal v-model="modalDeleteRole" width="360" :mask-closable="false">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除角色</span>
        </p>
        <div style="text-align:center">
            <p>此角色删除后，将无法恢复！</p>
            <p>是否继续删除？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="deleteRole">删 除</Button>
        </div>
    </Modal>
    <Modal v-model="modalRoleUser" width="300" :closable="false">
        <p slot="header" style="color:#1890ff;text-align:center">
            <Icon type="person"></Icon>
            <span>角色用户</span>
        </p>
        <div style="text-align:center">
            <Table height="250" :columns="columnsRoleUser" :data="dataRoleUser" size="small" :show-header="false"></Table>
        </div>
        <div slot="footer">
            <Button type="primary" long @click="closeModalRoleUser">关 闭</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'RoleManage',
  methods:{
  	closeModalRoleUser () {
  		this.modalRoleUser = false;
  	},
  	cancelModalSaveRole () {
  		this.modalSaveRole = false;
  	},
  	saveRole () {
  		this.modalSaveRole = false;
  	},
  	resetSaveRoleForm () {
  		this.formSaveRole.name = '';
  		this.formSaveRole.remarks = '';
  		this.formSaveRole.authority = [];
  	},
  	deleteRole () {
  		this.modalDeleteRole = false;
  	},
  	openAddRoleModal () {
  		this.modalSaveRole = true;
  		this.modalSaveRoleTitle = '增加角色';
  	},
  	onFormSearchRole () {
  		//axios()
  	},
  	showRoleUser (index) {
  		this.modalRoleUser = true;
  	},
  	openEditRoleModal (index) {
        /*this.$Modal.info({
            title: 'User Info',
            content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
        })*/
        this.modalSaveRole = true;
        this.modalSaveRoleTitle = '编辑角色';
    },
    openDeleteRoleModal (index) {
        /*this.data6.splice(index, 1);*/
        this.modalDeleteRole = true;
    }
  },
  data () {
    return {
    	columnsRoleUser: [
            {
                title: '用户',
                key: 'name',
                align: 'center'
            }
        ],
        dataRoleUser: [
            {name: 'John Brown'},
            {name: 'Jim Green'},
            {name: 'Joe Black'},
            {name: 'Jon Snow'},
            {name: 'Jim Green'},
            {name: 'Joe Black'},
            {name: 'Jon Snow'},
            {name: 'Jim Green'},
            {name: 'Joe Black'},
            {name: 'Jon Snow'}
        ],
    	authorityLabel:'添加权限',
    	authorityList: [
            {
                title: 'parent 1',
                expand: true,
                checked: false,
                children: [
                    {
                        title: 'parent 1-1',
                        expand: true,
                        checked: false,
                        children: [
                            {
                                title: 'leaf 1-1-1',
                                checked: false,
                            },
                            {
                                title: 'leaf 1-1-2',
                                checked: false,
                            }
                        ]
                    },
                    {
                        title: 'parent 1-2',
                        expand: true,
                        checked: false,
                        children: [
                            {
                                title: 'leaf 1-2-1',
                                checked: false,
                            },
                            {
                                title: 'leaf 1-2-1',
                                checked: false,
                            }
                        ]
                    }
                ]
            }
        ],
        modalRoleUser: false,
    	modalSaveRole: false,
    	modalDeleteRole: false,
    	modalSaveRoleTitle: '',
    	formSaveRole: {
    		name:'',
    		remarks:'',
    		authority:[]
    	},
    	formSearchRole:{
    		rolename:'',
    		roleUser:''
    	},
    	columnsRole: [
            {
                title: '角色名称',
                key: 'name',
                align: 'center'
            },
            {
                title: '角色描述',
                key: 'age',
                align: 'center'
            },
            {
                title: '角色用户',
                key: 'user',
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
                                    this.showRoleUser(params.index)
                                }
                            }
                        }, '查看用户')
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
                                    this.openEditRoleModal(params.index)
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
                                    this.openDeleteRoleModal(params.index)
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
        ],
        dataRole: [
            {
                name: '超级管理员',
                age: 18,
            },
            {
                name: '集成平台用户',
                age: 24
            },
            {
                name: '总队用户',
                age: 30
            },
            {
                name: '支队用户',
                age: 26
            }
        ]
    }
  }
}
</script>

<style scoped>
    
</style>
