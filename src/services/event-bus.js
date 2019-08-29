import Vue from 'vue'
import VueResource from 'vue-resource'
import jQuery from 'jQuery'

export const EventBus = new Vue() ; 
Vue.use(VueResource);



export default {
  fetchPosts() { 
    jQuery.ajax({
      url: 'data.js',
      dataType: 'json',
      success(res) {
        console.log(res);
        return res;
      }, 
    });
  }
}