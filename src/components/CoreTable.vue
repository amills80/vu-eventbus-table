<template>
  <div class="table-container my-4">
    <table class="container">
      <thead>
        <tr class="headers">
          <th @click="toggleSort(header.value)" v-for="header in headers" :key="header.text">{{ header.text }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in filtered" :key="post.name">
          <td>{{post.name}}</td>
          <td>{{post.calories}}</td>
          <td>{{post.fat}}</td>
          <td>{{post.carbs}}</td>
          <td>{{post.protein}}</td>
          <td>{{post.iron}}%</td>
          <td><button class="btn-info" @click="showEditForm(post)">Edit</button></td>
          <td><button class="btn-danger" @click="showDeleteForm(post)">Remove</button></td>
        </tr>
      </tbody>
      
    </table>
    <!-- {{currentSort}} {{currentSortDir}} -->
    <div class="modal-container">
      <modal-edit-form
        v-show="showEditModal"
        @close="showEditModal=false"
      ></modal-edit-form>
      <modal-delete-form 
        v-show="showDeleteModal" 
        @close="showDeleteModal=false"
      >
        <h4 slot="header">Add a treat!</h4>
      </modal-delete-form>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../main';
import ModalDeleteForm from './ModalDelete'
import ModalEditForm from './ModalEdit'
import { constants } from 'crypto';

export default {
  name: 'CoreTable',
  data: () => {
    return {
      showDeleteModal: false,
      showEditModal: false,
      currentSort: 'name',
      currentSortDir: 'asc',
    }
  },
  methods:{
    showEditForm(el) {
      console.log('Edit: ', el);
      this.showEditModal = true;
      eventBus.$emit('confirmEdit', el)
    }, 
    showDeleteForm(el) {
      this.showDeleteModal = true;
      eventBus.$emit('confirmDelete', el)
    }, 
    matchName(el) {
      return el.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1 
    }, 
    toggleSort(el) { 
      if(el == this.currentSort){
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      } else {
        this.currentSort = el
      }
    },
    sortData(data){
      return data.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
    },
  },
  computed: {
    filtered() {
      // if(this.search !== ''){
      //   return this.sortData(this.posts.filter(this.matchName))
      // } else {
        return this.sortData(this.posts);
      // }
    }
  },
  components: {
    ModalDeleteForm,
    ModalEditForm
  },
  props: {
    posts: Array, 
    headers: Array,
    currentPage: Number,
    pageSize: Number
    // search: String
  },  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
