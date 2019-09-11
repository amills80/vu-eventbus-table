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
          <td>{{post.userId}}</td>
          <td>{{post.title}}</td>
          <td>{{post.completed}}</td>
          <td><button class="btn-info" @click="showEditForm(post)">Edit</button></td>
          <td><button class="btn-danger" @click="showDeleteForm(post)">Remove</button></td>
        </tr>
      </tbody>
    </table>

    <div class="container">
      <hr>
      <div class="row mt-2">
        <div class="col-3">
          <label for="ppp-select">Posts per page</label>
          <select class="ml-3" name="ppp-select" v-model="pageSize" v-on:input="currentPage = 1">
            <option selected>3</option>
            <option >5</option>
            <option >10</option>
            <option >25</option>
          </select>
        </div>
        <div class="col">
          <button :disabled="this.currentPage==1" class="mx-2" @click="prevPage">Previous</button> 
          <button :disabled="(this.currentPage*this.pageSize) >= this.posts.length" class="mx-2" @click="nextPage">Next</button>
        </div>
        <div class="col-2">
          <span>Page {{ currentPage }} : {{ Math.round(posts.length/pageSize)==0?1:Math.round(posts.length/pageSize) }}</span>
        </div>
      </div>
    </div>
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

export default {
  name: 'CoreTable',
  data: () => {
    return {
      showDeleteModal: false,
      showEditModal: false,
      currentSort: 'name',
      currentSortDir: 'asc',
      currentPage:1,
      pageSize:3,
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
    prevPage(){
      if(this.currentPage > 1) this.currentPage--;
    },
    nextPage(){
      if((this.currentPage*this.pageSize) < this.posts.length) this.currentPage++;
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
    // search: String
  }, 
  created() {
    eventBus.$on('updateCurrentPage', () => {
      this.currentPage = 1;
    })
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
