<template>
  <div class="data-tab">
    <h3>Table: {{ msg }}</h3>
    <input v-model="search" v-on:input="updatePagination" type="search" name="search" id="treat-search" placeholder="Search Tasks">
    <!-- <button class="mr-3 btn-info">Search</button> -->
    <button class="ml-3" @click="showCreateForm()">Add a Task</button>
    <core-table
      :posts="searchFiltered"
      :headers="headers"
    ></core-table>
    <div class="modal-container">
      <modal-create-form 
        :entry="entry"
        v-show="showCreateModal" 
        @close="showCreateModal=false"
      >
        <h4 slot="header">Add a treat!</h4>
      </modal-create-form>
    </div>
  </div>
</template>

<script>
import CoreTable from './CoreTable';
import ModalCreateForm from './ModalCreate';
import { eventBus } from '../main';

export default {
    name: "DataTable",
    data () {
      return {
        headers: [
          {text: 'userId', value: 'userId'},
          {text: 'title', value: 'title'},
          {text: 'completed', value: 'completed'},
          {text: 'Edit', value: 'edit'},
          {text: 'Remove', value: 'remove'},
        ],
        showCreateModal: false,
        entry: {}, 
        search: '',
      }
    },
    components: {
      CoreTable,
      ModalCreateForm
    },
    props: {
      posts: Array,
      msg: String
    },
    computed: {
      searchFiltered() {
        return this.posts.filter(this.matchName);
      }
    },
    methods: {
      matchName(el) {
        // console.log('')
        return el.title.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 
      }, 
      showCreateForm() {
        this.entry = {
          name: '',
          calories: 0,
          fat: 0,
          carbs: 0,
          protein: 0,
          iron: 0,
        }
        this.showCreateModal=true
      },
      updatePagination(evt) {
        eventBus.$emit('updateCurrentPage', evt);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
 
</style>
