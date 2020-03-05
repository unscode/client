<template>
  <div class="mb-3">
    <button class="btn btn-outline-primary"
            @click="toggle"
            v-show="!searching"
    >
      Procurar por medalhas
    </button>
    <div class="card p-3" v-show="searching">
      <div class="card-header p-0">
        <form>
          <div class="input-group">
            <input class="form-control"
                   placeholder="Digite o nome da medalha"
                   v-model="medal">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary"
                      @click.prevent="search"
              >
                Procurar
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="card-body p-0 pt-2">
        <Pacman v-if="waiting"/>
        <div v-for="medal in medals" v-bind:key="medal.id">
          <medal-add v-bind:g="g" v-bind:m="medal"></medal-add>
        </div>
        <button class="btn btn-sm btn-outline-danger mt-2"
                @click="toggle"
                v-show="searching"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MedalSearch',
    props: {
      g: { // Game
        type: Object,
        required: true
      },
    },
    components: {
      Pacman: () => import('../../loaders/Pacman'),
      MedalAdd: () => import('./Add')
    },
    data() {
      return {
        searching: false,
        disabled: false,
        waiting: false,
        medal: '',
        medals: []
      };
    },
    methods: {
      toggle() {
        this.searching = !this.searching;
      },
      search() {
        this.waiting = true;
        this.$auth.$http.get(`medal/search/${this.medal}`)
          .then(response => {
            if (response.data) {
              if (response.data.data) {
                this.medals = response.data.data;
              }
            }
          })
          .finally(() => {
            this.waiting = false;
          });
      }
    },
    mounted() {
      this.game = this.g;
    }
  };
</script>

<style lang="scss" scoped>
  @import "~bootstrap/scss/functions";
  @import "../../../assets/styles/variables";
  @import "~bootstrap/scss/variables";
  @import "~bootstrap/scss/mixins";
  @import "~bootstrap/scss/grid";
  @import "~bootstrap/scss/card";
  @import "~bootstrap/scss/forms";
  @import "~bootstrap/scss/input-group";
  @import "~bootstrap/scss/buttons";
  @import "~bootstrap/scss/utilities/spacing";

  .image {
    width: 50px;
    height: 50px;
  }
</style>
