<template>
  <div class="mt-4">
    <button class="btn btn-sm btn-block btn-outline-danger"
            v-if="!remove"
            @click.prevent="toggle"
    >
      Remover
    </button>
    <button class="btn btn-sm btn-block btn-danger shake-horizontal"
            v-if="remove"
            v-bind:disabled="disabled"
            @click.prevent="destroy"
    >
      Sim! Tenho certeza
    </button>
    <button class="btn btn-sm btn-block btn-outline-secondary"
            v-if="remove"
            v-bind:disabled="disabled"
            @click.prevent="toggle"
    >
      Cancelar
    </button>
    <pacman v-if="waiting"/>
  </div>
</template>

<script>

  export default {
    name: 'Remove',
    props: {
      medalId: { // Medal
        type: Number,
        required: true,
      },
    },
    components: {
      Pacman: () => import('../loaders/Pacman'),
    },
    data() {
      return {
        waiting: false,
        disabled: false,
        remove: false
      };
    },
    methods: {
      toggle() {
        this.remove = !this.remove;
      },
      destroy() {
        this.waiting = this.disabled = true;
        this.$auth.$http.delete(`medal/${this.medalId}`)
          .then((response) => {
            this.$store.commit('deleteMedalsById', this.medalId);
          })
          .catch((error) => {
            if (error.response.data) {
              if (error.response.data.message) {
                this.$buefy.toast.open({
                  type: 'is-danger',
                  message: error.response.data.message,
                  position: 'is-bottom-right',
                  duration: 3000,
                  queue: false
                });
              }
            }
            if (error.response.data) {
              if (error.response.data.errors) {
                this.$buefy.toast.open({
                  type: 'is-danger',
                  message: error.response.data.errors[0],
                  position: 'is-bottom-right',
                  duration: 3000,
                  queue: false
                });
              }
            }
          })
          .finally(() => {
            this.waiting = this.disabled = false;
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/buttons";
  @import "~bootstrap/scss/utilities/spacing";

  @import "../../assets/styles/animations";
</style>
