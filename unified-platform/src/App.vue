<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      
    }
  }
}
</script>

<style>
    .ivu-tree-title-selected{
      color:#fff;
      background-color: #1890ff; 
    }
    .ivu-tree-title-selected:hover{
      color:#595959;
      background-color: #bae7ff; 
    }
</style>
