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
        <p class="lead">Are you sure you would like to delete {{ entry.name }}? </p>
        </section>
        <footer class="modal-footer">
          <div class="row justify-content-between">
            <span></span>
            <button
              type="button"
              class="btn-danger mx-2"
              @click="submit(entry)"
            >
              Remove Treat
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
      }
    }
  },
  created() {
    eventBus.$on('confirmDelete', (el) => {
      this.entry = el;
    })
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submit(entry) {
      eventBus.$emit('removeTreat', entry);
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
    width: 30%;
    height: 500px;
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