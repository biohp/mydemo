<template>
  <div id="dataQuery">
  	<Card dis-hover :bordered="false">
	    <Form :model="xxcxForm" label-position="right" :label-width="80" inline>
	        <FormItem label="车牌：">
	        	<Input v-model="cphm" placeholder="输入车牌号码">
			        <Select v-model="cpdq" slot="prepend" style="width: 60px">
                        <Option v-for="item in cpdqList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			        </Select>
			    </Input>
	        </FormItem>
	        <FormItem label="时间段：">
	        	<DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择时间段" style="width: 250px" v-model="tgsj" @on-change="getTgsj"></DatePicker>
	        </FormItem>
	        <FormItem label="车辆类型：">
	            <Select v-model="xxcxForm.cllx" clearable style="width:200px">
			        <Option v-for="item in cllxList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			    </Select>
	        </FormItem>
	        <FormItem label="选择卡口：" v-show="!showCondition">
	            <Poptip placement="left" width="400">
			        <Button type="ghost" shape="circle" icon="android-pin">{{xzkkLabel}}</Button>
			        <div slot="content">
						<Tree ref="xzkkTree" :data="xzkkTree" multiple show-checkbox @on-check-change="xzkkChecked"></Tree>
			        </div>
			    </Poptip>
	        </FormItem>
	        <FormItem label="车道号：" v-show="!showCondition" style="margin-right: 35px">
	            <CheckboxGroup v-model="xxcxForm.cdh">
			        <Checkbox label="1">&nbsp;1</Checkbox>&nbsp;
			        <Checkbox label="2">&nbsp;2</Checkbox>&nbsp;
			        <Checkbox label="3">&nbsp;3</Checkbox>&nbsp;
			        <Checkbox label="4">&nbsp;4</Checkbox>&nbsp;
			        <Checkbox label="5">&nbsp;5</Checkbox>&nbsp;
			        <Checkbox label="6">&nbsp;6</Checkbox>&nbsp;
			        <Checkbox label="7">&nbsp;7</Checkbox>&nbsp;
			        <Checkbox label="8">&nbsp;8</Checkbox>&nbsp;
			    </CheckboxGroup>
	        </FormItem>
	        <FormItem label="车行方向："  v-show="!showCondition">
	            <CheckboxGroup v-model="xxcxForm.cxfx">
			        <Checkbox label="1">由西向东</Checkbox>
			        <Checkbox label="2">由东向西</Checkbox>
			        <Checkbox label="3">由北向南</Checkbox>
			        <Checkbox label="4">由南向北</Checkbox>
			        <Checkbox label="5">其他</Checkbox>
			    </CheckboxGroup>
	        </FormItem>
	        <FormItem>
	        	<Button type="primary" shape="circle" icon="ios-search" style="margin-left: -40px" @click="xxcxFormSubmit">查询</Button>
	            <Button type="ghost" shape="circle" style="margin-left: 4px" @click="xxcxFormReset">重置</Button>
	            <Tooltip content="更多条件" placement="top">
		            <Button type="ghost" shape="circle" icon="ios-arrow-down" style="margin-left: 4px" @click="openCondition" v-show="showCondition"></Button>
		        </Tooltip> 
		        <Tooltip content="收起" placement="top">
		            <Button type="primary" shape="circle" icon="ios-arrow-up" style="margin-left: 4px" @click="closeCondition" v-show="!showCondition"></Button>
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
        <Table :border="showBorder" stripe :columns="gcsjColumns" :data="gcsjResult"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page show-elevator :total="100" :current="1" show-total  @on-change="dataQueryChangePage" ></Page>
            </div>
        </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'dataQuery',
  mounted(){
        this.tgsj=[];
        const end=new Date();
        const start=new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
        const startDate=`${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()} ${start.getHours()}:${start.getMinutes()}`;
        const endDate=`${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()} ${end.getHours()}:${end.getMinutes()}`;
        this.tgsj.push(startDate,endDate);
  },
  methods:{
    /*获取时间*/
    getTgsj(datetimerange){
        this.tgsj=datetimerange;
    },
    /*获取卡口*/
    xzkkChecked(){
        let arr = [];
        arr = this.$refs.xzkkTree.getCheckedNodes();
        this.xxcxForm.kkmc=[];
        for( let i = 0, len=arr.length; i < len; i++) {
            if(arr[i].children===undefined){
                this.xxcxForm.kkmc.push(arr[i].value);
            }
        } 
        if(arr.length===0){
            this.xzkkLabel="选择卡口";
        }else{
            this.xzkkLabel=`已选择${this.xxcxForm.kkmc.length}个卡口`;
        } 
    },
  	/*提交表单*/
    xxcxFormSubmit(){
        this.xxcxForm.cp=this.cpdq+this.cphm;
        this.xxcxForm.tgsj=this.tgsj;
    },
    /*重置表单*/
    xxcxFormReset(){
        this.cpdq='全部';
        this.cphm='';
        this.tgsj=[];
        const end=new Date();
        const start=new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
        const startDate=`${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()} ${start.getHours()}:${start.getMinutes()}`;
        const endDate=`${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()} ${end.getHours()}:${end.getMinutes()}`;
        this.tgsj.push(startDate,endDate);
        this.xxcxForm.cllx='';
        this.xxcxForm.cdh=[];
        this.xxcxForm.cxfx=[];
        let arr = [];
        arr = this.$refs.xzkkTree.getCheckedNodes();
        for( let i = 0, len=arr.length; i < len; i++) {
            arr[i].checked=false;
            this.xzkkLabel="选择卡口";
        } 
    },
    /*展开更多条件*/
    openCondition(){
        this.showCondition=false;
    },
    /*收起更多条件*/
    closeCondition(){
        this.showCondition=true;
    },
    /*记录详情*/
    show (index) {
        this.$Modal.confirm({
            title: '车辆信息',
            content: `通过时间：${this.dataQueryResult[index].tgsj}<br>卡口名称：${this.dataQueryResult[index].kkmc}<br>车牌：${this.dataQueryResult[index].cp}<br>车辆类型：${this.dataQueryResult[index].cllx}<br>车行方向：${this.dataQueryResult[index].cxfx}<br>车道号：${this.dataQueryResult[index].cdh}<br>行驶速度：${this.dataQueryResult[index].xssd}<br>车辆品牌：${this.dataQueryResult[index].clpp}<br>车身颜色：${this.dataQueryResult[index].csys}<br>图片：${this.dataQueryResult[index].tp}`
        })
    },
    /*换页*/
    dataQueryChangePage(){

    },

  },
  data () {
    return {
    	xxcxForm: {
            cp: '',
            tgsj: [],
            cllx: '',
            kkmc:[],
            cdh:[],
            cxfx:[],
        },
        cpdq:'全部',
        cphm:'',
        cpdqList: [
            {
                value: '全部',
                label: '全部'
            },
            {
                value: '湘',
                label: '湘'
            },
        ],
        tgsj:[],
        cllxList: [
	        {
	            value: '1',
	            label: '小型汽车'
	        },
	        {
	            value: '2',
	            label: '大型汽车'
	        },
	    ],
        xzkkLabel:'选择卡口',
	    xzkkTree: [
            {
                title: 'parent 1',
                value:'一级',
                children: [
                    {
                        title: 'parent 1-1',
                        value:'二级1',
                        children: [
                            {
                                title: 'leaf 1-1-1',
                                value:'三级1',
                            },
                            {
                                title: 'leaf 1-1-2',
                                value:'三级2',
                            }
                        ]
                    },
                    {
                        title: 'parent 1-2',
                        value:'二级2',
                        children: [
                            {
                                title: 'leaf 1-2-1',
                                value:'三级3',
                            },
                            {
                                title: 'leaf 1-2-1',
                                value:'三级4',
                            }
                        ]
                    }
                ]
            }
        ],
        showBorder: false,
        showCondition:true,
	    gcsjColumns: [
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
        gcsjResult: [
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
            }
        ]

    }
  }
}
</script>

<style scoped>
    
</style>