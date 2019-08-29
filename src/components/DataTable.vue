<template>
  <div id="myTable">{{ posts }}</div>
</template>

<script>
// import jQuery from 'jQuery';

export default {
  name: 'DataTable',
  // render: (createElement) => {
  //   return createElement()
  // },
  props: {
    posts: Array
  },
  data() {
    return {
    }
  },
  mounted() {
    // jQuery('#myTable').DataTable({
    //   data: this.posts
    // })
  }  
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
