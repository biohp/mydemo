<template>
  <div id="basic-layout">
    <div class="layout">
        <Layout>
            <PageHeaderLayout/>
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
                        <BreadcrumbItem v-for="(item,key) in breadcrumbList" :key="key">{{item.value}}</BreadcrumbItem>
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
import PageHeaderLayout from './PageHeaderLayout.vue'
import { mapActions , mapGetters } from 'vuex'
export default {
  name: 'BasicLayout',
  props: ['open'],
  created(){
    this.$store.dispatch('initMenu', { route : this.$router.history.current.name });
  },
  data () {
    return {
      active : this.$router.history.current.name,
    }
  },
  components: {
    'PageHeaderLayout': PageHeaderLayout ,
  },
  computed: {
    ...mapGetters([
      'breadcrumbList',
      'submenuList'
    ]),
  },
  methods:{
  	...mapActions([
      'onSiderMenu' ,
    ]),
  }
}
</script>

<style scoped>
.layout{
  background: #e9eaec;
  position: relative;
  overflow: hidden;
}
.layout-sider{
  background: #fff;
}
.layout-layout{
  padding: 0 24px 24px;
}
.layout-bread{
  margin: 20px 0 ;
}
.layout-content{
  padding: 24px ;
  min-height: 600px ; 
  background: #fff;
}
</style>