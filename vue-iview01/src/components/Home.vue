<template>
  <div id="home">
    <div class="layout">
        <Layout>
            <Header class="header">
              <Row>
                  <Col span="1">
                      <div class="layout-logo">
                        <img src="../assets/jh.png">
                      </div>
                  </Col>
                  <Col span="5">
                      <div class="layout-title">个人测试</div>
                  </Col>
                  <Col span="17">
                      <div class="layout-nav">
                        <ul class="header-ul">
                          <li>
                            <Icon type="model-s" color="#fff"></Icon>
                            &nbsp;
                            <a href=" ">车辆查控</a>
                          </li>
                          <li>
                            <Icon type="gear-a" color="#fff"></Icon>
                            &nbsp;
                            <a href=" ">系统管理</a>
                          </li>
                        </ul>
                      </div>
                  </Col>
                  <Col span="1">
                      <div class="layout-portrait">
                        <Dropdown @on-click="portraitClick">
                            <Avatar style="background-color: #d6e4ff" icon="person" size="large"/>
                            <DropdownMenu slot="list" style="text-align:center" >
                                <DropdownItem name="个人信息">个人信息</DropdownItem>
                                <DropdownItem name="退出">退 出</DropdownItem>  
                            </DropdownMenu>
                        </Dropdown>
                      </div>
                  </Col>
              </Row>    
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-1" theme="primary" width="auto" :open-names="['1']" :accordion="true" @on-select="carMenuClick">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item 1
                            </template>
                            <MenuItem name="1-1">Option 1</MenuItem>
                            <MenuItem name="1-2">Option 2</MenuItem>
                            <MenuItem name="1-3">Option 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item 2
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item 3
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '520px', background: '#fff'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {

    }
  },
  methods:{
    carMenuClick(name){
        if("1-1"===name){
            this.$router.push({ path: '/o1' });
        }else if("1-2"===name){
            this.$router.push({ path: '/o2' });
        }
    },
    portraitClick(name){
        if("退出"===name){
            this.$router.push({ path: '/' });
        }
    }
  }
}
</script>

<style scoped>
.layout{
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
}
.header{
    background-image: linear-gradient(143deg,#2945cb 20%,#2b83f9 81%,#3a9dff); 
    min-width: 1000px;   
}
.layout-logo{
    float: left;
    position: relative;
    top: 6px;
    left: 20px;
}
.layout-logo img{
    width: 50px;
    height:47px;
}
.layout-title{
    color: #fff;   
    font-size: 26px;
    float:left;
    padding-left: 25px;
}
.layout-nav{
    font-size: 16px;
    width: 420px;
    float: left;
}
.layout-portrait{
    float: left;
}
.header-ul li{
    float:left;
    width: 150px;
    height: 64px;
    text-align: center;
}
.header-ul li a{
    color: #fff;
}
.header-ul li:hover{
    background-color: #1d39c4;
}
</style>