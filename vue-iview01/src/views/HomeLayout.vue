<template>
  <div id="homeLayout">
    
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
  name: 'homeLayout',
  data () {
    return {

    }
  },
  created(){
    this.$store.dispatch('initHomeLayout');
  },
  computed: {
    ...mapGetters([
      'openNames',
      'activeName',
      'subMenuItem',
      'breadcrumbItem',
    ]),
  },
  methods:{
    ...mapActions([
      'homeLayoutMenuClk' ,
    ]),
  }
}
</script>

<style scoped>
    
</style>