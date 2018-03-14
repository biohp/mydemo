<!-- 机构管理 -->
<template>
  <div id="department-manage">
    <Row :gutter="24">
        <Col span="7">
            <Card style="background:#E6F7FF">
                <p slot="title">
                    <Icon type="person-stalker"></Icon>
                    &nbsp;机构管理
                </p>
                <div slot="extra" style="margin-top:-5px">
                    <Tooltip content="新增" placement="top">
                        <Button type="primary" shape="circle" icon="person-add" @click="openModalAddDept"></Button>
                    </Tooltip>
                    <Tooltip content="编辑" placement="top">
                        <Button type="primary" shape="circle" icon="edit" @click="openModalEditDept"></Button>
                    </Tooltip>
                    <Tooltip content="删除" placement="top">
                        <Button type="primary" shape="circle" icon="trash-a" @click="openModalDeleteDept"></Button>
                    </Tooltip>
                </div>
                <Tree :data="deptList" @on-select-change="selectDept"></Tree>
            </Card>
        </Col>
        <Col span="17">
            <Card style="background:#E6F7FF">
                <Tabs>
			        <TabPane label="机构信息" icon="briefcase">
			        	<Form label-position="right" inline :label-width="90" style="padding-left:20px;padding-right:25px;">
			        		<FormItem v-for="(item,key) in deptInfo" :label="item.label" :key="key">
				            	<p style="width:100px;color:#1890ff">{{item.value}}</p>
				            </FormItem>
				        </Form>
			        </TabPane>
			        <TabPane label="所属人员" icon="person-stalker">
			        	<Table border :columns="columnsDept" :data="dataDept" :stripe="true" size="small"></Table>
			        	<div style="margin: 10px;overflow: hidden;padding-bottom:2px;">
						    <div style="float: right;">
						        <Page :total="100" :current="1" @on-change="changePage" show-elevator show-total></Page>
						    </div>
						</div>
			        </TabPane>
			    </Tabs>
            </Card>
        </Col>
    </Row>
    <Modal v-model="modalSaveDept" width="900" :mask-closable="false" @on-cancel="cancelModalSaveDept">
        <p slot="header" style="color:#1890ff;text-align:center">
            <Icon type="person"></Icon>
            <span>&nbsp;{{modalSaveDeptTitle}}</span>
        </p>
        <Form :model="formSaveDept" label-position="right" inline :label-width="90" style="padding-left:20px;padding-right:25px;">
            <FormItem label="机构编码：">
                <Input v-model.trim="formSaveDept.code" placeholder="输入机构编码"></Input>
            </FormItem>
            <FormItem label="机构名称：">
                <Input v-model.trim="formSaveDept.name" placeholder="输入机构名称"></Input>
            </FormItem>
            <FormItem label="行政级别：">
                <Select v-model="formSaveDept.level" style="width:160px" placeholder="选择是否可见">
			        <Option value="可见">可见</Option>
			        <Option value="不可见">不可见</Option>
			    </Select>
            </FormItem>
            <FormItem label="机构职能：">
                <Input v-model.trim="formSaveDept.function" placeholder="输入机构职能"></Input>
            </FormItem>
            <FormItem label="业务描述：">
                <Input v-model.trim="formSaveDept.business" placeholder="输入业务描述"></Input>
            </FormItem>
            <FormItem label="上级机构：">
                <Input v-model.trim="formSaveDept.father" placeholder="输入上级机构"></Input>
            </FormItem>
            <FormItem label="机构类型：">
                <Select v-model="formSaveDept.type" style="width:160px" placeholder="选择是否可见">
			        <Option value="可见">可见</Option>
			        <Option value="不可见">不可见</Option>
			    </Select>
            </FormItem>
            <FormItem label="所处地址：">
                <Input v-model.trim="formSaveDept.address" placeholder="输入所处地址"></Input>
            </FormItem>
            <FormItem label="邮政编码：">
                <Input v-model.trim="formSaveDept.zip" placeholder="输入邮政编码"></Input>
            </FormItem>
            <FormItem label="编制人数：">
                <Input v-model.trim="formSaveDept.policeNum" placeholder="输入编制人数"></Input>
            </FormItem>
            <FormItem label="在编民警：">
                <Input v-model.trim="formSaveDept.police" placeholder="输入在编民警"></Input>
            </FormItem>
            <FormItem label="在编职工：">
                <Input v-model.trim="formSaveDept.worker" placeholder="输入在编职工"></Input>
            </FormItem>
            <FormItem label="其他人数：">
                <Input v-model.trim="formSaveDept.otherNum" placeholder="输入其他人数"></Input>
            </FormItem>
            <FormItem label="负责人：">
                <Input v-model.trim="formSaveDept.head" placeholder="输入负责人"></Input>
            </FormItem>
            <FormItem label="负责人电话：">
                <Input v-model.trim="formSaveDept.headTel" placeholder="输入负责人电话"></Input>
            </FormItem>
            <FormItem label="负责人手机：">
                <Input v-model.trim="formSaveDept.headPhone" placeholder="输入负责人手机"></Input>
            </FormItem>
            <FormItem label="值班电话1：">
                <Input v-model.trim="formSaveDept.watchTel1" placeholder="输入值班电话1"></Input>
            </FormItem>
            <FormItem label="值班电话2：">
                <Input v-model.trim="formSaveDept.watchTel2" placeholder="输入值班电话2"></Input>
            </FormItem>
            <FormItem label="值班电话3：">
                <Input v-model.trim="formSaveDept.watchTel3" placeholder="输入值班电话3"></Input>
            </FormItem>
            <FormItem label="传真：">
                <Input v-model.trim="formSaveDept.fax" placeholder="输入传真"></Input>
            </FormItem>
        </Form>
            
        <div slot="footer" style="text-align:center">
            <Button type="primary" shape="circle" icon="filing" @click="saveDept">保存</Button>
            <Button type="ghost" shape="circle" icon="refresh" style="margin-left: 10px" @click="resetSaveDeptForm">重置</Button>
        </div>
    </Modal>
    <Modal v-model="modalDeleteDept" width="360" :mask-closable="false">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>删除机构</span>
        </p>
        <div style="text-align:center">
            <p>此机构删除后，将无法恢复！</p>
            <p>是否继续删除？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="deleteDept">删 除</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'DepartmentManage',
  methods:{
  	openModalAddDept () {
  		this.modalSaveDept = true;
  		this.modalSaveDeptTitle = '新增机构';
  	},
  	openModalEditDept () {
  		this.modalSaveDept = true;
  		this.modalSaveDeptTitle = '编辑机构';
  	},
  	openModalDeleteDept () {
  		this.modalDeleteDept = true;
  	},
  	selectDept () {
  		this.modalDeleteDept = false;
  	},
  	changePage () {},
  	cancelModalSaveDept () {
  		this.modalSaveDept = false;
  	},
  	saveDept () {
  		this.modalSaveDept = false;
  	},
  	resetSaveDeptForm () {},
  	deleteDept () {}
  },
  data () {
    return {
    	deptInfo: [
    		{ label: '机构编码：',value: '435100000010',element: 'code'},
    		{ label: '机构名称：',value: '长沙支队',element: 'name'},
    		{ label: '行政级别：',value: '',element: 'level'},
    		{ label: '机构职能：',value: '',element: 'function'},
    		{ label: '业务描述：',value: '',element: 'business'},
    		{ label: '上级机构：',value: '',element: 'father'},
    		{ label: '机构类型：',value: '支队',element: 'type'},
    		{ label: '所处地址：',value: '',element: 'address'},
    		{ label: '邮政编码：',value: '',element: 'zip'},
    		{ label: '编制人数：',value: '',element: 'policeNum'},
    		{ label: '在编民警：',value: '',element: 'police'},
    		{ label: '在编职工：',value: '',element: 'worker'},
    		{ label: '其他人数：',value: '',element: 'otherNum'},
    		{ label: '负责人：',value: '',element: 'head'},
    		{ label: '负责人电话：',value: '',element: 'headTel'},
    		{ label: '负责人手机：',value: '',element: 'headPhone'},
    		{ label: '值班电话1：',value: '212',element: 'watchTel1'},
    		{ label: '值班电话2：',value: '',element: 'watchTel2'},
    		{ label: '值班电话3：',value: '',element: 'watchTel3'},
    		{ label: '传真：',value: '',element: 'fax'},
    	],
    	formSaveDept: {
    		code: '',
			name: '',
			level: '',
			function: '',
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
    	modalSaveDeptTitle: '',
    	modalDeleteDept: false,
    	modalSaveDept: false,
    	deptList: [
            {
                title: '湖南省高速公路交通警察局',
                expand: true,
                children: [
                    {
                        title: '长沙支队',
                        expand: true,
                        children: [
                            {
                                title: '星沙支队'
                            },
                            {
                                title: '浏阳支队'
                            }
                        ]
                    },
                    {
                        title: '株洲支队',
                        expand: true,
                        children: [
                            {
                                title: '天元支队'
                            },
                            {
                                title: '荷塘支队'
                            }
                        ]
                    }
                ]
            }
        ],
    	columnsDept: [
            {
                title: '姓名',
                key: 'name',
                align: 'center'
            },
            {
                title: '警号',
                key: 'number',
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
                title: '现任职务',
                key: 'post',
                align: 'center'
            }
        ],
        dataDept: [
            {
                name: '李建',
                number: 170339,
                sex: '',
                dept: '岳阳支队',
                post: ''
            },{
                name: '李建',
                number: 170339,
                sex: '',
                dept: '岳阳支队',
                post: ''
            },{
                name: '李建',
                number: 170339,
                sex: '',
                dept: '岳阳支队',
                post: ''
            },{
                name: '李建',
                number: 170339,
                sex: '',
                dept: '岳阳支队',
                post: ''
            },{
                name: '李建',
                number: 170339,
                sex: '',
                dept: '岳阳支队',
                post: ''
            }
        ]

    }
  }
}
</script>

<style scoped>
    
</style>