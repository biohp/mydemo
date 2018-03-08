<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      
    }
  }
}
</script>

<style>
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
