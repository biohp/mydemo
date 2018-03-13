<template>
  <div id="authority-table">
    <!-- <div>
        <Table
        highlight-row  
        stripe
        size="small" 
        ref="selection"
        @on-select="getTableSelect" 
        :columns="columnsUserAuthority" 
        :data="dataUserAuthority"></Table>
        <div v-show="total>pageSize?true:false" class="table-page">
            <div class="table-page-son">
                <Page 
                    :current="current" 
                    :total="total" 
                    :page-size="pageSize" 
                    @on-change="pageChange"
                    size="small"></Page>
            </div>
        </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'AuthorityTable',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
   .table-page{
   	 margin: 15px;
   	 overflow: hidden;
   }
   .table-page-son{
   	 float: right;
   } 
</style>