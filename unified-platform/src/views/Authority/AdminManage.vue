<!-- 用户管理 -->
<template>
  <div id="admin-manage">
    <Card>
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
    </Card>
    <Row :gutter="24">
        <Col span="8">
            <Card>
                <p slot="title">The standard card</p>
                <p>Content of card</p>
                <p>Content of card</p>
                <p>Content of card</p>
            </Card>
        </Col>
        <Col span="16">
            <Card>
                <p slot="title">The standard card</p>
                <p>Content of card</p>
                <p>Content of card</p>
                <p>Content of card</p>
            </Card>
        </Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'AdminManage',
  data () {
    return {
    	formAdminManage:{
    		input1:'',
    		value2:[],
    		input3:'',
    		input4:'',
    	},
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