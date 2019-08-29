<template>
  <div class="hello card">
    <div class="table-header">
      <p>{{ comments }}</p>
    </div>
    
    
  </div>
</template>

<script>
import jQuery from 'jQuery';

export default {
  name: 'DataTable',
  render: (createElement) => {
    return createElement(
      'table', null, []
    )
  },
  props: {
    comments: []
  },
  data() {
    return {
      headers: [
        { title: 'Name' },
        { title: 'Email' },
        { title: 'Body' },
        ],
      rows: [] ,
      dtHandle: null
    }
  },
  watch: {
    comments(val, oldVal) {
      console.log(val, oldVal);
      let vm = this;
      vm.rows = [];
      val.forEach(function (item) {
        let row = [];
        row.push(item.name);
        row.push('<a href="mailto://' + item.email + '">' + item.email + '</a>');
        row.push(item.body);
        vm.rows.push(row);
      });
      vm.dtHandle.clear();
      vm.dtHandle.rows.add(vm.rows);
      vm.dtHandle.draw();
    }
  },
  mounted() {
    let vm = this;
    vm.dtHandle = jQuery(this.$el).DataTable({
      columns: vm.headers,
      data: vm.rows,
      searching: true,
      paging: true,
      info: false
    });
  }  
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
