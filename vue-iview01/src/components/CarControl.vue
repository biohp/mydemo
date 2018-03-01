<template>
  <div id="carControl">
    <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="1-1" theme="primary" width="auto" :open-names="['1']" :accordion="true" @on-select="carControlNavClick">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="android-car"></Icon>
                        过车数据
                    </template>
                    <MenuItem name="1-1" :style="{background:color1}">&nbsp;数据查询</MenuItem>
                    <MenuItem name="1-2" :style="{background:color2}">&nbsp;数据统计</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '20px 0'}">
                <BreadcrumbItem v-for="(item,key) in breadcrumbItem" :key="key">{{item.name}}</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '600px', background: '#fff'}">
                <router-view></router-view>
            </Content>
        </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'carControl',
  data () {
    return {
    	breadcrumbItem:[
	      { name: '车辆查控' },
	      { name: '过车数据' },
	      { name: '数据查询' }
	    ],
      color1:'#E6F7FF',
      color2:'#FFF',
    }
  },
  methods:{
  	carControlNavClick(name){
      switch (name){
        case "1-1":
          this.$router.push({ path: '/dataQuery' });
          this.breadcrumbItem=[{ name: '车辆查控' },{ name: '过车数据' },{ name: '数据查询' }];
          this.color1="#E6F7FF";
          this.color2="#FFF";
          break;
        case "1-2":
          /*this.$router.push({ path: '/dataChart' });*/
          this.breadcrumbItem=[{ name: '车辆查控' },{ name: '过车数据' },{ name: '数据统计' }];
          this.color2="#E6F7FF";
          this.color1="#FFF";
          break;
      }
  	}
  }
}
</script>

<style scoped>
    
</style>