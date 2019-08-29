<template>
  <div id="app" class="container">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    
    <button class="mx-auto" @click="fetchData">load db</button>
    <!-- <button class="mx-auto" @click="addData">Create New Entry</button> -->
    <div class="row">
      <div class="mx-auto col-12">
        <HelloWorld :msg='greeting' :posts='posts'/>
        <!-- <span class="col-6 mx-auto"><input v-model="posts"></span> -->
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import VueResource from 'vue-resource'

Vue.use(VueResource);

import HelloWorld from './components/HelloWorld.vue';
// import {EventBus} from './services/event-bus.js';

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data: () => {
    return {
      greeting: "Welcome to Your Vue.js App",
      posts: {}
    }
  },
  methods:{
    announce: (el) => {
      alert(el);
    },
    fetchData: function() {
      Vue.http.get("http://jsonplaceholder.typicode.com/todos").then((response) => {
          // this.posts = response;
          console.log(response.data);
      }, response => {
          console.error(response);
      });
    }, 
    // addData: (data)=> {

    // }
  },
  mounted(){
    // this.fetchData(); 
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
