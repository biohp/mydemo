<!-- 人员管理 -->
<template>
  <div id="employee-manage">
    <Form :model="formSearchEmployee" label-position="right" :label-width="100" inline >
        <FormItem label="角色名称：">
            <Input v-model.trim="formSearchEmployee.name" placeholder="输入角色名" :clearable="true"></Input>
        </FormItem>
        <FormItem label="角色用户：">
            <Input v-model.trim="formSearchEmployee.user" placeholder="输入用户名" :clearable="true"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" shape="circle" icon="ios-search" style="margin-left: -50px" @click="onformSearchEmployee">查询</Button>
        </FormItem>
    </Form>
    <Card style="background:#e8e8e8">
        <p slot="title">
            <Icon type="person"></Icon>
            &nbsp;机构人员
        </p>
        <div slot="extra" style="margin-top:-5px">
            <Tooltip content="新增" placement="top">
                <Button type="primary" shape="circle" icon="plus-round" @click="openAddEmployeeModal"></Button>
            </Tooltip>
        </div>
        <Table :stripe="true" border :columns="columnsEmployee" :data="dataEmployee"></Table>
        <div style="margin: 10px;overflow: hidden;padding-bottom:2px;">
	        <div style="float: right;">
	            <Page :total="100" :current="1" @on-change="changePage" show-total show-elevator></Page>
	        </div>
	    </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'EmployeeManage',
  methods: {
  	onformSearchEmployee () {},
  	openAddEmployeeModal () {},
  	changePage () {}
  },
  data () {
    return {
    	formSearchEmployee: {
    		name: '',
    		user: ''
    	},
    	columnsEmployee: [
            {
                title: '姓名',
                key: 'name',
                align: 'center'
            },
            {
                title: '现任职务',
                key: 'post',
                align: 'center'
            },
            {
                title: '手台',
                key: 'hand',
                align: 'center'
            },
            {
                title: '手机',
                key: 'mobileTel',
                align: 'center'
            },
            {
                title: '警号',
                key: 'alarm',
                align: 'center'
            },
            {
                title: '性别',
                key: 'sex',
                align: 'center'
            },
            {
                title: '所属机构',
                key: 'dept',
                align: 'center'
            },
            {
                title: '办公电话',
                key: 'officeTel',
                align: 'center'
            },
            {
                title: '手台呼号',
                key: 'handTel',
                align: 'center'
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
        dataEmployee: [
            {
            	name: '李建',
                post: '',
				hand: '',
				mobileTel: '18175693004',
				alarm: '170339',
				sex: '男',
				dept: '岳阳支队',
				officeTel: '',
				handTel: ''
            },{
            	name: '李建',
                post: '',
				hand: '',
				mobileTel: '18175693004',
				alarm: '170339',
				sex: '男',
				dept: '岳阳支队',
				officeTel: '',
				handTel: ''
            },{
            	name: '李建',
                post: '',
				hand: '',
				mobileTel: '18175693004',
				alarm: '170339',
				sex: '男',
				dept: '岳阳支队',
				officeTel: '',
				handTel: ''
            },{
            	name: '李建',
                post: '',
				hand: '',
				mobileTel: '18175693004',
				alarm: '170339',
				sex: '男',
				dept: '岳阳支队',
				officeTel: '',
				handTel: ''
            },{
            	name: '李建',
                post: '',
				hand: '',
				mobileTel: '18175693004',
				alarm: '170339',
				sex: '男',
				dept: '岳阳支队',
				officeTel: '',
				handTel: ''
            },{
            	name: '李建',
                post: '',
				hand: '',
				mobileTel: '18175693004',
				alarm: '170339',
				sex: '男',
				dept: '岳阳支队',
				officeTel: '',
				handTel: ''
            }
        ]
    }
  }
}
</script>

<style scoped>
    
</style>