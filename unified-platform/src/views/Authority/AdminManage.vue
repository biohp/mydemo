<!-- 用户管理 -->
<template>
  <div id="admin-manage">
    <Form label-position="right" :label-width="80" :model="formAdminManage" inline style="line-height: 33px;">
        <FormItem label="用户名：">
            <Input v-model="formAdminManage.input1" placeholder="输入用户名"></Input>
        </FormItem>
        <FormItem label="所属机构：">
            <Cascader 
            	v-model="formAdminManage.value2" 
            	:data="data" 
            	trigger="hover" 
            	filterable 
            	change-on-select
            	placeholder="选择机构"
            ></Cascader>
        </FormItem>
        <FormItem label="姓名：">
            <Input v-model="formAdminManage.input3" placeholder="输入姓名"></Input>
        </FormItem>
        <FormItem label="权限名称：">
            <Input v-model="formAdminManage.input4" placeholder="输入权限名称"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" shape="circle" icon="ios-search" >查询</Button>
	        <Button type="ghost" shape="circle" style="margin-left: 4px">重置</Button>
        </FormItem>
    </Form>
    <Row :gutter="24">
        <Col span="8">
            <Card>
                <p slot="title">
                    <Icon type="person-stalker"></Icon>
                    &nbsp;机构用户
                </p>
                
                <div slot="extra" style="margin-top:-5px">
                    <Tooltip content="新增" placement="top">
                        <Button type="text" shape="circle" icon="person-add"></Button>
                    </Tooltip>
                    <Tooltip content="删除" placement="top">
                        <Button type="text" shape="circle" icon="trash-a"></Button>
                    </Tooltip>
                </div>
                <Tree :data="data2" show-checkbox></Tree>
            </Card>
        </Col>
        <Col span="16">
            <Card>
                <p slot="title">
                    <Icon type="person"></Icon>
                    &nbsp;用户信息
                </p>
                <div slot="extra" style="margin-top:-5px">
                    <Tooltip content="编辑" placement="top">
                        <Button type="text" shape="circle" icon="edit"></Button>
                    </Tooltip>
                </div>
                <Row :gutter="50">
                    <Col span="10">
                        <Form :model="formRight" label-position="right" :label-width="100">
                            <FormItem label="Title">
                                <Input v-model="formRight.input1"></Input>
                            </FormItem>
                            <FormItem label="Title name">
                                <Input v-model="formRight.input2"></Input>
                            </FormItem>
                            <FormItem label="Aligned title">
                                <Input v-model="formRight.input3"></Input>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span="14">
                        <div>权限信息</div>
                        <br>
                        <Transfer
                            :data="data1"
                            :target-keys="targetKeys1"
                            :render-format="render1"
                            @on-change="handleChange1"></Transfer>
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'AdminManage',
  methods: {
        getMockData () {
            let mockData = [];
            for (let i = 1; i <= 20; i++) {
                mockData.push({
                    key: i.toString(),
                    label: 'Content ' + i,
                    description: 'The desc of content  ' + i,
                    disabled: Math.random() * 3 < 1
                });
            }
            return mockData;
        },
        getTargetKeys () {
            return this.getMockData()
                    .filter(() => Math.random() * 2 > 1)
                    .map(item => item.key);
        },
        render1 (item) {
            return item.label;
        },
        handleChange1 (newTargetKeys, direction, moveKeys) {
            console.log(newTargetKeys);
            console.log(direction);
            console.log(moveKeys);
            this.targetKeys1 = newTargetKeys;
        }
  },
  data () {
    return {
    	formAdminManage:{
    		input1:'',
    		value2:[],
    		input3:'',
    		input4:'',
    	},
        formRight: {
                    input1: '',
                    input2: '',
                    input3: ''
        },
        data1: this.getMockData(),
        targetKeys1: this.getTargetKeys(),
        data2: [
            {
                title: 'parent 1',
                expand: true,
                children: [
                    {
                        title: 'parent 1-1',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-1-1'
                            },
                            {
                                title: 'leaf 1-1-2'
                            }
                        ]
                    },
                    {
                        title: 'parent 1-2',
                        expand: true,
                        children: [
                            {
                                title: 'leaf 1-2-1'
                            },
                            {
                                title: 'leaf 1-2-1'
                            }
                        ]
                    }
                ]
            }
        ],
    	data: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }],
    }
  }
}
</script>

<style scoped>
    /*.body{
        line-height: 33px;
    }*/
    
</style>