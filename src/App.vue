<template>
  <div id="app" class="container">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    
    <!-- <button class="mx-auto" @click="addData">Create New Entry</button> -->
    <div class="row">
      <div class="mx-auto col-12">
        <data-table :msg='greeting' :posts='desserts'></data-table>
        <!-- <span class="col-6 mx-auto"><input v-model="posts"></span> -->
      </div>
    </div>
  </div>
</template>

<script>  /* eslint-disable */
import Vue from 'vue';

// import VueResource from 'vue-resource'
// Vue.use(VueResource);

import DataTable from './components/DataTable.vue';
import { eventBus } from './main';
import { constants } from 'crypto';

export default {
  name: 'app',
  components: {
    DataTable
  },
  created() {
    eventBus.$on('createTreat', (el) => {
      // clean up data
      console.log("Add to db: ", el)
      this.desserts.push(el);
    }),
    eventBus.$on('removeTreat', (el) => {
      var location = this.desserts.indexOf(el);
      if (location !== -1) {
        this.desserts.splice(location, 1);
      }
    }),
    eventBus.$on('updateTreat', (el) => {
      // console.log('replace: ', el.originalEntry);
      // console.log('with: ', el);
    })
  },
  data: () => {
    return {
      greeting: "Welcome to Your Vue.js App",
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ]
    }
  },
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
