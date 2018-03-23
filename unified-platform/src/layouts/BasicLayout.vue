<template>
  <div id="basic-layout">
    <div class="layout">
        <Layout>
            <Header class="header">
              <Row>
                  <Col span="1">
                      <div class="header-logo">
                        <img src="../assets/jh.png">
                      </div>
                  </Col>
                  <Col span="16">
                      <div class="header-title">
                          <div class="header-title-top">湖南省高速公路交通警察局</div>
                          <div class="header-title-bottom">过车数据统一接入传输平台</div>
                      </div>
                  </Col>
                  <Col span="6">
                      <div class="header-nav" >
                        <ul class="header-nav-ul">
                          <li v-for="(item,key) in headerNavList" :key="key">
                            <div @click="onHeaderNav(item)" style="height:57px">
                              <Icon :type="item.icon" color="#fff"></Icon>
                              &nbsp;
                              <span>{{item.value}}</span>
                            </div>
                            <div class="header-nav-sign" v-show="showSign===item.name?true:false"></div>
                          </li>
                        </ul>
                      </div>
                  </Col>
                  <Col span="1">
                      <div class="header-portrait">
                        <Dropdown @on-click="onHeaderPortrait">
                            <Avatar style="background-color: #d6e4ff;cursor:pointer;" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1479054987,566479454&fm=27&gp=0.jpg" size="large"/>
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
                <Sider hide-trigger class="layout-sider">
                    <Menu theme="primary" width="auto" :active-name="active" :open-names="[open]" :accordion="true" @on-select="onSiderMenu">
                        <Submenu :name="item.name" v-for="(item,key) in submenuList" :key="key" >
					        <template slot="title">
					            <Icon :type="item.icon"></Icon>
					            {{item.value}}
					        </template>
					        <MenuItem :name="child.name" v-for="(child,key) in item.children" :key="key" >&nbsp;{{ child.value }}</MenuItem>
					    </Submenu>
                    </Menu>
                </Sider>
                <Layout class="layout-layout">
                    <Breadcrumb class="layout-bread">
                        <BreadcrumbItem v-for="(item,key) in breadcrumbList.breadcrumbList" :key="key">{{item.value}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content class="layout-content">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import path from '../utils/path.js'
export default {
  name: 'BasicLayout',
  created(){
    this.$store.dispatch('initMenu', { name : this.$router.history.current.name });
  },
  data () {
    return {
      open: this.$router.history.current.params.open,
      active: this.$router.history.current.name
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.open = to.params.open
    this.active = to.name
    next()
  },
  computed: {
    ...mapGetters([
      'headerNavList',
      'showSign',
      'submenuList',
      'breadcrumbList'
    ]),
  },
  methods:{
    onHeaderNav(payload){
      let name = payload.children[0].children[0].name
      let path = `/${payload.name}/${payload.children[0].name}/${name}`
      this.$store.dispatch('initMenu', { name : name })     
      this.$router.push({ path: path })
    },
    onHeaderPortrait(name){
      if("退出"===name){
        this.$router.push({ path: '/' });
      }
    },
    onSiderMenu(name){
      this.$router.push({ path: path.getPath(name).path });
      this.$store.dispatch('initMenu', { name : name })
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
    top: 4px;
    left: 20px;
    width: 50px;
    height:64px;
}
.header-logo img{
    width: 53px;
    height:53px;
}
.header-title{
    float:left;
    padding-left: 25px;
}
.header-title-top{
    height: 30px;
    line-height: 34px;
    color: #fff;
    font-size: 13px;
}
.header-title-bottom{
    height: 22px;
    line-height: 22px;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
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
.layout{
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.layout-sider{
  background: #fff;
}
.layout-layout{
  background: #f0f5ff;
  padding: 0 15px 15px;
}
.layout-bread{
  margin-top: 20px;
}
.layout-content{
  padding: 14px 5px 0 5px;
  min-height: 660px ; 
  background: #f0f5ff;
}
</style>