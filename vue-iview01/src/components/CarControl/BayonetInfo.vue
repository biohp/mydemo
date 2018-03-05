<template>
  <div id="bayonetInfo">
  	<div style="width:400px;margin:0 auto;">
  		<Input v-model="value" placeholder="输入卡口名称...">
	        <Button slot="append" icon="ios-search"></Button>
	    </Input>
  	</div>  
  </div>
</template>

<script>
export default {
  name: 'bayonetInfo',
  data () {
    return {
    	value:''
    }
  }
}
</script>

<style scoped>

</style>