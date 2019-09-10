<template>
  <div class="hello card">
    <div class="table-header">
      <h1>{{ msg }}</h1>
    </div>
    <data-table :msg="msg" :posts="posts"></data-table>
  </div>
</template>

<script>
import DataTable from './DataTable.vue';
// import jQuery from 'jQuery';
import EventBus from '@/services/event-bus.js';

export default {
  name: 'HelloWorld',
  data: () => {
    return {
      comments: [],
      search: ''
    }
  },
  components: {
    DataTable
  },
  props: {
    msg: String,
    posts: Array
  },  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    box-shadow: #42b983
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
