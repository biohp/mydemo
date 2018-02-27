<template>
  <div id="sysManager">
    <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="1-1" theme="primary" width="auto" :open-names="['1']" :accordion="true">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        用户权限管理
                    </template>
                    <MenuItem name="1-1">用户管理</MenuItem>
                    <MenuItem name="1-2">角色管理</MenuItem>
                    <MenuItem name="1-3">功能管理</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        组织机构管理
                    </template>
                    <MenuItem name="2-1">机构管理</MenuItem>
                    <MenuItem name="2-2">人员管理</MenuItem>
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
	      { name: '用户权限管理' },
	      { name: '用户管理' }
	    ]
    }
  }
}
</script>

<style scoped>
    
</style>