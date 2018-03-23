<!-- 角色管理 -->
<template>
  <div id="role-manage">
    <div class="input-first">
        <Row type="flex" justify="center">
            <Col span="7">
                <Input 
                    v-model.trim="input"
                    size="large" 
                    placeholder="角色查询" 
                    @on-enter="queryRole">
                    <Button slot="append" icon="android-search" @click="queryRole"></Button>
                </Input> 
            </Col>
        </Row>      
    </div>
    <Card class="card-box">
        <p slot="title">
            <Icon type="android-contact"></Icon>
            &nbsp;角色信息
        </p>
        <div slot="extra" class="card-box-extra">
            <Tooltip content="新增" placement="top">
                <Button type="primary" shape="circle" icon="plus-round" @click="modalAdd"></Button>
            </Tooltip>
        </div>
        <Table :stripe="true" border :columns="columnsRole" :data="dataRole"></Table>
        <div class="card-box-page" v-if="dataRole.length===0?false:true">
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
            <Icon type="android-contact"></Icon>
            <span>&nbsp;{{modal.title}}</span>
        </p>
        <div class="modal-content">
            <Form ref="formRole" :model="formRole" :rules="ruleRole" label-position="right" :label-width="100">
                <FormItem label="角色名称：" prop="name">
                    <Input v-model.trim="formRole.name" placeholder="输入角色名"></Input>
                </FormItem>
                <FormItem label="角色描述：">
                    <Input v-model="formRole.remarks" type="textarea" placeholder="输入描述信息..."></Input>
                </FormItem>
                <FormItem label="角色权限：">
                    <Poptip placement="right" width="300">
                        <Button type="success" shape="circle" icon="unlocked">{{authority.label}}</Button>
                        <div slot="content">
                            <Tree :data="authority.list" show-checkbox></Tree>
                        </div>
                    </Poptip>
                </FormItem>
            </Form> 
        </div> 
        <div slot="footer" style="text-align:center">
            <Button type="primary" shape="circle" icon="filing" @click="saveRole">保存并分配权限</Button>
            <Button type="ghost" shape="circle" icon="refresh" style="margin-left: 10px" @click="resetForm">重置</Button>
        </div>
    </Modal>
    <Modal v-model="modal.visible.del" width="360" :mask-closable="false">
        <p slot="header" class="modal-header-error">
            <Icon type="information-circled"></Icon>
            <span>&nbsp;{{modal.title}}</span>
        </p>
        <div style="text-align:center">
            <p>此角色删除后，将无法恢复！</p>
            <p>是否继续删除？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="delRole">删 除</Button>
        </div>
    </Modal>
    <Modal v-model="modal.visible.show" width="300" :closable="false">
        <p slot="header" class="modal-header-info">
            <Icon type="person"></Icon>
            <span>&nbsp;{{modal.title}}</span>
        </p>
        <div style="text-align:center">
            <Table height="250" :columns="columnsUser" :data="dataUser" size="small" :show-header="false"></Table>
        </div>
        <div slot="footer">
            <Button type="primary" long @click="modalCloseShow">关 闭</Button>
        </div>
    </Modal>

  </div>
</template>

<script>
import { authorityTree } from '../../utils/tree.js'
export default {
  name: 'RoleManage',
  data () {
    return {
        form: {
            name: 'formRole'
        },
        input: '',
        index: -1,
        columnsRole: [
            {
                title: '角色名称',
                key: 'name',
                align: 'center',
                sortable: true
            },
            {
                title: '角色描述',
                key: 'remarks',
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
                                    this.modalShow(params.index)
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
        dataRole: [
            {
                name: '超级管理员',
                remarks: 18,
            },
            {
                name: '集成平台用户',
                remarks: 24
            },
            {
                name: '总队用户',
                remarks: 30
            },
            {
                name: '支队用户',
                remarks: 26
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
        formRole: {
            name: '',
            remarks: '',
            authority: []
        },
        ruleRole: {
            name: [
                { required: true, message: '角色名不能为空', trigger: 'blur' }
            ]
        },
        authority: {
            label: '添加权限',
            list: [{
                title: '用户管理',
                children: [
                    {
                        title: '新增按钮',
                        value: '002'
                    },{
                        title: '删除按钮',
                        value: '003'  
                    },{
                        title: '编辑按钮',
                        value: '004'
                    } 
                ]
            },{
                title: '权限管理',
                children: [
                    {
                        title: '新增按钮',
                        value: '006',
                        checked: true
                    },{
                        title: '删除按钮',
                        value: '007'  
                    },{
                        title: '编辑按钮',
                        value: '008'
                    } 
                ]
            }]
        },
        columnsUser: [
            {
                title: '用户',
                key: 'name',
                align: 'center'
            }
        ],
        dataUser: [
            {name: '彭万里'},
            {name: '高大山'},
            {name: '谢大海'},
            {name: '马宏宇'},
            {name: '林莽'},
            {name: '黄强辉'},
            {name: '章汉夫'},
            {name: '范长江'},
            {name: '林君雄'},
            {name: '谭平山'}
        ],
    }
  },
  created() {
    //axios
    this.page.total = this.dataRole.length;  
  },
  methods: {
    utilReset() {
        this.formRole = {
            name: '',
            remarks: '',
            authority: []
        }
        this.authority.label = '选择权限';
        this.authority.list = authorityTree(this.authority.list, []);
    },
    utilEdit(index, arr) {
        this.formRole = {
            name: this.dataRole[index].name,
            remarks: this.dataRole[index].remarks,
            authority: arr
        }
        this.authority.list = authorityTree(this.authority.list, arr);
    },
    queryRole() {
        //axios
    },
    modalAdd() {
        this.$refs[this.form.name].resetFields();
        this.utilReset();
        this.modal.title = '新增角色';
        this.modal.visible.save = true;
    },
    pageChange(val) {
        this.page.current = val;
        //axios
    },
    modalCloseSave() {
        this.modal.visible.save = false;
        this.$Message.warning('本次修改已撤销！');
    },
    saveRole() {
        this.$refs[this.form.name].validate((valid) => {
            if (valid) {
                this.$Message.success('保存成功！');
                this.modal.visible.save = false;
            } else {
                this.$Message.error('提交失败！');
            }
        })
        //axios
    },
    resetForm() {
        this.$refs[this.form.name].resetFields();
        this.utilReset();
    },
    delRole() {
        //axios(index)
        this.modal.visible.del = false;
        this.$Message.success('删除成功！');
    },
    modalCloseShow() {
        this.modal.visible.show = false;
    },
    modalShow(index) {
        this.modal.title = '角色用户';
        //axios
        this.modal.visible.show = true;
    },
    modalEdit(index) {
        this.$refs[this.form.name].resetFields();
        this.modal.title = '编辑角色';
        //axios
        let check = ['002','003','006','007'];
        this.utilEdit(index, check);
        this.modal.visible.save = true;
    },
    modalDel(index) {
        this.modal.title = '删除角色';
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
