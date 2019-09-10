<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <h4>Remove a Treat?</h4>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >x</button>
        </header>
        <section
          class="modal-body"
          id="modalDescription"
        >
          <div class="input-group container">
            <div class="row row-wrap">
              <div class="col-2"><label for="inputname">Name</label></div>
              <div class="col-4">
                <input class="floatlabel" name="inputname" type="text" placeholder="Name" v-model="entry.name"/>
              </div>
              <div class="col-2"><label for="inputcalories">Calories</label></div>
              <div class="col-4">
                <input class="floatlabel" name="inputcalories" type="text" placeholder="Calories" v-model="entry.calories"/>
              </div>
              <div class="col-2"><label for="inputfat">Fat (g)</label></div>
              <div class="col-4">
                <input class="floatlabel" name="inputfat" type="text" placeholder="Fat (g)" v-model="entry.fat"/>
              </div>
              <div class="col-2"><label for="inputcarbs">Carb (g)</label></div>
              <div class="col-4">
                <input class="floatlabel" name="inputcarbs" type="text" placeholder="Carbs (g)" v-model="entry.carbs"/>
              </div>
              <div class="col-2"><label for="inputprotein">Protein</label></div>
              <div class="col-4">
                <input class="floatlabel" name="inputprotein" type="text" placeholder="Protein (g)" v-model="entry.protein"/>
              </div>
              <div class="col-2"><label for="inputiron">Iron (%)</label></div>
              <div class="col-4">
                <input class="floatlabel" name="inputiron" type="text" placeholder="Iron (%)" v-model="entry.iron"/>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-footer">
          <div class="row justify-content-between">
            <span></span>
            <button
              type="button"
              class="btn-green mx-2"
              @click="submit(entry)"
            >
              Update Treat
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { eventBus } from '../main';

export default {
  name: 'modal-create-form',
  props: {
  },
  data () {
    return {
      entry: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
        iron: 0,
      },
      originalEntry:{}
    }
  },
  created() {
    eventBus.$on('confirmEdit', (el) => {
      this.entry = el;
      this.originalEntry = el;
    })
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submit(entry) {
      entry.originalEntry = this.originalEntry;
      eventBus.$emit('updateTreat', entry);
      this.close();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 70%;
    top: unset;
    left: unset;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>