<template>
  <div id="dataQuery">
	    <Form :model="xxcxForm" label-position="right" :label-width="80" inline>
	        <FormItem label="车牌：">
	        	<Input v-model="cphm" placeholder="输入车牌号码">
			        <Select v-model="cpdq" slot="prepend" style="width: 60px">
                        <Option v-for="item in cpdqList" :value="item.value" :key="item.value">{{ item.label }}</Option>
			        </Select>
			    </Input>
	        </FormItem>
	        <FormItem label="时间段：">
	        	<DatePicker type="datetimerange" placeholder="选择时间段" style="width: 280px" v-model="tgsj"></DatePicker>
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
	        <FormItem label="车道号：" v-show="!showCondition" style="margin-right: 40px">
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
	        <FormItem label="车行方向："  v-show="!showCondition" style="margin-right: 33px">
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
	<div slot="title">
		<Row>
	        <Col span="23">
	        	<span>边框&nbsp;&nbsp;&nbsp;</span>
                <i-switch v-model="showBorder">
                    <span slot="open">开</span>
                    <span slot="close">关</span>
                </i-switch>
	        </Col>
	        <Col span="1">
	        	
	        </Col>
	    </Row>
        <br>
	</div>
    <Table :border="showBorder" stripe :columns="gcsjColumns" :data="gcsjResult" size="small"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page no-data-text show-elevator :total="total" :current="1" show-total @on-change="dataQueryChangePage" size="small"></Page>
        </div>
    </div>
    <BackTop :height="100" :bottom="10" :right="50" size="small">
        <Icon type="chevron-up" :size="10" class="top"></Icon>
    </BackTop>
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
        this.tgsj.push(start,end);
  },
  methods:{
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
        this.xxcxForm.tgsj=[];
        const start=new Date(this.tgsj[0].getTime());
        const end=new Date(this.tgsj[1].getTime());
        const startDate=`${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}`;
        const endDate=`${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()} ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`;
        this.xxcxForm.tgsj.push(startDate,endDate);
        /*this.$http.post('test', {
            carData: this.xxcxForm
        }).then((res)=>{
            return res.json();
        }).then((res)=>{
            this.gcsjResult=res.DATA;
            this.total=res.TOTAL;
        }).catch((err)=>{
            console.log(error.message);
        })*/
        console.log(this.xxcxForm);
    },
    /*重置表单*/
    xxcxFormReset(){
        this.cpdq='全部';
        this.cphm='';
        this.tgsj=[];
        const end=new Date();
        const start=new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
        this.tgsj.push(start,end);
        this.xxcxForm.cllx='';
        this.xxcxForm.cdh=[];
        this.xxcxForm.cxfx=[];
        let arr = [];
        arr = this.$refs.xzkkTree.getCheckedNodes();
        for( let i = 0, len=arr.length; i < len; i++) {
            arr[i].checked=false;
            this.xzkkLabel="选择卡口";
        } 
        this.xxcxForm.page=1;
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
    dataQueryChangePage(page){
        this.xxcxForm.page=page;
        /*this.$http.post('test', {
            carData: this.xxcxForm
        }).then((res)=>{
            return res.json();
        }).then((res)=>{
            this.gcsjResult=res.DATA;
            this.total=res.TOTAL;
        }).catch((err)=>{
            console.log(error.message);
        })*/
        console.log(this.xxcxForm);
    },

  },
  data () {
    return {
        total:90,
    	xxcxForm: {
            cp: '',
            tgsj: [],
            cllx: '',
            kkmc:[],
            cdh:[],
            cxfx:[],
            page:1,
            pageSize:10,
        },
        cpdq:'全部',
        cphm:'',
        cpdqList: [
            {value: '全部',label: '全部'},
            {value: '京',label: '京'},{value: '津',label: '津'},{value: '冀',label: '冀'},{value: '晋',label: '晋'},
            {value: '蒙',label: '蒙'},{value: '辽',label: '辽'},{value: '吉',label: '吉'},{value: '黑',label: '黑'},
            {value: '沪',label: '沪'},{value: '苏',label: '苏'},{value: '浙',label: '浙'},{value: '皖',label: '皖'},
            {value: '闽',label: '闽'},{value: '赣',label: '赣'},{value: '鲁',label: '鲁'},{value: '豫',label: '豫'},
            {value: '鄂',label: '鄂'},{value: '湘',label: '湘'},{value: '粤',label: '粤'},{value: '桂',label: '桂'},
            {value: '琼',label: '琼'},{value: '陕',label: '陕'},{value: '甘',label: '甘'},{value: '青',label: '青'},
            {value: '宁',label: '宁'},{value: '新',label: '新'},{value: '渝',label: '渝'},{value: '川',label: '川'},
            {value: '黔',label: '黔'},{value: '滇',label: '滇'},{value: '藏',label: '藏'}
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
                tp: 19,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由西向东',
                cdh: '2',
                xssd: 130,
                clpp: '奔驰',
                csys: '红',
                tp: 20,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '大型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 107,
                clpp: '福田时代',
                csys: '白',
                tp: 21,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 119,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 59,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 119,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 59,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 119,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 99,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 121,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 59,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 119,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 99,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,},{
                tgsj: '2018-01-29 11:32:00',
                kkmc: '环长沙西收费站长张高速15公里392米',
                cp: '湘A79389',
                cllx: '小型汽车',
                cxfx: '由东向西',
                cdh: '2',
                xssd: 121,
                clpp: '福田时代',
                csys: '灰',
                tp: 22,}
        ]

    }
  }
}
</script>

<style scoped>
    .top{
        padding: 10px;
        background: #2d8cf0;
        color: #fff;
        text-align: center;
        border-radius: 2px;
    }
</style>