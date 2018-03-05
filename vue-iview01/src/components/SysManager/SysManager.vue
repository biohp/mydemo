<template>
  <div id="sysManager">
    <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
            <Menu :active-name="activeName" theme="primary" width="auto" :open-names="openNames" :accordion="true" @on-select="sysManagerNavClick">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="android-person"></Icon>
                        用户管理
                    </template>
                    <MenuItem name="1-1" :style="{background:color1}">&nbsp;用户信息</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="android-unlock"></Icon>
                        权限管理
                    </template>
                    <MenuItem name="2-1" :style="{background:color2}">&nbsp;角色管理</MenuItem>
                    <MenuItem name="2-2" :style="{background:color3}">&nbsp;权限分配</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="android-list"></Icon>
                        参数配置
                    </template>
                    <MenuItem name="3-1" :style="{background:color4}">&nbsp;数据字典</MenuItem>
                    <MenuItem name="3-2" :style="{background:color5}">&nbsp;参数定义</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
            <Breadcrumb :style="{margin: '20px 0'}">
                <BreadcrumbItem v-for="(item,key) in breadcrumbItem" :key="key">{{item.name}}</BreadcrumbItem>
            </Breadcrumb>
            <Content :style="{padding: '24px', minHeight: '520px', background: '#fff'}">
                <router-view></router-view>
            </Content>
        </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  name: 'sysManager',
  data () {
    return {
    	breadcrumbItem:[
	      { name: '系统管理' },
	      { name: '用户管理' },
	      { name: '用户信息' }
	    ],
      color1:'#E6F7FF',
      color2:'#FFF',
      color3:'#FFF',
      color4:'#FFF',
      color5:'#FFF',
      activeName:'1-1',
      openNames:['2','3'], 
    }
  },
  methods:{
    sysManagerNavClick(name){
        switch (name){
            case "1-1":
              /*this.$router.push({ path: '/' });*/
              this.breadcrumbItem=[{ name: '系统管理' },{ name: '用户管理' },{ name: '用户信息' }];
              this.color1="#E6F7FF";
              this.color2="#FFF";
              this.color3="#FFF";
              this.color4="#FFF";
              this.color5="#FFF";
              break;
            case "2-1":
              /*this.$router.push({ path: '/' });*/
              this.breadcrumbItem=[{ name: '系统管理' },{ name: '权限管理' },{ name: '角色管理' }];
              this.color2="#E6f7ff";
              this.color1="#FFF";
              this.color3="#FFF";
              this.color4="#FFF";
              this.color5="#FFF";
              break;
            case "2-2":
              /*this.$router.push({ path: '/' });*/
              this.breadcrumbItem=[{ name: '系统管理' },{ name: '权限管理' },{ name: '权限分配' }];
              this.color3="#E6f7ff";
              this.color1="#FFF";
              this.color2="#FFF";
              this.color4="#FFF";
              this.color5="#FFF";
              break;
            case "3-1":
              /*this.$router.push({ path: '/' });*/
              this.breadcrumbItem=[{ name: '系统管理' },{ name: '参数配置' },{ name: '数据字典' }];
              this.color4="#E6f7ff";
              this.color1="#FFF";
              this.color2="#FFF";
              this.color3="#FFF";
              this.color5="#FFF";
              break;
            case "3-2":
              /*this.$router.push({ path: '/' });*/
              this.breadcrumbItem=[{ name: '系统管理' },{ name: '参数配置' },{ name: '参数定义' }];
              this.color5="#E6f7ff";
              this.color1="#FFF";
              this.color2="#FFF";
              this.color3="#FFF";
              this.color4="#FFF";
              break;
        }
    }
  }
}
</script>

<style scoped>
    
</style>