<template>
  <div class="hello card">
    <div class="table-header">
      <h1>{{ msg }}</h1>
      Filter by anything: <input v-model="search">
    </div>
    <!-- <data-table :msg="msg" :comments="comments"></data-table> -->
    <data-table :msg="msg" :comments="filteredComments"></data-table>
  </div>
</template>

<script>
import DataTable from './DataTable.vue';
import jQuery from 'jQuery';

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
    posts: Object
  },  
  computed: {
    filteredComments: function () {
      let self = this
      let search = self.search.toLowerCase()
      return self.comments.filter(function (comments) {
        return  comments.name.toLowerCase().indexOf(search) !== -1 ||
          comments.email.toLowerCase().indexOf(search) !== -1 ||
          comments.body.toLowerCase().indexOf(search) !== -1
      })
    }
  },
  mounted() {
    let vm = this;
    jQuery.ajax({
      url: 'https://jsonplaceholder.typicode.com/comments',
      success(res) {
        vm.comments = res;
      }
    });
  }
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
