<!-- 过车数据查询 -->
<template>
  <div id="car-query">
    <Form :model="formCarQuery" label-position="right" :label-width="80" inline>
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
	            <Select v-model="formCarQuery.hpzl" clearable style="width:200px">
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
	            <CheckboxGroup v-model="formCarQuery.cdbh">
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
	            <CheckboxGroup v-model="formCarQuery.cxfx">
			        <Checkbox label="1">&nbsp;上行</Checkbox>&nbsp;
			        <Checkbox label="2">&nbsp;下行</Checkbox>&nbsp;
			    </CheckboxGroup>
	        </FormItem>
	        <FormItem>
	        	<Button type="primary" shape="circle" icon="ios-search" style="margin-left: -40px" @click="formCarQuerySubmit">查询</Button>
	            <Button type="ghost" shape="circle" style="margin-left: 4px" @click="formCarQueryReset">重置</Button>
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
  created(){
        this.tgsj=[];
        const end=new Date();
        const start=new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
        this.tgsj.push(start,end);
        /*this.$http.get('uap/kk/queryTjsTree.do')
        .then((res)=>{
            return res.json();
        }).then((res)=>{
            this.gcsjResult=res;
        }).catch((err)=>{
            console.log(error.message);
        })*/
  },
  methods:{
    /*获取卡口*/
    xzkkChecked(){
        let arr = [];
        arr = this.$refs.xzkkTree.getCheckedNodes();
        this.formCarQuery.kkisd=[];
        for( let i = 0, len=arr.length; i < len; i++) {
            if(arr[i].children===undefined){
                this.formCarQuery.kkisd.push(arr[i].value);
            }
        } 
        if(arr.length===0){
            this.xzkkLabel="选择卡口";
        }else{
            this.xzkkLabel=`已选择${this.formCarQuery.kkisd.length}个卡口`;
        } 
    },
  	/*提交表单*/
    formCarQuerySubmit(){
        this.formCarQuery.hphm=this.cpdq+this.cphm;
        this.formCarQuery.tgsj=[];
        const start=new Date(this.tgsj[0].getTime());
        const end=new Date(this.tgsj[1].getTime());
        const startDate=`${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}`;
        const endDate=`${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()} ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}`;
        this.formCarQuery.tgsj.push(startDate,endDate);
        /*this.$http.post('uap/passcar/query.do', {
            carData: this.formCarQuery
        }).then((res)=>{
            return res.json();
        }).then((res)=>{
            this.gcsjResult=res.DATA;
            this.total=res.TOTAL;
        }).catch((err)=>{
            console.log(error.message);
        })*/
        console.log(this.formCarQuery);
    },
    /*重置表单*/
    formCarQueryReset(){
        this.cpdq='全部';
        this.cphm='';
        this.tgsj=[];
        const end=new Date();
        const start=new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
        this.tgsj.push(start,end);
        this.formCarQuery.hpzl='';
        this.formCarQuery.cdbh=[];
        this.formCarQuery.cxfx=[];
        let arr = [];
        arr = this.$refs.xzkkTree.getCheckedNodes();
        for( let i = 0, len=arr.length; i < len; i++) {
            arr[i].checked=false;
            this.xzkkLabel="选择卡口";
        } 
        this.formCarQuery.pageNo=1;
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
            content: `123`
        })
    },
    /*换页*/
    dataQueryChangePage(page){
        this.formCarQuery.pageNo=page;
        /*this.$http.post('uap/passcar/query.do', {
            carData: this.formCarQuery
        }).then((res)=>{
            return res.json();
        }).then((res)=>{
            this.gcsjResult=res.DATA;
            this.total=res.TOTAL;
        }).catch((err)=>{
            console.log(error.message);
        })*/
        console.log(this.formCarQuery);
    },

  },
  data () {
    return {
        total:90,
    	formCarQuery: {
            hphm: '',//hphm
            tgsj: [],
            hpzl: '',//hpzl
            kkisd:[],//kkisd
            cdbh:[],//cdbh
            cxfx:[],
            pageNo:1,//pageNo
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
            {title: '通过时间',key: 'TGSJ',width: 170,align: 'center'},//TGSJ
            {title: '卡口名称',key: 'KKMC',width: 274,align: 'center'},//KKMC
            {title: '车牌',key: 'HPHM',width: 100,align: 'center'},//HPHM
            {title: '车辆类型',key: 'HPZL_NAME',width: 100,align: 'center'},//HPZL_NAME
            {title: '车行方向',key: 'CXFX_NAME',width: 100,align: 'center'},//CXFX_NAME
            {title: '车道号',key: 'CDBH',width: 80,align: 'center'},//CDBH
            {
            	title: '行驶速度(km/h)',
                key: 'XSSD',//XSSD
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
            {title: '车辆品牌',key: 'CLPP',width: 120,align: 'center'},//CLPP
            {title: '车身颜色',key: 'CSYS_NAME',width:100,align: 'center'},//CSYS_NAME
            {
	            title: '图片',
	            key: 'TPLJ1',//TPLJ1
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
        gcsjResult: []

    }
  }
}
</script>


