<template>
  <div id="page-header-layout">
    <Header class="header">
      <Row>
          <Col span="1">
              <div class="header-logo">
                <img src="../assets/jh.png">
              </div>
          </Col>
          <Col span="16">
              <div class="header-title">湖南省高警局数据统一接入传输平台</div>
          </Col>
          <Col span="6">
              <div class="header-nav" >
                <ul class="header-nav-ul">
                  <li>
                    <div @click="onCarQuery" style="height:57px">
                      <Icon type="model-s" color="#fff"></Icon>
                      &nbsp;
                      <span>车辆查控</span>
                    </div>
                    <div class="header-nav-sign" v-show="showSign"></div>
                  </li>
                  <li>
                    <div @click="onAdminManage" style="height:57px">
                      <Icon type="gear-a" color="#fff"></Icon>
                      &nbsp;
                      <span>系统管理</span>
                    </div>
                    <div class="header-nav-sign" v-show="!showSign"></div>
                  </li>
                </ul>
              </div>
          </Col>
          <Col span="1">
              <div class="header-portrait">
                <Dropdown @on-click="onHeaderPortrait">
                    <Avatar style="background-color: #d6e4ff;cursor:pointer;" icon="person" size="large"/>
                    <DropdownMenu slot="list" style="text-align:center" >
                        <DropdownItem name="个人信息">个人信息</DropdownItem>
                        <DropdownItem name="退出">退 出</DropdownItem>  
                    </DropdownMenu>
                </Dropdown>
              </div>
          </Col>
      </Row>    
    </Header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageHeaderLayout',
  computed: {
    ...mapGetters([
      'showSign',
    ]),
  },
  methods:{
  	onCarQuery(){
      this.$router.push({ path : '/carQuery' })
    },
    onAdminManage(){
      this.$router.push({ path : '/adminManage' })
    },
    onHeaderPortrait(name){
      if("退出"===name){
        this.$router.push({ path: '/' });
      }
    }
  }
}
</script>

<style scoped>
    .header{
    	background-image: linear-gradient(143deg,#2945cb 20%,#2b83f9 81%,#3a9dff); 
    	min-width: 1000px;
	}
	.header-logo{
	    float: left;
	    position: relative;
	    top: 6px;
	    left: 20px;
      width: 50px;
      height:64px;
	}
	.header-logo img{
	    width: 50px;
	    height:47px;
	}
	.header-title{
	    color: #fff;   
	    font-size: 24px;
	    float:left;
	    padding-left: 25px;
	}
	.header-nav{
	    font-size: 15px;
	    width: 420px;
	    float: left;
	}
	.header-portrait{
	    float: left;
	}
	.header-nav-ul li{
	    float:left;
	    width: 150px;
	    height: 64px;
	    text-align: center;
	    color: #fff;
	}
	.header-nav-ul li:hover{
	    cursor:pointer;
	}
	.header-nav-sign{
	  	margin: 0 auto;
	  	height: 7px;
	  	width: 7px;
	  	border-left: 7px solid transparent;
	  	border-right: 7px solid transparent;
	  	border-bottom: 7px solid #fff;
	}
</style>