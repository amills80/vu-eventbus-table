
export default {
  getPosts() {
    return this.$http.get('/data.js')
  }
}
