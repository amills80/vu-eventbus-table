<template>
  <div class="data-tab">
    <h3>Table</h3>
    <input v-model="search" class="" type="search" name="search" id="treat-search" placeholder="Search treats">
    <!-- <button class="mr-3 btn-info">Search</button> -->
    <button class="ml-3" @click="showCreateForm()">Add a Dessert</button>
    <core-table
      :posts="searchFiltered"
      :headers="headers"
      :currentPage="currentPage"
      :pageSize="pageSize"
    ></core-table>
    <div class="container">
      <hr>
      <div class="row mt-2">
        <div class="col-3">
          <span>Posts per page: {{ pageSize }}</span>
        </div>
        <div class="col">
          <button class="mx-2" @click="prevPage">Previous</button> 
          <button class="mx-2" @click="nextPage">Next</button>
        </div>
        <div class="col-2">
          <span>Page {{ currentPage }}</span>
        </div>
      </div>
    </div>
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

export default {
    name: "DataTable",
    data () {
      return {
        headers: [
          { text: 'Dessert (100g serving)', value: 'name' },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
          { text: 'Edit', value: 'edit' },
          { text: 'Remove', value: 'remove' },
        ],
        showCreateModal: false,
        entry: {}, 
        search: '',
        currentPage:1,
        pageSize:3,
      }
    },
    components: {
      CoreTable,
      ModalCreateForm
    },
    props: {
      posts: Array
    },
    computed: {
      searchFiltered() {
        return this.posts.filter(this.matchName);
      }
    },
    methods: {
      prevPage(){
        if(this.currentPage > 1) this.currentPage--;
      },
      nextPage(){
        if((this.currentPage*this.pageSize) < this.posts.length) this.currentPage++;
      },
      updatePagination(){
        this.currentPage = 1;
      },
      matchName(el) {
        return el.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 
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
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
 
</style>
