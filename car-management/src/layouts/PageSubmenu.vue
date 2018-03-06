<template>
  <div id="pageSubmenu">
    <Submenu :name="item.name" v-for="(item,key) in menuItems" :key="key" >
        <template slot="title">
            <Icon :type="item.icon"></Icon>
            {{item.value}}
        </template>
        <MenuItem :name="child.name" v-for="(child,key) in item.children" :key="key" >&nbsp;{{ child.value }}</MenuItem>
    </Submenu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'pageSubmenu',
  computed: {
    ...mapGetters([
      'menuItems',
    ]),
  },
}
</script>

<style scoped>
    
</style>