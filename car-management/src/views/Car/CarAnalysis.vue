<!-- 过车数据接入统计 -->
<template>
  <div id="carAnalysis">
    <div class="layout">
        <Layout>
            <my-pagehead></my-pagehead>
            <Layout>
                <Sider hide-trigger class="layout-sider">
                    <Menu theme="primary" width="auto" active-name="carAnalysis" :open-names="['car']" :accordion="true" @on-select="onSiderMenu">
                        <my-submenu></my-submenu>
                    </Menu>
                </Sider>
                <Layout class="layout-layout">
                    <Breadcrumb class="layout-bread">
                        <BreadcrumbItem v-for="(item,key) in breadcrumbItem" :key="key">{{item}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Content class="layout-content">
                        
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
  </div>
</template>
<script>
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import PageSubmenu from '../../layouts/PageSubmenu'
import { mapActions , mapGetters } from 'vuex'
export default {
  name: 'carAnalysis',
  created(){
  	this.$store.dispatch('onCurrentRoute', { route : 2 });
  },
  components: {
    'my-pagehead': PageHeaderLayout ,
    'my-submenu': PageSubmenu ,
  },
  computed: {
    ...mapGetters([
      'breadcrumbItem',
    ]),
  },
  methods:{
  	...mapActions([
      'onSiderMenu' ,
    ]),
  }
}
</script>