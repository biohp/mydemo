<template>
  <div id="dataQuery">
  	<Card dis-hover :bordered="false">
	    <Form :model="dataQueryform" label-position="right" :label-width="80" inline>
	        <FormItem label="车牌：">
	        	<Input v-model="dataQueryform.number" placeholder="输入车牌号码">
			        <Select v-model="carRegion" slot="prepend" style="width: 60px">
			            <Option value="全部">全部</Option>
			            <Option value="湘">湘</Option>
			        </Select>
			    </Input>
	        </FormItem>
	        <FormItem label="时间段：">
	        	<DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择时间段" style="width: 250px" v-model="dataQueryform.date"></DatePicker>
	        </FormItem>
	        <FormItem label="车辆类型：">
	            <Select v-model="dataQueryform.carType" clearable style="width:200px">
			        <Option v-for="item in carTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			    </Select>
	        </FormItem>
	        <FormItem label="选择卡口：" v-show="!showQuery">
	            <Poptip placement="left" width="400">
			        <Button type="ghost" icon="android-pin">选择卡口</Button>
			        <div slot="content">
			            <template>
						    <Tree :data="treeData" show-checkbox></Tree>
						</template>
			        </div>
			    </Poptip>
	        </FormItem>
	        <FormItem label="车道号：" v-show="!showQuery">
	            <CheckboxGroup v-model="cdhList">
			        <Checkbox label="1"></Checkbox>
			        <Checkbox label="2"></Checkbox>
			        <Checkbox label="3"></Checkbox>
			        <Checkbox label="4"></Checkbox>
			        <Checkbox label="5"></Checkbox>
			        <Checkbox label="6"></Checkbox>
			        <Checkbox label="7"></Checkbox>
			        <Checkbox label="8"></Checkbox>
			    </CheckboxGroup>
	        </FormItem>
	        <FormItem label="车行方向：" style="margin-left: 40px" v-show="!showQuery">
	            <CheckboxGroup v-model="cxfxList">
			        <Checkbox label="由西向东"></Checkbox>
			        <Checkbox label="由东向西"></Checkbox>
			        <Checkbox label="由北向南"></Checkbox>
			        <Checkbox label="由南向北"></Checkbox>
			        <Checkbox label="其他"></Checkbox>
			    </CheckboxGroup>
	        </FormItem>
	        <FormItem>
	        	<Button type="primary" shape="circle" icon="ios-search" style="margin-left: -40px">查询</Button>
	            <Button type="ghost" shape="circle" style="margin-left: 4px">重置</Button>
	            <Tooltip content="更多条件" placement="top">
		            <Button type="ghost" shape="circle" icon="ios-arrow-down" style="margin-left: 4px" @click="openCondition" v-show="showQuery"></Button>
		        </Tooltip> 
		        <Tooltip content="收起" placement="top">
		            <Button type="primary" shape="circle" icon="ios-arrow-up" style="margin-left: 4px" @click="closeCondition" v-show="!showQuery"></Button>
		        </Tooltip>
	        </FormItem>
	    </Form>
    </Card>
    
    <Card :bordered="false">
    	<div slot="title">
    		<Row>
		        <Col span="21">
		        	<p>过车数据</p> 
		        </Col>
		        <Col span="3">
		        	显示边框 <i-switch v-model="showBorder"></i-switch>
		        </Col>
		    </Row>
    	</div>
        <Table :border="showBorder" stripe :columns="dataQueryCol" :data="dataQueryResult"></Table>
        <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page show-elevator :total="100" :current="1" show-total  @on-change="changePage" ></Page>
        </div>

    </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'dataQuery',
  methods:{
  	show (index) {
        this.$Modal.confirm({
            title: '车辆信息',
            content: `通过时间：${this.dataQueryResult[index].tgsj}<br>卡口名称：${this.dataQueryResult[index].kkmc}<br>车牌：${this.dataQueryResult[index].cp}<br>车辆类型：${this.dataQueryResult[index].cllx}<br>车行方向：${this.dataQueryResult[index].cxfx}<br>车道号：${this.dataQueryResult[index].cdh}<br>行驶速度：${this.dataQueryResult[index].xssd}<br>车辆品牌：${this.dataQueryResult[index].clpp}<br>车身颜色：${this.dataQueryResult[index].csys}<br>图片：${this.dataQueryResult[index].tp}`
        })
    },
    changePage(){

    },
    openCondition(){
    	this.showQuery=false;
    },
    closeCondition(){
    	this.showQuery=true;
    }
  },
  data () {
    return {
    	dataQueryform: {
            number: '',
            date: '',
            carType: ''
        },
        carRegion:'全部',
        carTypeList: [
	        {
	            value: '小型汽车',
	            label: '小型汽车'
	        },
	        {
	            value: '大型汽车',
	            label: '大型汽车'
	        },
	    ],
	    showBorder: false,
	    cdhList:[],
	    cxfxList:[],
	    showQuery:true,
	    treeData: [
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
	    dataQueryCol: [
            {title: '通过时间',key: 'tgsj',width: 170,align: 'center'},
            {title: '卡口名称',key: 'kkmc',width: 274,align: 'center'},
            {title: '车牌',key: 'cp',width: 100,align: 'center'},
            {title: '车辆类型',key: 'cllx',width: 100,align: 'center'},
            {title: '车行方向',key: 'cxfx',width: 100,align: 'center'},
            {title: '车道号',key: 'cdh',width: 80,align: 'center'},
            {
            	title: '行驶速度(km/h)',
                key: 'xssd',
                width: 150,
                align: 'center',
                render: (h, params) => {
                    const row = params.row;
                    const color = row.xssd > 120 ? 'red' : row.xssd < 60 ? 'blue' : 'green';
                    const text = row.xssd;
                    return h('Tag', {
                        props: {
                            type: 'dot',
                            color: color
                        }
                    }, text);
                }
            },
            {title: '车辆品牌',key: 'clpp',width: 120,align: 'center'},
            {title: '车身颜色',key: 'csys',width:100,align: 'center'},
            {
	            title: '图片',
	            key: 'tp',
	            align: 'center',
	            render: (h, params) => {
	                return h('div', [
	                    h('Button', {
	                        props: {
	                            type: 'primary',
	                            size: 'small',
	                            shape:'circle',
	                            icon:'image'
	                        },
	                        on: {
	                            click: () => {
	                                this.show(params.index);
	                            }
	                        }
	                    })
	                ]);
	            }
	        }
        ],
        dataQueryResult: [
            {
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '大型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 96,
                clpp: '福田时代',
                csys: '黑',
                tp: 19,
            },
            {
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由西向东',
                cdh: '2',
                xssd: 130,
                clpp: '奔驰',
                csys: '红',
                tp: 20,
            },
            {
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '大型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 107,
                clpp: '福田时代',
                csys: '白',
                tp: 21,
            },
            {
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 119,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,
            },
            {
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 59,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,
            },
            {
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 121,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,
            }
        ]

    }
  }
}
</script>

<style scoped>
    
</style>