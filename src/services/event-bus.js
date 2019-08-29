import Vue from 'vue'
import VueResource from 'vue-resource'

export const EventBus = new Vue() ; 
Vue.use(VueResource);



// export default {
//   fetchPosts() {
//     return 
//   }
// }